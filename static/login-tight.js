(function(){
  var LOGO = "/static/own-club-logo.jpg?v=66";
  var LANGS = [{id:"en-GB",name:"English (UK)"},{id:"en-US",name:"English (US)"},{id:"lg",name:"Luganda"},{id:"sw",name:"Kiswahili"},{id:"ar",name:"Arabic"},{id:"fr",name:"Français"}];
  var I18N = {
    "en-GB":{login:"Log in",forgot:"Forgot password?",create:"Create new account",id:"Mobile number, username or email",pass:"Password",name:"Full name",phone:"Mobile number",email:"Email address",pass2:"Confirm password",invite:"Invite code IMXT2Y0M8D",signup:"Sign up",back:"Have an account? Log in",needId:"Enter mobile number or email",needPass:"Enter password",fill:"Fill all fields",mismatch:"Passwords do not match",or:"OR",dont:"Don't have an account?"},
    "lg":{login:"Yingira",forgot:"Werabidde ekigambo?",create:"Tonda akawunti",id:"Essimu, erinnya oba email",pass:"Ekigambo",name:"Erinnya",phone:"Essimu",email:"Email",pass2:"Ddamu",invite:"Koodi IMXT2Y0M8D",signup:"Wewandiise",back:"Olina akawunti?",needId:"Yingiza essimu",needPass:"Yingiza ekigambo",fill:"Jjuza byonna",mismatch:"Tebikwatagana",or:"OB",dont:"Tolina akawunti?"},
    "sw":{login:"Ingia",forgot:"Umesahau nenosiri?",create:"Fungua akaunti",id:"Simu, jina au email",pass:"Nenosiri",name:"Jina",phone:"Simu",email:"Email",pass2:"Thibitisha",invite:"Msimbo IMXT2Y0M8D",signup:"Jisajili",back:"Una akaunti? Ingia",needId:"Weka simu",needPass:"Weka nenosiri",fill:"Jaza yote",mismatch:"Hayafanani",or:"AU",dont:"Huna akaunti?"}
  };
  I18N["en-US"]=I18N["en-GB"];
  function t(){ return I18N[currentLang()] || I18N["en-GB"]; }
  function currentLang(){ try{ return localStorage.getItem("ocLang") || "en-GB"; }catch(e){ return "en-GB"; } }
  function langName(id){ for(var i=0;i<LANGS.length;i++) if(LANGS[i].id===id) return LANGS[i].name; return "English (UK)"; }
  var CSS = [
    'html,body{height:100%!important;width:100%!important;overflow:hidden!important;background:#000!important;margin:0!important;}',
    'body.auth-open > *:not(#ocGoldLogin):not(script):not(style){visibility:hidden!important;pointer-events:none!important;}',
    'body.auth-open #ocGoldLogin,body.auth-open #ocGoldLogin *{visibility:visible!important;pointer-events:auto!important;}',
    'body.auth-open nav.bottom{display:none!important;}',
    '#ocGoldLogin{position:fixed;inset:0;z-index:2147483647;background:#000;color:#fff;',
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    'width:100%;height:100%;margin:0;padding:0;display:flex;flex-direction:column;overflow:hidden;transform:none!important;}',
    '#ocGoldLogin *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}',
    '#ocGoldLogin .ig-lang{flex:0 0 auto;padding:calc(12px + env(safe-area-inset-top,0px)) 16px 8px;text-align:center;position:relative;}',
    '#ocGoldLogin .lang-btn{background:none;border:0;color:#a8a8a8;font-size:13px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .lang-btn:after{content:" ▾";font-size:9px;}',
    '#ocGoldLogin .lang-menu{display:none;position:absolute;left:50%;transform:translateX(-50%);top:100%;width:min(90vw,320px);max-height:40vh;overflow:auto;background:#1a1a1a;border:1px solid #363636;border-radius:12px;z-index:8;}',
    '#ocGoldLogin .lang-wrap.open .lang-menu{display:block;}',
    '#ocGoldLogin .lang-item{display:block;width:100%;background:none;border:0;color:#fff;text-align:left;padding:12px 16px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .ig-main{flex:1 1 auto;width:100%;max-width:350px;margin:0 auto;padding:8px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;}',
    '#ocGoldLogin .ig-word{font-family:"Grand Hotel","Segoe Script",cursive;font-size:42px;font-weight:400;letter-spacing:.5px;margin:0 0 18px;color:#fff;}',
    '#ocGoldLogin .logo-container{width:88px;height:88px;border-radius:50%;overflow:hidden;border:1px solid #363636;margin-bottom:28px;background:#000;flex:0 0 88px;}',
    '#ocGoldLogin .logo-container img{width:100%;height:100%;object-fit:cover;display:block;background:#000;}',
    '#ocGoldLogin .form-container{width:100%;}',
    '#ocGoldLogin .input-field{width:100%;background:#121212;border:1px solid #363636;border-radius:6px;padding:13px 12px;font-size:13px;color:#fff;margin-bottom:8px;outline:none;font-family:inherit;}',
    '#ocGoldLogin .input-field::placeholder{color:#a8a8a8;}',
    '#ocGoldLogin .input-field:focus{border-color:#737373;}',
    '#ocGoldLogin .btn-login{width:100%;background:#0095f6;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;padding:11px;margin-top:10px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .btn-login:active{opacity:.85;}',
    '#ocGoldLogin .forgot-link{display:block;width:100%;text-align:center;margin:16px 0 0;color:#0095f6;background:none;border:0;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .ig-or{display:flex;align-items:center;gap:16px;width:100%;margin:22px 0 18px;color:#a8a8a8;font-size:13px;font-weight:600;}',
    '#ocGoldLogin .ig-or:before,#ocGoldLogin .ig-or:after{content:"";flex:1;height:1px;background:#363636;}',
    '#ocGoldLogin .ig-bottom{flex:0 0 auto;width:100%;border-top:1px solid #363636;padding:18px 24px calc(18px + env(safe-area-inset-bottom,0px));text-align:center;}',
    '#ocGoldLogin .btn-signup{display:inline;background:none;border:0;color:#0095f6;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;padding:0;}',
    '#ocGoldLogin .ig-dont{color:#a8a8a8;font-size:14px;margin-right:4px;}',
    '#ocGoldLogin .footer-brand{display:none;}',
    '#ocGoldLogin .oc-err{min-height:16px;margin-top:10px;color:#ed4956;font-size:13px;text-align:center;}',
    '#ocGoldLogin .oc-ok{color:#0095f6;}',
    '#ocGoldLogin .oc-pane{width:100%;}',
    '#ocGoldLogin .oc-pane.hidden{display:none!important;}'
  ].join('');
  function setVal(id,v){ var el=document.getElementById(id); if(el) el.value=v==null?"":String(v); return el; }
  function loggedIn(){
    try{ if(typeof currentUser==="function" && currentUser()) return true; }catch(e){}
    try{ if(window.state && state.currentUserId) return true; }catch(e){}
    var main=document.getElementById("mainApp");
    return !!(main && !main.classList.contains("hidden") && main.style.display!=="none");
  }
  function teardown(){
    var box=document.getElementById("ocGoldLogin"); if(box) box.remove();
    var auth=document.getElementById("authScreen");
    if(auth){ auth.classList.add("hidden"); auth.style.setProperty("display","none","important"); }
    document.body.classList.remove("auth-open");
    var main=document.getElementById("mainApp");
    if(main){ main.classList.remove("hidden"); main.style.setProperty("display","flex","important"); }
  }
  function showErr(msg){ var el=document.getElementById("ocErr"); if(el){ el.className="oc-err"; el.textContent=msg||""; } }
  function showOk(msg){ var el=document.getElementById("ocErr"); if(el){ el.className="oc-err oc-ok"; el.textContent=msg||""; } }
  function showPane(which){
    ["ocLoginPane","ocSignupPane","ocForgotPane"].forEach(function(id){
      var el=document.getElementById(id); if(el) el.classList.toggle("hidden", id!==(which==="login"?"ocLoginPane":which==="signup"?"ocSignupPane":"ocForgotPane"));
    });
    var bot=document.getElementById("ocIgBottom"); if(bot) bot.style.display = which==="login"?"":"none";
    showErr("");
  }
  function applyLang(){
    var s=t(); var btn=document.getElementById("ocLangBtn"); if(btn) btn.textContent=langName(currentLang());
    function ph(fid,val){ var el=document.getElementById(fid); if(el) el.placeholder=val; }
    ph("ocId",s.id); ph("ocPass",s.pass); ph("ocSuName",s.name); ph("ocSuPhone",s.phone); ph("ocSuEmail",s.email); ph("ocSuPass",s.pass); ph("ocSuPass2",s.pass2); ph("ocSuInvite",s.invite); ph("ocForgotEmail",s.email);
    var map={ocLoginBtn:s.login,ocForgotBtn:s.forgot,ocCreateBtn:s.create,ocSignupGo:s.signup,ocBackLogin:s.back,ocOr:s.or,ocDont:s.dont};
    Object.keys(map).forEach(function(k){ var el=document.getElementById(k); if(el) el.textContent=map[k]; });
  }
  function loadLocalState(){
    var st=null;
    try{ if(window.state && typeof state==="object") st=state; }catch(e){}
    if(!st){ try{ st=JSON.parse(localStorage.getItem("Own Club")||"null"); }catch(e){ st=null; } }
    if(!st || typeof st!=="object") st={users:[], currentUserId:null};
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
    if(!user) return {user:null, reason:"notfound"};
    if(pass!=null && String(user.password||"").trim()!==String(pass)) return {user:user, reason:"badpass"};
    return {user:user, reason:"ok"};
  }
  function enterApp(user){
    var st=loadLocalState(); if(user && user.id) st.currentUserId=user.id; saveLocalState(st);
    try{ if(typeof showApp==="function") showApp(); }catch(e){}
    try{ if(typeof render==="function") render(); }catch(e){}
    teardown();
  }
  function engineLogin(){ return window.doLogin || (typeof doLogin==="function" ? doLogin : null); }
  function copyLogin(){
    var id=(document.getElementById("ocId")||{}).value||""; var pass=(document.getElementById("ocPass")||{}).value||"";
    setVal("loginId", id); setVal("loginPass", pass); return {id:String(id).trim(), pass:String(pass)};
  }
  function copySignup(){
    setVal("suName", (document.getElementById("ocSuName")||{}).value||"");
    setVal("suPhoneLocal", String((document.getElementById("ocSuPhone")||{}).value||"").replace(/\D/g,"").replace(/^256/,"").replace(/^0/,""));
    setVal("suEmail", (document.getElementById("ocSuEmail")||{}).value||"");
    setVal("suPass", (document.getElementById("ocSuPass")||{}).value||"");
    setVal("suPass2", (document.getElementById("ocSuPass2")||{}).value||"");
    setVal("suInvite", (document.getElementById("ocSuInvite")||{}).value||"IMXT2Y0M8D");
  }
  function finishIfIn(){ if(loggedIn()){ try{ if(typeof showApp==="function") showApp(); }catch(e){} teardown(); return true; } return false; }
  function runLocalLogin(creds){
    var st=loadLocalState();
    try{ if(typeof loadState==="function") loadState(); st=loadLocalState(); }catch(e){}
    var hit=findUser(st, creds.id, creds.pass);
    if(hit.reason==="notfound") return "Account not found";
    if(hit.reason==="badpass") return "Wrong password";
    if(hit.user){ st.currentUserId=hit.user.id; saveLocalState(st); enterApp(hit.user); return ""; }
    return "Check details and try again.";
  }
  function runLogin(){
    var s=t(); showErr(""); var creds=copyLogin();
    if(!creds.id){ showErr(s.needId); return; }
    if(!creds.pass){ showErr(s.needPass); return; }
    var fn=engineLogin();
    if(fn){
      var oldAlert=window.alert; var captured="";
      window.alert=function(m){ captured=String(m||""); };
      try{ fn(); }catch(err){ captured=(err&&err.message)?err.message:String(err); }
      window.alert=oldAlert;
      setTimeout(function(){
        if(finishIfIn()) return;
        if(captured) showErr(captured.replace(/\n/g," — "));
        else { var m=runLocalLogin(creds); if(m && !loggedIn()) showErr(m); }
      }, 80);
      return;
    }
    fetch("/api/login", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({identifier:creds.id,email:creds.id,password:creds.pass})})
      .then(function(r){ return r.json().then(function(j){ return {ok:r.ok,j:j}; }); })
      .then(function(res){
        if(res.ok && res.j && (res.j.token || res.j.user)){
          try{ if(res.j.token) localStorage.setItem("ocToken", res.j.token); }catch(e){}
          if(res.j.user){ enterApp(res.j.user); return; }
        }
        var m=runLocalLogin(creds); if(m && !loggedIn()) showErr((res.j&&res.j.error)?res.j.error:m);
      })
      .catch(function(){ var m=runLocalLogin(creds); if(m && !loggedIn()) showErr(m); });
  }
  function runForgot(){ showErr(""); var email=String((document.getElementById("ocForgotEmail")||{}).value||"").trim().toLowerCase(); if(!email || email.indexOf("@")<0){ showErr("Enter your account email"); return; } showOk("Reset started. Contact support if you need a new password."); }
  function runSignup(){
    var s=t(); showErr(""); copySignup();
    var name=(document.getElementById("ocSuName")||{}).value||"";
    var phone=(document.getElementById("ocSuPhone")||{}).value||"";
    var email=(document.getElementById("ocSuEmail")||{}).value||"";
    var pass=(document.getElementById("ocSuPass")||{}).value||"";
    var pass2=(document.getElementById("ocSuPass2")||{}).value||"";
    if(!String(name).trim()||!String(phone).trim()||!String(email).trim()||!pass){ showErr(s.fill); return; }
    if(pass!==pass2){ showErr(s.mismatch); return; }
    try{ if(typeof doSignup==="function") doSignup(); }catch(e){}
    setTimeout(function(){
      if(finishIfIn()) return;
      var st=loadLocalState();
      var nu={id:"u_"+Date.now(), name:String(name).trim(), phone:String(phone).trim(), email:String(email).trim().toLowerCase(), password:pass, usedInvite:((document.getElementById("ocSuInvite")||{}).value||"IMXT2Y0M8D"), balance:0, machines:[], transactions:[]};
      for(var i=0;i<st.users.length;i++){ if((st.users[i].email||"").toLowerCase()===nu.email){ showErr("Email already registered"); return; } }
      st.users.push(nu); st.currentUserId=nu.id; saveLocalState(st); enterApp(nu);
    }, 80);
  }
  function loginHTML(){ return '<div class="oc-pane" id="ocLoginPane"><input type="text" class="input-field" id="ocId" placeholder="Mobile number, username or email" autocomplete="username"><input type="password" class="input-field" id="ocPass" placeholder="Password" autocomplete="current-password"><button type="button" class="btn-login" id="ocLoginBtn">Log in</button><button type="button" class="forgot-link" id="ocForgotBtn">Forgot password?</button><div class="ig-or" id="ocOr">OR</div></div>'; }
  function signupHTML(){ return '<div class="oc-pane hidden" id="ocSignupPane"><input type="text" class="input-field" id="ocSuName" placeholder="Full name"><input type="tel" class="input-field" id="ocSuPhone" placeholder="Mobile number"><input type="email" class="input-field" id="ocSuEmail" placeholder="Email address"><input type="password" class="input-field" id="ocSuPass" placeholder="Password"><input type="password" class="input-field" id="ocSuPass2" placeholder="Confirm password"><input type="text" class="input-field" id="ocSuInvite" placeholder="Invite code IMXT2Y0M8D" value="IMXT2Y0M8D"><button type="button" class="btn-login" id="ocSignupGo">Sign up</button><button type="button" class="forgot-link" id="ocBackLogin">Have an account? Log in</button></div>'; }
  function forgotHTML(){ return '<div class="oc-pane hidden" id="ocForgotPane"><input type="email" class="input-field" id="ocForgotEmail" placeholder="Email address"><button type="button" class="btn-login" id="ocForgotGo">Send reset link</button><button type="button" class="forgot-link" id="ocForgotBack">Back to log in</button></div>'; }
  function langHTML(){
    var cur=currentLang();
    var items=LANGS.map(function(L){ return '<button type="button" class="lang-item" data-lang="'+L.id+'">'+L.name+'</button>'; }).join('');
    return '<div class="ig-lang"><div class="lang-wrap" id="ocLangWrap"><button type="button" class="lang-btn" id="ocLangBtn">'+langName(cur)+'</button><div class="lang-menu" id="ocLangMenu">'+items+'</div></div></div>';
  }
  function bind(){
    var loginBtn=document.getElementById("ocLoginBtn");
    if(loginBtn) loginBtn.onclick=function(e){ if(e) e.preventDefault(); runLogin(); };
    var signupGo=document.getElementById("ocSignupGo"); if(signupGo) signupGo.onclick=function(e){ if(e) e.preventDefault(); runSignup(); };
    var createBtn=document.getElementById("ocCreateBtn"); if(createBtn) createBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("signup"); };
    var backBtn=document.getElementById("ocBackLogin"); if(backBtn) backBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("login"); };
    var forgotBtn=document.getElementById("ocForgotBtn"); if(forgotBtn) forgotBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("forgot"); };
    var forgotGo=document.getElementById("ocForgotGo"); if(forgotGo) forgotGo.onclick=function(e){ if(e) e.preventDefault(); runForgot(); };
    var forgotBack=document.getElementById("ocForgotBack"); if(forgotBack) forgotBack.onclick=function(e){ if(e) e.preventDefault(); showPane("login"); };
    var pass=document.getElementById("ocPass"); if(pass) pass.addEventListener("keydown", function(e){ if(e.key==="Enter") runLogin(); });
    var wrap=document.getElementById("ocLangWrap"); var langBtn=document.getElementById("ocLangBtn");
    if(langBtn && wrap && !wrap._ocBound){
      wrap._ocBound=true;
      langBtn.onclick=function(e){ if(e){ e.preventDefault(); e.stopPropagation(); } wrap.classList.toggle("open"); };
      var menu=document.getElementById("ocLangMenu");
      if(menu) menu.onclick=function(e){ var it=e.target.closest?e.target.closest(".lang-item"):null; if(!it) return; try{ localStorage.setItem("ocLang", it.getAttribute("data-lang")); }catch(err){} wrap.classList.remove("open"); applyLang(); };
    }
    applyLang();
  }
  function mount(){
    if(loggedIn()){ teardown(); return; }
    if(document.getElementById("ocGoldLogin")){ bind(); return; }
    if(!document.getElementById("ocGoldLoginCss")){ var st=document.createElement("style"); st.id="ocGoldLoginCss"; st.appendChild(document.createTextNode(CSS)); document.head.appendChild(st); }
    document.body.classList.add("auth-open");
    var box=document.createElement("div"); box.id="ocGoldLogin";
    box.innerHTML=langHTML()+'<div class="ig-main"><div class="ig-word">Own Club</div><div class="logo-container"><img src="'+LOGO+'" alt="Own Club" onerror="this.onerror=null;this.src=\'/own-club-logo.jpg?v=66\'"></div><div class="form-container">'+loginHTML()+signupHTML()+forgotHTML()+'<div id="ocErr" class="oc-err"></div></div></div><div class="ig-bottom" id="ocIgBottom"><span class="ig-dont" id="ocDont">Don\'t have an account?</span> <button type="button" class="btn-signup" id="ocCreateBtn">Sign up</button></div>';
    document.body.appendChild(box); bind();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  setTimeout(mount,40); setTimeout(mount,250); setTimeout(mount,900);
})();
