var TOKEN=localStorage.getItem("oc_sys_token")||"";
var DEPOSITS=[],WITHDRAWALS=[],USERS=[],POOL={balance:0,ledger:[]};
var ROOT_CODE="IMXT2Y0M8D";
var PAGES=["dashboard","deposits","withdrawals","logs","pool","credit","members","referrals"];
function $(id){return document.getElementById(id)}
function setTxt(id,v){var el=$(id); if(el) el.textContent=v}
function setHTML(id,v){var el=$(id); if(el) el.innerHTML=v}
function toast(m){var t=$("toast"); if(!t) return; t.textContent=m; t.style.display="block"; setTimeout(function(){t.style.display="none"},2600)}
function money(n){return "UGX "+Number(n||0).toLocaleString()}
function api(path,method,body){
  var o={method:method||"GET",headers:{"Content-Type":"application/json"}};
  if(TOKEN) o.headers.Authorization="Bearer "+TOKEN;
  if(body) o.body=JSON.stringify(body);
  return fetch(path,o).then(function(r){return r.json().then(function(j){if(!r.ok) throw new Error(j.error||("HTTP "+r.status)); return j})});
}
function doLogin(){
  var email=(($("email")||{}).value||"").trim(); var pass=(($("pass")||{}).value||"");
  api("/api/login","POST",{identifier:email,password:pass}).then(function(r){
    if(!(r.user&&(r.user.is_admin||r.user.is_support||r.user.is_staff))) throw new Error("System access only");
    TOKEN=r.token; localStorage.setItem("oc_sys_token",TOKEN); showShell();
  }).catch(function(e){toast(e.message)});
}
function logout(){TOKEN=""; localStorage.removeItem("oc_sys_token"); location.reload()}
function showShell(){
  if($("loginView")) $("loginView").classList.add("hidden");
  if($("shellView")) $("shellView").classList.remove("hidden");
  refreshAll();
}
function goPage(name,btn){
  PAGES.forEach(function(p){var el=$("page-"+p); if(el) el.classList.toggle("hidden",p!==name)});
  document.querySelectorAll(".side-nav button[data-page]").forEach(function(b){b.classList.remove("on")});
  if(btn) btn.classList.add("on");
  if($("crumb")) $("crumb").innerHTML="<b>"+name+"</b>";
  var side=$("sideNav"); if(side) side.classList.remove("open");
  if(name==="pool") loadPool();
  if(name==="logs") renderLogs();
}
function badge(st){st=String(st||"").toLowerCase(); if(/confirm|disburse|approv|ok|paid/.test(st)) return "badge-ok"; if(/reject|fail|cancel/.test(st)) return "badge-bad"; return "badge-wait"}
function normCode(c){return String(c||"").trim().toUpperCase()}
function userCode(u){return normCode(u.inviteCode||u.invite_code||u.referralCode||u.code)}
function usedCode(u){return normCode(u.referredBy||u.referred_by||u.usedInvite||u.signup_invite)}
function classifyLevels(users){
  var byCode={},levelOf={};
  users.forEach(function(u){var c=userCode(u); if(c) byCode[c]=u});
  function levelFor(u,d){
    if(d>20) return 99;
    var id=u.id||u.email||userCode(u);
    if(levelOf[id]!=null) return levelOf[id];
    if(u.is_admin||(u.email||"").toLowerCase()==="k_hmed@yahoo.com"){levelOf[id]=0; return 0}
    var used=usedCode(u);
    if(!used||used===ROOT_CODE){levelOf[id]=1; return 1}
    var parent=byCode[used];
    if(!parent){levelOf[id]=1; return 1}
    levelOf[id]=levelFor(parent,d+1)+1; return levelOf[id];
  }
  users.forEach(function(u){levelFor(u,0)});
  return {levelOf:levelOf,byCode:byCode};
}
function renderLogs(){
  var rows=[];
  DEPOSITS.forEach(function(d){rows.push({at:d.date||d.created_at||"",src:"deposit",member:(d.name||"")+" "+(d.phone||""),amount:d.amount,status:d.status||""})});
  WITHDRAWALS.forEach(function(w){rows.push({at:w.date||w.created_at||"",src:"withdraw",member:w.name||"",amount:w.amount,status:w.status||""})});
  setTxt("logN", rows.length);
  var h="<table><thead><tr><th>When</th><th>Src</th><th>Member</th><th>Amount</th><th>Status</th></tr></thead><tbody>";
  rows.slice(0,200).forEach(function(r){h+="<tr><td>"+(r.at||"—")+"</td><td>"+r.src+"</td><td>"+r.member+"</td><td>"+money(r.amount)+"</td><td>"+(r.status||"—")+"</td></tr>"});
  setHTML("logTable", h+"</tbody></table>");
}
function loadPool(){
  api("/api/admin/pool").then(function(r){
    POOL=r; setTxt("poolBal", r.balance||0);
    var h="<table><thead><tr><th>When</th><th>Type</th><th>Amount</th><th>Note</th></tr></thead><tbody>";
    (r.ledger||[]).slice().reverse().forEach(function(e){h+="<tr><td>"+(e.at||"")+"</td><td>"+(e.type||"")+"</td><td>"+(e.amount||0)+"</td><td>"+(e.note||"")+"</td></tr>"});
    setHTML("poolLedger", h+"</tbody></table>");
  }).catch(function(e){toast(e.message)});
}
function creditOne(){
  api("/api/admin/credit","POST",{identifier:($("crId")||{}).value,amount:Number(($("crAmt")||{}).value),note:($("crNote")||{}).value}).then(function(){toast("Credited"); refreshAll()}).catch(function(e){toast(e.message)});
}
function refreshAll(){
  api("/api/admin/stats").then(function(s){
    setTxt("kUsers", s.users||s.total_users||0);
    setTxt("kInv", money(s.invested||s.total_invested||0));
    setTxt("kPwd", s.pending_withdrawals||0);
  }).catch(function(){});
  loadPool();
  api("/api/admin/deposits").then(function(r){DEPOSITS=r.deposits||[]; renderDeposits(); renderLogs()}).catch(function(e){setHTML("depTable","<div class='empty'>"+e.message+"</div>")});
  api("/api/admin/withdrawals").then(function(r){WITHDRAWALS=r.withdrawals||[]; renderWithdrawals(); renderLogs()}).catch(function(e){setHTML("wdTable","<div class='empty'>"+e.message+"</div>")});
  api("/api/admin/users").then(function(r){USERS=r.users||[]; renderMembers(); renderReferrals(); renderLogs()}).catch(function(e){setHTML("memTable","<div class='empty'>"+e.message+"</div>")});
}
function renderDeposits(){
  if(!DEPOSITS.length){setHTML("depTable","<div class='empty'>No deposit requests.</div>"); return}
  var h="<table><thead><tr><th>Date</th><th>Member</th><th>Amount</th><th>TxID</th><th>Status</th><th></th></tr></thead><tbody>";
  DEPOSITS.forEach(function(d){
    var st=d.status||"pending"; var id=d.id||"";
    h+="<tr><td>"+(d.date||d.created_at||"—")+"</td><td>"+(d.name||"—")+"</td><td>"+money(d.amount)+"</td><td>"+(d.txid||d.tx_id||"—")+"</td><td><span class='badge "+badge(st)+"'>"+st+"</span></td><td>";
    if(/pend|submit/i.test(st)) h+="<button class='btn-ok' type='button' onclick='depAct(\""+id+"\",\"confirm\")'>Approve</button> <button class='btn-bad' type='button' onclick='depAct(\""+id+"\",\"reject\")'>Reject</button>";
    h+="</td></tr>";
  });
  setHTML("depTable", h+"</tbody></table>");
}
function renderWithdrawals(){
  if(!WITHDRAWALS.length){setHTML("wdTable","<div class='empty'>No withdrawal requests.</div>"); return}
  var h="<table><thead><tr><th>Date</th><th>Member</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody>";
  WITHDRAWALS.forEach(function(w){
    var st=w.status||"under_review"; var id=w.id||"";
    h+="<tr><td>"+(w.date||w.created_at||"—")+"</td><td>"+(w.name||"—")+"</td><td>"+money(w.amount)+"</td><td>"+st+"</td><td>";
    if(/review|pend/i.test(st)&&!/reviewed/i.test(st)) h+="<button class='btn-ok' type='button' onclick='wdAct(\""+id+"\",\"review\")'>Review</button>";
    else if(/reviewed/i.test(st)) h+="<button class='btn-ok' type='button' onclick='wdAct(\""+id+"\",\"disburse\")'>Disburse</button>";
    h+="</td></tr>";
  });
  setHTML("wdTable", h+"</tbody></table>");
}
function renderMembers(){
  if(!USERS.length){setHTML("memTable","<div class='empty'>No members</div>"); return}
  var cls=classifyLevels(USERS);
  var h="<table><thead><tr><th></th><th>Level</th><th>Name</th><th>Phone</th><th>Email</th><th>Balance</th><th></th></tr></thead><tbody>";
  USERS.forEach(function(u){
    var id=String(u.id||u.email||"");
    var lv=cls.levelOf[id]==null?1:cls.levelOf[id];
    var ident=(u.email||u.phone||u.id||"");
    h+="<tr><td><input type='checkbox' class='row-chk' data-id='"+id+"' data-ident='"+String(ident).replace(/'/g,"")+"' onchange='updateSelCount()'></td>";
    h+="<td>L"+lv+"</td><td>"+(u.name||"—")+"</td><td>"+(u.phone||"—")+"</td><td>"+(u.email||"—")+"</td><td>"+money(u.balance)+"</td>";
    h+="<td><button class='btn-ok' type='button' onclick='creditOneRow(\""+id+"\",\""+String(u.name||"").replace(/"/g,"")+"\",\""+String(ident).replace(/"/g,"")+"\")'>Credit</button></td></tr>";
  });
  setHTML("memTable", h+"</tbody></table>"); updateSelCount();
}
function toggleAllMembers(src){document.querySelectorAll(".row-chk").forEach(function(c){c.checked=!!src.checked}); updateSelCount()}
function updateSelCount(){setTxt("selCount", document.querySelectorAll(".row-chk:checked").length+" selected")}
function creditOneRow(uid,name,ident){
  var raw=prompt("Credit amount (UGX) for "+(name||ident||uid)); if(raw===null) return;
  var amount=Number(String(raw).replace(/[^0-9.]/g,"")); if(!amount){toast("Enter a valid amount"); return}
  var note=prompt("Note (optional):","Admin credit")||"Admin credit";
  api("/api/admin/credit","POST",{identifier:ident||uid,user_id:uid,amount:amount,note:note}).then(function(){toast("Credited "+money(amount)); refreshAll()}).catch(function(e){toast(e.message||"Credit failed")});
}
function creditSelected(){
  var boxes=[].slice.call(document.querySelectorAll(".row-chk:checked"));
  if(!boxes.length){toast("Select at least one member"); return}
  var amount=Number((($("bulkAmt")||{}).value)); if(!amount){toast("Enter amount"); return}
  var note=((($("bulkNote")||{}).value)||"Bulk admin credit");
  if(!confirm("Credit "+money(amount)+" to "+boxes.length+" member(s)?")) return;
  var done=0,fail=0,chain=Promise.resolve();
  boxes.forEach(function(box){
    var ident=box.getAttribute("data-ident")||box.getAttribute("data-id");
    var uid=box.getAttribute("data-id");
    chain=chain.then(function(){return api("/api/admin/credit","POST",{identifier:ident,user_id:uid,amount:amount,note:note}).then(function(){done++}).catch(function(){fail++})});
  });
  chain.then(function(){toast("Done: "+done+" credited"+(fail?", "+fail+" failed":"")); refreshAll()});
}
function renderReferrals(){
  var cls=classifyLevels(USERS); var c1=0;
  USERS.forEach(function(u){var id=u.id||u.email; if((cls.levelOf[id]||1)===1 && !u.is_admin) c1++});
  setTxt("refL1", c1); setTxt("kL1", c1);
  var h="<table><thead><tr><th>Name</th><th>Phone</th><th>Code</th><th>Joined via</th></tr></thead><tbody>";
  USERS.forEach(function(u){h+="<tr><td>"+(u.name||"—")+"</td><td>"+(u.phone||"—")+"</td><td>"+(userCode(u)||"—")+"</td><td>"+(usedCode(u)||"—")+"</td></tr>"});
  setHTML("refTable", h+"</tbody></table>");
}
function depAct(id,action){api("/api/admin/deposits/action","POST",{id:id,action:action}).then(function(){toast("Deposit updated"); refreshAll()}).catch(function(e){toast(e.message)})}
function wdAct(id,action){api("/api/admin/withdrawals/action","POST",{id:id,action:action}).then(function(){toast("Withdrawal updated"); refreshAll()}).catch(function(e){toast(e.message)})}
setInterval(function(){if(TOKEN) try{refreshAll()}catch(e){}},8000);
if(TOKEN){
  api("/api/me").then(function(r){if(r.user&&(r.user.is_admin||r.user.is_support||r.user.is_staff)) showShell()}).catch(function(){TOKEN=""; localStorage.removeItem("oc_sys_token")});
}
