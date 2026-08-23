from pathlib import Path
p = Path(__file__).resolve().parent / "frontend.html"
if not p.exists():
    raise SystemExit(0)
t = p.read_text(encoding="utf-8", errors="replace")
old = "function clubBtn(c){var s=st[c.id],up=s.chg>=0;return '<button class=\"club\" type=\"button\" data-id=\"'+c.id+'\"><span class=\"badge\">'+c.code+'</span>"
new = "function clubBtn(c){var s=st[c.id],up=s.chg>=0,cr=(window.OC_CRESTS&&OC_CRESTS[c.code])||'';return '<button class=\"club\" type=\"button\" data-id=\"'+c.id+'\"><span class=\"badge\">'+(cr?'<img src=\"'+cr+'\" alt=\"'+c.code+'\">':c.code)+'</span>"
if old in t:
    t = t.replace(old, new, 1)
css_old = ".badge{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-weight:700;font-size:11px;background:var(--elev);color:var(--gold);border:1px solid var(--line);flex-shrink:0}"
css_new = ".badge{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-weight:700;font-size:11px;background:#fff;color:var(--gold);border:1px solid var(--line);flex-shrink:0;overflow:hidden}.badge img{width:32px;height:32px;object-fit:contain}"
t = t.replace(css_old, css_new, 1)
if "club-crests.js" not in t:
    t = t.replace("<script>(function(){", "<script src=\"/static/club-crests.js?v=1\"></script><script>(function(){", 1)
    t = t.replace("<script>\n(function(){", "<script src=\"/static/club-crests.js?v=1\"></script>\n<script>\n(function(){", 1)
p.write_text(t, encoding="utf-8")
print("badges patched", "OC_CRESTS" in t or "club-crests.js" in t)
