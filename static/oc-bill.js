(function(){
var s=document.createElement("style");s.textContent=".bill-card{background:#101820;border-radius:12px;padding:12px 12px 10px;margin:0 0 10px;display:grid;grid-template-columns:1.1fr 1fr 1.1fr;align-items:center;gap:4px 6px}.bill-amt{color:#3aa0ff;font-weight:800;text-align:right}.bill-dt,.bill-ph{color:#8aa3b3;font-size:12px}.bill-ph{text-align:right}.bill-can{height:28px;padding:0 14px;border-radius:8px;border:1px solid #3aa0ff;background:0;color:#fff;font-size:12px}";document.head.appendChild(s);
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
function st(s){s=String(s||"").toLowerCase();if(/pend|review|await/.test(s))return"Awaiting review";if(/approv|paid|succ/.test(s))return"Succeed";if(/cancel/.test(s))return"Canceled";if(/reject/.test(s))return"Rejected";return s||"Succeed";}
function card(row){var status=st(row.status),can=status==="Awaiting review"&&row.id,amt=Number(row.amount||0),sign=row.kind==="deposit"?"+":"-",num=Math.abs(amt).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});return '<div class="bill-card"><div><b>'+(row.kind==="deposit"?"Deposit":"Withdraw")+'</b><div class="bill-dt">'+(row.date||"")+'</div></div><div style="text-align:center">'+status+(can?'<br><button class="bill-can" type="button" data-can="'+row.id+'">Cancel</button>':'')+'</div><div><div class="bill-amt">'+sign+num+'</div><div class="bill-ph">'+(row.phone||"")+'</div></div></div>';}
function paintBill(box){
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
  });
}
var _go=window.go;
window.go=function(id){if(typeof _go==="function")_go(id);};
document.addEventListener("click",function(e){
  var b=e.target.closest("#accGrid [data-act=bill],button[data-act=bill]");
  if(!b) return;
  setTimeout(function(){
    var box=document.getElementById("dBB");
    if(box) paintBill(box);
  },80);
},true);
})();
