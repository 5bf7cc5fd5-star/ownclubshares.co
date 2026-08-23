#!/usr/bin/env python3
from pathlib import Path
import base64
root = Path(__file__).resolve().parent
bp = root / "static" / "logo.b64"
if not bp.exists():
    print("no logo.b64")
    raise SystemExit(0)
b64 = "".join(bp.read_text().split())
raw = base64.b64decode(b64)
(root / "static").mkdir(exist_ok=True)
(root / "static" / "own-club-logo.jpg").write_bytes(raw)
(root / "own-club-logo.jpg").write_bytes(raw)
uri = "data:image/jpeg;base64," + b64
p = root / "frontend.html"
if p.exists():
    t = p.read_text(encoding="utf-8", errors="replace")
    t = t.replace("/static/own-club-logo.jpg", uri)
    if uri not in t:
        t = t.replace("own-club-logo.jpg", uri)
    p.write_text(t, encoding="utf-8")
    print("logo locked", t.count("data:image/jpeg"))
else:
    print("no frontend.html")
