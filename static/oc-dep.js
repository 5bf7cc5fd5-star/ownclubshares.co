(function(){
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
function form(){
  return '<div class="wd-tabs" id="depTabs"><button type="button" class="on" data-m="momo">Mobile Money</button><button type="button" data-m="crypto">Crypto</button></div>'+
    '<p id="depHelp" style="color:#9aa3ad;font-size:13px;line-height:1.45">Send by MTN or Airtel. Enter the phone you paid from. Destination stays in the system background.</p>'+
    '<input class="fb-input" id="depA" placeholder="Amount">'+
    '<div id="depMomo"><select class="fb-input" id="depNet"><option>MTN</option><option>Airtel</option></select><input class="fb-input" id="depPhone" placeholder="Your MoMo number"></div>'+
    '<div id="depCry" class="hidden"><input class="fb-input" id="depT" placeholder="USDT TRC20 TxID"></div>'+
    '<button class="btn" type="button" id="depG">Submit deposit</button>';
}
function wire(){
  var mode="momo";
  var tabs=document.getElementById("depTabs");
  var help=document.getElementById("depHelp");
  if(tabs) tabs.onclick=function(e){
    var b=e.target.closest("button"); if(!b) return;
    mode=b.getAttribute("data-m");
    tabs.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b);});
    var mo=document.getElementById("depMomo"), cr=document.getElementById("depCry");
    if(mo) mo.classList.toggle("hidden", mode!=="momo");
    if(cr) cr.classList.toggle("hidden", mode!=="crypto");
    if(help) help.textContent=mode==="crypto"?"Send USDT TRC20 then paste your TxID. Receiving wallet stays in the system background.":"Send by MTN or Airtel. Enter the phone you paid from. Destination stays in the system background.";
  };
  var g=document.getElementById("depG");
  if(!g) return;
  g.onclick=function(){
    var amount=(document.getElementById("depA")||{}).value||"";
    var phone=(document.getElementById("depPhone")||{}).value||"";
    var net=(document.getElementById("depNet")||{}).value||"MTN";
    var tx=((document.getElementById("depT")||{}).value||"").trim();
    if(!amount){alert("Enter amount");return;}
    if(mode==="crypto" && !tx){alert("Paste crypto TxID");return;}
    if(mode==="momo" && !phone){alert("Enter the MoMo number you paid from");return;}
    fetch("/api/deposit",{method:"POST",headers:H(),body:JSON.stringify({method:mode,amount:amount,phone:phone,network:net,txid:tx})})
      .then(function(r){return r.json();})
      .then(function(j){alert(j.message||j.error||"Deposit submitted"); var d=document.getElementById("dD"); if(d)d.classList.add("hidden");})
      .catch(function(){alert("Deposit submitted");});
  };
}
function paint(box){ if(!box) return; box.innerHTML=form(); wire(); }
window.ocDepositForm=form;
window.ocDepositWire=wire;
document.addEventListener("click",function(){ setTimeout(function(){
  var b=document.getElementById("dDB")||document.getElementById("depG")&&document.getElementById("depG").parentNode;
  if(document.getElementById("depG") && !document.getElementById("depTabs")) {
    var host=document.getElementById("dDB")||document.getElementById("dDB".replace?"dDB":"");
  }
  if(document.getElementById("dDB") && !document.getElementById("depTabs")) paint(document.getElementById("dDB"));
},80);},true);
})();
