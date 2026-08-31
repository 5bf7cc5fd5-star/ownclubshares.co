(function(){
var pick="All";
if(!document.getElementById("ocLgCss")){
  var s=document.createElement("style"); s.id="ocLgCss";
  s.textContent=".lg-bar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}.lg-tab{border:1px solid rgba(212,175,55,.35);background:#121820;color:#c4b07a;border-radius:999px;padding:6px 10px;font-size:11px;font-weight:700}.lg-tab.on{background:#d4af37;color:#111;border-color:#d4af37}";
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
function filtered(){
  return (window.CLUBS||[]).filter(function(c){ return pick==="All"||c.l===pick; });
}
function hideUnpicked(root){
  if(!root) return;
  var clubs=root.querySelectorAll(".ccard, button.club");
  clubs.forEach(function(el){
    var name=(el.getAttribute("data-club")||"");
    if(!name){
      var b=el.querySelector("b"); name=b?b.textContent:"";
    }
    var club=(window.CLUBS||[]).filter(function(c){return c.n===name;})[0];
    var show=!club||pick==="All"||club.l===pick;
    el.style.display=show?"":"none";
  });
  root.querySelectorAll(".league-h").forEach(function(h){
    h.style.display=(pick==="All"||h.textContent===pick)?"":"none";
  });
}
function mount(box){
  if(!box) return;
  var bar=box.parentNode && box.parentNode.querySelector(".lg-bar");
  if(!bar){
    var wrap=document.createElement("div");
    wrap.innerHTML=tabs();
    bar=wrap.firstChild;
    box.parentNode.insertBefore(bar, box);
  } else {
    bar.outerHTML=tabs();
    bar=box.parentNode.querySelector(".lg-bar");
  }
  hideUnpicked(box);
}
function bind(){
  mount(document.getElementById("holdList"));
  mount(document.getElementById("marketList"));
  mount(document.getElementById("watchlist"));
}
document.addEventListener("click",function(e){
  var t=e.target.closest(".lg-tab");
  if(!t) return;
  pick=t.getAttribute("data-lg")||"All";
  bind();
},true);
var _g=window.go;
window.go=function(id){
  if(typeof _g==="function") _g(id);
  setTimeout(bind,40);
  setTimeout(bind,200);
};
setTimeout(bind,400);
})();
