#!/usr/bin/env python3
from pathlib import Path
import runpy, subprocess, sys

root = Path(__file__).resolve().parent
(root / "static").mkdir(exist_ok=True)
(root / "data").mkdir(exist_ok=True)

# Permanent close: wipe member/pool JSON and replace public pages.
closer = root / "close_app.py"
if closer.exists():
    try:
        subprocess.check_call([sys.executable, str(closer)], cwd=str(root))
    except Exception as e:
        print("close_app failed", e)

try:
    import persist
    persist.init()
except Exception as e:
    print("persist init", e)

# Wipe again after persist migrate so live volume cannot restore users.
if closer.exists():
    try:
        subprocess.check_call([sys.executable, str(closer)], cwd=str(root))
    except Exception as e:
        print("close_app 2 failed", e)

srv = root / "server.py"
if srv.exists():
    st = srv.read_text(encoding="utf-8", errors="replace")
    if "OWNCLUB_PERMANENTLY_CLOSED" not in st:
        st = st + """

# OWNCLUB_PERMANENTLY_CLOSED
try:
    _OC_GET = Handler.do_GET
    _OC_POST = Handler.do_POST
    def do_GET(self):
        path = getattr(self, 'path', '/') or '/'
        if path.startswith('/api/'):
            self.send_response(410)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{\"ok\":false,\"error\":\"Own Club is closed\"}')
            return
        return _OC_GET(self)
    def do_POST(self):
        self.send_response(410)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(b'{\"ok\":false,\"error\":\"Own Club is closed\"}')
    Handler.do_GET = do_GET
    Handler.do_POST = do_POST
except Exception as _e:
    print('close wrap', _e)
"""
        srv.write_text(st, encoding="utf-8")
        print("server closed wrap patched")

print("boot starting closed server")
runpy.run_path(str(root / "server.py"), run_name="__main__")
