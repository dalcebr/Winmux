#!/usr/bin/env python3
import termsrv as T
import gitsrv as G
import aisrv as A
import idesrv as D
import threading
import bz2, ctypes, gzip, json, lzma, mimetypes, os, shutil, socket, struct, subprocess, sys, tarfile, zipfile, zlib
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlsplit, parse_qs, quote

BASE = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.join(BASE, "public")
ROOT = os.path.abspath(os.environ.get("FM_ROOT") or os.path.expanduser("~"))
PORT = next((int(a) for a in sys.argv[1:] if a.isdigit()), 8080)
SAFE_CT = ("text/html", "image/svg+xml", "application/xhtml+xml")


_sx = None


def birth(path, s):
    """Data de criação: st_birthtime, statx(btime) ou, sem suporte, a mais antiga entre modificação e alteração."""
    global _sx
    b = getattr(s, "st_birthtime", None)
    if b:
        return int(b)
    if _sx is None:
        try:
            f = ctypes.CDLL(None, use_errno=True).statx
            f.argtypes = [ctypes.c_int, ctypes.c_char_p, ctypes.c_int, ctypes.c_uint, ctypes.c_char_p]
            f.restype = ctypes.c_int
            _sx = f
        except Exception:
            _sx = False
    if _sx:
        try:
            buf = ctypes.create_string_buffer(256)
            if _sx(-100, os.fsencode(path), 0, 0x800, buf) == 0 and struct.unpack_from("I", buf, 0)[0] & 0x800:
                t = struct.unpack_from("q", buf, 80)[0]
                if t > 0:
                    return int(t)
        except Exception:
            pass
    return int(min(s.st_mtime, s.st_ctime))


def safe(rel):
    p = os.path.normpath(os.path.join(ROOT, rel.lstrip("/")))
    if p != ROOT and not p.startswith(ROOT + os.sep):
        raise PermissionError
    return p


class Msg(Exception):
    pass


def extract(p, dest):
    """Extrai zip/tar(.gz/.bz2/.xz)/gz/bz2/xz (e 7z/rar se o 7z estiver instalado) com proteção contra path traversal."""
    if not os.path.isfile(p):
        raise FileNotFoundError
    os.makedirs(dest, exist_ok=True)
    base = os.path.realpath(dest)

    def inside(name):
        t = os.path.realpath(os.path.join(base, name))
        return t == base or t.startswith(base + os.sep)

    def room(total):
        if total > shutil.disk_usage(dest).free * 0.95:
            raise OSError(28, "Sem espaço em disco")

    low = p.lower()
    if zipfile.is_zipfile(p):
        with zipfile.ZipFile(p) as z:
            inf = z.infolist()
            room(sum(i.file_size for i in inf))
            if not all(inside(i.filename) for i in inf):
                raise ValueError
            z.extractall(dest)
    elif tarfile.is_tarfile(p):
        with tarfile.open(p) as t:
            ms = [m for m in t.getmembers() if (m.isfile() or m.isdir()) and inside(m.name)]
            room(sum(m.size for m in ms))
            try:
                t.extractall(dest, members=ms, filter="data")
            except TypeError:
                t.extractall(dest, members=ms)
    elif low.endswith((".gz", ".bz2", ".xz")):
        ext = os.path.splitext(low)[1]
        opener = {".gz": gzip.open, ".bz2": bz2.open, ".xz": lzma.open}[ext]
        out = os.path.join(dest, os.path.splitext(os.path.basename(p))[0])
        with opener(p, "rb") as src, open(out, "xb") as dst:
            shutil.copyfileobj(src, dst, 65536)
    elif low.endswith((".7z", ".rar")):
        exe = shutil.which("7z") or shutil.which("7zz") or shutil.which("7za")
        if not exe:
            raise Msg("Para .7z/.rar instale no Termux: pkg install p7zip")
        r = subprocess.run([exe, "x", "-y", "-o" + dest, "--", p], capture_output=True)
        if r.returncode:
            raise Msg("Falha ao extrair (arquivo inválido ou protegido por senha)")
    else:
        raise Msg("Formato não suportado")


class Out:
    """Saída sem seek para o zip em streaming."""
    def __init__(self, f):
        self.f = f

    def write(self, b):
        self.f.write(b)
        return len(b)

    def flush(self):
        self.f.flush()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=WEB, **k)

    def translate_path(self, path):
        p = urlsplit(path).path
        if p.startswith("/vendor/"):
            return os.path.join(T.DATA, "vendor", os.path.basename(p))
        return super().translate_path(path)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, *a):
        pass

    def do_GET(self):
        if self.path.startswith("/ws"):
            u = urlsplit(self.path)
            return T.ws(self, {k: v[0] for k, v in parse_qs(u.query).items()})
        if self.path.startswith("/api/"):
            return self.api("GET")
        super().do_GET()

    def do_PUT(self):
        self.api("PUT")

    def do_POST(self):
        self.api("POST")

    def js(self, obj, code=200, hdr=()):
        b = json.dumps(obj, separators=(",", ":")).encode()
        self.send_response(code)
        for k, v in hdr:
            self.send_header(k, v)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def api(self, method):
        u = urlsplit(self.path)
        qs = parse_qs(u.query)
        q = {k: v[0] for k, v in qs.items()}
        if u.path not in ("/api/login", "/api/auth") and not T.authed(self):
            return self.js({"e": "Não autorizado"}, 401)
        try:
            if T.route(self, method, u.path, q) or G.route(self, method, u.path, q) or A.route(self, method, u.path, q) or D.route(self, method, u.path, q):
                return

            if method == "GET" and u.path == "/api/ls":
                p = safe(q.get("p", ""))
                items = []
                with os.scandir(p) as it:
                    for e in it:
                        try:
                            s = e.stat()
                            items.append([e.name, int(e.is_dir()), s.st_size, int(s.st_mtime), birth(e.path, s)])
                        except OSError:
                            items.append([e.name, 0, 0, 0, 0])
                rel = os.path.relpath(p, ROOT)
                return self.js({"p": "" if rel == "." else rel.replace(os.sep, "/"), "i": items})

            if method == "GET" and u.path == "/api/raw":
                p = safe(q.get("p", ""))
                if not os.path.isfile(p):
                    raise FileNotFoundError
                ct = mimetypes.guess_type(p)[0] or "application/octet-stream"
                self.send_response(200)
                self.send_header("Content-Type", ct)
                self.send_header("Content-Length", str(os.path.getsize(p)))
                if ct in SAFE_CT:
                    self.send_header("Content-Security-Policy", "sandbox")
                if q.get("dl"):
                    self.send_header("Content-Disposition", "attachment; filename*=UTF-8''" + quote(os.path.basename(p)))
                self.end_headers()
                with open(p, "rb") as f:
                    shutil.copyfileobj(f, self.wfile, 65536)
                return

            if method == "GET" and u.path == "/api/zip":
                names = qs.get("n", [])
                if not names:
                    raise ValueError
                paths = [(n, safe(os.path.join(q.get("p", ""), n))) for n in names]
                zn = (names[0] if len(names) == 1 else "arquivos") + ".zip"
                self.send_response(200)
                self.send_header("Content-Type", "application/zip")
                self.send_header("Content-Disposition", "attachment; filename*=UTF-8''" + quote(zn))
                self.end_headers()
                with zipfile.ZipFile(Out(self.wfile), "w", zipfile.ZIP_DEFLATED, compresslevel=1) as z:
                    for n, p in paths:
                        try:
                            if os.path.isdir(p):
                                z.write(p, n)
                                for r, ds, fs in os.walk(p):
                                    for x in ds + fs:
                                        fp = os.path.join(r, x)
                                        try:
                                            z.write(fp, os.path.join(n, os.path.relpath(fp, p)))
                                        except OSError:
                                            pass
                            else:
                                z.write(p, n)
                        except OSError:
                            pass
                return

            if method == "PUT" and u.path == "/api/put":
                p = safe(q.get("p", ""))
                n = int(self.headers.get("Content-Length", 0))
                os.makedirs(os.path.dirname(p), exist_ok=True)
                tmp = p + ".part"
                with open(tmp, "wb") as f:
                    left = n
                    while left > 0:
                        b = self.rfile.read(min(65536, left))
                        if not b:
                            break
                        f.write(b)
                        left -= len(b)
                if left:
                    os.remove(tmp)
                    return self.js({"e": "Envio interrompido"}, 400)
                os.replace(tmp, p)
                return self.js({"ok": 1})

            if method == "POST" and u.path == "/api/op":
                n = int(self.headers.get("Content-Length", 0))
                if n > 65536:
                    raise ValueError
                d = json.loads(self.rfile.read(n))
                p, op = safe(d.get("p", "")), d.get("op")
                if op == "mkdir":
                    os.mkdir(p)
                elif op == "touch":
                    open(p, "x").close()
                elif op == "x":
                    t = safe(d.get("to", ""))
                    if d.get("fresh") and os.path.exists(t):
                        raise FileExistsError
                    extract(p, t)
                elif op in ("mv", "cp"):
                    t = safe(d.get("to", ""))
                    if os.path.exists(t):
                        raise FileExistsError
                    if p == ROOT or t.startswith(p + os.sep):
                        raise ValueError
                    if op == "mv":
                        shutil.move(p, t)
                    elif os.path.isdir(p):
                        shutil.copytree(p, t, symlinks=True)
                    else:
                        shutil.copy2(p, t)
                elif op == "rm":
                    if p == ROOT:
                        raise PermissionError
                    if os.path.isdir(p) and not os.path.islink(p):
                        shutil.rmtree(p)
                    else:
                        os.remove(p)
                else:
                    raise ValueError
                return self.js({"ok": 1})

            self.js({"e": "Rota inválida"}, 404)
        except FileExistsError:
            self.js({"e": "Já existe um item com esse nome"}, 409)
        except FileNotFoundError:
            self.js({"e": "Não encontrado"}, 404)
        except PermissionError:
            self.js({"e": "Sem permissão"}, 403)
        except (ValueError, json.JSONDecodeError):
            self.js({"e": "Pedido inválido"}, 400)
        except (BrokenPipeError, ConnectionResetError):
            pass
        except Msg as e:
            self.js({"e": str(e)}, 400)
        except (zipfile.BadZipFile, tarfile.TarError, EOFError, RuntimeError, lzma.LZMAError, zlib.error, gzip.BadGzipFile):
            self.js({"e": "Arquivo inválido, corrompido ou protegido por senha"}, 400)
        except OSError as e:
            self.js({"e": e.strerror or str(e) or "Erro"}, 500)


def lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("10.255.255.255", 1))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except OSError:
        return None


if __name__ == "__main__":
    G.ROOT = ROOT
    A.ROOT = ROOT
    D.ROOT = ROOT
    T.ensure_password("--senha" in sys.argv)
    threading.Thread(target=T.fetch_vendor, daemon=True).start()
    srv = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    ip = lan_ip() or "<IP-DO-WIFI>"
    print("\n  Servidor ativo (Ctrl+C para parar)")
    print(f"  Neste celular : http://localhost:{PORT}")
    print(f"  Na sua rede   : http://{ip}:{PORT}")
    print(f"  Arquivos em   : {ROOT}\n")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
