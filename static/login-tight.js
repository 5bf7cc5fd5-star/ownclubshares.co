(function(){
  var LOGO="/static/own-club-logo.jpg?v=68";
  var CSS=[
    'html,body{height:100%!important;width:100%!important;overflow:hidden!important;margin:0!important;background:#0b0c10!important;}',
    'body.auth-open > *:not(#ocGoldLogin):not(script):not(style):not(link){display:none!important;}',
    '#ocGoldLogin,body.auth-open #ocGoldLogin{display:flex!important;visibility:visible!important;opacity:1!important;',
    'position:fixed;inset:0;z-index:2147483647;background:#0b0c10;color:#fff;',
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    'flex-direction:column;align-items:center;justify-content:space-between;',
    'padding:0 16px 20px 16px;width:100%;height:100%;box-sizing:border-box;}',
    '#ocGoldLogin *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}',
    '#ocGoldLogin .top-banner{width:calc(100% + 32px);margin:0 -16px;background:#1f2833;padding:12px 16px;font-size:.85rem;color:#c5a880;text-align:center;border-bottom:1px solid rgba(212,175,55,.2);flex:0 0 auto;}',
    '#ocGoldLogin .top-banner a{color:#d4af37;text-decoration:none;font-weight:600;margin-left:4px;}',
    '#ocGoldLogin .main-content{flex:1 1 auto;width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;justify-content:center;}',
    '#ocGoldLogin .logo-container{width:140px;height:140px;border-radius:50%;overflow:hidden;border:3px solid #d4af37;margin:0 0 28px;background:#0b0c10;flex:0 0 140px;}',
    '#ocGoldLogin .logo-container img{width:100%;height:100%;object-fit:cover;display:block;background:#0b0c10;}',
    '#ocGoldLogin .form-container{width:100%;}',
    '#ocGoldLogin .input-field{width:100%;background:#1a2230;border:1px solid rgba(212,175,55,.25);border-radius:12px;padding:14px 14px;font-size:16px;color:#fff;margin-bottom:12px;outline:none;font-family:inherit;display:block;}',
    '#ocGoldLogin .input-field::placeholder{color:#85929e;}',
    '#ocGoldLogin .input-field:focus{border-color:#d4af37;}',
    '#ocGoldLogin .btn-login{width:100%;background:linear-gradient(180deg,#e3c56a,#d4af37);color:#0b0c10;border:none;border-radius:26px;font-size:1.05rem;font-weight:700;padding:14px;margin-top:4px;cursor:pointer;font-family:inherit;display:block;}',
    '#ocGoldLogin .forgot-link{display:block;width:100%;text-align:center;margin:14px 0 0;color:#d4af37;background:none;border:0;font-size:.9rem;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .bottom-actions{width:100%;max-width:400px;flex:0 0 auto;display:flex;flex-direction:column;align-items:center;padding-bottom:8px;}',
    '#ocGoldLogin .btn-signup-mobile{width:100%;color:#d4af37;border:1.5px solid #d4af37;border-radius:26px;font-size:.95rem;font-weight:600;padding:11px;text-align:center;background:transparent;cursor:pointer;margin-bottom:16px;font-family:inherit;}',
    '#ocGoldLogin .btn-signup-mobile:active{background:rgba(212,175,55,.1);}',
    '#ocGoldLogin .footer-brand{font-size:.8rem;color:#c5a880;font-weight:600;letter-spacing:2px;text-transform:uppercase;}',
    '#ocGoldLogin .oc-err{min-height:18px;margin-top:10px;color:#e57373;font-size:.85rem;text-align:center;}',
    '#ocGoldLogin .oc-ok{color:#d4af37;}',
    '#ocGoldLogin .oc-pane{width:100%;}',
    '#ocGoldLogin .oc-pane.hidden{display:none!important;}'
  ].join('');
  function $(id){return document.getElementById(id)}
  function setVal(id,v){var el=$(id); if(el) el.value=v==null?"":String(v); return el}
  function loggedIn(){
    try{ if(typeof currentUser==="function" && currentUser()) return true; }catch(e){}
    try{ if(window.state && state.currentUserId) return true; }catch(e){}
    var main=$("mainApp"); return !!(main && !main.classList.contains("hidden") && main.style.display!=="none");
  }
  function teardown(){
    var box=$("ocGoldLogin"); if(box) box.remove();
    var auth=$("authScreen"); if(auth){ auth.classList.add("hidden"); auth.style.setProperty("display","none","important"); }
    document.body.classList.remove("auth-open");
    var main=$("mainApp"); if(main){ main.classList.remove("hidden"); main.style.setProperty("display","flex","important"); }
  }
  function showErr(m){ var el=$("ocErr"); if(el){ el.className="oc-err"; el.textContent=m||""; } }
  function showOk(m){ var el=$("ocErr"); if(el){ el.className="oc-err oc-ok"; el.textContent=m||""; } }
  function showPane(which){
    ["ocLoginPane","ocSignupPane","ocForgotPane"].forEach(function(id){ var el=$(id); if(el) el.classList.toggle("hidden", id!==(which==="login"?"ocLoginPane":which==="signup"?"ocSignupPane":"ocForgotPane")); });
    var bot=$("ocBottom"); if(bot) bot.style.display = which==="login"?"":"none";
    showErr("");
  }
  function loadLocalState(){
    var st=null;
    try{ if(window.state && typeof state==="object") st=state; }catch(e){}
    if(!st){ try{ st=JSON.parse(localStorage.getItem("Own Club")||"null"); }catch(e){ st=null; } }
    if(!st||typeof st!=="object") st={users:[],currentUserId:null};
    if(!Array.isArray(st.users)) st.users=[];
    window.state=st; return st;
  }
  function saveLocalState(st){ try{ localStorage.setItem("Own Club", JSON.stringify(st)); }catch(e){} window.state=st; }
  function digitsOf(v){ return String(v||"").replace(/\D/g,""); }
  function findUser(st,idRaw,pass){
    var id=String(idRaw||"").trim().toLowerCase(); var idDigits=digitsOf(idRaw); var user=null;
    for(var i=0;i<st.users.length;i++){
      var u=st.users[i]; if(!u) continue;
      if((u.email||"").toLowerCase()===id){ user=u; break; }
      var up=digitsOf(u.phone);
      if(up && idDigits && (up===idDigits || up.slice(-9)===idDigits.slice(-9))){ user=u; break; }
    }
    if(!user) return {user:null,reason:"notfound"};
    if(pass!=null && String(uPass(user)).trim()!==String(pass)) return {user:user,reason:"badpass"};
    return {user:user,reason:"ok"};
  }
  function uPass(u){ return u.password||u.password_plain||""; }
  function enterApp(user){
    var st=loadLocalState(); if(user&&user.id) st.currentUserId=user.id; saveLocalState(st);
    try{ if(typeof showApp==="function") showApp(); }catch(e){}
    try{ if(typeof render==="function") render(); }catch(e){}
    teardown();
  }
  function copyLogin(){
    var id=(($("ocId")||{}).value||""); var pass=(($("ocPass")||{}).value||"");
    setVal("loginId",id); setVal("loginPass",pass);
    return {id:String(id).trim(),pass:String(pass)};
  }
  function copySignup(){
    setVal("suName",(($("ocSuName")||{}).value||""));
    setVal("suPhoneLocal", String((($("ocSuPhone")||{}).value||"")).replace(/\D/g,"").replace(/^256/,"").replace(/^0/,""));
    setVal("suEmail",(($("ocSuEmail")||{}).value||""));
    setVal("suPass",(($("ocSuPass")||{}).value||""));
    setVal("suPass2",(($("ocSuPass2")||{}).value||""));
    setVal("suInvite",(($("ocSuInvite")||{}).value||"IMXT2Y0M8D"));
  }
  function finishIfIn(){ if(loggedIn()){ try{ if(typeof showApp==="function") showApp(); }catch(e){} teardown(); return true; } return false; }
  function runLocalLogin(creds){
    var st=loadLocalState();
    try{ if(typeof loadState==="function") loadState(); st=loadLocalState(); }catch(e){}
    var hit=findUser(st,creds.id,creds.pass);
    if(hit.reason==="notfound") return "Account not found";
    if(hit.reason==="badpass") return "Wrong password";
    if(hit.user){ st.currentUserId=hit.user.id; saveLocalState(st); enterApp(hit.user); return ""; }
    return "Check details and try again.";
  }
  function runLogin(){
    showErr(""); var creds=copyLogin();
    if(!creds.id){ showErr("Enter mobile number or email address"); return; }
    if(!creds.pass){ showErr("Enter password"); return; }
    var fn=window.doLogin;
    if(typeof fn==="function"){
      var old=window.alert, cap=""; window.alert=function(m){cap=String(m||"");};
      try{ fn(); }catch(err){ cap=(err&&err.message)?err.message:String(err); }
      window.alert=old;
      setTimeout(function(){
        if(finishIfIn()) return;
        if(cap) showErr(cap.replace(/\n/g," — "));
        else { var m=runLocalLogin(creds); if(m && !loggedIn()) showErr(m); }
      },80);
      return;
    }
    fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier:creds.id,email:creds.id,password:creds.pass})})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
      .then(function(res){
        if(res.ok && res.j && (res.j.token||res.j.user)){
          try{ if(res.j.token) localStorage.setItem("ocToken",res.j.token); }catch(e){}
          if(res.j.user){ enterApp(res.j.user); return; }
        }
        var m=runLocalLogin(creds); if(m && !loggedIn()) showErr((res.j&&res.j.error)?res.j.error:m);
      })
      .catch(function(){ var m=runLocalLogin(creds); if(m && !loggedIn()) showErr(m); });
  }
  function runForgot(){
    showErr(""); var email=String((($("ocForgotEmail")||{}).value||"")).trim().toLowerCase();
    if(!email||email.indexOf("@")<0){ showErr("Enter your account email"); return; }
    showOk("Reset started. Contact support if you need a new password.");
  }
  function runSignup(){
    showErr(""); copySignup();
    var name=(($("ocSuName")||{}).value||""); var phone=(($("ocSuPhone")||{}).value||"");
    var email=(($("ocSuEmail")||{}).value||""); var pass=(($("ocSuPass")||{}).value||""); var pass2=(($("ocSuPass2")||{}).value||"");
    if(!String(name).trim()||!String(phone).trim()||!String(email).trim()||!pass){ showErr("Fill all fields"); return; }
    if(pass!==pass2){ showErr("Passwords do not match"); return; }
    try{ if(typeof doSignup==="function") doSignup(); }catch(e){}
    setTimeout(function(){
      if(finishIfIn()) return;
      var st=loadLocalState();
      var nu={id:"u_"+Date.now(),name:String(name).trim(),phone:String(phone).trim(),email:String(email).trim().toLowerCase(),password:pass,usedInvite:(($("ocSuInvite")||{}).value||"IMXT2Y0M8D"),balance:0,machines:[],transactions:[]};
      for(var i=0;i<st.users.length;i++){ if((st.users[i].email||"").toLowerCase()===nu.email){ showErr("Email already registered"); return; } }
      st.users.push(nu); st.currentUserId=nu.id; saveLocalState(st); enterApp(nu);
    },80);
  }
  function loginHTML(){
    return '<div class="oc-pane" id="ocLoginPane">'+
      '<input type="text" class="input-field" id="ocId" placeholder="Mobile number or email address" autocomplete="username" required>'+
      '<input type="password" class="input-field" id="ocPass" placeholder="Password" autocomplete="current-password" required>'+
      '<button type="button" class="btn-login" id="ocLoginBtn">Log In</button>'+
      '<button type="button" class="forgot-link" id="ocForgotBtn">Forgotten password?</button></div>';
  }
  function signupHTML(){
    return '<div class="oc-pane hidden" id="ocSignupPane">'+
      '<input type="text" class="input-field" id="ocSuName" placeholder="Full name">'+
      '<input type="tel" class="input-field" id="ocSuPhone" placeholder="Mobile number">'+
      '<input type="email" class="input-field" id="ocSuEmail" placeholder="Email address">'+
      '<input type="password" class="input-field" id="ocSuPass" placeholder="Password">'+
      '<input type="password" class="input-field" id="ocSuPass2" placeholder="Confirm password">'+
      '<input type="text" class="input-field" id="ocSuInvite" placeholder="Invite code IMXT2Y0M8D" value="IMXT2Y0M8D">'+
      '<button type="button" class="btn-login" id="ocSignupGo">Create new account</button>'+
      '<button type="button" class="forgot-link" id="ocBackLogin">Already have an account? Log In</button></div>';
  }
  function forgotHTML(){
    return '<div class="oc-pane hidden" id="ocForgotPane">'+
      '<input type="email" class="input-field" id="ocForgotEmail" placeholder="Email address">'+
      '<button type="button" class="btn-login" id="ocForgotGo">Send reset</button>'+
      '<button type="button" class="forgot-link" id="ocForgotBack">Back to Log In</button></div>';
  }
  function bind(){
    var loginBtn=$("ocLoginBtn"); if(loginBtn) loginBtn.onclick=function(e){ if(e) e.preventDefault(); runLogin(); };
    var signupGo=$("ocSignupGo"); if(signupGo) signupGo.onclick=function(e){ if(e) e.preventDefault(); runSignup(); };
    var createBtn=$("ocCreateBtn"); if(createBtn) createBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("signup"); };
    var backBtn=$("ocBackLogin"); if(backBtn) backBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("login"); };
    var forgotBtn=$("ocForgotBtn"); if(forgotBtn) forgotBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("forgot"); };
    var forgotGo=$("ocForgotGo"); if(forgotGo) forgotGo.onclick=function(e){ if(e) e.preventDefault(); runForgot(); };
    var forgotBack=$("ocForgotBack"); if(forgotBack) forgotBack.onclick=function(e){ if(e) e.preventDefault(); showPane("login"); };
    var pass=$("ocPass"); if(pass) pass.addEventListener("keydown", function(e){ if(e.key==="Enter") runLogin(); });
  }
  function mount(){
    if(loggedIn()){ teardown(); return; }
    if($("ocGoldLogin")){ bind(); return; }
    if(!$("ocGoldLoginCss")){ var st=document.createElement("style"); st.id="ocGoldLoginCss"; st.appendChild(document.createTextNode(CSS)); document.head.appendChild(st); }
    document.body.classList.add("auth-open");
    var box=document.createElement("div"); box.id="ocGoldLogin";
    box.innerHTML='<div class="top-banner"><span>Experience modern networking. <a href="#">Download App</a></span></div>'+
      '<div class="main-content"><div class="logo-container"><img src="'+LOGO+'" alt="Own Club Share Logo" onerror="this.onerror=null;this.src=\'/own-club-logo.jpg?v=68\'"></div>'+
      '<div class="form-container">'+loginHTML()+signupHTML()+forgotHTML()+'<div id="ocErr" class="oc-err"></div></div></div>'+
      '<div class="bottom-actions" id="ocBottom"><button type="button" class="btn-signup-mobile" id="ocCreateBtn">Create new account</button><div class="footer-brand">Own Club Share</div></div>';
    document.body.appendChild(box); bind();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  setTimeout(mount,40); setTimeout(mount,250); setTimeout(mount,900);
})();
