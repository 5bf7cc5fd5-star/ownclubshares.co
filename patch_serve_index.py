from pathlib import Path
p = Path(__file__).resolve().parent / "server.py"
t = p.read_text(encoding="utf-8", errors="replace")
old = 'if path in ("/", "/index.html", "/app"):\n            return self._serve_file("frontend.html", "text/html")'
new = '''if path in ("/", "/index.html"):\n            return self._serve_file("index.html", "text/html")\n        if path in ("/app", "/home", "/frontend.html"):\n            return self._serve_file("frontend.html", "text/html")'''
if old in t:
    t = t.replace(old, new, 1)
    p.write_text(t, encoding="utf-8")
    print("patched / to index.html")
else:
    print("serve pattern not found or already patched")
