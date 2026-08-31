(function(){
var PACKS=[{p:35000,d:7,w:5000,t:35000},{p:70000,d:14,w:7500,t:105000},{p:105000,d:21,w:10000,t:210000},{p:140000,d:28,w:12500,t:350000}];
function es(id){return "https://a.espncdn.com/i/teamlogos/soccer/500/"+id+".png";}
window.CLUBS=[
  {n:"Arsenal",l:"Premier League",v:4200,b:es(359)},
  {n:"Man City",l:"Premier League",v:4800,b:es(382)},
  {n:"Liverpool",l:"Premier League",v:5310,b:es(364)},
  {n:"Chelsea",l:"Premier League",v:3080,b:es(363)},
  {n:"Manchester United",l:"Premier League",v:6040,b:es(360)},
  {n:"Tottenham Hotspur",l:"Premier League",v:2840,b:es(367)},
  {n:"Real Madrid",l:"La Liga",v:6000,b:es(86)},
  {n:"FC Barcelona",l:"La Liga",v:5030,b:es(83)},
  {n:"Atletico Madrid",l:"La Liga",v:2800,b:es(1068)},
  {n:"Juventus",l:"Serie A",v:2500,b:es(111)},
  {n:"Inter Milan",l:"Serie A",v:2400,b:es(110)},
  {n:"AC Milan",l:"Serie A",v:2200,b:es(103)},
  {n:"Bayern Munich",l:"Bundesliga",v:4840,b:es(132)},
  {n:"Borussia Dortmund",l:"Bundesliga",v:2100,b:es(124)},
  {n:"Paris Saint-Germain",l:"Ligue 1",v:4140,b:es(160)},
  {n:"Ajax",l:"Eredivisie",v:980,b:es(139)},
  {n:"Celtic",l:"Scottish Premiership",v:420,b:es(256)},
  {n:"Rangers",l:"Scottish Premiership",v:380,b:es(257)},
  {n:"Al Hilal",l:"Saudi Pro League",v:914,b:es(929)},
  {n:"Al Nassr",l:"Saudi Pro League",v:790,b:es(2509)},
  {n:"Al Ahli",l:"Saudi Pro League",v:720,b:es(8346)},
  {n:"LA Galaxy",l:"MLS",v:888,b:es(187)},
  {n:"Atlanta United",l:"MLS",v:850,b:es(202)},
  {n:"Al Ahly",l:"Egyptian Premier League",v:310,b:es(832)},
  {n:"Mamelodi Sundowns",l:"South African PSL",v:180,b:es(845)},
  {n:"AS FAR",l:"Botola Pro",v:95,b:es(8353)},
  {n:"Esperance",l:"Tunisian Ligue 1",v:140,b:es(1024)}
];
if(!document.getElementById("ocShareCss")){
  var s=document.createElement("style");s.id="ocShareCss";
  s.textContent=".ccard{background:#0b1220;border:1px solid rgba(212,175,55,.28);border-radius:14px;padding:12px;margin:10px 0}.chead{display:flex;align-items:center;gap:10px;margin-bottom:10px}.cbadge{width:42px;height:42px;border-radius:50%;object-fit:contain;background:#071018;border:1px solid rgba(212,175,55,.25);padding:3px}.chead b{font-size:15px}.league-h{color:#d4af37;font-size:12px;font-weight:800;letter-spacing:.06em;margin:16px 0 6px;text-transform:uppercase}.prule{color:#c4b07a;font-size:11px;line-height:1.45;margin:8px 0 0}.ptable{width:100%;border-collapse:collapse;font-size:11px}.ptable th{color:#c4b07a;font-weight:600;text-align:left;padding:6px 3px;border-bottom:1px solid rgba(212,175,55,.2)}.ptable td{padding:7px 3px;border-bottom:1px solid rgba(255,255,255,.06);color:#f4f1ea}.ptable .day{color:#3dcc8a;font-weight:700}.pk{width:100%;height:28px;border:0;border-radius:8px;background:#d4af37;color:#111;font-weight:800;font-size:11px}.dash{border:1px solid #d4af37;border-radius:18px;padding:16px 14px;margin-bottom:14px;background:#0d0c08}.dash-hi{color:#e6c56a;font-size:13px}.dash-title{color:#f0d060;font-size:20px;font-weight:800;margin:4px 0 14px}.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.dcell{border:1px solid #d4af37;border-radius:14px;padding:12px 10px}.dcell span{display:block;color:#c4b07a;font-size:12px;margin-bottom:8px}.dcell b{font-size:18px;color:#f6e27a}.dcell b.earn{color:#3dcc8a}.dcell b.bal{color:#f0a030}.club{align-items:center}.club img.cbadge{width:24px;height:24px;margin-right:8px}";
  document.head.appendChild(s);
}
function money(n){return Number(n||0).toLocaleString();}
function cap(m){m=Number(m||0);return m>=1000?("$"+(m/1000).toFixed(2)+"B"):("$"+m.toFixed(2)+"M");}
function badge(c){var src=(c&&c.b)||"";return '<img class="cbadge" src="'+src+'" alt="'+((c&&c.n)||"club")+' badge">';}
function paint(){
  var box=document.getElementById("holdList"); if(!box) return;
  var clubs=window.CLUBS||[]; var html="", last="";
  clubs.forEach(function(c){
    if(c.l!==last){html+='<div class="league-h">'+c.l+'</div>'; last=c.l;}
    var rows=PACKS.map(function(pk){
      return '<tr><td>UGX '+money(pk.p)+'</td><td>'+pk.d+'d</td><td class="day">'+money(pk.w)+'</td><td>'+money(pk.t)+'</td><td>'+money(pk.p)+'</td><td><button type="button" class="pk" data-club="'+c.n+'" data-p="'+pk.p+'" data-d="'+pk.d+'" data-w="'+pk.w+'">Buy</button></td></tr>';
    }).join("");
    html+='<div class="ccard"><div class="chead">'+badge(c)+'<div><b>'+c.n+'</b><div style="color:#8aa;font-size:11px">'+c.l+' · '+cap(c.v)+'</div></div></div>'+
      '<table class="ptable"><thead><tr><th>Price</th><th>Cycle</th><th>Daily</th><th>After lock</th><th>Deposit back</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>'+
      '<div class="prule">During lock take Daily. After the cycle ends you can also withdraw the Price you paid.</div></div>';
  });
  box.innerHTML=html;
}
function paintMarket(id){
  var box=document.getElementById(id); if(!box) return;
  var html="", last="";
  (window.CLUBS||[]).forEach(function(c){
    if(c.l!==last){html+='<div class="league-h">'+c.l+'</div>'; last=c.l;}
    var up=Math.random()>0.45, ch=(Math.random()*2.8).toFixed(2);
    html+='<button class="club" type="button"><span style="display:flex;align-items:center">'+badge(c)+'<span><b>'+c.n+'</b><br><span style="color:#8aa">'+c.l+'</span></span></span><span style="text-align:right">'+cap(c.v)+'<br><span class="'+(up?"up":"dn")+'">'+(up?"+":"-")+ch+'%</span></span></button>';
  });
  box.innerHTML=html;
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
  paintMarket("watchlist");
}
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
document.addEventListener("click",function(e){
  var buy=e.target.closest("#holdList .pk");
  if(!buy) return;
  e.preventDefault(); e.stopPropagation();
  var price=+buy.getAttribute("data-p"), days=+buy.getAttribute("data-d"), club=buy.getAttribute("data-club");
  fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({name:club,club:club,price:price,days:days,daily:+buy.getAttribute("data-w"),weeks:Math.round(days/7),return_principal:true})})
    .then(function(r){return r.json();}).then(function(j){alert((j.message||j.error||"Pack locked")+"\nAfter "+days+" days you can also withdraw UGX "+money(price)+" deposit.");}).catch(function(){alert("Pack locked.");});
},true);
var _go=window.go;
window.go=function(id){
  if(typeof _go==="function") _go(id);
  if(id==="shares") setTimeout(paint,20);
  if(id==="home") setTimeout(paintHome,20);
  if(id==="market") setTimeout(function(){paintMarket("marketList");},20);
};
})();
