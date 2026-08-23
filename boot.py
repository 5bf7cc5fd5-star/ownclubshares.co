#!/usr/bin/env python3
from pathlib import Path
import runpy, subprocess, sys, base64, re, os

root = Path(__file__).resolve().parent
(root / "static").mkdir(exist_ok=True)
(root / "data").mkdir(exist_ok=True)

parts = sorted((root / "frontend.part{}.html".format(i) for i in range(1,5)), key=lambda p: p.name)
if all(p.exists() for p in parts):
    full = "".join(p.read_text(encoding="utf-8", errors="replace") for p in parts)
    for name in ("index.html", "frontend.html"):
        p = root / name
        if (not p.exists()) or p.stat().st_size < 5000:
            p.write_text(full, encoding="utf-8")
            print("assembled full", name, "from parts", len(full))

for closed_marker in ("APP_CLOSED", "CLOSED.html"):
    p = root / closed_marker
    if p.exists():
        try: p.unlink()
        except Exception as e: print(closed_marker, e)

bp = root / "static" / "logo.b64"
if bp.exists():
    try:
        data = base64.b64decode(bp.read_text().strip())
        (root / "own-club-logo.jpg").write_bytes(data)
        (root / "static" / "own-club-logo.jpg").write_bytes(data)
    except Exception as e:
        print("logo decode", e)

try:
    import persist; persist.init()
except Exception as e:
    print("persist init", e)

for script in ("patch_credit_pool.py", "inject_ops.py", "fix_admin_phone.py", "patch_phones.py", "migrate.py"):
    p = root / script
    if p.exists():
        try:
            subprocess.check_call([sys.executable, str(p)], cwd=str(root))
            print("ran", script)
        except Exception as e:
            print(script, "failed", e)

INJECT = [
    '<link rel="stylesheet" href="/static/app-shell-fix.css?v=65">',
    '<script src="/static/login-tight.js?v=65"></script>',
    '<script src="/static/app-shell-fix.js?v=65"></script>',
]
block = "\n".join(INJECT)
for name in ("index.html", "frontend.html"):
    p = root / name
    if not p.exists(): continue
    t = p.read_text(encoding="utf-8", errors="replace")
    t2 = re.sub(r'<script[^>]*login-tight\.js[^>]*></script>\s*', '', t)
    t2 = re.sub(r'<link[^>]*app-shell-fix\.css[^>]*>\s*', '', t2)
    t2 = re.sub(r'<script[^>]*app-shell-fix\.js[^>]*></script>\s*', '', t2)
    if "</body>" in t2: t2 = t2.replace("</body>", block + "\n</body>", 1)
    else: t2 += "\n" + block
    if t2 != t:
        p.write_text(t2, encoding="utf-8")
        print("injected v65", name)

print("boot starting server — app OPEN")
runpy.run_path(str(root / "server.py"), run_name="__main__")
