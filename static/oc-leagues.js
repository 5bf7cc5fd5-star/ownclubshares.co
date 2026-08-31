(function(){
var pick="All";
if(!document.getElementById("ocLgCss")){
  var s=document.createElement("style"); s.id="ocLgCss";
  s.textContent=".lg-bar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}.lg-tab{border:1px solid rgba(212,175,55,.35);background:#121820;color:#c4b07a;border-radius:999px;padding:6px 10px;font-size:11px;font-weight:700}.lg-tab.on{background:#d4af37;color:#111;border-color:#d4af37}#home .lg-bar{display:none!important}";
  document.head.appendChild(s);
}
function list(){
  var out=["All"], seen={};
  (window.CLUBS||[]).forEach(function(c){ if(c.l&&!seen[c.l]){seen[c.l]=1; out.push(c.l);} });
  return out;
}
function tabs(){
  return '<div class="lg-bar">'+list().map(function(l){
    return '<button type="button" class="lg-tab'+(l===pick?" on":"")+'" data-lg="'+l+'">'+l+'</button>';
  }).join("")+'</div>';
}
function hideUnpicked(root){
  if(!root) return;
  root.querySelectorAll(".ccard, button.club").forEach(function(el){
    var name=el.getAttribute("data-club")||((el.querySelector("b")||{}).textContent||"");
    var club=(window.CLUBS||[]).filter(function(c){return c.n===name;})[0];
    el.style.display=(!club||pick==="All"||club.l===pick)?"":"none";
  });
  root.querySelectorAll(".league-h").forEach(function(h){
    h.style.display=(pick==="All"||h.textContent===pick)?"":"none";
  });
}
function mount(box){
  if(!box) return;
  if(box.id==="watchlist" || (box.closest && box.closest("#home"))) return;
  var parent=box.parentNode; if(!parent) return;
  var bar=parent.querySelector(":scope > .lg-bar");
  if(!bar){
    var wrap=document.createElement("div"); wrap.innerHTML=tabs(); bar=wrap.firstChild;
    parent.insertBefore(bar, box);
  } else bar.outerHTML=tabs();
  hideUnpicked(box);
}
function bind(){
  document.querySelectorAll("#home .lg-bar").forEach(function(b){b.remove();});
  mount(document.getElementById("holdList"));
  mount(document.getElementById("marketList"));
}
document.addEventListener("click",function(e){
  var t=e.target.closest(".lg-tab"); if(!t) return;
  pick=t.getAttribute("data-lg")||"All"; bind();
},true);
var _g=window.go;
window.go=function(id){
  if(typeof _g==="function") _g(id);
  setTimeout(bind,50);
  setTimeout(bind,220);
};
})();
