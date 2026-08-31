(function(){
var PACKS=[{p:35000,d:7,w:5000,t:35000},{p:70000,d:14,w:7500,t:105000},{p:105000,d:21,w:10000,t:210000},{p:140000,d:28,w:12500,t:350000}];
var BALL='<svg class="fball" viewBox="0 0 64 64" width="54" height="54" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#f4f4f4" stroke="#111" stroke-width="2"/><path fill="#111" d="M32 18l8 6-3 10h-10l-3-10z"/><path fill="none" stroke="#111" stroke-width="2" d="M32 18L22 12M32 18L42 12M21 34L12 28M43 34L52 28M29 44L20 52M35 44L44 52"/></svg>';
if(!document.getElementById("ocShareCss")){
  var s=document.createElement("style");s.id="ocShareCss";
  s.textContent=".pcard{background:#0b1220;border:1px solid #1c3a66;border-radius:14px;padding:12px 12px 10px;margin:10px 0}.pcard-top{display:flex;justify-content:center;margin-bottom:8px}.fball{display:block;filter:drop-shadow(0 2px 6px rgba(0,0,0,.45))}.pmeta h4{margin:0 0 8px;color:#4db3ff;font-size:15px;text-align:center}.prow{display:flex;justify-content:space-between;font-size:13px;margin:3px 0;color:#c9d4e0}.prow b{color:#fff}.prow .day{color:#3dcc8a}.pbuy{margin-top:8px;height:34px;border:0;border-radius:8px;background:#d4af37;color:#111;font-weight:800;width:100%}.club .fball{width:22px;height:22px;margin-right:8px;flex-shrink:0}.club{align-items:center}.dash{border:1px solid #d4af37;border-radius:18px;padding:16px 14px 14px;margin-bottom:14px;background:linear-gradient(180deg,#16120a,#0b0c10)}.dash-hi{color:#e6c56a;font-size:13px}.dash-title{color:#f0d060;font-size:22px;font-weight:800;margin:4px 0 14px;text-shadow:0 0 12px rgba(212,175,55,.35)}.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.dcell{border:1px solid #d4af37;border-radius:14px;padding:12px 10px;background:#0d0c08}.dcell span{display:block;color:#c4b07a;font-size:12px;margin-bottom:8px}.dcell b{font-size:20px;color:#f6e27a}.dcell b.earn{color:#3dcc8a}.dcell b.bal{color:#f0a030}";
  document.head.appendChild(s);
}
function money(n){return "UGX "+Number(n||0).toLocaleString();}
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
function paintHome(){
  var pad=document.querySelector("#home .pad"); if(!pad) return;
  var dash=document.getElementById("ocDash");
  if(!dash){
    dash=document.createElement("div"); dash.id="ocDash"; dash.className="dash";
    pad.insertBefore(dash, pad.firstChild);
    var lab=pad.querySelector("div");
    if(lab && /WALLET/i.test(lab.textContent||"")) lab.style.display="none";
    var hb=document.getElementById("homeBal"); if(hb) hb.style.display="none";
  }
  function fill(a,inv,earn,bal){
    dash.innerHTML='<div class="dash-hi">Welcome back</div><div class="dash-title">Ownclub Share Dashboard</div><div class="dash-grid">'+ 
      '<div class="dcell"><span>Active Shares</span><b>'+a+'</b></div>'+
      '<div class="dcell"><span>Total Invested</span><b>'+money(inv)+'</b></div>'+
      '<div class="dcell"><span>Projected Earnings</span><b class="earn">'+money(earn)+'</b></div>'+
      '<div class="dcell"><span>Available Balance</span><b class="bal">'+money(bal)+'</b></div></div>';
  }
  var shown=((document.getElementById("homeBal")||{}).textContent||"0").replace(/[^0-9.]/g,"")||0;
  fill(0,0,0,shown);
  var h={"Content-Type":"application/json"}; try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}
  fetch("/api/me",{headers:h}).then(function(r){return r.json();}).then(function(j){
    var u=j.user||j||{};
    var ms=u.machines||u.shares||[];
    var inv=0,earn=0;
    ms.forEach(function(m){inv+=Number(m.price||m.amount||0);earn+=Number(m.daily||m.dailyWithdraw||0)*(Number(m.days||m.lock_days||7));});
    fill(ms.length,inv,earn,u.balance||shown);
  }).catch(function(){});
  markRows("watchlist");
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
  if(id==="home") setTimeout(paintHome,20);
  if(id==="market") setTimeout(function(){markRows("marketList");},30);
};
})();
