from pathlib import Path
import base64
root = Path(__file__).resolve().parent
static = root / "static"
static.mkdir(exist_ok=True)
bp = static / "logo.b64"
if not bp.exists():
    alt = root / "logo.b64"
    if alt.exists():
        bp.write_text(alt.read_text())
if bp.exists():
    raw = base64.b64decode(bp.read_text().strip())
    (static / "own-club-logo.jpg").write_bytes(raw)
    (root / "own-club-logo.jpg").write_bytes(raw)
    b64 = bp.read_text().strip()
    js = (
        "(function(){var L=\"data:image/jpeg;base64," + b64 + "\";"
        "window.OC_LOGO=L;function lock(){"
        "document.querySelectorAll(\"img\").forEach(function(img){"
        "var s=(img.getAttribute(\"src\")||\"\");"
        "if(s.indexOf(\"own-club-logo\")>=0||img.getAttribute(\"data-oc-logo\")===\"1\"){"
        "img.setAttribute(\"data-oc-logo\",\"1\");img.src=L;"
        "img.onerror=function(){this.onerror=null;this.src=L;};}});} "
        "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",lock);"
        "else lock();setTimeout(lock,40);setTimeout(lock,300);})();"
    )
    (static / "oc-logo.js").write_text(js, encoding="utf-8")
for name in ("frontend.html", "index.html"):
    p = root / name
    if not p.exists():
        continue
    t = p.read_text(encoding="utf-8", errors="replace")
    if "oc-logo.js" not in t:
        t = t.replace("</body>", '<script src="/static/oc-logo.js?v=lock1"></script></body>', 1)
        p.write_text(t, encoding="utf-8")
print("logo lock ready")
