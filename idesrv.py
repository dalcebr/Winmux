"""IDE: leitura/gravação segura de arquivos, lista de arquivos e busca no projeto — só biblioteca padrão."""
import fnmatch, json, os, re, shutil, time
import termsrv

ROOT = os.path.expanduser("~")  # o server.py ajusta
SKIP = {".git", "node_modules", "__pycache__", ".cache", ".gradle", ".venv", "venv", ".idea", ".next", ".mypy_cache", ".pytest_cache"}
MAXREAD = 5 << 20


class Err(Exception):
    pass


def safe(rel):
    p = os.path.normpath(os.path.join(ROOT, str(rel or "").lstrip("/")))
    if p != ROOT and not p.startswith(ROOT + os.sep):
        raise Err("Caminho inválido")
    return p


def rel(p):
    r = os.path.relpath(p, ROOT)
    return "" if r == "." else r.replace(os.sep, "/")


def _data():
    return os.path.realpath(termsrv.DATA)


def walk(base):
    """os.walk ignorando pastas pesadas e a pasta de dados do sistema."""
    data = _data()
    for r, ds, fs in os.walk(base):
        ds[:] = sorted(d for d in ds if d not in SKIP and os.path.realpath(os.path.join(r, d)) != data)
        yield r, ds, sorted(fs)


def read(q):
    p = safe(q.get("p"))
    if not os.path.isfile(p):
        raise Err("Arquivo não encontrado")
    st = os.stat(p)
    if st.st_size > MAXREAD:
        raise Err("Arquivo grande demais para o editor (%.1f MB; limite 5 MB)" % (st.st_size / 1048576))
    with open(p, "rb") as f:
        b = f.read()
    m = str(st.st_mtime_ns)
    if b"\0" in b[:8192]:
        return {"bin": 1, "size": st.st_size, "mtime": m}
    bom = b.startswith(b"\xef\xbb\xbf")
    try:
        t = b.decode("utf-8-sig")
    except UnicodeDecodeError:
        raise Err("O arquivo não está em UTF-8 (pode ser binário)")
    crlf = t.count("\r\n")
    eol = "crlf" if crlf and crlf >= t.count("\n") / 2.0 else "lf"
    if "\r" in t:
        t = t.replace("\r\n", "\n").replace("\r", "\n")
    return {"text": t, "mtime": m, "size": st.st_size, "eol": eol, "bom": bom}


def write(q, body):
    p = safe(q.get("p"))
    if os.path.isdir(p):
        raise Err("O caminho é uma pasta")
    ex = os.path.isfile(p)
    if ex and not q.get("force") and q.get("m") and str(os.stat(p).st_mtime_ns) != q["m"]:
        return {"e": "conflict", "mtime": str(os.stat(p).st_mtime_ns)}, 409
    t = body.decode("utf-8")
    if q.get("eol") == "crlf":
        t = t.replace("\r\n", "\n").replace("\n", "\r\n")
    b = t.encode("utf-8")
    if q.get("bom") == "1":
        b = b"\xef\xbb\xbf" + b
    os.makedirs(os.path.dirname(p), exist_ok=True)
    tmp = p + ".ide-part"
    with open(tmp, "wb") as f:
        f.write(b)
    if ex:
        try:
            shutil.copymode(p, tmp)
        except OSError:
            pass
    os.replace(tmp, p)
    return {"ok": 1, "mtime": str(os.stat(p).st_mtime_ns)}, 200


def files(q):
    base = safe(q.get("p"))
    if not os.path.isdir(base):
        raise Err("Pasta não encontrada")
    out, cut = [], False
    for r, ds, fs in walk(base):
        for n in fs:
            out.append(rel(os.path.join(r, n)))
        if len(out) >= 30000:
            cut = True
            break
    return {"f": out, "cut": cut}


def stat(d):
    out = {}
    for p in (d.get("paths") or [])[:100]:
        try:
            out[p] = str(os.stat(safe(p)).st_mtime_ns)
        except (OSError, Err):
            out[p] = None
    return out


def search(q):
    base = safe(q.get("p"))
    text = q.get("q") or ""
    if not text:
        raise Err("Digite o que buscar")
    flags = 0 if q.get("cs") == "1" else re.I
    pat = text if q.get("re") == "1" else re.escape(text)
    if q.get("w") == "1":
        pat = r"\b(?:" + pat + r")\b"
    try:
        rx = re.compile(pat, flags)
    except re.error as e:
        raise Err("Expressão inválida: %s" % e)
    inc = [x.strip() for x in (q.get("inc") or "").split(",") if x.strip()]
    exc = [x.strip() for x in (q.get("exc") or "").split(",") if x.strip()]
    res, nfiles, end, cut = [], 0, time.time() + 20, False
    if os.path.isfile(base):
        it = [(os.path.dirname(base), [], [os.path.basename(base)])]
    else:
        it = walk(base)
    for r, ds, fs in it:
        for n in fs:
            if inc and not any(fnmatch.fnmatch(n, g) for g in inc):
                continue
            if exc and any(fnmatch.fnmatch(n, g) for g in exc):
                continue
            fp = os.path.join(r, n)
            try:
                if os.path.getsize(fp) > 1 << 20:
                    continue
                with open(fp, "rb") as f:
                    b = f.read()
                if b"\0" in b[:8192]:
                    continue
                t = b.decode("utf-8")
            except (OSError, UnicodeDecodeError):
                continue
            hit = 0
            for i, line in enumerate(t.split("\n"), 1):
                m = rx.search(line)
                if m:
                    if not hit:
                        nfiles += 1
                    hit += 1
                    s = max(0, m.start() - 40)
                    res.append([rel(fp), i, m.start() - s, m.end() - s, line[s:s + 300].rstrip("\r"), s])
                    if hit >= 50 or len(res) >= 500:
                        break
            if len(res) >= 500 or time.time() > end:
                cut = True
                break
        if cut:
            break
    return {"r": res, "n": nfiles, "cut": cut}


def route(h, method, path, q):
    if not path.startswith("/api/ide/"):
        return False
    p = path[9:]
    try:
        if p == "read" and method == "GET":
            h.js(read(q))
        elif p == "write" and method == "PUT":
            o, code = write(q, termsrv._body(h, 32 << 20))
            h.js(o, code)
        elif p == "info" and method == "GET":
            h.js({"root": os.path.realpath(ROOT)})
        elif p == "files" and method == "GET":
            h.js(files(q))
        elif p == "search" and method == "GET":
            h.js(search(q))
        elif p == "stat" and method == "POST":
            raw = termsrv._body(h, 1 << 20)
            h.js(stat(json.loads(raw) if raw else {}))
        else:
            h.js({"e": "Rota inválida"}, 404)
    except Err as e:
        h.js({"e": str(e)}, 400)
    except (ValueError, UnicodeDecodeError):
        h.js({"e": "Pedido inválido"}, 400)
    except OSError as e:
        h.js({"e": e.strerror or "Erro de arquivo"}, 500)
    return True
