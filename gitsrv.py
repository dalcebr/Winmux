"""Git estilo GitHub Desktop: usa o `git` do Termux + API do GitHub (token pessoal)."""
import base64, json, os, re, subprocess, threading, time, urllib.error, urllib.request
import termsrv

ROOT = os.path.expanduser("~")  # o server.py ajusta
GH = os.path.join(termsrv.DATA, "github.json")
REPOS = os.path.join(termsrv.DATA, "repos.json")
EMPTY = "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
NAME = re.compile(r"^[A-Za-z0-9._-]{1,100}$")
REF = re.compile(r"^[A-Za-z0-9._/@+-]{1,200}$")
LOCKS = {}


class Err(Exception):
    pass


def _load(p, d):
    try:
        return json.load(open(p))
    except Exception:
        return d


def _save(p, o):
    with open(p + ".part", "w") as f:
        json.dump(o, f)
    os.replace(p + ".part", p)
    os.chmod(p, 0o600)


def acct():
    return _load(GH, {})


def repos():
    return _load(REPOS, [])


def absr(rel):
    p = os.path.normpath(os.path.join(ROOT, rel.strip("/")))
    if p != ROOT and not p.startswith(ROOT + os.sep):
        raise Err("Caminho fora da pasta permitida")
    return p


def need(q):
    r = q.get("r", "")
    if r not in repos():
        raise Err("Repositório não registrado")
    return absr(r)


def _env(net):
    e = dict(os.environ, GIT_TERMINAL_PROMPT="0", GIT_LITERAL_PATHSPECS="1", GIT_EDITOR="true", GIT_SSH_COMMAND="ssh -o BatchMode=yes")
    a = acct()
    if a.get("name"):
        e.update(GIT_AUTHOR_NAME=a["name"], GIT_COMMITTER_NAME=a["name"])
    if a.get("email"):
        e.update(GIT_AUTHOR_EMAIL=a["email"], GIT_COMMITTER_EMAIL=a["email"])
    if net and a.get("token"):
        b = base64.b64encode(("x-access-token:" + a["token"]).encode()).decode()
        e.update(GIT_CONFIG_COUNT="1", GIT_CONFIG_KEY_0="http.https://github.com/.extraheader",
                 GIT_CONFIG_VALUE_0="Authorization: Basic " + b)
    return e


def git(rd, *a, net=False, t=60, ok=(0,), key=None, inp=None):
    with LOCKS.setdefault(key or rd, threading.Lock()):
        try:
            p = subprocess.run(["git", "-c", "core.quotepath=false"] + list(a), cwd=rd, env=_env(net),
                               capture_output=True, timeout=t, input=inp)
        except subprocess.TimeoutExpired:
            raise Err("Tempo esgotado")
        except FileNotFoundError:
            raise Err("git não instalado. No Termux: pkg install git")
    out, err = p.stdout.decode("utf-8", "replace"), p.stderr.decode("utf-8", "replace")
    if p.returncode not in ok:
        raise Err((err or out).strip()[-1500:] or "Erro do git")
    return out + ("\n" + err if p.returncode and err else "")


def has(rd, ref):
    return bool(git(rd, "rev-parse", "--verify", "-q", ref + "^{commit}", ok=(0, 1)).strip())


def gh(method, path, body=None, token=None):
    t = token or acct().get("token")
    if not t:
        raise Err("Conecte sua conta do GitHub em Configurações")
    rq = urllib.request.Request("https://api.github.com" + path, method=method,
                                data=None if body is None else json.dumps(body).encode(),
                                headers={"Authorization": "Bearer " + t, "Accept": "application/vnd.github+json",
                                         "User-Agent": "win11-termux", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(rq, timeout=25) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        try:
            m = json.loads(e.read()).get("message", "")
        except Exception:
            m = ""
        raise Err("GitHub: " + (m or "erro %d" % e.code))
    except Exception:
        raise Err("Sem conexão com o GitHub")


def register(rel):
    r = repos()
    if rel not in r:
        r.append(rel)
        _save(REPOS, r)


def status(rd):
    out = git(rd, "status", "--porcelain=v2", "--branch", "-z", "-uall")
    info = {"branch": "", "oid": "", "up": "", "ahead": 0, "behind": 0}
    files, parts, i = [], out.split("\0"), 0
    while i < len(parts):
        e = parts[i]
        i += 1
        if not e:
            continue
        c = e[0]
        if c == "#":
            k, _, v = e[2:].partition(" ")
            if k == "branch.head":
                info["branch"] = v
            elif k == "branch.oid":
                info["oid"] = v
            elif k == "branch.upstream":
                info["up"] = v
            elif k == "branch.ab":
                a, b = v.split()
                info["ahead"], info["behind"] = int(a[1:]), int(b[1:])
        elif c == "?":
            files.append({"p": e[2:], "x": "?", "y": "?"})
        elif c == "1":
            f = e.split(" ", 8)
            files.append({"p": f[8], "x": f[1][0], "y": f[1][1]})
        elif c == "2":
            f = e.split(" ", 9)
            files.append({"p": f[9], "o": parts[i], "x": f[1][0], "y": f[1][1]})
            i += 1
        elif c == "u":
            f = e.split(" ", 10)
            files.append({"p": f[10], "x": "U", "y": "U", "c": 1})
    return info, files


def scan():
    found, t0, have = [], time.time(), set(repos())
    for r, ds, _ in os.walk(ROOT):
        depth = r[len(ROOT):].count(os.sep)
        if ".git" in ds:
            rel = os.path.relpath(r, ROOT)
            if rel not in have:
                found.append(rel)
            ds[:] = []
            continue
        ds[:] = [d for d in ds if not d.startswith(".") and d not in ("node_modules", "storage", "__pycache__")] if depth < 3 else []
        if len(found) >= 60 or time.time() - t0 > 6:
            break
    return sorted(found)


def route(h, method, path, q):
    if not path.startswith("/api/git/"):
        return False
    try:
        h.js(_do(h, method, path[9:], q))
    except Err as e:
        h.js({"e": str(e)}, 400)
    return True


def _do(h, method, p, q):
    d = {}
    if method in ("POST", "PUT"):
        raw = termsrv._body(h)
        d = json.loads(raw) if raw else {}

    if p == "state":
        a = acct()
        return {"acct": {"ok": bool(a.get("token")), "login": a.get("login", ""), "name": a.get("name", ""), "email": a.get("email", "")},
                "repos": [{"p": r, "name": os.path.basename(r) or "~", "ok": os.path.isdir(os.path.join(absr(r), ".git"))} for r in repos()]}
    if p == "auth":
        tok = str(d.get("token", "")).strip()
        j = gh("GET", "/user", token=tok)
        a = acct()
        a.update(token=tok, login=j["login"], name=a.get("name") or j.get("name") or j["login"],
                 email=a.get("email") or j.get("email") or "%s+%s@users.noreply.github.com" % (j["id"], j["login"]))
        _save(GH, a)
        return {"ok": 1}
    if p == "logout":
        a = acct()
        a.pop("token", None)
        a.pop("login", None)
        _save(GH, a)
        return {"ok": 1}
    if p == "ident":
        a = acct()
        a.update(name=str(d.get("name", "")).strip()[:100], email=str(d.get("email", "")).strip()[:200])
        _save(GH, a)
        return {"ok": 1}
    if p == "ghrepos":
        out = []
        for pg in (1, 2):
            l = gh("GET", "/user/repos?per_page=100&sort=updated&page=%d" % pg)
            out += [{"n": x["full_name"], "u": x["clone_url"], "pr": x["private"], "d": x.get("description") or ""} for x in l]
            if len(l) < 100:
                break
        return out
    if p == "scan":
        return scan()

    # ---- gerenciar repositórios
    if p == "clone":
        url = str(d.get("url", "")).strip()
        if not re.match(r"^(https?://|git@)[^\s]+$", url) or url.startswith("-"):
            raise Err("Use uma URL https://… ou git@…")
        name = str(d.get("name") or re.sub(r"\.git$", "", url.rstrip("/").split("/")[-1].split(":")[-1]))
        if not NAME.match(name):
            raise Err("Nome de pasta inválido")
        parent = str(d.get("dir") or "repos").strip("/") or "repos"
        pa = absr(parent)
        dest = os.path.join(pa, name)
        if os.path.exists(dest):
            raise Err("A pasta %s já existe" % os.path.relpath(dest, ROOT))
        os.makedirs(pa, exist_ok=True)
        git(pa, "clone", "--", url, name, net=True, t=1800, key=dest)
        rel = os.path.relpath(dest, ROOT)
        register(rel)
        return {"r": rel}
    if p == "init":
        rel = str(d.get("path", "")).strip("/")
        if not rel:
            raise Err("Informe o nome da pasta")
        ab = absr(rel)
        if os.path.isdir(os.path.join(ab, ".git")):
            raise Err("Já é um repositório git")
        os.makedirs(ab, exist_ok=True)
        git(ab, "init")
        git(ab, "symbolic-ref", "HEAD", "refs/heads/main")
        if d.get("readme") and not os.path.exists(os.path.join(ab, "README.md")):
            open(os.path.join(ab, "README.md"), "w").write("# %s\n" % os.path.basename(rel))
        register(rel)
        return {"r": rel}
    if p == "addrepo":
        rel = str(d.get("path", "")).strip("/")
        ab = absr(rel)
        if not os.path.isdir(os.path.join(ab, ".git")):
            raise Err("Essa pasta não é um repositório git")
        register(rel)
        return {"r": rel}
    if p == "rmrepo":
        _save(REPOS, [r for r in repos() if r != d.get("r")])
        return {"ok": 1}

    rd = need(q if method == "GET" else d)
    r = lambda *a, **k: git(rd, *a, **k)

    # ---- leitura
    if p == "status":
        info, files = status(rd)
        rem = r("remote").split()
        remote = r("remote", "get-url", rem[0]).strip() if rem else ""
        last = r("log", "-1", "--format=%s", ok=(0, 128)).strip() if info["oid"] != "(initial)" else ""
        return {"info": info, "files": files, "remote": remote, "last": last,
                "merging": os.path.exists(os.path.join(rd, ".git", "MERGE_HEAD"))}
    if p == "diff":
        f, hh = q.get("p", ""), q.get("h", "")
        paths = [f] + ([q["o"]] if q.get("o") else [])
        if hh:
            if not REF.match(hh):
                raise Err("Commit inválido")
            base = hh + "^" if has(rd, hh + "^") else EMPTY
            out = r("diff", "-M", base, hh, "--", *paths)
        elif not r("ls-files", "--", f).strip():
            out = r("diff", "--no-index", "--", "/dev/null", f, ok=(0, 1))
        elif has(rd, "HEAD"):
            out = r("diff", "-M", "HEAD", "--", *paths)
        else:
            out = r("diff", "--cached", "--", *paths)
        return {"t": out[:400000], "cut": len(out) > 400000}
    if p == "log":
        n, sk = min(int(q.get("n", 50)), 200), int(q.get("skip", 0))
        out = r("log", "--max-count=%d" % n, "--skip=%d" % sk, "--format=%H\x1f%h\x1f%an\x1f%at\x1f%s\x1e", ok=(0, 128))
        ahead = set(r("rev-list", "@{u}..HEAD", ok=(0, 128)).split())
        rows = []
        for x in out.split("\x1e"):
            f = x.strip("\n").split("\x1f")
            if len(f) == 5:
                rows.append({"h": f[0], "s": f[1], "a": f[2], "t": int(f[3]), "m": f[4], "up": f[0] in ahead})
        return rows
    if p == "commit":
        hh = q.get("h", "")
        if not REF.match(hh):
            raise Err("Commit inválido")
        base = hh + "^" if has(rd, hh + "^") else EMPTY
        out = r("diff", "--name-status", "-M", base, hh)
        files = []
        for l in out.splitlines():
            c = l.split("\t")
            if len(c) >= 2:
                files.append({"s": c[0][0], "p": c[-1], **({"o": c[1]} if len(c) == 3 else {})})
        body = r("log", "-1", "--format=%b", hh).strip()
        return {"files": files, "body": body}
    if p == "branches":
        out = r("for-each-ref", "--format=%(refname)\t%(HEAD)\t%(upstream:short)", "refs/heads", "refs/remotes")
        loc, rem = [], []
        for l in out.splitlines():
            ref, hd, up = (l.split("\t") + ["", ""])[:3]
            if ref.startswith("refs/heads/"):
                loc.append({"n": ref[11:], "cur": hd == "*", "up": up})
            elif ref.startswith("refs/remotes/") and not ref.endswith("/HEAD"):
                rem.append(ref[13:])
        return {"local": loc, "remote": rem}

    # ---- escrita
    if p == "commit_do":
        msg, desc, paths = str(d.get("msg", "")).strip(), str(d.get("desc", "")).strip(), d.get("paths") or []
        if not msg:
            raise Err("Escreva um resumo para o commit")
        if not acct().get("name") and not r("config", "user.name", ok=(0, 1)).strip():
            raise Err("Configure seu nome e e-mail em Configurações")
        if os.path.exists(os.path.join(rd, ".git", "MERGE_HEAD")):
            r("add", "-A")
        else:
            if not paths:
                raise Err("Marque ao menos um arquivo")
            r("reset", "-q", ok=(0, 1))
            r("add", "-A", "--", *paths)
        r("commit", *sum([["-m", m] for m in (msg, desc) if m], []))
        return {"ok": 1}
    if p == "discard":
        paths = d.get("paths") or []
        tracked = set(x for x in r("ls-files", "-z", "--", *paths).split("\0") if x)
        inhead = set(x for x in r("ls-tree", "-r", "-z", "--name-only", "HEAD", "--", *paths, ok=(0, 128)).split("\0") if x)
        a = [x for x in paths if x in inhead]
        b = [x for x in paths if x in tracked and x not in inhead]
        c = [x for x in paths if x not in tracked]
        if a:
            r("restore", "--source=HEAD", "--staged", "--worktree", "--", *a)
        if b:
            r("rm", "-f", "-q", "--", *b)
        if c:
            r("clean", "-fd", "--", *c)
        return {"ok": 1}
    if p == "undo":
        row = r("log", "-1", "--format=%s\x1f%b").split("\x1f")
        if has(rd, "HEAD~1"):
            r("reset", "--soft", "HEAD~1")
        else:
            r("update-ref", "-d", "HEAD")
        return {"msg": row[0].strip(), "desc": (row[1] if len(row) > 1 else "").strip()}
    if p == "checkout":
        b = str(d.get("b", ""))
        if not REF.match(b) or b.startswith("-"):
            raise Err("Nome de branch inválido")
        r("switch", *(["-c"] if d.get("create") else []), b)
        return {"ok": 1}
    if p == "delbranch":
        b = str(d.get("b", ""))
        if not REF.match(b) or b.startswith("-"):
            raise Err("Nome de branch inválido")
        r("branch", "-D" if d.get("force") else "-d", b)
        return {"ok": 1}
    if p in ("merge", "revert"):
        b = str(d.get("b", ""))
        if not REF.match(b) or b.startswith("-"):
            raise Err("Referência inválida")
        o = r(*(["merge", "--no-edit"] if p == "merge" else ["revert", "--no-edit"]), b, ok=(0, 1))
        return {"out": o.strip()[-800:]}
    if p == "abort":
        r("merge", "--abort", ok=(0, 128))
        return {"ok": 1}
    if p == "fetch":
        return {"out": r("fetch", "--prune", "origin", net=True, t=300).strip()[-800:]}
    if p == "pull":
        return {"out": r("pull", "--no-rebase", "--no-edit", net=True, t=600, ok=(0, 1)).strip()[-800:]}
    if p == "push":
        up = r("rev-parse", "--abbrev-ref", "@{u}", ok=(0, 128)).strip()
        args = ["push"] if up and "fatal" not in up else ["push", "-u", "origin", "HEAD"]
        return {"out": r(*args, net=True, t=600).strip()[-800:]}
    if p == "publish":
        name = str(d.get("name", "")).strip()
        if not NAME.match(name):
            raise Err("Nome inválido (use letras, números, . _ -)")
        if r("remote").strip():
            raise Err("Este repositório já tem um remote")
        if not has(rd, "HEAD"):
            raise Err("Faça ao menos um commit antes de publicar")
        j = gh("POST", "/user/repos", {"name": name, "description": str(d.get("desc", ""))[:300], "private": bool(d.get("private", True))})
        r("remote", "add", "origin", j["clone_url"])
        r("push", "-u", "origin", "HEAD", net=True, t=600)
        return {"url": j["html_url"]}
    raise Err("Rota inválida")
