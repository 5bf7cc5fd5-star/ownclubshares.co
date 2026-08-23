#!/usr/bin/env python3
from pathlib import Path
import re
root = Path(__file__).resolve().parent
# Only strip pitch CSS from part1 <style> — never touch assembled frontend.html
p = root / "frontend.part1.html"
if not p.exists():
    print("no part1")
    raise SystemExit(0)
t = p.read_text(encoding="utf-8", errors="replace")
orig = t
for pat in (
    r"\.league-fx[^{]*\{[^}]*\}",
    r"\.league-fx[^\{]*\{[^}]*\}",
    r"\.auth-sport-fx[^{\n]*\{[^}]*\}",
    r"\.pitch-lines[^{\n]*\{[^}]*\}",
    r"\.pitch[^{\n]*\{[^}]*\}",
):
    t = re.sub(pat, "", t)
t = t.replace("#20e58b", "#d4af37")
if t != orig:
    p.write_text(t, encoding="utf-8")
    print("stripped pitch css from part1", len(orig)-len(t))
else:
    print("part1 pitch css already clean")
