(function(){
var PACKS=[{p:35000,d:7,w:5000,t:35000},{p:70000,d:14,w:7500,t:105000},{p:105000,d:21,w:10000,t:210000},{p:140000,d:28,w:12500,t:350000}];
var BADGE={
"Arsenal":"https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
"Man City":"https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
"Liverpool":"https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
"Chelsea":"https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
"Manchester United":"https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
"Tottenham Hotspur":"https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
"Tottenham":"https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
"Real Madrid":"https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
"FC Barcelona":"https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
"Barcelona":"https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
"Al Hilal":"https://a.espncdn.com/i/teamlogos/soccer/500/929.png",
"Al Nassr":"https://a.espncdn.com/i/teamlogos/soccer/500/2509.png",
"Al Ahli":"https://a.espncdn.com/i/teamlogos/soccer/500/983.png",
"LA Galaxy":"https://a.espncdn.com/i/teamlogos/soccer/500/187.png",
"Atlanta United":"https://a.espncdn.com/i/teamlogos/soccer/500/202.png",
"Bayern Munich":"https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
"Paris Saint-Germain":"https://a.espncdn.com/i/teamlogos/soccer/500/160.png"
};
if(!document.getElementById("ocShareCss")){
  var s=document.createElement("style");s.id="ocShareCss";
  s.textContent=".ccard{background:#0b1220;border:1px solid rgba(212,175,55,.28);border-radius:14px;padding:12px;margin:10px 0}.chead{display:flex;align-items:center;gap:10px;margin-bottom:10px}.cbadge{width:42px;height:42px;border-radius:50%;object-fit:contain;background:#071018;border:1px solid rgba(212,175,55,.25);padding:3px}.chead b{font-size:15px}.ptable{width:100%;border-collapse:collapse;font-size:12px}.ptable th{color:#c4b07a;font-weight:600;text-align:left;padding:6px 4px;border-bottom:1px solid rgba(212,175,55,.2)}.ptable td{padding:7px 4px;border-bottom:1px solid rgba(255,255,255,.06);color:#f4f1ea}.ptable .day{color:#3dcc8a;font-weight:700}.pk{width:100%;height:28px;border:0;border-radius:8px;background:#d4af37;color:#111;font-weight:800;font-size:11px}.dash{border:1px solid #d4af37;border-radius:18px;padding:16px 14px;margin-bottom:14px;background:#0d0c08}.dash-hi{color:#e6c56a;font-size:13px}.dash-title{color:#f0d060;font-size:20px;font-weight:800;margin:4px 0 14px}.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.dcell{border:1px solid #d4af37;border-radius:14px;padding:12px 10px}.dcell span{display:block;color:#c4b07a;font-size:12px;margin-bottom:8px}.dcell b{font-size:18px;color:#f6e27a}.dcell b.earn{color:#3dcc8a}.dcell b.bal{color:#f0a030}.club img.cbadge{width:24px;height:24px;margin-right:8px;vertical-align:middle}";
  document.head.appendChild(s);
}
function money(n){return Number(n||0).toLocaleString();}
function badge(name){var src=BADGE[name]||("https://ui-avatars.com/api/?name="+encodeURIComponent(name)+"&background=0B1E33&color=F0D060&size=64&bold=true");return '<img class="cbadge" src="'+src+'" alt="'+name+' badge" onerror="this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/64px-Soccerball.svg.png\'">';}
function paint(){
  var box=document.getElementById("holdList"); if(!box) return;
  var clubs=window.CLUBS||[]; if(!clubs.length) return;
  box.innerHTML=clubs.map(function(c){
    var rows=PACKS.map(function(pk){
      return '<tr><td>UGX '+money(pk.p)+'</td><td>'+pk.d+' days</td><td class="day">'+money(pk.w)+'</td><td>'+money(pk.t)+'</td><td><button type="button" class="pk" data-club="'+c.n+'" data-p="'+pk.p+'" data-d="'+pk.d+'" data-w="'+pk.w+'">Buy</button></td></tr>';
    }).join("");
    return '<div class="ccard"><div class="chead">'+badge(c.n)+'<div><b>'+c.n+'</b><div style="color:#8aa;font-size:11px">'+(c.l||"")+'</div></div></div>'+
      '<table class="ptable"><thead><tr><th>Price</th><th>Cycle</th><th>Daily</th><th>After lock</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }).join("");
}
function markRows(id){
  var box=document.getElementById(id); if(!box) return;
  box.querySelectorAll(".club").forEach(function(btn){
    if(btn.querySelector(".cbadge")) return;
    var b=btn.querySelector("b"); if(!b) return;
    var name=b.textContent.trim();
    var span=btn.querySelector("span");
    if(span) span.insertAdjacentHTML("afterbegin", badge(name));
  });
}
function paintHome(){
  var pad=document.querySelector("#home .pad"); if(!pad) return;
  var dash=document.getElementById("ocDash");
  if(!dash){dash=document.createElement("div");dash.id="ocDash";dash.className="dash";pad.insertBefore(dash,pad.firstChild);}
  function fill(a,inv,earn,bal){dash.innerHTML='<div class="dash-hi">Welcome back</div><div class="dash-title">Ownclub Share Dashboard</div><div class="dash-grid"><div class="dcell"><span>Active Shares</span><b>'+a+'</b></div><div class="dcell"><span>Total Invested</span><b>UGX '+money(inv)+'</b></div><div class="dcell"><span>Projected Earnings</span><b class="earn">UGX '+money(earn)+'</b></div><div class="dcell"><span>Available Balance</span><b class="bal">UGX '+money(bal)+'</b></div></div>';}
  var shown=((document.getElementById("homeBal")||{}).textContent||"0").replace(/[^0-9.]/g,"")||0;
  fill(0,0,0,shown);
  var lab=pad.querySelector("div"); if(lab&&/WALLET/i.test(lab.textContent||"")) lab.style.display="none";
  var hb=document.getElementById("homeBal"); if(hb) hb.style.display="none";
  fetch("/api/me",{headers:H()}).then(function(r){return r.json();}).then(function(j){var u=j.user||j||{};var ms=u.machines||[];var inv=0,earn=0;ms.forEach(function(m){inv+=Number(m.price||m.amount||0);earn+=Number(m.daily||0)*Number(m.days||7);});fill(ms.length,inv,earn,u.balance||shown);}).catch(function(){});
  markRows("watchlist");
}
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
document.addEventListener("click",function(e){
  var buy=e.target.closest("#holdList .pk");
  if(!buy) return;
  e.preventDefault(); e.stopPropagation();
  fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({name:buy.getAttribute("data-club"),price:+buy.getAttribute("data-p"),days:+buy.getAttribute("data-d"),daily:+buy.getAttribute("data-w"),weeks:Math.round(+buy.getAttribute("data-d")/7)})})
    .then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Pack locked for "+buy.getAttribute("data-club"));}).catch(function(){alert("Pack selected.");});
},true);
var _go=window.go;
window.go=function(id){
  if(typeof _go==="function") _go(id);
  if(id==="shares") setTimeout(paint,20);
  if(id==="home") setTimeout(paintHome,20);
  if(id==="market") setTimeout(function(){markRows("marketList");},30);
};
})();
