#!/usr/bin/env python3
from pathlib import Path
import os
os.environ["RESET_CUSTOMERS"] = "0"
p = Path(__file__).resolve().parent / "server.py"
t = p.read_text(encoding="utf-8", errors="replace")
changed = False
if "def wipe_customer_accounts" in t and "NEVER WIPE MEMBERS" not in t:
    t = t.replace(
        "def wipe_customer_accounts():",
        "def wipe_customer_accounts():\n    print('[boot] wipe disabled \u2014 members kept')\n    return\n    # NEVER WIPE MEMBERS",
        1,
    )
    changed = True
if 'os.environ.get("RESET_CUSTOMERS")' in t:
    t = t.replace('os.environ.get("RESET_CUSTOMERS") or "").strip() == "1"', 'os.environ.get("RESET_CUSTOMERS") or "").strip() == "NEVER"')
    changed = True
if changed:
    p.write_text(t, encoding="utf-8")
    print("patched wipe off")
else:
    print("wipe patch skipped")
