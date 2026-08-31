(function(){
var PACKS=[{p:35000,d:7,w:5000,t:35000},{p:70000,d:14,w:7500,t:105000},{p:105000,d:21,w:10000,t:210000},{p:140000,d:28,w:12500,t:350000}];
if(!document.getElementById("ocShareCss")){
  var s=document.createElement("style");s.id="ocShareCss";
  s.textContent=".pcard{display:flex;gap:12px;align-items:stretch;background:#0b1220;border:1px solid #1c3a66;border-radius:14px;padding:10px;margin:8px 0}.pball-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;width:86px;flex-shrink:0}.pball{width:72px;height:96px;border-radius:14px;background:linear-gradient(180deg,#0a1a33,#06101f);border:1px solid #1e4b8a;display:flex;align-items:center;justify-content:center;font-size:36px}.pmeta{flex:1;min-width:0}.pmeta h4{margin:0 0 8px;color:#4db3ff;font-size:15px}.prow{display:flex;justify-content:space-between;font-size:13px;margin:3px 0;color:#c9d4e0}.prow b{color:#fff}.prow .day{color:#3dcc8a}.pbuy{margin-top:8px;height:34px;border:0;border-radius:8px;background:#d4af37;color:#111;font-weight:800;width:100%}";
  document.head.appendChild(s);
}
function money(n){return "UGX "+Number(n).toLocaleString();}
function paint(){
  var box=document.getElementById("holdList"); if(!box) return;
  var clubs=(window.CLUBS||[]);
  if(!clubs.length) return;
  box.innerHTML=clubs.map(function(c){
    return PACKS.map(function(pk){
      return '<div class="pcard" data-club="'+c.n+'" data-p="'+pk.p+'" data-d="'+pk.d+'" data-w="'+pk.w+'">'+ 
        '<div class="pball-wrap"><div class="pball">⚽</div></div>'+
        '<div class="pmeta"><h4>'+c.n+' · '+pk.d+' day lock</h4>'+
        '<div class="prow"><span>Price</span><b>'+money(pk.p)+'</b></div>'+
        '<div class="prow"><span>Daily projected</span><b class="day">'+money(pk.w)+'</b></div>'+
        '<div class="prow"><span>Cycle</span><b>'+pk.d+' days</b></div>'+
        '<div class="prow"><span>Total projected</span><b>'+money(pk.t)+'</b></div>'+
        '<button type="button" class="pbuy">Purchase</button></div></div>';
    }).join("");
  }).join("");
}
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
document.addEventListener("click",function(e){
  var buy=e.target.closest("#holdList .pbuy");
  if(buy){
    e.preventDefault(); e.stopPropagation();
    var card=buy.closest(".pcard");
    fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({name:card.getAttribute("data-club"),price:+card.getAttribute("data-p"),days:+card.getAttribute("data-d"),daily:+card.getAttribute("data-w"),weeks:Math.round(+card.getAttribute("data-d")/7)})})
      .then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Share locked. Daily withdrawal starts on this pack.");}).catch(function(){alert("Share pack selected.");});
    return;
  }
  var old=e.target.closest("#holdList .btn, #holdList .buy-club");
  if(old){ e.preventDefault(); e.stopPropagation(); }
},true);
var _go=window.go;
window.go=function(id){
  if(typeof _go==="function") _go(id);
  if(id==="shares") setTimeout(paint,20);
};
})();
