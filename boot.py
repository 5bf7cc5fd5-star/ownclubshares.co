#!/usr/bin/env python3
from pathlib import Path
import runpy, subprocess, sys, base64, re, os, json

root = Path(__file__).resolve().parent
(root / "static").mkdir(exist_ok=True)
(root / "data").mkdir(exist_ok=True)

parts = sorted((root / "frontend.part{}.html".format(i) for i in range(1,5)), key=lambda p: p.name)
if all(p.exists() for p in parts):
    full = "".join(p.read_text(encoding="utf-8", errors="replace") for p in parts)
    (root / "frontend.html").write_text(full, encoding="utf-8")
    print("assembled frontend.html", len(full))

pool_p = root / "data" / "company_pool.json"
snap = {"balance_usd": 100000000, "balance": 100000000, "currency": "USD", "initialized": True, "as_of": "2026-08-22T22:00:00+03:00", "updated_at": "2026-08-22T22:00:00+03:00", "ledger": [{"at": "2026-08-22 22:00:00", "type": "snapshot", "amount": 0, "balance_after": 100000000, "note": "Restored 22 Aug 2026 10pm"}]}
try:
    cur = json.loads(pool_p.read_text()) if pool_p.exists() else {}
except Exception:
    cur = {}
if not cur or float(cur.get("balance_usd") or cur.get("balance") or 0) == 0:
    pool_p.write_text(json.dumps(snap, indent=2), encoding="utf-8")

wd_p = root / "data" / "withdrawals.json"
if (not wd_p.exists()) or wd_p.stat().st_size < 3:
    wd_p.write_text("[]", encoding="utf-8")

for closed_marker in ("APP_CLOSED", "CLOSED.html"):
    p = root / closed_marker
    if p.exists():
        try: p.unlink()
        except Exception: pass

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

for script in ("patch_serve_index.py", "patch_login_guard.py", "patch_credit_pool.py", "inject_ops.py", "fix_admin_phone.py", "patch_phones.py", "migrate.py"):
    p = root / script
    if p.exists():
        try:
            subprocess.check_call([sys.executable, str(p)], cwd=str(root))
            print("ran", script)
        except Exception as e:
            print(script, "failed", e)

HEAD = '<link rel="stylesheet" href="/static/kill-pitch.css?v=69">\n<script src="/static/login-tight.js?v=69"></script>\n'
TAIL = '\n<link rel="stylesheet" href="/static/app-shell-fix.css?v=69">\n<script src="/static/app-shell-fix.js?v=69"></script>\n<script src="/static/market-data.js?v=69"></script>\n'
p = root / "frontend.html"
if p.exists():
    t = p.read_text(encoding="utf-8", errors="replace")
    t = re.sub(r'<link[^>]*kill-pitch\.css[^>]*>\s*', '', t)
    t = re.sub(r'<script[^>]*login-tight\.js[^>]*></script>\s*', '', t)
    t = re.sub(r'<link[^>]*app-shell-fix\.css[^>]*>\s*', '', t)
    t = re.sub(r'<script[^>]*app-shell-fix\.js[^>]*></script>\s*', '', t)
    t = re.sub(r'<script[^>]*market-data\.js[^>]*></script>\s*', '', t)
    if "</head>" in t:
        t = t.replace("</head>", HEAD + "</head>", 1)
    else:
        t = HEAD + t
    if "</body>" in t:
        t = t.replace("</body>", TAIL + "</body>", 1)
    else:
        t += TAIL
    p.write_text(t, encoding="utf-8")
    print("injected v69 frontend")

print("boot starting — login at / ")
runpy.run_path(str(root / "server.py"), run_name="__main__")
