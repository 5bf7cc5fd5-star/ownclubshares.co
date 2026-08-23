(function(){
  var LOGO = "/static/own-club-logo.jpg?v=62";
  var LANGS = [
    {id:"en-GB", name:"English (UK)"},{id:"en-US", name:"English (US)"},
    {id:"lg", name:"Luganda"},{id:"sw", name:"Kiswahili"},
    {id:"rw", name:"Ikinyarwanda"},{id:"nyn", name:"Runyankole"},
    {id:"ach", name:"Acholi"},{id:"luo", name:"Dholuo"},{id:"so", name:"Somali"},
    {id:"am", name:"Amharic"},{id:"ar", name:"Arabic"},{id:"fr", name:"Français"},
    {id:"es", name:"Español"},{id:"pt", name:"Português"},{id:"de", name:"Deutsch"},
    {id:"tr", name:"Türkçe"},{id:"hi", name:"Hindi"},{id:"zh", name:"Chinese"},
    {id:"ha", name:"Hausa"},{id:"yo", name:"Yoruba"},{id:"zu", name:"isiZulu"},{id:"af", name:"Afrikaans"}
  ];
  var I18N = {
    "en-GB":{login:"Log In",forgot:"Forgotten password?",create:"Create new account",id:"Mobile number or email address",pass:"Password",name:"Full name",phone:"Mobile number",email:"Email address",pass2:"Confirm password",invite:"Invite code IMXT2Y0M8D",signup:"Create new account",back:"Already have an account?",needId:"Enter mobile number or email",needPass:"Enter password",fill:"Fill name, mobile, email and password",mismatch:"Passwords do not match"},
    "lg":{login:"Yingira",forgot:"Werabidde ekigambo ky'okuyingira?",create:"Tonda akawunti empya",id:"Ennamba y'essimu oba email",pass:"Ekigambo ky'okuyingira",name:"Erinnya lyonna",phone:"Ennamba y'essimu",email:"Email",pass2:"Ddamu ekigambo",invite:"Koodi IMXT2Y0M8D",signup:"Tonda akawunti empya",back:"Olina akawunti?",needId:"Yingiza essimu oba email",needPass:"Yingiza ekigambo",fill:"Jjuza byonna",mismatch:"Tebikwatagana"},
    "sw":{login:"Ingia",forgot:"Umesahau nenosiri?",create:"Fungua akaunti mpya",id:"Namba ya simu au barua pepe",pass:"Nenosiri",name:"Jina kamili",phone:"Namba ya simu",email:"Barua pepe",pass2:"Thibitisha nenosiri",invite:"Msimbo IMXT2Y0M8D",signup:"Fungua akaunti mpya",back:"Tayari una akaunti?",needId:"Weka simu au email",needPass:"Weka nenosiri",fill:"Jaza taarifa zote",mismatch:"Manenosiri hayafanani"}
  };
  I18N["en-US"]=I18N["en-GB"];
  function t(){ return I18N[currentLang()] || I18N["en-GB"]; }
  function currentLang(){ try{ return localStorage.getItem("ocLang") || "en-GB"; }catch(e){ return "en-GB"; } }
  function langName(id){ for(var i=0;i<LANGS.length;i++) if(LANGS[i].id===id) return LANGS[i].name; return "English (UK)"; }
  var CSS = [
    '#ocGoldLogin{position:fixed;inset:0;z-index:2147483646;background:#0b0c10;color:#fff;',
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    'overflow:hidden;width:100%;height:100%;margin:0;padding:0;display:block;}',
    '#ocGoldLogin *{box-sizing:border-box;pointer-events:auto;-webkit-tap-highlight-color:transparent;}',
    '#ocGoldLogin .viewport-wrapper{display:flex;flex-direction:column;align-items:center;justify-content:space-between;',
    'height:100%;width:100%;padding:0 0 calc(28px + env(safe-area-inset-bottom,0px)) 0;color:#fff;position:relative;}',
    '#ocGoldLogin .top-banner{width:100%;background:#1f2833;padding:14px 20px;padding-top:calc(14px + env(safe-area-inset-top,0px));font-size:.85rem;color:#c5a880;text-align:center;border-bottom:1px solid rgba(212,175,55,.25);}',
    '#ocGoldLogin .top-banner a{color:#d4af37;text-decoration:none;font-weight:600;margin-left:4px;}',
    '#ocGoldLogin .lang-wrap{width:100%;position:relative;z-index:5;margin-top:16px;text-align:center;}',
    '#ocGoldLogin .lang-btn{background:none;border:0;color:#85929E;font-size:.85rem;font-weight:600;cursor:pointer;font-family:inherit;padding:8px 12px;}',
    '#ocGoldLogin .lang-btn:after{content:" ▾";font-size:10px;color:#d4af37;}',
    '#ocGoldLogin .lang-menu{display:none;position:absolute;left:50%;transform:translateX(-50%);top:100%;width:min(92vw,340px);max-height:48vh;overflow:auto;background:#1f2833;border:1px solid rgba(212,175,55,.35);border-radius:14px;z-index:20;}',
    '#ocGoldLogin .lang-wrap.open .lang-menu{display:block;}',
    '#ocGoldLogin .lang-item{display:block;width:100%;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.06);color:#fff;font-size:15px;text-align:left;padding:12px 16px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .lang-item.active{color:#d4af37;font-weight:700;}',
    '#ocGoldLogin .main-content{width:100%;padding:0 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-grow:1;}',
    '#ocGoldLogin .logo-container{width:115px;height:115px;margin-bottom:32px;border-radius:50%;overflow:hidden;border:2px solid #d4af37;box-shadow:0 0 20px rgba(212,175,55,.25);background:#000;flex:0 0 115px;display:flex;justify-content:center;align-items:center;}',
    '#ocGoldLogin .logo-container img{width:100%;height:100%;object-fit:cover;display:block;background:#000;}',
    '#ocGoldLogin .form-container{width:100%;}',
    '#ocGoldLogin .input-field{width:100%;padding:16px;font-size:1rem;border:1px solid #c5a880;border-radius:12px;outline:none;background:#1f2833;margin-bottom:12px;color:#fff;font-family:inherit;transition:all .2s cubic-bezier(.4,0,.2,1);}',
    '#ocGoldLogin .input-field::placeholder{color:#85929E;}',
    '#ocGoldLogin .input-field:focus{border-color:#d4af37;background:#151c24;box-shadow:0 0 10px rgba(212,175,55,.2);}',
    '#ocGoldLogin .btn-login{width:100%;background:linear-gradient(135deg,#d4af37 0%,#aa7c11 100%);color:#000;border:none;border-radius:25px;font-size:1.05rem;font-weight:700;padding:15px;margin-top:8px;cursor:pointer;font-family:inherit;box-shadow:0 4px 12px rgba(0,0,0,.4);}',
    '#ocGoldLogin .forgot-link{display:block;text-align:center;margin-top:20px;color:#c5a880;background:none;border:0;width:100%;cursor:pointer;font-family:inherit;font-size:.95rem;font-weight:600;}',
    '#ocGoldLogin .bottom-actions{width:100%;padding:0 24px;text-align:center;margin-top:auto;}',
    '#ocGoldLogin .btn-signup{display:block;width:100%;background:transparent;color:#d4af37;border:1px solid #d4af37;border-radius:25px;font-size:.95rem;font-weight:600;padding:13px;margin-bottom:22px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .btn-signup:active{background:rgba(212,175,55,.08);}',
    '#ocGoldLogin .footer-brand{font-size:.75rem;color:#85929E;font-weight:600;letter-spacing:2px;text-transform:uppercase;}',
    '#ocGoldLogin .oc-err{min-height:18px;margin:8px 0 0;color:#ff6b6b;font-size:13px;text-align:center;font-weight:600;}',
    '#ocGoldLogin .oc-ok{color:#d4af37;}',
    '#ocGoldLogin .oc-pane{width:100%;}',
    '#ocGoldLogin .oc-pane.hidden{display:none!important;}',
    '#authScreen.hidden{display:none!important;}',
    'body.auth-open nav.bottom{display:none!important;}'
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
    var createBtn=document.getElementById("ocCreateBtn"); if(createBtn) createBtn.style.display = which==="login"?"":"none";
    showErr("");
  }
  function applyLang(){
    var s=t(); var id=currentLang(); var btn=document.getElementById("ocLangBtn"); if(btn) btn.textContent=langName(id);
    function ph(fid,val){ var el=document.getElementById(fid); if(el) el.placeholder=val; }
    ph("ocId",s.id); ph("ocPass",s.pass); ph("ocSuName",s.name); ph("ocSuPhone",s.phone); ph("ocSuEmail",s.email); ph("ocSuPass",s.pass); ph("ocSuPass2",s.pass2); ph("ocSuInvite",s.invite); ph("ocForgotEmail",s.email);
    var map={ocLoginBtn:s.login,ocForgotBtn:s.forgot,ocCreateBtn:s.create,ocSignupGo:s.signup,ocBackLogin:s.back};
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
    try{ if(typeof ensureState==="function") ensureState(); }catch(e){}
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
        if(finishIfIn()){ showOk("Welcome"); return; }
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
          var st=loadLocalState();
          if(res.j.user){
            var u=res.j.user; u.password=creds.pass; if(!u.id) u.id="u_"+Date.now();
            var found=false;
            for(var i=0;i<st.users.length;i++){
              if(st.users[i].id===u.id || (st.users[i].email||"").toLowerCase()===(u.email||"").toLowerCase()){ st.users[i]=Object.assign({},st.users[i],u); found=true; enterApp(st.users[i]); break; }
            }
            if(!found){ st.users.push(u); enterApp(u); }
            return;
          }
        }
        var m=runLocalLogin(creds); if(m && !loggedIn()) showErr((res.j&&res.j.error)?res.j.error:m);
      })
      .catch(function(){ var m=runLocalLogin(creds); if(m && !loggedIn()) showErr(m); });
  }
  function runForgot(){
    showErr("");
    var email=String((document.getElementById("ocForgotEmail")||{}).value||"").trim().toLowerCase();
    if(!email || email.indexOf("@")<0){ showErr("Enter your account email"); return; }
    setVal("forgotEmail", email);
    try{ if(typeof requestPasswordReset==="function") requestPasswordReset(); }catch(e){}
    var st=loadLocalState(); var user=null;
    for(var i=0;i<st.users.length;i++){ if((st.users[i].email||"").toLowerCase()===email){ user=st.users[i]; break; } }
    if(!user){ showErr("No account with that email"); return; }
    user.resetToken="rst_"+Math.random().toString(36).slice(2)+Date.now().toString(36);
    user.resetExp=Date.now()+30*60*1000; saveLocalState(st);
    showOk("Reset started. Contact support if you need a new password.");
  }
  function runSignup(){
    var s=t(); showErr(""); copySignup();
    var name=(document.getElementById("ocSuName")||{}).value||"";
    var phone=(document.getElementById("ocSuPhone")||{}).value||"";
    var email=(document.getElementById("ocSuEmail")||{}).value||"";
    var pass=(document.getElementById("ocSuPass")||{}).value||"";
    var pass2=(document.getElementById("ocSuPass2")||{}).value||"";
    if(!String(name).trim()||!String(phone).trim()||!String(email).trim()||!pass){ showErr(s.fill); return; }
    if(pass!==pass2){ showErr(s.mismatch); return; }
    try{ if(typeof switchAuth==="function") switchAuth("signup"); if(typeof doSignup==="function") doSignup(); }catch(e){}
    setTimeout(function(){
      if(finishIfIn()){ showOk("Account created"); return; }
      var st=loadLocalState();
      var nu={id:"u_"+Date.now(), name:String(name).trim(), phone:String(phone).trim(), email:String(email).trim().toLowerCase(), password:pass, usedInvite:((document.getElementById("ocSuInvite")||{}).value||"IMXT2Y0M8D"), balance:0, machines:[], transactions:[]};
      for(var i=0;i<st.users.length;i++){ if((st.users[i].email||"").toLowerCase()===nu.email){ showErr("Email already registered — log in instead"); return; } }
      st.users.push(nu); st.currentUserId=nu.id; saveLocalState(st); enterApp(nu);
    }, 80);
  }
  function loginHTML(){ return '<div class="oc-pane" id="ocLoginPane"><input type="text" class="input-field" id="ocId" placeholder="Mobile number or email address" autocomplete="username"><input type="password" class="input-field" id="ocPass" placeholder="Password" autocomplete="current-password"><button type="button" class="btn-login" id="ocLoginBtn">Log In</button><button type="button" class="forgot-link" id="ocForgotBtn">Forgotten password?</button></div>'; }
  function signupHTML(){ return '<div class="oc-pane hidden" id="ocSignupPane"><input type="text" class="input-field" id="ocSuName" placeholder="Full name"><input type="tel" class="input-field" id="ocSuPhone" placeholder="Mobile number"><input type="email" class="input-field" id="ocSuEmail" placeholder="Email address"><input type="password" class="input-field" id="ocSuPass" placeholder="Password"><input type="password" class="input-field" id="ocSuPass2" placeholder="Confirm password"><input type="text" class="input-field" id="ocSuInvite" placeholder="Invite code IMXT2Y0M8D" value="IMXT2Y0M8D"><button type="button" class="btn-login" id="ocSignupGo">Create new account</button><button type="button" class="forgot-link" id="ocBackLogin">Already have an account?</button></div>'; }
  function forgotHTML(){ return '<div class="oc-pane hidden" id="ocForgotPane"><input type="email" class="input-field" id="ocForgotEmail" placeholder="Email address" autocomplete="email"><button type="button" class="btn-login" id="ocForgotGo">Reset password</button><button type="button" class="forgot-link" id="ocForgotBack">Back to Log In</button></div>'; }
  function langHTML(){
    var cur=currentLang();
    var items=LANGS.map(function(L){ return '<button type="button" class="lang-item'+(L.id===cur?' active':'')+'" data-lang="'+L.id+'">'+L.name+'</button>'; }).join('');
    return '<div class="lang-wrap" id="ocLangWrap"><button type="button" class="lang-btn" id="ocLangBtn">'+langName(cur)+'</button><div class="lang-menu" id="ocLangMenu">'+items+'</div></div>';
  }
  function bind(){
    var loginBtn=document.getElementById("ocLoginBtn");
    var signupGo=document.getElementById("ocSignupGo");
    var createBtn=document.getElementById("ocCreateBtn");
    var forgotBtn=document.getElementById("ocForgotBtn");
    var backBtn=document.getElementById("ocBackLogin");
    var pass=document.getElementById("ocPass");
    var wrap=document.getElementById("ocLangWrap");
    var langBtn=document.getElementById("ocLangBtn");
    if(loginBtn) loginBtn.onclick=function(e){ if(e) e.preventDefault(); runLogin(); };
    if(signupGo) signupGo.onclick=function(e){ if(e) e.preventDefault(); runSignup(); };
    if(createBtn) createBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("signup"); };
    if(backBtn) backBtn.onclick=function(e){ if(e) e.preventDefault(); showPane("login"); };
    if(forgotBtn) forgotBtn.onclick=function(e){ if(e) e.preventDefault(); var g=(document.getElementById("ocId")||{}).value||""; var fe=document.getElementById("ocForgotEmail"); if(fe && g.indexOf("@")>=0) fe.value=g; showPane("forgot"); };
    var forgotGo=document.getElementById("ocForgotGo"); var forgotBack=document.getElementById("ocForgotBack");
    if(forgotGo) forgotGo.onclick=function(e){ if(e) e.preventDefault(); runForgot(); };
    if(forgotBack) forgotBack.onclick=function(e){ if(e) e.preventDefault(); showPane("login"); };
    if(pass) pass.addEventListener("keydown", function(e){ if(e.key==="Enter") runLogin(); });
    if(langBtn && wrap && !wrap._ocBound){
      wrap._ocBound=true;
      langBtn.onclick=function(e){ if(e){ e.preventDefault(); e.stopPropagation(); } wrap.classList.toggle("open"); };
      var menu=document.getElementById("ocLangMenu");
      if(menu) menu.onclick=function(e){ var it=e.target.closest?e.target.closest(".lang-item"):null; if(!it) return; try{ localStorage.setItem("ocLang", it.getAttribute("data-lang")); }catch(err){} wrap.classList.remove("open"); applyLang(); };
      document.addEventListener("click", function(e){ if(!wrap.classList.contains("open")) return; if(wrap.contains(e.target)) return; wrap.classList.remove("open"); });
    }
    applyLang();
    var meta=document.querySelector('meta[name="viewport"]');
    if(meta) meta.setAttribute("content","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover");
  }
  function mount(){
    if(loggedIn()){ teardown(); return; }
    if(document.getElementById("ocGoldLogin")){ bind(); return; }
    if(!document.getElementById("ocGoldLoginCss")){ var st=document.createElement("style"); st.id="ocGoldLoginCss"; st.appendChild(document.createTextNode(CSS)); document.head.appendChild(st); }
    document.body.classList.add("auth-open");
    var box=document.createElement("div"); box.id="ocGoldLogin";
    box.innerHTML='<div class="viewport-wrapper"><div class="top-banner"><span>Get the official app to browse faster. <a href="#" id="ocInstall">Install</a></span></div>'+langHTML()+'<div class="main-content"><div class="logo-container"><img src="'+LOGO+'" alt="Own Club Share Logo" onerror="this.onerror=null;this.src=\'/own-club-logo.jpg?v=62\'"></div><div class="form-container">'+loginHTML()+signupHTML()+forgotHTML()+'<div id="ocErr" class="oc-err"></div></div></div><div class="bottom-actions"><button type="button" class="btn-signup" id="ocCreateBtn">Create new account</button><div class="footer-brand">Own Club Share</div></div></div>';
    document.body.appendChild(box); bind();
    var _show=window.showApp;
    if(typeof _show==="function" && !_show._goldWrapped){ window.showApp=function(){ var r=_show.apply(this, arguments); try{ if(loggedIn()) teardown(); }catch(e){} return r; }; window.showApp._goldWrapped=true; }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  setTimeout(mount,40); setTimeout(mount,250); setTimeout(mount,900);
})();
