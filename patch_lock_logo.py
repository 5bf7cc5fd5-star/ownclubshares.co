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
        "var s=(img.getAttribute(\"src\")||\"\")+(img.getAttribute(\"alt\")||\"\");"
        "var hit=img.getAttribute(\"data-oc-logo\")===\"1\"||/own-club-logo|Own Club Share/i.test(s);"
        "if(!hit && img.parentElement && /logo-container|hero|top/.test(img.parentElement.className||\"\")) hit=true;"
        "if(hit){img.setAttribute(\"data-oc-logo\",\"1\");if(img.src!==L)img.src=L;img.onerror=function(){this.onerror=null;this.src=L;}}"
        "});}"
        "if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",lock);"
        "else lock();setTimeout(lock,20);setTimeout(lock,200);"
        "try{new MutationObserver(lock).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}"
        "})();\n"
    )
    (static / "oc-logo.js").write_text(js, encoding="utf-8")
    print("oc-logo.js written", len(js))
tag = '<script src="/static/oc-logo.js?v=lock2"></script>'
for name in ("frontend.html", "index.html", "admin.html"):
    p = root / name
    if not p.exists():
        continue
    t = p.read_text(encoding="utf-8", errors="replace")
    t2 = t
    if "oc-logo.js" not in t2:
        if "</body>" in t2:
            t2 = t2.replace("</body>", tag + "\n</body>", 1)
        else:
            t2 += "\n" + tag
    if t2 != t:
        p.write_text(t2, encoding="utf-8")
        print("injected lock script", name)
print("logo lock ready")
