from pathlib import Path
import re
p = Path(__file__).resolve().parent / "server.py"
t = p.read_text(encoding="utf-8", errors="replace")
changed = False
patterns = [
    'if path in ("/", "/index.html", "/app"):\n            return self._serve_file("frontend.html", "text/html")',
    'if path in ("/", "/index.html", "/app"):\n            return self._serve_file("index.html", "text/html")',
]
new = 'if path in ("/", "/index.html"):\n            return self._serve_file("index.html", "text/html")\n        if path in ("/app", "/home", "/frontend.html"):\n            return self._serve_file("frontend.html", "text/html")'
for old in patterns:
    if old in t:
        t = t.replace(old, new, 1)
        changed = True
        break
if 'return self._serve_file("frontend.html", "text/html")' in t and 'path in ("/", "/index.html")' not in t:
    t = t.replace(
        'return self._serve_file("frontend.html", "text/html")',
        'return self._serve_file("index.html" if path in ("/", "/index.html") else "frontend.html", "text/html")',
        1,
    )
    changed = True
p.write_text(t, encoding="utf-8")
print("serve patch", changed)
