(function(){
if(window.__ocBillSafe)return;window.__ocBillSafe=1;
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
    box.innerHTML=rows.length?rows.map(card).join(""):'<div class="lvl">No bills yet.</div>';
    box.onclick=function(e){var b=e.target.closest("[data-can]");if(!b)return;fetch("/api/withdraw/cancel",{method:"POST",headers:H(),body:JSON.stringify({id:b.getAttribute("data-can")})}).finally(function(){paintBill(box);});};
  }).catch(function(){box.textContent="Could not load bills.";});
}
document.addEventListener("click",function(e){
  if(e.target.closest("[data-act=bill]")) setTimeout(function(){paintBill(document.getElementById("dBB")||document.getElementById("dB"));},80);
},true);
})();
