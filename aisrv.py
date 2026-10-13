"""Assistente de IA (DeepSeek) com acesso a pastas, arquivos e comandos — só biblioteca padrão."""
import json, os, re, secrets, shutil, signal, subprocess, threading, time, urllib.error, urllib.request
from datetime import datetime
import termsrv

ROOT = os.path.expanduser("~")  # o server.py ajusta
CFG = os.path.join(termsrv.DATA, "ai.json")
CHATS = os.path.join(termsrv.DATA, "ai_chats")
TRASH = os.path.join(termsrv.DATA, "ai_trash")
IDX = os.path.join(CHATS, "index.json")
IDRE = re.compile(r"^[a-z0-9]{6,40}$")
CATS = ("read", "write", "delete", "cmd")
MODES = ("allow", "ask", "deny")
TOOLCAT = {
    "list_dir": "read", "read_file": "read", "search_files": "read",
    "write_file": "write", "edit_file": "write", "make_dir": "write", "move_path": "write", "copy_path": "write",
    "delete_path": "delete", "run_command": "cmd",
}
MAXFILE = 5 << 20
SKIP = {".git", "node_modules", "__pycache__", ".cache", ".gradle"}
LK = threading.Lock()

DEFAULT = {
    "key": "", "base": "https://api.deepseek.com", "model": "deepseek-chat", "temp": 0.5, "extra": "",
    "steps": 25, "timeout": 60, "trash": True,
    "perms": {"read": "allow", "write": "ask", "delete": "ask", "cmd": "ask"},
    "folders": [],
}


class Err(Exception):
    pass


# ---------------------------------------------------------------- configuração
def inside(p, r):
    return p == r or p.startswith(r.rstrip(os.sep) + os.sep)


def _rel(p):
    """Converte para caminho relativo à pasta base (ou None se estiver fora dela)."""
    base = os.path.realpath(ROOT)
    p = os.path.expanduser(str(p).strip())
    for cand in (p, os.path.join(base, p.lstrip("/"))):
        r = os.path.realpath(cand if os.path.isabs(cand) else os.path.join(base, cand))
        if inside(r, base):
            rel = os.path.relpath(r, base)
            return "" if rel == "." else rel.replace(os.sep, "/")
    return None


def _num(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool)


def _merge(c, j):
    for k in ("key", "base", "model", "extra"):
        v = j.get(k)
        if isinstance(v, str):
            v = v.strip() if k != "extra" else v[:4000]
            if k == "key" and not v:
                continue
            if k in ("base", "model") and not v:
                continue
            if k == "base" and not re.match(r"^https?://", v):
                continue
            c[k] = v[:300] if k != "extra" else v
    if _num(j.get("temp")):
        c["temp"] = max(0.0, min(2.0, float(j["temp"])))
    for k, lo, hi in (("steps", 1, 100), ("timeout", 5, 600)):
        if _num(j.get(k)):
            c[k] = max(lo, min(hi, int(j[k])))
    if isinstance(j.get("trash"), bool):
        c["trash"] = j["trash"]
    if isinstance(j.get("perms"), dict):
        for k in CATS:
            if j["perms"].get(k) in MODES:
                c["perms"][k] = j["perms"][k]
    if isinstance(j.get("folders"), list):
        out = []
        for f in j["folders"][:50]:
            if isinstance(f, dict) and isinstance(f.get("p"), str):
                p = _rel(f["p"])
                if p is not None and all(o["p"] != p for o in out):
                    out.append({"p": p, "w": bool(f.get("w"))})
        c["folders"] = out


def load():
    c = json.loads(json.dumps(DEFAULT))
    try:
        with open(CFG) as f:
            j = json.load(f)
    except Exception:
        j = {}
    if isinstance(j, dict):
        _merge(c, j)
    return c


def save_cfg(d):
    if not isinstance(d, dict):
        raise Err("Pedido inválido")
    c = load()
    if d.get("clear_key"):
        c["key"] = ""
    _merge(c, d)
    _wr(CFG, c)


def pub(c):
    k = c["key"]
    o = {x: y for x, y in c.items() if x != "key"}
    o["key_set"] = bool(k)
    o["key_hint"] = ("…" + k[-4:]) if len(k) > 8 else ""
    o["root"] = os.path.realpath(ROOT)
    return o


def _wr(p, o):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p + ".part", "w", encoding="utf-8") as f:
        json.dump(o, f, ensure_ascii=False)
    os.chmod(p + ".part", 0o600)
    os.replace(p + ".part", p)


# ---------------------------------------------------------------- permissões de pasta
def real(path, leaf=True):
    p = os.path.expanduser(str(path if path not in (None, "") else ".").strip() or ".")
    if not os.path.isabs(p):
        p = os.path.join(ROOT, p)
    p = os.path.normpath(p)
    if leaf:
        return os.path.realpath(p)
    return os.path.join(os.path.realpath(os.path.dirname(p)), os.path.basename(p))


def roots(c):
    base = os.path.realpath(ROOT)
    fs = c["folders"] or [{"p": "", "w": True}]
    return [(os.path.realpath(os.path.join(base, f["p"])), f["w"]) for f in fs]


def guard(c, path, write=False, leaf=True):
    p = real(path, leaf)
    if inside(p, os.path.realpath(termsrv.DATA)):
        raise Err("Caminho protegido (dados internos do sistema)")
    rs = roots(c)
    for r, w in rs:
        if inside(p, r) and (w or not write):
            return p
    if any(inside(p, r) for r, _ in rs):
        raise Err("Pasta somente leitura: " + p)
    raise Err("Fora das pastas permitidas: %s. Pastas permitidas: %s" % (p, ", ".join(r for r, _ in rs)))


def human(n):
    for u in ("B", "KB", "MB", "GB"):
        if n < 1024 or u == "GB":
            return ("%d %s" % (n, u)) if u == "B" else ("%.1f %s" % (n, u))
        n /= 1024.0


def backup(c, p):
    """Guarda cópia na lixeira do assistente antes de sobrescrever/apagar."""
    if not c["trash"]:
        return None
    d = os.path.join(TRASH, time.strftime("%Y%m%d-%H%M%S-") + secrets.token_hex(2))
    os.makedirs(d, exist_ok=True)
    return d


def _text(p, strict=False):
    with open(p, "rb") as f:
        b = f.read(MAXFILE + 1)
    if len(b) > MAXFILE:
        raise Err("Arquivo grande demais (>5 MB). Use run_command (head, grep, sed).")
    if b"\0" in b[:8192]:
        raise Err("Arquivo binário: não é possível ler como texto")
    try:
        return b.decode("utf-8")
    except UnicodeDecodeError:
        if strict:
            raise Err("O arquivo não está em UTF-8")
        return b.decode("utf-8", "replace")


def _put(c, p, t):
    b = t.encode("utf-8")
    if len(b) > MAXFILE:
        raise Err("Conteúdo grande demais (>5 MB)")
    if os.path.isdir(p):
        raise Err("O caminho é uma pasta")
    ex = os.path.isfile(p)
    if ex:
        d = backup(c, p)
        if d:
            shutil.copy2(p, os.path.join(d, os.path.basename(p)))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    tmp = p + ".ai-part"
    with open(tmp, "wb") as f:
        f.write(b)
    if ex:
        try:
            shutil.copymode(p, tmp)
        except OSError:
            pass
    os.replace(tmp, p)
    return len(b), ex


# ---------------------------------------------------------------- ferramentas
def t_list_dir(c, a):
    p = guard(c, a.get("path", "."))
    if not os.path.isdir(p):
        raise Err("Não é uma pasta: " + p)
    prot = os.path.realpath(termsrv.DATA)
    rows = []
    with os.scandir(p) as it:
        for e in sorted(it, key=lambda e: (not e.is_dir(), e.name.lower())):
            if os.path.realpath(e.path) == prot:
                continue
            try:
                d = e.is_dir()
                sz = 0 if d else e.stat().st_size
            except OSError:
                d, sz = False, 0
            rows.append("d " + e.name + "/" if d else "f %s  (%s)" % (e.name, human(sz)))
    more = len(rows) - 500
    return p + "\n" + ("\n".join(rows[:500]) or "(pasta vazia)") + ("\n… (mais %d itens)" % more if more > 0 else "")


def t_read_file(c, a):
    p = guard(c, a.get("path"))
    if not os.path.isfile(p):
        raise Err("Arquivo não encontrado: " + p)
    lines = _text(p).split("\n")
    n = len(lines)
    s = max(1, int(a.get("start") or 1))
    e = min(n, int(a.get("end") or n))
    out = "\n".join(lines[s - 1:e])
    cut = False
    if len(out) > 60000:
        out, cut = out[:60000], True
    if s > 1 or e < n or cut:
        return "[linhas %d-%d de %d%s]\n%s" % (s, e, n, ", truncado: use start/end para ler o resto" if cut else "", out)
    return out


def t_search_files(c, a):
    q = str(a.get("query") or "").lower()
    if not q:
        raise Err("query vazia")
    base = guard(c, a.get("path", "."))
    content = bool(a.get("content"))
    prot, res, end = os.path.realpath(termsrv.DATA), [], time.time() + 20
    if os.path.isfile(base):
        walk = [(os.path.dirname(base), [], [os.path.basename(base)])]
    else:
        walk = os.walk(base)
    for r, ds, fs in walk:
        ds[:] = [d for d in ds if d not in SKIP and os.path.realpath(os.path.join(r, d)) != prot]
        if not content:
            res += [os.path.join(r, n) + ("/" if n in ds else "") for n in ds + fs if q in n.lower()]
        else:
            for n in fs:
                fp = os.path.join(r, n)
                try:
                    if os.path.getsize(fp) > 1 << 20:
                        continue
                    t = _text(fp)
                except (OSError, Err):
                    continue
                for i, l in enumerate(t.split("\n"), 1):
                    if q in l.lower():
                        res.append("%s:%d: %s" % (fp, i, l.strip()[:200]))
                        if len(res) >= 100:
                            break
                if len(res) >= 100:
                    break
        if len(res) >= 100 or time.time() > end:
            break
    return "\n".join(res[:100]) + ("\n… (limite de 100 resultados)" if len(res) >= 100 else "") if res else "Nenhum resultado"


def t_write_file(c, a):
    p = guard(c, a.get("path"), True)
    t = a.get("content")
    if not isinstance(t, str):
        raise Err("Parâmetro content ausente")
    n, ex = _put(c, p, t)
    return "%s: %s (%s)" % ("Arquivo sobrescrito" if ex else "Arquivo criado", p, human(n))


def t_edit_file(c, a):
    p = guard(c, a.get("path"), True)
    old, new = a.get("old"), a.get("new")
    if not isinstance(old, str) or not old or not isinstance(new, str):
        raise Err("Informe old (não vazio) e new")
    if not os.path.isfile(p):
        raise Err("Arquivo não encontrado: " + p)
    t = _text(p, True)
    n = t.count(old)
    if n == 0:
        raise Err("Trecho não encontrado (confira espaços e indentação; releia o arquivo)")
    if n > 1 and not a.get("replace_all"):
        raise Err("O trecho aparece %d vezes: inclua mais contexto ou use replace_all" % n)
    _put(c, p, t.replace(old, new) if a.get("replace_all") else t.replace(old, new, 1))
    return "Arquivo editado: %s (%d substituição(ões))" % (p, n if a.get("replace_all") else 1)


def t_make_dir(c, a):
    p = guard(c, a.get("path"), True)
    os.makedirs(p, exist_ok=True)
    return "Pasta criada: " + p


def t_move_path(c, a):
    s, d = guard(c, a.get("from"), True, False), guard(c, a.get("to"), True)
    if not os.path.lexists(s):
        raise Err("Origem não encontrada: " + s)
    if os.path.lexists(d):
        raise Err("O destino já existe: " + d + " (informe o caminho completo do novo nome)")
    if any(s == r for r, _ in roots(c)) or s == os.path.realpath(ROOT) or inside(d, s):
        raise Err("Movimento não permitido")
    os.makedirs(os.path.dirname(d), exist_ok=True)
    shutil.move(s, d)
    return "Movido: %s → %s" % (s, d)


def t_copy_path(c, a):
    s, d = guard(c, a.get("from")), guard(c, a.get("to"), True)
    if not os.path.exists(s):
        raise Err("Origem não encontrada: " + s)
    if os.path.lexists(d):
        raise Err("O destino já existe: " + d)
    if inside(d, s) and os.path.isdir(s):
        raise Err("Não é possível copiar uma pasta para dentro dela mesma")
    os.makedirs(os.path.dirname(d), exist_ok=True)
    if os.path.isdir(s):
        shutil.copytree(s, d, symlinks=True)
    else:
        shutil.copy2(s, d)
    return "Copiado: %s → %s" % (s, d)


def t_delete_path(c, a):
    p = guard(c, a.get("path"), True, False)
    if not os.path.lexists(p):
        raise Err("Não encontrado: " + p)
    if p == os.path.realpath(ROOT) or any(p == r for r, _ in roots(c)):
        raise Err("Não é permitido apagar uma pasta raiz permitida")
    d = backup(c, p)
    if d:
        shutil.move(p, os.path.join(d, os.path.basename(p) or "item"))
        return "Apagado (movido para a lixeira do assistente: %s): %s" % (d, p)
    if os.path.isdir(p) and not os.path.islink(p):
        shutil.rmtree(p)
    else:
        os.remove(p)
    return "Apagado: " + p


def t_run_command(c, a):
    cmd = a.get("command")
    if not isinstance(cmd, str) or not cmd.strip():
        raise Err("command vazio")
    cwd = guard(c, a.get("cwd") or roots(c)[0][0])
    if not os.path.isdir(cwd):
        raise Err("cwd não é uma pasta")
    to = c["timeout"]
    if _num(a.get("timeout")):
        to = max(1, min(to, int(a["timeout"])))
    sh = shutil.which("bash") or shutil.which("sh") or "/system/bin/sh"
    env = dict(os.environ, TERM="dumb", PAGER="cat", GIT_PAGER="cat", GIT_TERMINAL_PROMPT="0", PYTHONUNBUFFERED="1")
    p = subprocess.Popen([sh, "-c", cmd], cwd=cwd, env=env, stdin=subprocess.DEVNULL,
                         stdout=subprocess.PIPE, stderr=subprocess.STDOUT, start_new_session=True)
    note = ""
    try:
        out, _ = p.communicate(timeout=to)
    except subprocess.TimeoutExpired:
        try:
            os.killpg(p.pid, signal.SIGKILL)
        except OSError:
            pass
        out, _ = p.communicate()
        note = "\n[interrompido: tempo limite de %ds]" % to
    s = out.decode("utf-8", "replace")
    if len(s) > 20000:
        s = s[:8000] + "\n[… %d caracteres omitidos …]\n" % (len(s) - 20000) + s[-12000:]
    return "[código de saída %s]\n%s%s" % (p.returncode, s, note)


FN = {k: globals()["t_" + k] for k in TOOLCAT}


def run_tool(name, args, approved):
    c = load()
    cat = TOOLCAT.get(name)
    if not cat:
        return {"e": "Ferramenta desconhecida: " + name}
    m = c["perms"][cat]
    if m == "deny":
        return {"denied": cat}
    if m == "ask" and not approved:
        return {"ask": 1, "cat": cat}
    if not isinstance(args, dict):
        return {"e": "Argumentos inválidos"}
    try:
        return {"r": FN[name](c, args)}
    except Err as e:
        return {"e": str(e)}
    except (ValueError, TypeError):
        return {"e": "Argumentos inválidos"}
    except OSError as e:
        return {"e": e.strerror or str(e) or "Erro"}
    except shutil.Error as e:
        return {"e": str(e)}


def _fn(name, desc, props, req):
    return {"type": "function", "function": {"name": name, "description": desc, "parameters": {
        "type": "object", "properties": props, "required": req}}}


S = {"type": "string"}
TOOLS = {
    "list_dir": _fn("list_dir", "Lista os itens de uma pasta.", {"path": dict(S, description="Caminho da pasta")}, ["path"]),
    "read_file": _fn("read_file", "Lê um arquivo de texto. Use start/end (linhas, base 1) para arquivos grandes.", {
        "path": S, "start": {"type": "integer"}, "end": {"type": "integer"}}, ["path"]),
    "search_files": _fn("search_files", "Busca arquivos pelo nome ou, com content=true, texto dentro dos arquivos (recursivo).", {
        "query": S, "path": dict(S, description="Pasta onde buscar"), "content": {"type": "boolean"}}, ["query"]),
    "write_file": _fn("write_file", "Cria ou sobrescreve um arquivo com o conteúdo completo. Cria as pastas necessárias.", {
        "path": S, "content": S}, ["path", "content"]),
    "edit_file": _fn("edit_file", "Substitui um trecho exato de um arquivo existente (old deve ser único, salvo replace_all).", {
        "path": S, "old": S, "new": S, "replace_all": {"type": "boolean"}}, ["path", "old", "new"]),
    "make_dir": _fn("make_dir", "Cria uma pasta (e as pastas pai).", {"path": S}, ["path"]),
    "move_path": _fn("move_path", "Move ou renomeia um arquivo/pasta. O destino não pode existir.", {"from": S, "to": S}, ["from", "to"]),
    "copy_path": _fn("copy_path", "Copia um arquivo ou pasta. O destino não pode existir.", {"from": S, "to": S}, ["from", "to"]),
    "delete_path": _fn("delete_path", "Apaga um arquivo ou pasta.", {"path": S}, ["path"]),
    "run_command": _fn("run_command", "Executa um comando no shell do Termux e devolve a saída. Sem entrada interativa.", {
        "command": S, "cwd": dict(S, description="Pasta de execução"), "timeout": {"type": "integer", "description": "Segundos"}}, ["command"]),
}


def system_prompt(c):
    rs = roots(c)
    pasta = "\n".join("- %s (%s)" % (r, "leitura e escrita" if w else "somente leitura") for r, w in rs)
    perm = {"allow": "livre", "ask": "pede aprovação do usuário", "deny": "bloqueada (ferramenta indisponível)"}
    pm = "\n".join("- %s: %s" % (n, perm[c["perms"][k]]) for k, n in (
        ("read", "ler/listar/buscar"), ("write", "criar/editar/mover/copiar"), ("delete", "apagar"), ("cmd", "executar comandos")))
    s = (
        "Você é um assistente de IA integrado ao \"Meu PC\", rodando no Termux (Android). Ajuda o usuário a trabalhar com "
        "arquivos, pastas, código e comandos, usando as ferramentas disponíveis.\n\n"
        "Pasta base: %s\nPastas acessíveis:\n%s\n\nPermissões:\n%s\n\n"
        "Regras:\n"
        "- Prefira caminhos absolutos. Antes de editar um arquivo, leia-o. Prefira edit_file a reescrever tudo.\n"
        "- Faça somente o que foi pedido; não apague nem sobrescreva nada sem necessidade.\n"
        "- Se uma ação for negada ou bloqueada, não insista: explique e ofereça uma alternativa.\n"
        "- Responda em português do Brasil, em Markdown, de forma direta. Todo código vai em blocos ```linguagem.\n"
        "- Ao terminar uma tarefa com ferramentas, resuma em poucas linhas o que foi feito.\n\n"
        "Data e hora atuais: %s"
    ) % (os.path.realpath(ROOT), pasta, pm, datetime.now().strftime("%d/%m/%Y %H:%M"))
    if c["extra"].strip():
        s += "\n\nInstruções do usuário:\n" + c["extra"].strip()
    return s


# ---------------------------------------------------------------- proxy do chat (streaming)
def _tcalls(tc):
    out = []
    if isinstance(tc, list):
        for t in tc[:50]:
            f = t.get("function") if isinstance(t, dict) else None
            if isinstance(f, dict):
                out.append({"id": str(t.get("id", "")), "type": "function",
                            "function": {"name": str(f.get("name", "")), "arguments": str(f.get("arguments", "")) or "{}"}})
    return out


def stream(h, d):
    c = load()
    if not c["key"]:
        raise Err("Configure sua chave da API do DeepSeek em ⚙ Configurações.")
    msgs = d.get("messages")
    if not isinstance(msgs, list) or not msgs or len(msgs) > 4000:
        raise Err("Pedido inválido")
    reasoner = "reasoner" in c["model"]
    lu = max((i for i, m in enumerate(msgs) if isinstance(m, dict) and m.get("role") == "user"), default=-1)
    out = [{"role": "system", "content": system_prompt(c)}]
    for i, m in enumerate(msgs):
        if not isinstance(m, dict):
            continue
        r = m.get("role")
        if r == "user":
            out.append({"role": "user", "content": str(m.get("content", ""))})
        elif r == "assistant":
            x = {"role": "assistant", "content": str(m.get("content") or "")}
            tc = _tcalls(m.get("tool_calls"))
            if tc:
                x["tool_calls"] = tc
            if reasoner and i > lu and m.get("reasoning_content"):
                x["reasoning_content"] = str(m["reasoning_content"])
            out.append(x)
        elif r == "tool":
            out.append({"role": "tool", "tool_call_id": str(m.get("tool_call_id", "")), "content": str(m.get("content", ""))})
    body = {"model": c["model"], "messages": out, "stream": True, "stream_options": {"include_usage": True},
            "max_tokens": 32768 if reasoner else 8192}
    tools = [TOOLS[k] for k, cat in TOOLCAT.items() if c["perms"][cat] != "deny"]
    if tools:
        body["tools"] = tools
    if not reasoner:
        body["temperature"] = c["temp"]
    req = urllib.request.Request(
        c["base"].rstrip("/") + "/chat/completions", json.dumps(body).encode(),
        {"Content-Type": "application/json", "Authorization": "Bearer " + c["key"], "Accept": "text/event-stream"})
    try:
        r = urllib.request.urlopen(req, timeout=120)
    except urllib.error.HTTPError as e:
        try:
            j = json.loads(e.read().decode("utf-8", "replace"))
            msg = (j.get("error") or {}).get("message") or str(j)
        except Exception:
            msg = e.reason or ""
        hint = {401: "chave da API inválida", 402: "saldo insuficiente na conta DeepSeek", 429: "limite de requisições"}.get(e.code, "")
        return h.js({"e": "DeepSeek (%d%s): %s" % (e.code, " – " + hint if hint else "", str(msg)[:600])}, 502) or True
    except Exception as e:
        return h.js({"e": "Falha ao conectar em %s: %s" % (c["base"], getattr(e, "reason", e))}, 502) or True
    h.send_response(200)
    h.send_header("Content-Type", "text/event-stream; charset=utf-8")
    h.send_header("X-Accel-Buffering", "no")
    h.close_connection = True
    h.end_headers()
    try:
        while True:
            line = r.readline()
            if not line:
                break
            h.wfile.write(line)
            h.wfile.flush()
    except (BrokenPipeError, ConnectionResetError):
        pass
    except Exception as e:
        try:
            h.wfile.write(("data: " + json.dumps({"error": {"message": "Conexão interrompida: %s" % e}}) + "\n\n").encode())
        except OSError:
            pass
    finally:
        r.close()
    return True


# ---------------------------------------------------------------- conversas salvas
def _idx():
    try:
        with open(IDX) as f:
            return json.load(f)
    except Exception:
        return {}


def _cid(q):
    i = q.get("id", "")
    if not IDRE.match(i):
        raise Err("Id inválido")
    return i


def chats_list():
    return sorted(({"id": k, "t": v.get("t", ""), "ts": v.get("ts", 0)} for k, v in _idx().items()),
                  key=lambda x: -x["ts"])


def chat_get(i):
    try:
        with open(os.path.join(CHATS, i + ".json")) as f:
            return json.load(f)
    except FileNotFoundError:
        raise Err("Conversa não encontrada")


def chat_put(i, d):
    if not isinstance(d, dict) or not isinstance(d.get("m"), list):
        raise Err("Pedido inválido")
    t, ts = str(d.get("t", ""))[:120], int(time.time())
    with LK:
        _wr(os.path.join(CHATS, i + ".json"), {"id": i, "t": t, "ts": ts, "m": d["m"]})
        x = _idx()
        x[i] = {"t": t, "ts": ts}
        _wr(IDX, x)


def chat_del(i):
    with LK:
        try:
            os.remove(os.path.join(CHATS, i + ".json"))
        except FileNotFoundError:
            pass
        x = _idx()
        x.pop(i, None)
        _wr(IDX, x)


# ---------------------------------------------------------------- rotas /api/ai/
def _json(h):
    raw = termsrv._body(h, 32 << 20)
    d = json.loads(raw) if raw else {}
    if not isinstance(d, dict):
        raise ValueError
    return d


def route(h, method, path, q):
    if not path.startswith("/api/ai/"):
        return False
    p = path[8:]
    try:
        if p == "cfg" and method == "GET":
            h.js(pub(load()))
        elif p == "cfg" and method == "PUT":
            save_cfg(_json(h))
            h.js(pub(load()))
        elif p == "stream" and method == "POST":
            stream(h, _json(h))
        elif p == "tool" and method == "POST":
            d = _json(h)
            h.js(run_tool(str(d.get("name", "")), d.get("args") or {}, bool(d.get("approved"))))
        elif p == "chats" and method == "GET":
            h.js(chats_list())
        elif p == "chat" and method == "GET":
            h.js(chat_get(_cid(q)))
        elif p == "chat" and method == "PUT":
            chat_put(_cid(q), _json(h))
            h.js({"ok": 1})
        elif p == "del" and method == "POST":
            chat_del(_cid(q))
            h.js({"ok": 1})
        else:
            h.js({"e": "Rota inválida"}, 404)
    except Err as e:
        h.js({"e": str(e)}, 400)
    except (ValueError, json.JSONDecodeError):
        h.js({"e": "Pedido inválido"}, 400)
    return True
