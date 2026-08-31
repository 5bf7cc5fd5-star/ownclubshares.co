#!/usr/bin/env python3
from pathlib import Path
import os, runpy, subprocess, sys, base64, json

root = Path(__file__).resolve().parent
(root / "static").mkdir(exist_ok=True)
(root / "data").mkdir(exist_ok=True)
os.environ["RESET_CUSTOMERS"] = "0"

def run(script):
    p = root / script
    if p.exists():
        try:
            subprocess.check_call([sys.executable, str(p)], cwd=str(root))
            print("ran", script)
        except Exception as e:
            print(script, "failed", e)

try:
    import persist
    persist.init()
except Exception as e:
    print("persist init", e)

for script in ("patch_data_dir.py", "patch_never_wipe.py", "patch_embed_logo.py", "patch_lock_logo.py", "patch_serve_index.py", "patch_badges.py", "patch_login_guard.py", "patch_credit_pool.py", "inject_ops.py", "fix_admin_phone.py", "patch_phones.py", "migrate.py"):
    run(script)

pool_p = root / "data" / "company_pool.json"
snap = {"balance_usd": 100000000, "balance": 100000000, "currency": "USD", "initialized": True, "as_of": "2026-08-22T22:00:00+03:00", "updated_at": "2026-08-22T22:00:00+03:00", "ledger": [{"at": "2026-08-22 22:00:00", "type": "snapshot", "amount": 0, "balance_after": 100000000, "note": "Company pool 100,000,000 USD"}]}
try:
    cur = json.loads(pool_p.read_text()) if pool_p.exists() else {}
except Exception:
    cur = {}
if not isinstance(cur, dict):
    cur = {}
bal = float(cur.get("balance_usd") or cur.get("balance") or 0)
if not cur or bal == 0:
    pool_p.write_text(json.dumps(snap, indent=2), encoding="utf-8")
elif bal < 100000000 and not cur.get("ledger"):
    cur["balance_usd"] = 100000000
    cur["balance"] = 100000000
    pool_p.write_text(json.dumps(cur, indent=2), encoding="utf-8")

wd_p = root / "data" / "withdrawals.json"
if (not wd_p.exists()) or wd_p.stat().st_size < 3:
    wd_p.write_text("[]", encoding="utf-8")

print("boot starting")
runpy.run_path(str(root / "server.py"), run_name="__main__")
