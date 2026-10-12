"""Terminal (PTY + WebSocket), login e comandos salvos — só biblioteca padrão."""
import base64, fcntl, hashlib, hmac, http.cookies, json, os, pty, secrets, shutil, signal
import socket, struct, sys, termios, threading, time, urllib.request, warnings
from urllib.parse import urlsplit

warnings.filterwarnings("ignore", category=DeprecationWarning)

DATA = os.path.abspath(os.environ.get("WIN11_DATA") or os.path.expanduser("~/.win11-termux"))
os.makedirs(DATA, exist_ok=True)
AUTH = os.path.join(DATA, "auth.json")
CMDS = os.path.join(DATA, "commands.json")
HOME = os.path.expanduser("~")
GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
BUFMAX = 131072
MAXSESS = 8
DEFAULT_CMDS = [
    {"n": "Limpar terminal", "c": "clear", "e": False},
    {"n": "Listar arquivos", "c": "ls -la", "e": False},
    {"n": "Atualizar pacotes", "c": "pkg update && pkg upgrade -y", "e": False},
]
VENDOR = {
    "xterm.js": "https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js",
    "xterm.css": "https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css",
    "addon-fit.js": "https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js",
}

CRED = {}
TOK, FAILS, SESS = {}, {}, {}
_id, _lk = [0], threading.Lock()


# ---------------------------------------------------------------- login
def _hash(pw, salt):
    return hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, 100000).hex()


def save_password(pw):
    salt = os.urandom(16)
    with open(AUTH, "w") as f:
        json.dump({"s": salt.hex(), "h": _hash(pw, salt)}, f)
    os.chmod(AUTH, 0o600)


def ensure_password(reset=False):
    if reset or not os.path.exists(AUTH):
        if not sys.stdin.isatty():
            print("Defina a senha rodando: python3 server.py --senha")
            sys.exit(1)
        import getpass
        print("\n  O terminal dá acesso total ao Termux: proteja com uma senha.")
        while True:
            a = getpass.getpass("  Crie uma senha (mín. 6 caracteres): ")
            if len(a) >= 6 and a == getpass.getpass("  Repita a senha: "):
                break
            print("  Senhas diferentes ou curtas demais.")
        save_password(a)
    d = json.load(open(AUTH))
    CRED["salt"], CRED["hash"] = bytes.fromhex(d["s"]), d["h"]


def authed(h):
    try:
        m = http.cookies.SimpleCookie(h.headers.get("Cookie", "")).get("sid")
        return bool(m and TOK.get(m.value, 0) > time.time())
    except Exception:
        return False


def _body(h, lim=262144):
    n = int(h.headers.get("Content-Length", 0))
    if n > lim:
        raise ValueError
    return h.rfile.read(n)


def _login(h):
    ip, now = h.client_address[0], time.time()
    fl = FAILS[ip] = [t for t in FAILS.get(ip, []) if now - t < 60]
    if len(fl) >= 5:
        return h.js({"e": "Muitas tentativas. Aguarde 1 minuto."}, 429)
    try:
        pw = str(json.loads(_body(h, 4096)).get("p", ""))
    except Exception:
        pw = ""
    if hmac.compare_digest(_hash(pw, CRED["salt"]), CRED["hash"]):
        FAILS.pop(ip, None)
        t = secrets.token_urlsafe(32)
        TOK[t] = now + 2592000
        h.js({"ok": 1}, 200, [("Set-Cookie", "sid=%s; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000" % t)])
    else:
        fl.append(now)
        time.sleep(0.8)
        h.js({"e": "Senha incorreta"}, 401)


# ---------------------------------------------------------------- terminal
class Cl:
    def __init__(s, h):
        s.h, s.lk = h, threading.Lock()

    def send(s, op, data):
        n = len(data)
        f = bytearray([0x80 | op])
        if n < 126:
            f.append(n)
        elif n < 65536:
            f += b"\x7e" + struct.pack(">H", n)
        else:
            f += b"\x7f" + struct.pack(">Q", n)
        try:
            with s.lk:
                s.h.connection.sendall(bytes(f) + data)
            return True
        except OSError:
            return False


class Sess:
    def __init__(s, cols, rows):
        with _lk:
            _id[0] += 1
            s.id = _id[0]
        s.buf, s.clients, s.lk, s.alive = bytearray(), set(), threading.Lock(), True
        s.pid, s.fd = pty.fork()
        if s.pid == 0:
            try:
                os.chdir(HOME)
                env = dict(os.environ, TERM="xterm-256color", COLORTERM="truecolor")
                sh = os.environ.get("SHELL") or shutil.which("bash") or "/system/bin/sh"
                os.execvpe(sh, [sh], env)
            except BaseException:
                pass
            os._exit(127)
        s.resize(cols, rows)
        SESS[s.id] = s
        threading.Thread(target=s.pump, daemon=True).start()

    def resize(s, cols, rows):
        try:
            fcntl.ioctl(s.fd, termios.TIOCSWINSZ, struct.pack("HHHH", max(2, min(rows, 500)), max(2, min(cols, 500)), 0, 0))
        except OSError:
            pass

    def write(s, d):
        while d:
            try:
                d = d[os.write(s.fd, d):]
            except OSError:
                return

    def pump(s):
        while True:
            try:
                d = os.read(s.fd, 65536)
            except OSError:
                break
            if not d:
                break
            with s.lk:
                s.buf += d
                if len(s.buf) > BUFMAX:
                    del s.buf[:len(s.buf) - BUFMAX]
                cl = list(s.clients)
            for c in cl:
                if not c.send(2, d):
                    with s.lk:
                        s.clients.discard(c)
        s.alive = False
        try:
            os.waitpid(s.pid, 0)
        except OSError:
            pass
        try:
            os.close(s.fd)
        except OSError:
            pass
        SESS.pop(s.id, None)
        for c in list(s.clients):
            c.send(1, b'{"exit":1}')

    def kill(s):
        try:
            os.killpg(s.pid, signal.SIGHUP)
        except OSError:
            pass
        threading.Timer(2, s._hard).start()

    def _hard(s):
        if s.alive:
            try:
                os.killpg(s.pid, signal.SIGKILL)
            except OSError:
                pass


def _recv(h):
    msg, op0 = bytearray(), 0
    while True:
        hd = h.rfile.read(2)
        if len(hd) < 2:
            return None
        fin, op, n = hd[0] & 0x80, hd[0] & 15, hd[1] & 127
        if n == 126:
            n = struct.unpack(">H", h.rfile.read(2))[0]
        elif n == 127:
            n = struct.unpack(">Q", h.rfile.read(8))[0]
        if n > 1 << 20:
            return None
        mask = h.rfile.read(4) if hd[1] & 0x80 else None
        d = h.rfile.read(n)
        if len(d) < n:
            return None
        if mask and n:
            d = (int.from_bytes(d, "big") ^ int.from_bytes((mask * (n // 4 + 1))[:n], "big")).to_bytes(n, "big")
        if op >= 8:
            return op, d
        op0 = op or op0
        msg += d
        if fin:
            return op0, bytes(msg)


def ws(h, q):
    if not authed(h):
        return h.send_error(401)
    o = h.headers.get("Origin")
    if o and urlsplit(o).netloc != h.headers.get("Host"):
        return h.send_error(403)
    try:
        s = SESS.get(int(q.get("id", 0)))
    except ValueError:
        s = None
    key = h.headers.get("Sec-WebSocket-Key")
    if not s or not key or h.headers.get("Upgrade", "").lower() != "websocket":
        return h.send_error(404)
    h.protocol_version, h.close_connection = "HTTP/1.1", True
    h.send_response(101, "Switching Protocols")
    h.send_header("Upgrade", "websocket")
    h.send_header("Connection", "Upgrade")
    h.send_header("Sec-WebSocket-Accept", base64.b64encode(hashlib.sha1((key + GUID).encode()).digest()).decode())
    h.end_headers()
    h.connection.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1)
    c = Cl(h)
    with s.lk:  # reenvia o histórico e entra na lista sem perder/duplicar saída
        if s.buf:
            c.send(2, bytes(s.buf))
        s.clients.add(c)
    try:
        while True:
            r = _recv(h)
            if r is None or r[0] == 8:
                break
            op, d = r
            if op == 9:
                c.send(10, d)
            elif op == 1:
                s.write(d)
            elif op == 2:
                try:
                    j = json.loads(d)
                    if "r" in j:
                        s.resize(int(j["r"][0]), int(j["r"][1]))
                except (ValueError, TypeError, IndexError, KeyError):
                    pass
    finally:
        with s.lk:
            s.clients.discard(c)


# ---------------------------------------------------------------- rotas /api
def route(h, method, path, q):
    if path == "/api/auth" and method == "GET":
        h.js({"ok": authed(h)})
    elif path == "/api/login" and method == "POST":
        _login(h)
    elif path == "/api/logout" and method == "POST":
        try:
            TOK.pop(http.cookies.SimpleCookie(h.headers.get("Cookie", ""))["sid"].value, None)
        except Exception:
            pass
        h.js({"ok": 1}, 200, [("Set-Cookie", "sid=; Path=/; Max-Age=0")])
    elif path == "/api/term/list" and method == "GET":
        h.js(sorted(SESS))
    elif path == "/api/term/new" and method == "POST":
        if len(SESS) >= MAXSESS:
            return h.js({"e": "Limite de %d sessões" % MAXSESS}, 400) or True
        h.js({"id": Sess(int(q.get("cols", 80)), int(q.get("rows", 24))).id})
    elif path == "/api/term/kill" and method == "POST":
        s = SESS.get(int(q.get("id", 0)))
        if s:
            s.kill()
        h.js({"ok": 1})
    elif path == "/api/cmds" and method == "GET":
        try:
            data = json.load(open(CMDS))
        except Exception:
            data = DEFAULT_CMDS
        h.js(data)
    elif path == "/api/cmds" and method == "PUT":
        d = json.loads(_body(h))
        if not isinstance(d, list) or len(d) > 500 or not all(
                isinstance(x, dict) and isinstance(x.get("n"), str) and isinstance(x.get("c"), str) for x in d):
            raise ValueError
        d = [{"n": x["n"][:100], "c": x["c"][:5000], "e": bool(x.get("e"))} for x in d]
        with open(CMDS + ".part", "w") as f:
            json.dump(d, f, ensure_ascii=False)
        os.replace(CMDS + ".part", CMDS)
        h.js({"ok": 1})
    else:
        return False
    return True


def fetch_vendor():
    """Baixa o xterm.js uma única vez para funcionar offline depois."""
    d = os.path.join(DATA, "vendor")
    os.makedirs(d, exist_ok=True)
    need = [n for n in VENDOR if not os.path.exists(os.path.join(d, n))]
    if not need:
        return
    try:
        for n in need:
            with urllib.request.urlopen(VENDOR[n], timeout=20) as r:
                data = r.read()
            if len(data) < 1000:
                raise ValueError
            with open(os.path.join(d, n + ".part"), "wb") as f:
                f.write(data)
            os.replace(os.path.join(d, n + ".part"), os.path.join(d, n))
        print("  xterm.js baixado (funcionará offline).")
    except Exception:
        print("  Sem internet para baixar o xterm.js: o navegador vai usar o CDN.")
