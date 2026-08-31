(function(){
if(window.__ocAccFix)return;window.__ocAccFix=1;
var css=document.createElement("style");
css.textContent=".desk{position:fixed!important;inset:0!important;background:#05070c!important;z-index:400!important;display:flex!important}.desk.hidden{display:none!important}.sheet{width:100%;height:100%;overflow:auto;padding:8px 16px 28px;color:#fff;-webkit-overflow-scrolling:touch}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}.grid4 button{background:#1a2230;border:1px solid rgba(212,175,55,.16);border-radius:12px;padding:12px 2px;color:#f4f1ea;min-height:64px}.wd-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}.wd-tabs button{height:40px;border-radius:20px;border:1px solid #333;background:#151515;color:#ddd;font-weight:700}.wd-tabs button.on{background:#c62828;border-color:#c62828;color:#fff}";
document.head.appendChild(css);
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
function sheet(id,title,html){
  var el=document.getElementById(id);
  if(!el){
    el=document.createElement("div"); el.id=id; el.className="desk hidden";
    el.innerHTML='<div class="sheet"><div style="display:flex;align-items:center;gap:10px;padding:8px 0 12px"><button type="button" data-x="'+id+'" style="background:0;border:0;color:#fff;font-size:22px">‹</button><b style="flex:1;text-align:center;margin-right:22px" id="'+id+'T"></b></div><div id="'+id+'B"></div></div>';
    (document.getElementById("stage")||document.body).appendChild(el);
    el.addEventListener("click",function(e){if(e.target.getAttribute("data-x")===id)el.classList.add("hidden");});
  }
  document.getElementById(id+"T").textContent=title;
  document.getElementById(id+"B").innerHTML=html;
  el.classList.remove("hidden");
  return el;
}
function openAct(a){
  if(a==="deposit"){
    sheet("dD","Deposit",
      '<div class="wd-tabs" id="depTabs"><button type="button" class="on" data-m="momo">Mobile Money</button><button type="button" data-m="crypto">Crypto</button></div>'+
      '<p id="depHelp" style="color:#9aa3ad;font-size:13px;line-height:1.45">Pay with MTN or Airtel. Enter the number you send from. Company MoMo stays in the background.</p>'+
      '<input class="fb-input" id="depA" placeholder="Amount">'+
      '<div id="depMomo"><select class="fb-input" id="depNet"><option>MTN</option><option>Airtel</option></select><input class="fb-input" id="depPhone" placeholder="Your MoMo number"></div>'+
      '<div id="depCry" class="hidden"><input class="fb-input" id="depT" placeholder="USDT TRC20 TxID"></div>'+
      '<button class="btn" type="button" id="depG">Submit deposit</button>');
    var mode="momo";
    document.getElementById("depTabs").onclick=function(e){
      var b=e.target.closest("button"); if(!b) return;
      mode=b.getAttribute("data-m");
      document.querySelectorAll("#depTabs button").forEach(function(x){x.classList.toggle("on",x===b);});
      document.getElementById("depMomo").classList.toggle("hidden",mode!=="momo");
      document.getElementById("depCry").classList.toggle("hidden",mode!=="crypto");
      document.getElementById("depHelp").textContent=mode==="crypto"?"Send USDT TRC20 then paste your TxID. Company wallet stays in the background.":"Pay with MTN or Airtel. Enter the number you send from. Company MoMo stays in the background.";
    };
    document.getElementById("depG").onclick=function(){
      var amount=document.getElementById("depA").value;
      var phone=document.getElementById("depPhone").value;
      var net=document.getElementById("depNet").value;
      var tx=(document.getElementById("depT").value||"").trim();
      if(!amount){alert("Enter amount");return;}
      if(mode==="momo"&&!phone){alert("Enter the MoMo number you paid from");return;}
      if(mode==="crypto"&&!tx){alert("Paste crypto TxID");return;}
      fetch("/api/deposit",{method:"POST",headers:H(),body:JSON.stringify({method:mode,amount:amount,phone:phone,network:net,txid:tx})})
        .then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Deposit submitted");document.getElementById("dD").classList.add("hidden");});
    };
  } else if(a==="withdraw"){
    var bal=((document.getElementById("accBal")||{}).textContent||"0");
    var name=((document.getElementById("accName")||{}).textContent||"");
    sheet("dX","Withdraw",
      '<div class="wd-tabs"><button type="button" class="on" data-tab="momo">MTN / Airtel</button><button type="button" data-tab="usdt">USDT</button></div>'+
      '<div class="wd-bal">Balance: <span>'+bal+'</span></div>'+
      '<input class="wd-in fb-input" id="wdName" placeholder="Account name" value="'+String(name).replace(/"/g,"")+'">'+
      '<div id="wdMomoBox"><input class="wd-in fb-input" id="wdPhone" placeholder="0780000000"><select class="wd-in fb-input" id="wdNet"><option>MTN</option><option>Airtel</option></select></div>'+
      '<div id="wdUsdtBox" class="hidden"><input class="wd-in fb-input" id="wdAddr" placeholder="USDT TRC20 address"></div>'+
      '<div class="wd-amt"><input class="wd-in fb-input" id="wdAmt" placeholder="Amount"><div class="wd-net" id="wdNetAmt">UGX 0</div></div>'+
      '<div class="wd-note"><b>Note:</b><br><br>Withdrawals are subject to 10% service charge.<br><br>Your withdrawal will arrive instantly.</div>'+
      '<button class="wd-ok btn" type="button" id="wdGo">Confirm</button>');
    var mode="momo";
    document.getElementById("wdAmt").oninput=function(){document.getElementById("wdNetAmt").textContent="UGX "+Math.round((parseFloat(this.value||0)||0)*0.90).toLocaleString();};
    document.querySelector("#dX .wd-tabs").onclick=function(e){var b=e.target.closest("button");if(!b)return;document.querySelectorAll("#dX .wd-tabs button").forEach(function(x){x.classList.toggle("on",x===b);});mode=b.getAttribute("data-tab");document.getElementById("wdMomoBox").classList.toggle("hidden",mode!=="momo");document.getElementById("wdUsdtBox").classList.toggle("hidden",mode!=="usdt");};
    document.getElementById("wdGo").onclick=function(){
      var amt=document.getElementById("wdAmt").value, dest=mode==="usdt"?document.getElementById("wdAddr").value:document.getElementById("wdPhone").value, who=document.getElementById("wdName").value;
      if(!amt||!dest||!who){alert("Fill name, destination and amount");return;}
      fetch("/api/withdraw",{method:"POST",headers:H(),body:JSON.stringify({amount:amt,dest:dest,name:who,method:mode,network:(document.getElementById("wdNet")||{}).value})}).then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Submitted");});
    };
  } else if(a==="bill") sheet("dB","Bill","<p>Loading…</p>");
  else if(a==="invite"){
    var code=((document.getElementById("myCode")||{}).textContent||"IMXT2Y0M8D").trim();
    var link="https://ownclubshares.co/app?ref="+encodeURIComponent(code);
    sheet("dI","Invite",'<div class="copyb"><b>Code</b><br>'+code+'</div><div class="copyb">'+link+'</div><button class="btn" type="button" id="cInv">Copy invite link</button>');
    document.getElementById("cInv").onclick=function(){try{navigator.clipboard.writeText(link);alert("Copied");}catch(e){alert(link);}};
  } else if(a==="team") sheet("dT","My team","<p>Level 1 = joined through you. Level 2 = joined through your Level 1.</p>");
  else if(a==="vip") sheet("dV","VIP Task","<p>2 members = 25% weekly</p><p>5 = 30%</p><p>9 = 35%</p><p>15 = 40%</p>");
  else if(a==="reward") sheet("dW","Reward","<p>When a Level 1 buys a share pack you get <b>25%</b> of that pack Price.</p>");
  else if(a==="raffle"){
    sheet("dR","Raffle",'<p>Gold cards. Buy a share first.</p><div class="gold-grid" id="raffleGrid"></div>');
    var p=[3000,5000,7000,15000,25000,105000];
    document.getElementById("raffleGrid").innerHTML=p.map(function(u){return '<div class="gcard" data-u="'+u+'"><div class="inner"><div class="face back">OC</div><div class="face front"><b>WIN</b><span>UGX '+u.toLocaleString()+'</span></div></div></div>';}).join("");
  } else if(a==="support"){
    sheet("dS","Support",'<div id="sl" style="min-height:120px"></div><input class="fb-input" id="si" placeholder="Type a message"><button class="btn" type="button" id="ss">Send</button>');
    document.getElementById("ss").onclick=function(){
      var t=document.getElementById("si").value.trim(); if(!t)return;
      document.getElementById("si").value="";
      document.getElementById("sl").innerHTML+="<div><b>You</b><br>"+t+"</div>";
      fetch("/api/support/chat",{method:"POST",headers:H(),body:JSON.stringify({text:t})}).then(function(r){return r.json();}).then(function(j){document.getElementById("sl").innerHTML+="<div><b>Support</b><br>"+(j.reply||"Received.")+"</div>";});
    };
  }
}
function ensureGrid(){
  var pad=document.querySelector("#account .pad"); if(!pad) return;
  if(document.getElementById("accGrid")) return;
}
document.addEventListener("click",function(e){
  var b=e.target.closest("#accGrid [data-act], button[data-act], .wal-dep, .wal-wd");
  if(!b) return;
  var act=b.getAttribute("data-act");
  if(!act){
    if(b.classList.contains("wal-dep")) act="deposit";
    if(b.classList.contains("wal-wd")) act="withdraw";
  }
  if(!act||act==="settings") return;
  e.preventDefault(); e.stopPropagation();
  openAct(act);
},true);
var _go=window.go;
window.go=function(id){if(typeof _go==="function")_go(id);if(id==="account")setTimeout(ensureGrid,10);};
})();
