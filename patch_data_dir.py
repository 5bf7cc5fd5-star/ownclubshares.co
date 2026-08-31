#!/usr/bin/env python3
from pathlib import Path
import os
p = Path(__file__).resolve().parent / "server.py"
t = p.read_text(encoding="utf-8", errors="replace")
needle = 'DATA_DIR = Path(__file__).parent / "data"'
repl = 'DATA_DIR = Path(os.environ.get("OC_DATA_DIR") or os.environ.get("DATA_DIR") or (Path(__file__).parent / "data"))'
if needle in t:
    t = t.replace(needle, repl, 1)
if "USERS_FILE =" not in t:
    t = t.replace(
        repl,
        repl + '\nUSERS_FILE = DATA_DIR / "users.json"\nWITHDRAWALS_FILE = DATA_DIR / "withdrawals.json"',
        1,
    )
# atomic save
old = '''def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)'''
new = '''def save_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    try:
        if path.exists() and path.stat().st_size > 2:
            bak = path.with_suffix(path.suffix + ".bak")
            import shutil
            shutil.copy2(path, bak)
    except Exception:
        pass
    tmp.replace(path)'''
if old in t:
    t = t.replace(old, new, 1)
p.write_text(t, encoding="utf-8")
print("data dir patched")
