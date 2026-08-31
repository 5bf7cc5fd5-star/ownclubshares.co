(function(){
var PACKS=[{p:35000,d:7,w:5000,t:35000},{p:70000,d:14,w:7500,t:105000},{p:105000,d:21,w:10000,t:210000},{p:140000,d:28,w:12500,t:350000}];
function fd(id){return "https://crests.football-data.org/"+id+".png";}
function es(id){return "https://a.espncdn.com/i/teamlogos/soccer/500/"+id+".png";}
function wk(p){return "https://upload.wikimedia.org/wikipedia/"+p;}
window.CLUBS=[
  {n:"Arsenal",l:"Premier League",v:4200,b:fd(57),b2:es(359)},
  {n:"Man City",l:"Premier League",v:4800,b:fd(65),b2:es(382)},
  {n:"Liverpool",l:"Premier League",v:5310,b:fd(64),b2:es(364)},
  {n:"Chelsea",l:"Premier League",v:3080,b:fd(61),b2:es(363)},
  {n:"Manchester United",l:"Premier League",v:6040,b:fd(66),b2:es(360)},
  {n:"Tottenham Hotspur",l:"Premier League",v:2840,b:fd(73),b2:es(367)},
  {n:"Real Madrid",l:"La Liga",v:6000,b:fd(86),b2:es(86)},
  {n:"FC Barcelona",l:"La Liga",v:5030,b:fd(81),b2:es(83)},
  {n:"Atletico Madrid",l:"La Liga",v:2800,b:fd(78),b2:es(1068)},
  {n:"Juventus",l:"Serie A",v:2500,b:fd(109),b2:es(111)},
  {n:"Inter Milan",l:"Serie A",v:2400,b:fd(108),b2:es(110)},
  {n:"AC Milan",l:"Serie A",v:2200,b:fd(98),b2:es(103)},
  {n:"Bayern Munich",l:"Bundesliga",v:4840,b:fd(5),b2:es(132)},
  {n:"Borussia Dortmund",l:"Bundesliga",v:2100,b:fd(4),b2:es(124)},
  {n:"Paris Saint-Germain",l:"Ligue 1",v:4140,b:fd(524),b2:es(160)},
  {n:"Ajax",l:"Eredivisie",v:980,b:fd(678),b2:es(139)},
  {n:"Celtic",l:"Scottish Premiership",v:420,b:es(256),b2:wk("en/thumb/3/35/Celtic_FC.svg/200px-Celtic_FC.svg.png")},
  {n:"Rangers",l:"Scottish Premiership",v:380,b:es(257),b2:wk("en/thumb/4/41/Rangers_FC.svg/200px-Rangers_FC.svg.png")},
  {n:"Al Hilal",l:"Saudi Pro League",v:914,b:es(929),b2:wk("commons/thumb/5/51/Al_Hilal_SFC_Logo.svg/200px-Al_Hilal_SFC_Logo.svg.png")},
  {n:"Al Nassr",l:"Saudi Pro League",v:790,b:es(2509),b2:wk("commons/thumb/8/80/Al-Nassr_logo.svg/200px-Al-Nassr_logo.svg.png")},
  {n:"Al Ahli",l:"Saudi Pro League",v:720,b:es(8346),b2:wk("en/thumb/3/32/AlAhliSaudiFC.svg/200px-AlAhliSaudiFC.svg.png")},
  {n:"LA Galaxy",l:"MLS",v:888,b:es(187),b2:wk("commons/thumb/5/54/LA_Galaxy_logo.svg/200px-LA_Galaxy_logo.svg.png")},
  {n:"Atlanta United",l:"MLS",v:850,b:es(202),b2:wk("en/thumb/b/bb/Atlanta_United_FC_logo.svg/200px-Atlanta_United_FC_logo.svg.png")},
  {n:"Al Ahly",l:"Egyptian Premier League",v:310,b:es(832),b2:wk("commons/thumb/3/3f/Al_Ahly_SC_logo.svg/200px-Al_Ahly_SC_logo.svg.png")},
  {n:"Mamelodi Sundowns",l:"South African PSL",v:180,b:es(845),b2:wk("en/thumb/6/69/Mamelodi_Sundowns_F.C._logo.svg/200px-Mamelodi_Sundowns_F.C._logo.svg.png")},
  {n:"AS FAR",l:"Botola Pro",v:95,b:wk("en/8/8a/AS_FAR_logo.png"),b2:es(8353)},
  {n:"Esperance",l:"Tunisian Ligue 1",v:140,b:es(1024),b2:wk("en/thumb/2/2d/Esperance_Sportive_de_Tunis_logo.svg/200px-Esperance_Sportive_de_Tunis_logo.svg.png")}
];
if(!document.getElementById("ocShareCss")){
  var s=document.createElement("style");s.id="ocShareCss";
  s.textContent=".ccard{background:#0b1220;border:1px solid rgba(212,175,55,.28);border-radius:14px;padding:10px;margin:8px 0}.chead{display:flex;align-items:center;gap:10px;width:100%;background:0;border:0;color:#f4f1ea;text-align:left;padding:0}.cbadge{width:36px;height:36px;border-radius:50%;object-fit:contain;background:#fff;padding:2px;flex-shrink:0}.packs{display:none;margin-top:10px}.ccard.open .packs{display:block}.ptable{width:100%;border-collapse:collapse;font-size:11px}.ptable th{color:#c4b07a;text-align:left;padding:5px 3px;border-bottom:1px solid rgba(212,175,55,.2)}.ptable td{padding:6px 3px;color:#f4f1ea}.ptable .day{color:#3dcc8a;font-weight:700}.pk{height:28px;border:0;border-radius:8px;background:#d4af37;color:#111;font-weight:800;font-size:11px;padding:0 8px}.prule{color:#c4b07a;font-size:11px;margin-top:8px}.league-h{color:#d4af37;font-size:12px;font-weight:800;margin:14px 0 6px;text-transform:uppercase}.dash{border:1px solid #d4af37;border-radius:18px;padding:16px 14px;margin-bottom:14px;background:#0d0c08}.dash-hi{color:#e6c56a;font-size:13px}.dash-title{color:#f0d060;font-size:20px;font-weight:800;margin:4px 0 14px}.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.dcell{border:1px solid #d4af37;border-radius:14px;padding:12px 10px}.dcell span{display:block;color:#c4b07a;font-size:12px;margin-bottom:8px}.dcell b{font-size:18px;color:#f6e27a}.dcell b.earn{color:#3dcc8a}.dcell b.bal{color:#f0a030}.club{align-items:center}.club img.cbadge{width:24px;height:24px;margin-right:8px;background:#fff;border-radius:50%}";
  document.head.appendChild(s);
}
function money(n){return Number(n||0).toLocaleString();}
function cap(m){m=Number(m||0);return m>=1000?("$"+(m/1000).toFixed(2)+"B"):("$"+m.toFixed(2)+"M");}
function badge(c){return '<img class="cbadge" src="'+(c.b||"")+'" data-fb="'+(c.b2||"")+'" alt="'+c.n+'" onerror="if(this.dataset.fb&&this.src!==this.dataset.fb){this.src=this.dataset.fb;}else{this.onerror=null;}">';}
function packTable(name){
  var rows=PACKS.map(function(pk){
    return '<tr><td>UGX '+money(pk.p)+'</td><td>'+pk.d+'d</td><td class="day">'+money(pk.w)+'</td><td>'+money(pk.t)+'</td><td>'+money(pk.p)+'</td><td><button type="button" class="pk" data-club="'+name+'" data-p="'+pk.p+'" data-d="'+pk.d+'" data-w="'+pk.w+'">Buy</button></td></tr>';
  }).join("");
  return '<table class="ptable"><thead><tr><th>Price</th><th>Cycle</th><th>Daily</th><th>After lock</th><th>Deposit back</th><th></th></tr></thead><tbody>'+rows+'</tbody></table><div class="prule">During lock take Daily. After the cycle you can also withdraw the Price you paid.</div>';
}
function paint(){
  var box=document.getElementById("holdList"); if(!box) return;
  var html="", last="";
  (window.CLUBS||[]).forEach(function(c){
    if(c.l!==last){html+='<div class="league-h">'+c.l+'</div>'; last=c.l;}
    html+='<div class="ccard" data-club="'+c.n+'"><button type="button" class="chead">'+badge(c)+'<div style="flex:1"><b>'+c.n+'</b><div style="color:#8aa;font-size:11px">'+c.l+' · '+cap(c.v)+'</div></div><span style="color:#d4af37;font-size:12px">Purchase ›</span></button><div class="packs">'+packTable(c.n)+'</div></div>';
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
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
function paintHome(){
  var pad=document.querySelector("#home .pad"); if(!pad) return;
  var dash=document.getElementById("ocDash");
  if(!dash){dash=document.createElement("div");dash.id="ocDash";dash.className="dash";pad.insertBefore(dash,pad.firstChild);}
  function fill(a,inv,earn,bal){dash.innerHTML='<div class="dash-hi">Welcome back</div><div class="dash-title">Ownclub Share Dashboard</div><div class="dash-grid"><div class="dcell"><span>Active Shares</span><b>'+a+'</b></div><div class="dcell"><span>Total Invested</span><b>UGX '+money(inv)+'</b></div><div class="dcell"><span>Projected Earnings</span><b class="earn">UGX '+money(earn)+'</b></div><div class="dcell"><span>Available Balance</span><b class="bal">UGX '+money(bal)+'</b></div></div>';}
  var shown=((document.getElementById("homeBal")||{}).textContent||"0").replace(/[^0-9.]/g,"")||0;
  fill(0,0,0,shown);
  var lab=pad.querySelector("div"); if(lab&&/WALLET/i.test(lab.textContent||"")) lab.style.display="none";
  var hb=document.getElementById("homeBal"); if(hb) hb.style.display="none";
  fetch("/api/me",{headers:H()}).then(function(r){return r.json();}).then(function(j){var u=j.user||j||{};var ms=u.machines||[];var inv=0,earn=0;ms.forEach(function(m){inv+=Number(m.price||0);earn+=Number(m.daily||0)*Number(m.days||7);});fill(ms.length,inv,earn,u.balance||shown);}).catch(function(){});
  paintMarket("watchlist");
}
document.addEventListener("click",function(e){
  var buy=e.target.closest("#holdList .pk");
  if(buy){
    e.preventDefault(); e.stopPropagation();
    fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({name:buy.getAttribute("data-club"),price:+buy.getAttribute("data-p"),days:+buy.getAttribute("data-d"),daily:+buy.getAttribute("data-w"),weeks:Math.round(+buy.getAttribute("data-d")/7),return_principal:true})})
      .then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Pack locked");});
    return;
  }
  var head=e.target.closest("#holdList .chead");
  if(head){
    var card=head.closest(".ccard");
    document.querySelectorAll("#holdList .ccard.open").forEach(function(el){if(el!==card)el.classList.remove("open");});
    card.classList.toggle("open");
  }
},true);
var _go=window.go;
window.go=function(id){
  if(typeof _go==="function") _go(id);
  if(id==="shares") setTimeout(paint,20);
  if(id==="home") setTimeout(paintHome,20);
  if(id==="market") setTimeout(function(){paintMarket("marketList");},20);
};
})();
