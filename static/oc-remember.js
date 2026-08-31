(function(){
if(window.__ocRemember)return;window.__ocRemember=1;
function box(){
  var form=document.getElementById("loginForm"); if(!form||document.getElementById("rememberPw")) return;
  var row=document.createElement("label");
  row.style.cssText="display:flex;align-items:center;gap:8px;margin:0 0 12px;color:#1c1e21;font-size:14px";
  row.innerHTML='<input type="checkbox" id="rememberPw" checked> Remember password';
  var btn=form.querySelector(".fb-login");
  if(btn) form.insertBefore(row, btn); else form.appendChild(row);
}
function loadSaved(){
  try{
    var s=JSON.parse(localStorage.getItem("ocRemember")||"null");
    if(!s) return;
    var id=document.getElementById("loginId");
    var pw=document.getElementById("loginPass");
    if(id&&s.id) id.value=s.id;
    if(pw&&s.pw) pw.value=s.pw;
    var c=document.getElementById("rememberPw"); if(c) c.checked=true;
  }catch(e){}
}
function saveSaved(id,pw,on){
  try{
    if(on) localStorage.setItem("ocRemember", JSON.stringify({id:id,pw:pw}));
    else localStorage.removeItem("ocRemember");
  }catch(e){}
}
function tryToken(){
  var t=null; try{t=localStorage.getItem("ocToken")}catch(e){}
  if(!t) return;
  fetch("/api/me",{headers:{Authorization:"Bearer "+t}}).then(function(r){return r.json();}).then(function(j){
    if(j&&j.user&&typeof afterAuth==="function") afterAuth({token:t,user:j.user});
  }).catch(function(){});
}
var _after=window.afterAuth;
window.afterAuth=function(j){
  var id=(document.getElementById("loginId")||{}).value||"";
  var pw=(document.getElementById("loginPass")||{}).value||"";
  var on=!!(document.getElementById("rememberPw")||{}).checked;
  saveSaved(id,pw,on);
  if(typeof _after==="function") _after(j);
};
var form=document.getElementById("loginForm");
if(form){
  var prev=form.onsubmit;
  form.addEventListener("submit",function(){
    var on=!!(document.getElementById("rememberPw")||{}).checked;
    saveSaved((document.getElementById("loginId")||{}).value||"",(document.getElementById("loginPass")||{}).value||"",on);
  });
}
var so=document.getElementById("signOut");
if(so){
  so.addEventListener("click",function(){
    try{localStorage.removeItem("ocToken")}catch(e){}
  });
}
box(); loadSaved(); tryToken();
})();
