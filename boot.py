#!/usr/bin/env python3
from pathlib import Path
import runpy, subprocess, sys, base64, json

root = Path(__file__).resolve().parent
(root / "static").mkdir(exist_ok=True)
(root / "data").mkdir(exist_ok=True)

def run(script):
    p = root / script
    if p.exists():
        try:
            subprocess.check_call([sys.executable, str(p)], cwd=str(root))
            print("ran", script)
        except Exception as e:
            print(script, "failed", e)

for script in ("patch_embed_logo.py", "patch_lock_logo.py", "patch_serve_index.py", "patch_badges.py", "patch_login_guard.py", "patch_credit_pool.py", "inject_ops.py", "fix_admin_phone.py", "patch_phones.py", "migrate.py"):
    run(script)

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

bp = root / "static" / "logo.b64"
if not bp.exists() and (root / "logo.b64").exists():
    bp.write_text((root / "logo.b64").read_text())
if bp.exists():
    try:
        data = base64.b64decode("".join(bp.read_text().split()))
        (root / "own-club-logo.jpg").write_bytes(data)
        (root / "static" / "own-club-logo.jpg").write_bytes(data)
        print("logo files written", len(data))
    except Exception as e:
        print("logo decode", e)

try:
    import persist; persist.init()
except Exception as e:
    print("persist init", e)

print("boot starting")
runpy.run_path(str(root / "server.py"), run_name="__main__")
