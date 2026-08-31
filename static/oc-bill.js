(function(){
if(window.__ocBillSafe)return;window.__ocBillSafe=1;
var s=document.createElement("style");s.textContent=".bill-card{background:#101820;border-radius:12px;padding:12px 12px 10px;margin:0 0 10px;display:grid;grid-template-columns:1.1fr 1fr 1.1fr;align-items:center;gap:4px 6px}.bill-amt{color:#3aa0ff;font-weight:800;text-align:right}.bill-dt,.bill-ph{color:#8aa3b3;font-size:12px}.bill-ph{text-align:right}.bill-can{height:28px;padding:0 14px;border-radius:8px;border:1px solid #3aa0ff;background:0;color:#fff;font-size:12px}";document.head.appendChild(s);
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
function st(s){s=String(s||"").toLowerCase();if(/pend|review|await/.test(s))return"Awaiting review";if(/approv|paid|succ/.test(s))return"Succeed";if(/cancel/.test(s))return"Canceled";if(/reject/.test(s))return"Rejected";return s||"Succeed";}
function card(row){var status=st(row.status),can=status==="Awaiting review"&&row.id,amt=Number(row.amount||0),sign=row.kind==="deposit"?"+":"-",num=Math.abs(amt).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});return '<div class="bill-card"><div><b>'+(row.kind==="deposit"?"Deposit":"Withdraw")+'</b><div class="bill-dt">'+(row.date||"")+'</div></div><div style="text-align:center">'+status+(can?'<br><button class="bill-can" type="button" data-can="'+row.id+'">Cancel</button>':'')+'</div><div><div class="bill-amt">'+sign+num+'</div><div class="bill-ph">'+(row.phone||"")+'</div></div></div>';}
function paintBill(box){
  if(!box) return;
  box.innerHTML="Loading…";
  var phone=((document.getElementById("accSub")||{}).textContent||"");
  Promise.all([
    fetch("/api/withdrawals/mine",{headers:H()}).then(function(r){return r.json();}).catch(function(){return {};}),
    fetch("/api/me",{headers:H()}).then(function(r){return r.json();}).catch(function(){return {};})
  ]).then(function(arr){
    var wds=arr[0].withdrawals||arr[0].items||(Array.isArray(arr[0])?arr[0]:[]);
    var me=arr[1].user||arr[1]||{};
    if(me.phone) phone=String(me.phone);
    var rows=wds.map(function(w){return {id:w.id,kind:"withdraw",status:w.status,amount:w.amount,date:(w.created_at||w.date||"").replace("T"," ").slice(0,16),phone:w.dest||w.phone||phone};});
    (me.deposits||[]).forEach(function(d){rows.push({kind:"deposit",status:d.status||"Succeed",amount:d.amount,date:(d.created_at||d.date||"").replace("T"," ").slice(0,16),phone:phone});});
    if(!rows.length){(me.transactions||[]).forEach(function(t){rows.push({kind:/dep/i.test(t.type||"")?"deposit":"withdraw",status:"Succeed",amount:Math.abs(t.amount||0),date:t.date||"",phone:phone});});}
    box.innerHTML=rows.length?rows.map(card).join(""):'<div class="lvl">No bills yet.</div>';
    box.onclick=function(e){var b=e.target.closest("[data-can]");if(!b)return;fetch("/api/withdraw/cancel",{method:"POST",headers:H(),body:JSON.stringify({id:b.getAttribute("data-can")})}).finally(function(){paintBill(box);});};
  }).catch(function(){box.textContent="Could not load bills.";});
}
function hideOwnerPay(){
  var box=document.getElementById("dDB");
  if(!box || box.dataset.crypto) return;
  box.dataset.crypto="1";
  box.innerHTML='<p style="color:#9aa3ad;font-size:13px">Deposit by <b style="color:#d4af37">Crypto USDT TRC20</b> only. Paste your TxID after you send.</p><input class="inp" id="depA" placeholder="Amount"><input class="inp" id="depT" placeholder="Paste crypto TxID"><button class="btn" type="button" id="depG">Submit crypto deposit</button>';
  var g=document.getElementById("depG");
  if(g) g.onclick=function(){
    var tx=(document.getElementById("depT")||{}).value||"";
    if(!String(tx).trim()){alert("Paste crypto TxID");return;}
    fetch("/api/deposit",{method:"POST",headers:H(),body:JSON.stringify({txid:String(tx).trim(),method:"crypto",amount:(document.getElementById("depA")||{}).value||""})}).finally(function(){alert("Crypto deposit submitted");var d=document.getElementById("dD");if(d)d.classList.add("hidden");});
  };
}
function fixWd(){
  document.querySelectorAll(".wd-note").forEach(function(n){
    if(n.dataset.ok) return;
    n.dataset.ok="1";
    n.innerHTML="<b>Note:</b><br><br>Withdrawals are subject to 10% service charge.<br><br>Your withdrawal will arrive instantly.<br><br>There must be at least 1 day interval between each withdrawal application day.<br><br>On the day you are eligible to apply, you may submit an unlimited number of withdrawal applications.";
  });
  var amt=document.getElementById("wdAmt");
  if(amt && !amt.dataset.ok){
    amt.dataset.ok="1";
    amt.addEventListener("input",function(){var el=document.getElementById("wdNetAmt");if(el)el.textContent="UGX "+Math.round((parseFloat(this.value||0)||0)*0.90).toLocaleString();});
  }
}
document.addEventListener("click",function(e){
  if(e.target.closest("[data-act=bill]")) setTimeout(function(){paintBill(document.getElementById("dBB"));},80);
  if(e.target.closest("[data-act=deposit]")) setTimeout(hideOwnerPay,80);
  if(e.target.closest("[data-act=withdraw]")) setTimeout(fixWd,80);
},true);
})();
