(function(){
var s=document.getElementById("ocLayCss");
if(!s){s=document.createElement("style");s.id="ocLayCss";document.head.appendChild(s);}
s.textContent=".wal{margin-top:14px;color:#f4f1ea}.wal-k{color:#9aa3ad;font-size:13px}.wal-amt{font-size:34px;font-weight:800;letter-spacing:-.03em}.wal-amt span{font-size:16px;font-weight:700;color:#9aa3ad;margin-left:6px}.wal-sub{color:#8aa;font-size:13px;margin:4px 0 14px}.wal-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}.wal-dep{height:46px;border:0;border-radius:24px;background:#c62828;color:#fff;font-weight:800}.wal-wd{height:46px;border:1px solid #333;border-radius:24px;background:#1a1a1a;color:#fff;font-weight:800}.wal-icons{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:8px 0 18px;text-align:center}.wal-icons button{background:0;border:0;color:#cfd6dd;font-size:11px}.ico{width:52px;height:52px;border-radius:16px;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;font-size:22px}.ico.r{background:#c62828}.wal-h{display:flex;justify-content:space-between;align-items:center;margin:8px 0}.wal-h b{font-size:16px}.wal-h span{color:#3dcc8a;font-size:12px}.bal-row{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #1c242c}.bal-row i{width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-style:normal;font-weight:800;font-size:12px}.bal-row .nm{flex:1}.bal-row .nm b{display:block}.bal-row .nm span{color:#8aa;font-size:12px}.bal-row .rt{text-align:right}.up{color:#3dcc8a}.dn{color:#e57373}.mkt-title{color:#d4af37;font-size:18px;font-weight:800;margin:0 0 10px}.mkt-card{background:#101820;border:1px solid rgba(212,175,55,.2);border-radius:16px;padding:12px;margin-bottom:12px}.#home .lg-bar, #home .league-h, #watchlist{display:none!important}";
function usd(n){return Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
function cap(m){m=Number(m||0);return m>=1000?("$"+(m/1000).toFixed(2)+"B"):("$"+m.toFixed(2)+"M");}
function walletHtml(bal){
  var u=Number(String(bal).replace(/[^0-9.]/g,""))||0;
  return '<div class="wal" id="ocWal"><div class="wal-k">Total Balance</div><div class="wal-amt">'+usd(u)+' <span>USDT</span></div><div class="wal-sub">≈ '+usd(u)+'$</div><div class="wal-row"><button type="button" class="wal-dep" data-act="deposit">Deposit</button><button type="button" class="wal-wd" data-act="withdraw">Withdraw</button></div><div class="wal-icons"><button type="button" data-go="market"><div class="ico r">🤖</div>Bot Trade</button><button type="button" data-go="team"><div class="ico r">👥</div>Team</button><button type="button" data-go="shares"><div class="ico r">📦</div>Investments</button><button type="button" data-go="account"><div class="ico r">⚙️</div>Settings</button></div><div class="wal-h"><b>Balances</b><span>View All →</span></div><div class="bal-row"><i style="background:#26a17b;color:#fff">T</i><div class="nm"><b>USDT</b><span>TetherUS</span></div><div class="rt"><b>'+usd(u)+'</b><div>$'+usd(u)+'</div></div></div><div class="bal-row"><i style="background:#f7931a;color:#fff">B</i><div class="nm"><b>BTC</b><span>Bitcoin</span></div><div class="rt"><b>'+(u/78500||0).toFixed(6)+'</b><div>$'+usd(u)+' <span class="up">+0.51%</span></div></div></div><div class="bal-row"><i style="background:#627eea;color:#fff">E</i><div class="nm"><b>ETH</b><span>Ethereum</span></div><div class="rt"><b>'+(u/2450||0).toFixed(6)+'</b><div>$'+usd(u)+' <span class="dn">-0.20%</span></div></div></div><div class="bal-row"><i style="background:#9945ff;color:#fff">S</i><div class="nm"><b>SOL</b><span>Solana</span></div><div class="rt"><b>'+(u/104||0).toFixed(6)+'</b><div>$'+usd(u)+' <span class="dn">-0.95%</span></div></div></div><div class="bal-row"><i style="background:#23292f;color:#fff">X</i><div class="nm"><b>XRP</b><span>Ripple</span></div><div class="rt"><b>'+(u/0.62||0).toFixed(4)+'</b><div>$'+usd(u)+'</div></div></div></div>';
}
function chartHtml(){
  var pts="",i,x,y; for(i=0;i<=24;i++){x=i*12;y=38+Math.sin(i/2.2)*16+((i*7)%11);pts+=x+","+y+" ";}
  return '<div class="mkt-title">Stock Markets</div><div class="mkt-card"><svg viewBox="0 0 300 80" width="100%" height="80" preserveAspectRatio="none"><polyline fill="none" stroke="#d4af37" stroke-width="2.4" points="'+pts+'"/></svg></div>';
}
function badge(c){return '<img class="cbadge" src="'+(c.b||"")+'" data-fb="'+(c.b2||"")+'" alt="'+c.n+'" onerror="if(this.dataset.fb&&this.src!==this.dataset.fb){this.src=this.dataset.fb;}">';}
function clubRows(){
  var html="", last="";
  (window.CLUBS||[]).forEach(function(c){
    if(c.l!==last){html+='<div class="league-h">'+c.l+'</div>'; last=c.l;}
    var up=Math.random()>0.45, ch=(Math.random()*2.8).toFixed(2);
    html+='<button class="club" type="button" data-club="'+c.n+'"><span style="display:flex;align-items:center">'+badge(c)+'<span><b>'+c.n+'</b><br><span style="color:#8aa">'+c.l+'</span></span></span><span style="text-align:right"><b>'+cap(c.v)+'</b><br><span class="'+(up?"up":"dn")+'">'+(up?"+":"-")+ch+'%</span></span></button>';
  });
  return html;
}
function applyHome(){
  var pad=document.querySelector("#home .pad"); if(!pad) return;
  var wl=document.getElementById("watchlist"); if(wl){wl.innerHTML=""; wl.style.display="none";}
  var hb=document.getElementById("homeBal"); if(hb) hb.style.display="none";
  pad.querySelectorAll(".lg-bar").forEach(function(b){b.remove();});
  var bal=((document.getElementById("accBal")||{}).textContent||"0");
  var old=document.getElementById("ocWal");
  var html=walletHtml(bal);
  if(old) old.outerHTML=html; else pad.insertAdjacentHTML("beforeend", html);
}
function applyMarket(){
  var box=document.getElementById("marketList"); if(!box) return;
  box.innerHTML=chartHtml()+clubRows();
}
function applyHomeHideLeagues(){
  document.querySelectorAll("#home .lg-bar, #home .league-h").forEach(function(el){el.remove();});
}
document.addEventListener("click",function(e){
  var g=e.target.closest(".wal [data-go]");
  if(g && typeof window.go==="function") window.go(g.getAttribute("data-go"));
},true);
var _g=window.go;
window.go=function(id){
  if(typeof _g==="function") _g(id);
  setTimeout(function(){
    if(id==="home"){applyHome(); applyHomeHideLeagues();}
    if(id==="market") applyMarket();
  },60);
  setTimeout(function(){ if(id==="home") applyHomeHideLeagues(); if(id==="market") applyMarket(); },240);
};
})();
