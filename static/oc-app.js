(function(){
var OC_LOGO="https://raw.githubusercontent.com/5bf7cc5fd5-star/ownclubshares.co/main/own-club-logo.jpg";
function applyLogos(){
  document.querySelectorAll("#logoHero,.logoTop,.logoBig").forEach(function(img){
    img.src=OC_LOGO; img.onerror=function(){this.onerror=null;this.src=OC_LOGO;};
  });
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",applyLogos); else applyLogos();
setTimeout(applyLogos,80);
var CLUBS=[
  {id:1,code:"ARS",name:"Arsenal",league:"Premier League",px:82400},
  {id:2,code:"MCI",name:"Man City",league:"Premier League",px:88100},
  {id:3,code:"LIV",name:"Liverpool",league:"Premier League",px:79650},
  {id:7,code:"RMA",name:"Real Madrid",league:"La Liga",px:91200},
  {id:8,code:"BAR",name:"Barcelona",league:"La Liga",px:84900},
  {id:10,code:"NAP",name:"SSC Napoli",league:"Serie A",px:48800},
  {id:25,code:"LAZ",name:"Lazio",league:"Listed",ticker:"BIT:SSL",cap:"€93m",px:93000,badge:"https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/S.S._Lazio_badge.svg/200px-S.S._Lazio_badge.svg.png"},
  {id:26,code:"SLB",name:"Benfica",league:"Listed",ticker:"LS:SLBEN",cap:"€64m",px:64000,badge:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/200px-SL_Benfica_logo.svg.png"},
  {id:27,code:"SCP",name:"Sporting CP",league:"Listed",ticker:"LS:SCP",cap:"€51m",px:51000,badge:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Sporting_Clube_de_Portugal_logo.svg/200px-Sporting_Clube_de_Portugal_logo.svg.png"},
  {id:28,code:"BAL",name:"Bali United",league:"Listed",ticker:"IDX:BOLA",cap:"IDR 984b",px:54800,badge:"https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Bali_United_logo.svg/200px-Bali_United_logo.svg.png"},
  {id:29,code:"FCP",name:"FC Porto",league:"Listed",ticker:"LS:FCP",cap:"€19m",px:19000,badge:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/FC_Porto.svg/200px-FC_Porto.svg.png"},
  {id:17,code:"HIL",name:"Al Hilal",league:"Saudi Pro League",px:36500},
  {id:19,code:"AHL",name:"Al Ahli",league:"Saudi Pro League",px:29800},
  {id:20,code:"MIA",name:"Inter Miami",league:"MLS",px:44400},
  {id:21,code:"ATL",name:"Atlanta United",league:"MLS",px:22100},
  {id:22,code:"LAG",name:"LA Galaxy",league:"MLS",px:18900}
];
var PACKS=[{price:35000,days:7,daily:5000},{price:70000,days:14,daily:7500},{price:105000,days:21,daily:10000},{price:140000,days:28,daily:12500}];
var GIFTS=[3000,7000,15000,25000,50000,3000,5000,140000,105000,5000,3000];
var UGX_RATE=3700,localCcy="UGX",rate=3700,token=null,me=null,selectedPack=null,filt="Listed",st={},current=null;
var stage=document.getElementById("stage");
var dock=document.getElementById("dock");
function fmtUSD(n){return "USD "+Math.round(Number(n)||0).toLocaleString();}
function fmtLocal(n){return localCcy+" "+Math.round((Number(n)||0)*rate).toLocaleString();}
function dual(n){return fmtUSD(n)+" · "+fmtLocal(n);}
function seed(){CLUBS.forEach(function(c){if(st[c.id]&&st[c.id].hist)return;var hist=[],p=c.px;for(var i=0;i<18;i++){p=p*(1+(Math.random()-0.48)*0.02);hist.push(p);}st[c.id]={px:p,open:c.px,hist:hist,chg:((p-c.px)/c.px)*100};});}
function tickLive(){CLUBS.forEach(function(c){var s=st[c.id];if(!s)return;var vol=c.league==="Listed"?0.016:0.008;s.px=Math.max(100,s.px*(1+(Math.random()-0.48)*vol));s.hist.push(s.px);if(s.hist.length>24)s.hist.shift();s.chg=((s.px-s.open)/s.open)*100;});var mkt=document.getElementById("market");var home=document.getElementById("home");if((mkt&&mkt.classList.contains("on"))||(home&&home.classList.contains("on"))) paintMarket();if(document.getElementById("club")&&document.getElementById("club").classList.contains("on")&&current){var s=st[current.id];var px=document.getElementById("clubPx");if(px)px.textContent=fmtUSD(s.px);var loc=document.getElementById("clubPxLocal");if(loc)loc.textContent="Local: "+fmtLocal(s.px)+" · "+(current.ticker||"")+" "+(current.cap||"");var pill=document.getElementById("clubPill");if(pill){var up=s.chg>=0;pill.className="pill "+(up?"up":"down");pill.textContent=(up?"+":"")+s.chg.toFixed(2)+"%";}}}
setInterval(tickLive,1800);
function badgeHtml(c){if(c.badge)return '<img src="'+c.badge+'" alt="'+c.code+'" loading="lazy" onerror="this.parentNode.textContent=\''+c.code+'\'"/>';return c.code;}
function clubBtn(c){var s=st[c.id],up=s.chg>=0;var sub=c.ticker?(c.ticker+" · "+(c.cap||"")):c.league;return '<button class="club" type="button" data-id="'+c.id+'"><span class="badge">'+badgeHtml(c)+'</span><span class="grow"><b>'+c.name+'</b><br/><span class="subtle" style="font-size:11px">'+sub+'</span></span><span style="text-align:right"><b class="num">'+fmtUSD(s.px)+'</b><br/><span class="pill '+(up?"up":"down")+'">'+(up?"+":"")+s.chg.toFixed(2)+'%</span><br/><span class="ccy-line">'+fmtLocal(s.px)+'</span></span></button>';}
function paintMarket(){seed();var leagues=["Listed","All","Premier League","La Liga","Serie A","Saudi Pro League","MLS"];var lg=document.getElementById("leagues");if(lg)lg.innerHTML=leagues.map(function(l){return '<button type="button" class="'+(filt===l?"on":"")+'" data-l="'+l+'">'+l+'</button>';}).join("");var html="";CLUBS.forEach(function(c){if(filt==="All"||c.league===filt)html+=clubBtn(c);});var ml=document.getElementById("marketList");if(ml)ml.innerHTML=html;var wl=document.getElementById("watchlist");if(wl)wl.innerHTML=CLUBS.filter(function(c){return c.league==="Listed";}).map(clubBtn).join("");}
function openClub(id){current=CLUBS.find(function(c){return c.id==id});if(!current)return;seed();var s=st[current.id];var n=document.getElementById("clubName");if(n)n.textContent=current.name;var l=document.getElementById("clubLeague");if(l)l.textContent=(current.ticker||current.league)+" · cap "+(current.cap||"—");var px=document.getElementById("clubPx");if(px)px.textContent=fmtUSD(s.px);var loc=document.getElementById("clubPxLocal");if(loc)loc.textContent="Live · "+fmtLocal(s.px);var ch=document.getElementById("clubChart");if(ch){var min=Math.min.apply(null,s.hist),max=Math.max.apply(null,s.hist),range=(max-min)||1,d="";s.hist.forEach(function(v,i){var x=(i/(s.hist.length-1))*360,y=112-((v-min)/range)*90;d+=(i?" L":"M")+x.toFixed(1)+" "+y.toFixed(1);});ch.innerHTML='<svg viewBox="0 0 360 132" preserveAspectRatio="none"><path d="'+d+'" fill="none" stroke="#d4af37" stroke-width="2.4"/></svg>';}var packs=document.getElementById("clubPacks");if(packs)packs.innerHTML=PACKS.map(function(p){return '<button type="button" class="pack-btn" data-p="'+p.price+'" data-d="'+p.days+'" data-w="'+p.daily+'"><b>'+p.price.toLocaleString()+'</b>'+p.days+'d · Daily '+p.daily.toLocaleString()+'</button>';}).join("");go("club");}
function openModal(id){var m=document.getElementById(id);if(!m)return;if(stage&&m.parentNode!==stage)stage.appendChild(m);m.classList.remove("hidden");}
function closeModal(id){var m=document.getElementById(id);if(m)m.classList.add("hidden");}
window.closeModal=closeModal;
window.copyText=function(t){try{navigator.clipboard.writeText(t);alert("Copied");}catch(e){alert(t);}};
function showLoginPane(signup){var a=document.getElementById("loginForm"),b=document.getElementById("signupForm");if(a)a.classList.toggle("hidden",!!signup);if(b)b.classList.toggle("hidden",!signup);}
window.go=function(id){document.querySelectorAll(".screen").forEach(function(s){s.classList.toggle("on",s.id===id);});if(dock)dock.style.display=id==="login"?"none":"grid";if(stage)stage.classList.toggle("auth",id==="login");if(id==="market"||id==="home")paintMarket();applyLogos();};
if(dock){dock.style.display="none";dock.addEventListener("click",function(e){var b=e.target.closest("button");if(b&&b.getAttribute("data-go"))go(b.getAttribute("data-go"));});}
var tabS=document.getElementById("tabSignup");if(tabS)tabS.onclick=function(){showLoginPane(true);};
var back=document.getElementById("backLogin");if(back)back.onclick=function(){showLoginPane(false);};
document.body.addEventListener("click",function(e){var b=e.target.closest(".club");if(b&&b.getAttribute("data-id"))openClub(+b.getAttribute("data-id"));var lb=e.target.closest("#leagues button");if(lb){filt=lb.getAttribute("data-l");paintMarket();}var pb=e.target.closest(".pack-btn");if(pb){selectedPack={price:+pb.getAttribute("data-p"),days:+pb.getAttribute("data-d"),daily:+pb.getAttribute("data-w")};var el=document.getElementById("qtyCost");if(el)el.textContent="Selected: "+dual(selectedPack.price);}});
window.onCountryCode=function(){var sel=document.getElementById("suCode");if(!sel)return;var opt=sel.options[sel.selectedIndex];localCcy=opt.getAttribute("data-ccy")||"UGX";rate=parseFloat(opt.getAttribute("data-rate")||"3700");var h=document.getElementById("ccyHint");if(h)h.textContent="Currency: "+localCcy+" · 1 USD ≈ "+rate.toLocaleString()+" "+localCcy;};
onCountryCode();
function applyMe(){var bal=me&&me.balance||0;["homeBal","accBal","homeBook","holdVal"].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=fmtUSD(bal);});["homeBalLocal","accBalLocal","homeBookLocal","holdValLocal"].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent="Local: "+fmtLocal(bal);});var n=document.getElementById("accName");if(n)n.textContent=(me&&me.name)||"Member";var s=document.getElementById("accSub");if(s)s.textContent=(me&&(me.email||me.phone))||"Signed in";var i=document.getElementById("accInit");if(i)i.textContent=((me&&me.name)||"A").charAt(0).toUpperCase();var c=document.getElementById("myCode");if(c)c.textContent=(me&&me.invite_code)||"IMXT2Y0M8D";var l=document.getElementById("inviteLink");if(l)l.textContent="https://ownclubshares.co/app?ref="+encodeURIComponent((me&&me.invite_code)||"IMXT2Y0M8D");}
function afterAuth(j){if(j.token){token=j.token;try{localStorage.setItem("ocToken",j.token);}catch(e){}}me=j.user||me;applyMe();paintMarket();go("home");}
var lf=document.getElementById("loginForm");
if(lf)lf.onsubmit=function(e){e.preventDefault();var err=document.getElementById("authErr");if(err)err.textContent="";var code=document.getElementById("loginCode").value;var id=document.getElementById("loginId").value.trim();var identifier=id.indexOf("@")>=0?id:(code+id.replace(/^0+/,""));fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier:identifier,password:document.getElementById("loginPass").value})}).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});}).then(function(res){if(res.ok&&(res.j.token||res.j.user))afterAuth(res.j);else if(err)err.textContent=(res.j&&(res.j.error||res.j.message))||"Check details";}).catch(function(){if(err)err.textContent="Network error";});};
var sf=document.getElementById("signupForm");
if(sf)sf.onsubmit=function(e){e.preventDefault();var err=document.getElementById("authErr");if(err)err.textContent="";var code=document.getElementById("suCode").value;var phone=code+document.getElementById("suPhone").value.trim().replace(/^0+/,"");fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:document.getElementById("suName").value.trim(),phone:phone,email:document.getElementById("suEmail").value.trim(),password:document.getElementById("suPass").value,invite_code:document.getElementById("suInvite").value.trim()||"IMXT2Y0M8D"})}).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});}).then(function(res){if(res.ok&&(res.j.token||res.j.user))afterAuth(res.j);else if(err)err.textContent=(res.j&&(res.j.error||res.j.message))||"Could not create account";}).catch(function(){if(err)err.textContent="Network error";});};
var grid=document.getElementById("accGrid");
if(grid)grid.addEventListener("click",function(e){var b=e.target.closest("button[data-act]");if(!b)return;var act=b.getAttribute("data-act");if(act==="deposit")openModal("modalDeposit");else if(act==="withdraw")openModal("modalWithdraw");else if(act==="raffle"){var list=document.getElementById("giftList");if(list)list.innerHTML=GIFTS.map(function(g,i){return "<div data-g='"+g+"'>Gift "+(i+1)+" · UGX "+g.toLocaleString()+" ≈ USD "+(g/UGX_RATE).toFixed(2)+"</div>";}).join("");openModal("modalRaffle");}else if(act==="team"||act==="invite")go("team");else{var t=document.getElementById("genTitle");var g=document.getElementById("genBody");if(t)t.textContent=act;if(g)g.textContent="MoMo 0779168109 · USDT TLvT3czNGgpPH3oXURZFtyd4XTQUL2NhGy";openModal("modalGeneric");}});
function bind(id,fn){var el=document.getElementById(id);if(el)el.onclick=fn;}
bind("signOut",function(){localStorage.removeItem("ocToken");token=null;me=null;showLoginPane(false);go("login");});
bind("btnCopyMomo",function(){copyText("0779168109");});
bind("btnCopyCrypto",function(){copyText("TLvT3czNGgpPH3oXURZFtyd4XTQUL2NhGy");});
bind("btnCopyLink",function(){copyText(document.getElementById("inviteLink").textContent);});
bind("btnShare",function(){copyText(document.getElementById("inviteLink").textContent);});
bind("btnWithdrawDiv",function(){alert("Dividend moved to balance.");});
bind("btnCreditWallet",function(){alert("Dividend credited to wallet.");});
bind("btnDoWithdraw",function(){var a=document.getElementById("wdAmt").value,d=document.getElementById("wdDest").value;if(!a||!d){alert("Enter amount and destination");return;}alert("Pending admin review: "+fmtUSD(a));closeModal("modalWithdraw");});
bind("btnSubmitDep",function(){var tx=document.getElementById("depTxid").value.trim();if(!tx){alert("Paste TxID");return;}alert("Deposit TxID submitted: "+tx);closeModal("modalDeposit");});
bind("buyBtn",function(){var e=document.getElementById("buyErr");if(e)e.textContent=selectedPack?"Need wallet cover of "+dual(selectedPack.price):"Select a pack first";});
seed();paintMarket();
try{token=localStorage.getItem("ocToken");}catch(e){}
if(token){fetch("/api/me",{headers:{Authorization:"Bearer "+token}}).then(function(r){return r.json();}).then(function(j){if(j&&j.user){me=j.user;applyMe();go("home");}}).catch(function(){});}
})();
