(function(){
var PACKS=[{p:35000,d:7,w:5000,t:35000},{p:70000,d:14,w:7500,t:105000},{p:105000,d:21,w:10000,t:210000},{p:140000,d:28,w:12500,t:350000}];
var BALL='<svg class="fball" viewBox="0 0 64 64" width="54" height="54" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#f4f4f4" stroke="#111" stroke-width="2"/><path fill="#111" d="M32 18l8 6-3 10h-10l-3-10z"/><path fill="none" stroke="#111" stroke-width="2" d="M32 18L22 12M32 18L42 12M21 34L12 28M43 34L52 28M29 44L20 52M35 44L44 52"/></svg>';
if(!document.getElementById("ocShareCss")){
  var s=document.createElement("style");s.id="ocShareCss";
  s.textContent=".pcard{background:#0b1220;border:1px solid #1c3a66;border-radius:14px;padding:12px 12px 10px;margin:10px 0}.pcard-top{display:flex;justify-content:center;margin-bottom:8px}.fball{display:block;filter:drop-shadow(0 2px 6px rgba(0,0,0,.45))}.pmeta h4{margin:0 0 8px;color:#4db3ff;font-size:15px;text-align:center}.prow{display:flex;justify-content:space-between;font-size:13px;margin:3px 0;color:#c9d4e0}.prow b{color:#fff}.prow .day{color:#3dcc8a}.pbuy{margin-top:8px;height:34px;border:0;border-radius:8px;background:#d4af37;color:#111;font-weight:800;width:100%}.club .fball{width:22px;height:22px;margin-right:8px;flex-shrink:0}.club{align-items:center}";
  document.head.appendChild(s);
}
function money(n){return "UGX "+Number(n).toLocaleString();}
function paint(){
  var box=document.getElementById("holdList"); if(!box) return;
  var clubs=window.CLUBS||[]; if(!clubs.length) return;
  box.innerHTML=clubs.map(function(c){
    return PACKS.map(function(pk){
      return '<div class="pcard" data-club="'+c.n+'" data-p="'+pk.p+'" data-d="'+pk.d+'" data-w="'+pk.w+'">'+ 
        '<div class="pcard-top">'+BALL+'</div>'+
        '<div class="pmeta"><h4>'+c.n+' · '+pk.d+' day lock</h4>'+
        '<div class="prow"><span>Price</span><b>'+money(pk.p)+'</b></div>'+
        '<div class="prow"><span>Daily projected</span><b class="day">'+money(pk.w)+'</b></div>'+
        '<div class="prow"><span>Cycle</span><b>'+pk.d+' days</b></div>'+
        '<div class="prow"><span>Total projected</span><b>'+money(pk.t)+'</b></div>'+
        '<button type="button" class="pbuy">Purchase</button></div></div>';
    }).join("");
  }).join("");
}
function markRows(id){
  var box=document.getElementById(id); if(!box) return;
  box.querySelectorAll(".club").forEach(function(btn){
    if(btn.querySelector(".fball")) return;
    var span=btn.querySelector("span");
    if(span) span.insertAdjacentHTML("afterbegin", BALL.replace('width="54" height="54"','width="22" height="22"'));
  });
}
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
document.addEventListener("click",function(e){
  var buy=e.target.closest("#holdList .pbuy");
  if(buy){
    e.preventDefault(); e.stopPropagation();
    var card=buy.closest(".pcard");
    fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({name:card.getAttribute("data-club"),price:+card.getAttribute("data-p"),days:+card.getAttribute("data-d"),daily:+card.getAttribute("data-w"),weeks:Math.round(+card.getAttribute("data-d")/7)})})
      .then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Share locked.");}).catch(function(){alert("Share pack selected.");});
  }
},true);
var _go=window.go;
window.go=function(id){
  if(typeof _go==="function") _go(id);
  if(id==="shares") setTimeout(paint,20);
  if(id==="home") setTimeout(function(){markRows("watchlist");},30);
  if(id==="market") setTimeout(function(){markRows("marketList");},30);
};
})();
