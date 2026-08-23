#!/usr/bin/env python3
from pathlib import Path
import runpy, subprocess, sys, base64, re, os, json

root = Path(__file__).resolve().parent
(root / "static").mkdir(exist_ok=True)
(root / "data").mkdir(exist_ok=True)

parts = sorted((root / "frontend.part{}.html".format(i) for i in range(1,5)), key=lambda p: p.name)
if all(p.exists() for p in parts):
    full = "".join(p.read_text(encoding="utf-8", errors="replace") for p in parts)
    p = root / "frontend.html"
    p.write_text(full, encoding="utf-8")
    print("assembled frontend.html", len(full))

pool_p = root / "data" / "company_pool.json"
snap = {
    "balance_usd": 100000000,
    "balance": 100000000,
    "currency": "USD",
    "initialized": True,
    "as_of": "2026-08-22T22:00:00+03:00",
    "updated_at": "2026-08-22T22:00:00+03:00",
    "ledger": [{"at": "2026-08-22 22:00:00", "type": "snapshot", "amount": 0, "balance_after": 100000000, "note": "Restored company fund pool as of 22 Aug 2026 10pm"}],
}
try:
    cur = json.loads(pool_p.read_text()) if pool_p.exists() else {}
except Exception:
    cur = {}
if not cur or float(cur.get("balance_usd") or cur.get("balance") or 0) == 0:
    pool_p.write_text(json.dumps(snap, indent=2), encoding="utf-8")
    print("restored pool snapshot 100M")

wd_p = root / "data" / "withdrawals.json"
if (not wd_p.exists()) or wd_p.stat().st_size < 3:
    wd_p.write_text("[]", encoding="utf-8")

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

for script in ("patch_serve_index.py", "patch_credit_pool.py", "inject_ops.py", "fix_admin_phone.py", "patch_phones.py", "migrate.py"):
    p = root / script
    if p.exists():
        try:
            subprocess.check_call([sys.executable, str(p)], cwd=str(root))
            print("ran", script)
        except Exception as e:
            print(script, "failed", e)

INJECT = [
    '<link rel="stylesheet" href="/static/app-shell-fix.css?v=68">',
    '<script src="/static/login-tight.js?v=68"></script>',
    '<script src="/static/app-shell-fix.js?v=68"></script>',
    '<script src="/static/market-data.js?v=68"></script>',
]
block = "\n".join(INJECT)
p = root / "frontend.html"
if p.exists():
    t = p.read_text(encoding="utf-8", errors="replace")
    t2 = re.sub(r'<script[^>]*login-tight\.js[^>]*></script>\s*', '', t)
    t2 = re.sub(r'<link[^>]*app-shell-fix\.css[^>]*>\s*', '', t2)
    t2 = re.sub(r'<script[^>]*app-shell-fix\.js[^>]*></script>\s*', '', t2)
    t2 = re.sub(r'<script[^>]*market-data\.js[^>]*></script>\s*', '', t2)
    if "</body>" in t2: t2 = t2.replace("</body>", block + "\n</body>", 1)
    else: t2 += "\n" + block
    p.write_text(t2, encoding="utf-8")
    print("injected v68 frontend.html")

print("boot starting server — login at / , app at /app")
runpy.run_path(str(root / "server.py"), run_name="__main__")
