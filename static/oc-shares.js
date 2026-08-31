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
  s.textContent=".ccard{background:#0b1220;border:1px solid rgba(212,175,55,.28);border-radius:14px;padding:12px;margin:10px 0}.chead{display:flex;align-items:center;gap:10px;margin-bottom:10px}.cbadge{width:42px;height:42px;border-radius:50%;object-fit:contain;background:#fff;border:1px solid rgba(212,175,55,.25);padding:3px}.chead b{font-size:15px}.league-h{color:#d4af37;font-size:12px;font-weight:800;letter-spacing:.06em;margin:16px 0 6px;text-transform:uppercase}.prule{color:#c4b07a;font-size:11px;line-height:1.45;margin:8px 0 0}.ptable{width:100%;border-collapse:collapse;font-size:11px}.ptable th{color:#c4b07a;font-weight:600;text-align:left;padding:6px 3px;border-bottom:1px solid rgba(212,175,55,.2)}.ptable td{padding:7px 3px;color:#f4f1ea}.ptable .day{color:#3dcc8a;font-weight:700}.pk{width:100%;height:28px;border:0;border-radius:8px;background:#d4af37;color:#111;font-weight:800;font-size:11px}.dash{border:1px solid #d4af37;border-radius:18px;padding:16px 14px;margin-bottom:14px;background:#0d0c08}.dash-hi{color:#e6c56a;font-size:13px}.dash-title{color:#f0d060;font-size:20px;font-weight:800;margin:4px 0 14px}.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.dcell{border:1px solid #d4af37;border-radius:14px;padding:12px 10px}.dcell span{display:block;color:#c4b07a;font-size:12px;margin-bottom:8px}.dcell b{font-size:18px;color:#f6e27a}.dcell b.earn{color:#3dcc8a}.dcell b.bal{color:#f0a030}.club{align-items:center}.club img.cbadge{width:24px;height:24px;margin-right:8px;background:#fff;border-radius:50%}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}.grid4 button{background:#1a2230;border:1px solid rgba(212,175,55,.16);border-radius:12px;padding:10px 2px;color:#f4f1ea}";
  document.head.appendChild(s);
}
function money(n){return Number(n||0).toLocaleString();}
function cap(m){m=Number(m||0);return m>=1000?("$"+(m/1000).toFixed(2)+"B"):("$"+m.toFixed(2)+"M");}
function badge(c){
  var a=c.b||"", d=c.b2||"";
  return '<img class="cbadge" src="'+a+'" data-fb="'+d+'" alt="'+c.n+'" onerror="if(this.dataset.fb&&this.src!==this.dataset.fb){this.src=this.dataset.fb}else{this.onerror=null;this.style.background=\'#d4af37\';this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><circle cx=%2232%22 cy=%2232%22 r=%2230%22 fill=%22%23fff%22 stroke=%22%23111%22/><text x=%2232%22 y=%2238%22 text-anchor=%22middle%22 font-size=%2210%22>FC</text></svg>\';}">';
}
function paint(){
  var box=document.getElementById("holdList"); if(!box) return;
  var html="", last="";
  (window.CLUBS||[]).forEach(function(c){
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
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
function sheet(id,t,b){
  var el=document.getElementById(id);
  if(!el){
    el=document.createElement("div"); el.id=id; el.className="desk";
    el.innerHTML='<div class="sheet"><div style="display:flex;align-items:center;gap:10px;padding:8px 0 12px"><button type="button" data-x="'+id+'" style="background:0;border:0;color:#fff;font-size:22px">‹</button><b style="flex:1;text-align:center;margin-right:22px" id="'+id+'T"></b></div><div id="'+id+'B"></div></div>';
    document.body.appendChild(el);
    el.onclick=function(e){if(e.target.getAttribute("data-x")===id)el.classList.add("hidden");};
    if(!document.getElementById("deskCss")){var cs=document.createElement("style");cs.id="deskCss";cs.textContent=".desk{position:absolute;inset:0;background:#05070c;z-index:90;display:flex}.desk.hidden{display:none}.sheet{background:#05070c;width:100%;height:100%;overflow:auto;padding:8px 16px 28px;color:#fff}";document.head.appendChild(cs);}
  }
  el.classList.remove("hidden");
  document.getElementById(id+"T").textContent=t;
  document.getElementById(id+"B").innerHTML=b;
  return el;
}
function acc(){
  var pad=document.querySelector("#account .pad"); if(!pad) return;
  var g=document.getElementById("accGrid");
  if(!g){
    g=document.createElement("div"); g.className="grid4"; g.id="accGrid";
    g.innerHTML=[["deposit","💳","Deposit"],["withdraw","💸","Withdraw"],["bill","📄","Bill"],["invite","🤝","Invite"],["team","👥","My team"],["vip","⭐","VIP Task"],["reward","🎁","Reward"],["raffle","🎫","Raffle"],["support","💬","Support"]].map(function(a){return '<button type="button" data-act="'+a[0]+'"><div>'+a[1]+'</div><span>'+a[2]+'</span></button>';}).join("");
    var so=document.getElementById("signOut"); if(so) pad.insertBefore(g,so); else pad.appendChild(g);
  }
  g.onclick=function(e){
    var b=e.target.closest("button[data-act]"); if(!b) return;
    var a=b.getAttribute("data-act");
    if(a==="deposit") sheet("dD","Deposit",'<p>Crypto USDT TRC20 only. Paste TxID after you send.</p><input class="fb-input" id="depA" placeholder="Amount"><input class="fb-input" id="depT" placeholder="TxID"><button class="btn" id="depG">Submit</button>');
    else if(a==="withdraw"){ var w=document.querySelector("[data-act=withdraw]"); document.dispatchEvent(new Event("oc-wd")); sheet("dX","Withdraw",document.getElementById("dXB")?document.getElementById("dXB").innerHTML:'<p>Open Withdraw</p>'); if(typeof window.ocWithdraw==="function") window.ocWithdraw(); else {
      var bal=((document.getElementById("accBal")||{}).textContent||"0");
      sheet("dX","Withdraw",'<div class="wd-bal">Balance: '+bal+'</div><input class="fb-input" id="wdName" placeholder="Account name"><input class="fb-input" id="wdPhone" placeholder="0780000000"><input class="fb-input" id="wdAmt" placeholder="Amount"><button class="btn" id="wdGo2">Confirm</button><p class="prule">Withdrawals are subject to 10% service charge. Your withdrawal will arrive instantly.</p>');
    }}
    else if(a==="bill") sheet("dB","Bill","<p>Loading…</p>");
    else if(a==="invite"){var code=(document.getElementById("myCode")||{}).textContent||"IMXT2Y0M8D";sheet("dI","Invite","<p>Code <b>"+code+"</b></p><p>https://ownclubshares.co/app?ref="+code+"</p>");}
    else if(a==="team") sheet("dT","My team","<p>Level 1 joined through you. Level 2 joined through your Level 1.</p>");
    else if(a==="vip") sheet("dV","VIP Task","<p>2 members = 25% weekly</p><p>5 = 30%</p><p>9 = 35%</p><p>15 = 40%</p>");
    else if(a==="reward") sheet("dW","Reward","<p>25% of the share pack your invite buys.</p>");
    else if(a==="raffle") sheet("dR","Raffle",'<p>Gold cards. Purchase a share first.</p><div class="gold-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+[1,2,3,4,5,6].map(function(){return '<div style="height:90px;border-radius:12px;background:linear-gradient(160deg,#7a5a12,#f0d060);display:flex;align-items:center;justify-content:center;font-weight:800;color:#111">OC</div>';}).join("")+"</div>");
    else if(a==="support") sheet("dS","Support",'<input class="fb-input" id="si" placeholder="Message"><button class="btn" id="ss">Send</button><div id="sl"></div>');
    if(a==="bill"){
      var box=document.getElementById("dBB");
      if(box) fetch("/api/me",{headers:H()}).then(function(r){return r.json();}).then(function(j){var txs=((j.user||{}).transactions)||[];box.innerHTML=txs.map(function(t){return '<div class="ccard">'+(t.date||"")+' · '+(t.type||"")+' · '+(t.amount||0)+'</div>';}).join("")||"No bills yet.";});
    }
    if(a==="deposit"){
      setTimeout(function(){var g=document.getElementById("depG"); if(g) g.onclick=function(){fetch("/api/deposit",{method:"POST",headers:H(),body:JSON.stringify({method:"crypto",amount:(document.getElementById("depA")||{}).value,txid:(document.getElementById("depT")||{}).value})}).finally(function(){alert("Crypto deposit submitted");});};},30);
    }
    if(a==="withdraw"){
      setTimeout(function(){var g=document.getElementById("wdGo2")||document.getElementById("wdGo"); if(g) g.onclick=function(){fetch("/api/withdraw",{method:"POST",headers:H(),body:JSON.stringify({amount:(document.getElementById("wdAmt")||{}).value,dest:(document.getElementById("wdPhone")||{}).value,name:(document.getElementById("wdName")||{}).value,method:"momo"})}).then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Submitted");});};},30);
    }
    if(a==="support"){
      setTimeout(function(){var ss=document.getElementById("ss"); if(ss) ss.onclick=function(){var t=(document.getElementById("si")||{}).value||""; fetch("/api/support/chat",{method:"POST",headers:H(),body:JSON.stringify({text:t})}).then(function(r){return r.json();}).then(function(j){var sl=document.getElementById("sl"); if(sl) sl.innerHTML+=(j.reply||"Received.");});};},30);
    }
  };
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
  fetch("/api/me",{headers:H()}).then(function(r){return r.json();}).then(function(j){var u=j.user||j||{};var ms=u.machines||[];var inv=0,earn=0;ms.forEach(function(m){inv+=Number(m.price||0);earn+=Number(m.daily||0)*Number(m.days||7);});fill(ms.length,inv,earn,u.balance||shown);}).catch(function(){});
  paintMarket("watchlist");
}
document.addEventListener("click",function(e){
  var buy=e.target.closest("#holdList .pk");
  if(!buy) return;
  e.preventDefault(); e.stopPropagation();
  fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({name:buy.getAttribute("data-club"),price:+buy.getAttribute("data-p"),days:+buy.getAttribute("data-d"),daily:+buy.getAttribute("data-w"),weeks:Math.round(+buy.getAttribute("data-d")/7),return_principal:true})})
    .then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Pack locked");});
},true);
var _go=window.go;
window.go=function(id){
  if(typeof _go==="function") _go(id);
  if(id==="shares") setTimeout(paint,20);
  if(id==="home") setTimeout(paintHome,20);
  if(id==="market") setTimeout(function(){paintMarket("marketList");},20);
  if(id==="account") setTimeout(acc,30);
};
setTimeout(acc,500);
})();
