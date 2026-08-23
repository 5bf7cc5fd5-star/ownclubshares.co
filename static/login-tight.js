(function(){
  var LOGO = "/static/own-club-logo.jpg?v=57";
  var LANGS = [
    {id:"en-GB", name:"English (UK)"},
    {id:"en-US", name:"English (US)"},
    {id:"lg", name:"Luganda"},
    {id:"sw", name:"Kiswahili"},
    {id:"rw", name:"Ikinyarwanda"},
    {id:"nyn", name:"Runyankole"},
    {id:"ach", name:"Acholi"},
    {id:"luo", name:"Dholuo"},
    {id:"so", name:"Somali"},
    {id:"am", name:"Amharic"},
    {id:"ar", name:"العربية"},
    {id:"fr", name:"Français"},
    {id:"es", name:"Español"},
    {id:"pt", name:"Português"},
    {id:"de", name:"Deutsch"},
    {id:"tr", name:"Türkçe"},
    {id:"it", name:"Italiano"},
    {id:"nl", name:"Nederlands"},
    {id:"ru", name:"Русский"},
    {id:"uk", name:"Українська"},
    {id:"pl", name:"Polski"},
    {id:"hi", name:"हिन्दी"},
    {id:"ur", name:"اردو"},
    {id:"bn", name:"বাংলা"},
    {id:"ta", name:"தமிழ்"},
    {id:"zh", name:"中文"},
    {id:"ja", name:"日本語"},
    {id:"ko", name:"한국어"},
    {id:"vi", name:"Tiếng Việt"},
    {id:"th", name:"ไทย"},
    {id:"id", name:"Bahasa Indonesia"},
    {id:"ms", name:"Bahasa Melayu"},
    {id:"fil", name:"Filipino"},
    {id:"ha", name:"Hausa"},
    {id:"yo", name:"Yorùbá"},
    {id:"zu", name:"isiZulu"},
    {id:"af", name:"Afrikaans"},
    {id:"he", name:"עברית"},
    {id:"fa", name:"فارسی"}
  ];
  var I18N = {
    "en-GB":{login:"Log In",forgot:"Forgotten password?",create:"Create new account",id:"Mobile number or email address",pass:"Password",name:"Full name",phone:"Mobile number",email:"Email address",pass2:"Confirm password",invite:"Invite code IMXT2Y0M8D",signup:"Create new account",back:"Already have an account?",needId:"Enter mobile number or email",needPass:"Enter password",fill:"Fill name, mobile, email and password",mismatch:"Passwords do not match"},
    "en-US":{login:"Log In",forgot:"Forgot password?",create:"Create new account",id:"Mobile number or email address",pass:"Password",name:"Full name",phone:"Mobile number",email:"Email address",pass2:"Confirm password",invite:"Invite code IMXT2Y0M8D",signup:"Create new account",back:"Already have an account?",needId:"Enter mobile number or email",needPass:"Enter password",fill:"Fill name, mobile, email and password",mismatch:"Passwords do not match"},
    "lg":{login:"Yingira",forgot:"Werabidde ekigambo ky'okuyingira?",create:"Tonda akawunti empya",id:"Ennamba y'essimu oba email",pass:"Ekigambo ky'okuyingira",name:"Erinnya lyonna",phone:"Ennamba y'essimu",email:"Email",pass2:"Ddamu ekigambo ky'okuyingira",invite:"Koodi y'okuyita IMXT2Y0M8D",signup:"Tonda akawunti empya",back:"Olina akawunti?",needId:"Yingiza essimu oba email",needPass:"Yingiza ekigambo ky'okuyingira",fill:"Jjuza amannya, essimu, email n'ekigambo",mismatch:"Ebigambo by'okuyingira tebikwatagana"},
    "sw":{login:"Ingia",forgot:"Umesahau nenosiri?",create:"Fungua akaunti mpya",id:"Namba ya simu au barua pepe",pass:"Nenosiri",name:"Jina kamili",phone:"Namba ya simu",email:"Barua pepe",pass2:"Thibitisha nenosiri",invite:"Msimbo wa mwaliko IMXT2Y0M8D",signup:"Fungua akaunti mpya",back:"Tayari una akaunti?",needId:"Weka namba ya simu au barua pepe",needPass:"Weka nenosiri",fill:"Jaza jina, simu, barua pepe na nenosiri",mismatch:"Manenosiri hayafanani"}
  };
  I18N.ar = {login:"تسجيل الدخول",forgot:"هل نسيت كلمة السر؟",create:"إنشاء حساب جديد",id:"رقم الجوال أو البريد",pass:"كلمة السر",name:"الاسم الكامل",phone:"رقم الجوال",email:"البريد الإلكتروني",pass2:"تأكيد كلمة السر",invite:"رمز الدعوة IMXT2Y0M8D",signup:"إنشاء حساب جديد",back:"لديك حساب بالفعل؟",needId:"أدخل الجوال أو البريد",needPass:"أدخل كلمة السر",fill:"أكمل الاسم والجوال والبريد وكلمة السر",mismatch:"كلمتا السر غير متطابقتين"};
  I18N.fr = {login:"Connexion",forgot:"Mot de passe oublié ?",create:"Créer un nouveau compte",id:"Numéro mobile ou e-mail",pass:"Mot de passe",name:"Nom complet",phone:"Numéro mobile",email:"E-mail",pass2:"Confirmer le mot de passe",invite:"Code d'invitation IMXT2Y0M8D",signup:"Créer un nouveau compte",back:"Vous avez déjà un compte ?",needId:"Entrez mobile ou e-mail",needPass:"Entrez le mot de passe",fill:"Remplissez nom, mobile, e-mail et mot de passe",mismatch:"Les mots de passe ne correspondent pas"};

  function t(){ var id = currentLang(); return I18N[id] || I18N["en-GB"]; }
  function currentLang(){ try{ return localStorage.getItem("ocLang") || "en-GB"; }catch(e){ return "en-GB"; } }
  function langName(id){ for(var i=0;i<LANGS.length;i++) if(LANGS[i].id===id) return LANGS[i].name; return "English (UK)"; }

  var CSS = [
    '#ocGoldLogin{position:fixed;inset:0;z-index:2147483646;background:#0b0c10;color:#ffffff;',
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    'overflow:auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;margin:0;',
    'display:flex;flex-direction:column;align-items:center;justify-content:space-between;',
    'padding:0 16px calc(24px + env(safe-area-inset-bottom,0px)) 16px;box-sizing:border-box;',
    '-webkit-tap-highlight-color:transparent;pointer-events:auto;}',
    '#ocGoldLogin *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;pointer-events:auto;}',
    '#ocGoldLogin .lang-wrap{width:100%;max-width:380px;position:relative;z-index:5;',
    'padding-top:calc(16px + env(safe-area-inset-top,0px));text-align:center;}',
    '#ocGoldLogin .lang-btn{background:none;border:0;color:#85929E;font-size:0.85rem;font-weight:600;',
    'cursor:pointer;font-family:inherit;padding:8px 12px;}',
    '#ocGoldLogin .lang-btn:after{content:" ▾";font-size:10px;color:#d4af37;}',
    '#ocGoldLogin .lang-menu{display:none;position:absolute;left:50%;transform:translateX(-50%);top:100%;',
    'width:min(92vw,340px);max-height:52vh;overflow:auto;-webkit-overflow-scrolling:touch;',
    'background:#1f2833;border:1px solid rgba(212,175,55,.35);border-radius:14px;',
    'box-shadow:0 12px 32px rgba(0,0,0,.45);text-align:left;z-index:20;}',
    '#ocGoldLogin .lang-wrap.open .lang-menu{display:block;}',
    '#ocGoldLogin .lang-item{display:block;width:100%;background:none;border:0;border-bottom:1px solid rgba(255,255,255,.06);',
    'color:#fff;font-size:15px;text-align:left;padding:12px 16px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .lang-item:last-child{border-bottom:0;}',
    '#ocGoldLogin .lang-item.active{color:#d4af37;font-weight:700;}',
    '#ocGoldLogin .main-content{width:100%;max-width:380px;display:flex;flex-direction:column;',
    'align-items:center;justify-content:center;flex-grow:1;padding:10px 0;}',
    '#ocGoldLogin .logo-container{width:110px;height:110px;margin-bottom:20px;border-radius:50%;overflow:hidden;',
    'border:2px solid #d4af37;box-shadow:0 0 15px rgba(212,175,55,0.2);background-color:#000;',
    'flex:0 0 110px;}',
    '#ocGoldLogin .logo-container img{width:100%;height:100%;object-fit:contain;object-position:center;display:block;background:#000;}',
    '#ocGoldLogin .form-container{width:100%;}',
    '#ocGoldLogin .input-field{width:100%;padding:14px 16px;font-size:16px;border:1px solid #c5a880;border-radius:12px;',
    'outline:none;background-color:#1f2833;margin-bottom:10px;color:#ffffff;font-family:inherit;}',
    '#ocGoldLogin .input-field::placeholder{color:#85929E;}',
    '#ocGoldLogin .input-field:focus{border-color:#d4af37;}',
    '#ocGoldLogin .btn-login{width:100%;background:linear-gradient(135deg,#d4af37 0%,#aa7c11 100%);color:#000000;',
    'border:none;border-radius:25px;font-size:1rem;font-weight:700;padding:14px;margin-top:6px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .btn-login:active{opacity:0.9;}',
    '#ocGoldLogin .forgot-link{display:block;text-align:center;margin-top:16px;margin-bottom:0;color:#c5a880;',
    'text-decoration:none;font-size:0.95rem;font-weight:600;background:none;border:0;width:100%;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .bottom-actions{width:100%;max-width:380px;text-align:center;margin-top:auto;flex:0 0 auto;}',
    '#ocGoldLogin .btn-signup{display:block;width:100%;background-color:transparent;color:#d4af37;border:1px solid #d4af37;',
    'border-radius:25px;font-size:0.95rem;font-weight:600;padding:11px;text-decoration:none;text-align:center;',
    'margin-bottom:16px;cursor:pointer;font-family:inherit;}',
    '#ocGoldLogin .btn-signup:active{background-color:rgba(212,175,55,0.1);}',
    '#ocGoldLogin .footer-brand{font-size:0.75rem;color:#85929E;font-weight:600;letter-spacing:2px;text-transform:uppercase;}',
    '#ocGoldLogin .oc-err{min-height:18px;margin:8px 0 0;color:#ff6b6b;font-size:13px;text-align:center;font-weight:600;}',
    '#ocGoldLogin .oc-ok{min-height:18px;margin:8px 0 0;color:#d4af37;font-size:13px;text-align:center;font-weight:600;}',
    '#ocGoldLogin .oc-pane{width:100%;}',
    '#ocGoldLogin .oc-pane.hidden{display:none!important;}',
    '#ocGoldLogin[dir=rtl] .lang-item{text-align:right;}',
    '#authScreen.hidden{display:none!important;visibility:hidden!important;}',
    '#mainApp:not(.hidden){display:block!important;}',
    'body.auth-open nav.bottom{display:none!important;}',
    'body.auth-open .space-bg,body.auth-open #leagueFx,body.auth-open .league-fx,body.auth-open #particleCanvas,',
    'body.auth-open #homeBgUcl,body.auth-open .pitch,body.auth-open .pitch-lines{display:none!important;opacity:0!important;visibility:hidden!important;}'
  ].join('');

  function setVal(id, v){
    var el = document.getElementById(id);
    if(el){
      el.value = v == null ? "" : String(v);
      try{ el.dispatchEvent(new Event("input", {bubbles:true})); el.dispatchEvent(new Event("change", {bubbles:true})); }catch(e){}
    }
    return el;
  }
  function loggedIn(){
    try{ if(typeof currentUser === "function" && currentUser()) return true; }catch(e){}
    try{ if(window.state && state.currentUserId) return true; }catch(e){}
    var main = document.getElementById("mainApp");
    return !!(main && !main.classList.contains("hidden") && main.style.display !== "none");
  }
  function teardown(){
    var box = document.getElementById("ocGoldLogin"); if(box) box.remove();
    var auth = document.getElementById("authScreen");
    if(auth){ auth.classList.add("hidden"); auth.style.setProperty("display","none","important"); auth.style.visibility = "hidden"; }
    document.documentElement.classList.remove("auth-open"); document.body.classList.remove("auth-open");
    var main = document.getElementById("mainApp");
    if(main){ main.classList.remove("hidden"); main.style.setProperty("display","block","important"); main.style.visibility = "visible"; }
  }
  function showErr(msg){ var el = document.getElementById("ocErr"); if(el){ el.className = "oc-err"; el.textContent = msg || ""; } }
  function showOk(msg){ var el = document.getElementById("ocErr"); if(el){ el.className = "oc-ok"; el.textContent = msg || ""; } }
  function showPane(which){
    var login = document.getElementById("ocLoginPane"); var signup = document.getElementById("ocSignupPane");
    if(login) login.classList.toggle("hidden", which !== "login");
    if(signup) signup.classList.toggle("hidden", which !== "signup");
    showErr("");
  }
  function applyLang(){
    var box = document.getElementById("ocGoldLogin"); if(!box) return;
    var id = currentLang(); var s = t();
    box.setAttribute("dir", (id==="ar"||id==="ur"||id==="he"||id==="fa") ? "rtl" : "ltr");
    var btn = document.getElementById("ocLangBtn"); if(btn) btn.textContent = langName(id);
    var setPH = function(fid, val){ var el=document.getElementById(fid); if(el) el.placeholder = val; };
    setPH("ocId", s.id); setPH("ocPass", s.pass);
    setPH("ocSuName", s.name); setPH("ocSuPhone", s.phone); setPH("ocSuEmail", s.email);
    setPH("ocSuPass", s.pass); setPH("ocSuPass2", s.pass2); setPH("ocSuInvite", s.invite);
    var map = {ocLoginBtn:s.login, ocForgotBtn:s.forgot, ocCreateBtn:s.create, ocSignupGo:s.signup, ocBackLogin:s.back};
    Object.keys(map).forEach(function(k){ var el=document.getElementById(k); if(el) el.textContent = map[k]; });
    var menu = document.getElementById("ocLangMenu");
    if(menu){ menu.querySelectorAll(".lang-item").forEach(function(it){ it.classList.toggle("active", it.getAttribute("data-lang")===id); }); }
  }
  function copyLogin(){
    var id = (document.getElementById("ocId") || {}).value || "";
    var pass = (document.getElementById("ocPass") || {}).value || "";
    setVal("loginId", id); setVal("loginPass", pass);
    return {id: String(id).trim(), pass: String(pass)};
  }
  function copySignup(){
    var name = (document.getElementById("ocSuName") || {}).value || "";
    var phone = (document.getElementById("ocSuPhone") || {}).value || "";
    var email = (document.getElementById("ocSuEmail") || {}).value || "";
    var pass = (document.getElementById("ocSuPass") || {}).value || "";
    var pass2 = (document.getElementById("ocSuPass2") || {}).value || "";
    var invite = (document.getElementById("ocSuInvite") || {}).value || "";
    setVal("suName", name);
    setVal("suPhoneLocal", String(phone).replace(/\D/g,"").replace(/^256/,"").replace(/^0/,""));
    setVal("suEmail", email); setVal("suPass", pass); setVal("suPass2", pass2);
    setVal("suInvite", invite || "IMXT2Y0M8D");
    try{ if(typeof updatePhonePreview === "function") updatePhonePreview(); }catch(e){}
    try{ if(typeof onSignupCountryChange === "function") onSignupCountryChange(); }catch(e){}
  }
  function finishIfIn(){
    if(loggedIn()){ try{ if(typeof showApp === "function") showApp(); }catch(e){} teardown(); return true; }
    return false;
  }
  function runLogin(){
    var s = t(); showErr(""); var creds = copyLogin();
    if(!creds.id){ showErr(s.needId); return; }
    if(!creds.pass){ showErr(s.needPass); return; }
    var oldAlert = window.alert; var captured = "";
    window.alert = function(m){ captured = String(m||""); };
    try{ if(typeof doLogin === "function") doLogin(); else if(typeof window.doLogin === "function") window.doLogin(); else captured = "Login engine not loaded. Refresh the page."; }
    catch(err){ captured = (err && err.message) ? err.message : String(err); }
    window.alert = oldAlert;
    setTimeout(function(){ if(finishIfIn()){ showOk("Welcome"); return; } if(captured) showErr(captured.replace(/\n/g," — ")); else showErr("Login did not complete. Check details and try again."); }, 60);
  }
  function runSignup(){
    var s = t(); showErr(""); copySignup();
    var name = (document.getElementById("ocSuName") || {}).value || "";
    var phone = (document.getElementById("ocSuPhone") || {}).value || "";
    var email = (document.getElementById("ocSuEmail") || {}).value || "";
    var pass = (document.getElementById("ocSuPass") || {}).value || "";
    var pass2 = (document.getElementById("ocSuPass2") || {}).value || "";
    if(!String(name).trim() || !String(phone).trim() || !String(email).trim() || !pass){ showErr(s.fill); return; }
    if(pass !== pass2){ showErr(s.mismatch); return; }
    var oldAlert = window.alert; var captured = "";
    window.alert = function(m){ captured = String(m||""); };
    try{ if(typeof switchAuth === "function") switchAuth("signup"); if(typeof doSignup === "function") doSignup(); else captured = "Signup engine not loaded. Refresh the page."; }
    catch(err){ captured = (err && err.message) ? err.message : String(err); }
    window.alert = oldAlert;
    setTimeout(function(){ if(finishIfIn()){ showOk("Account created"); return; } if(captured) showErr(captured.replace(/\n/g," — ")); else showErr("Could not create account. Check the invite code and try again."); }, 80);
  }
  function loginHTML(){
    return '<div class="oc-pane" id="ocLoginPane">'+
      '<input type="text" class="input-field" id="ocId" placeholder="Mobile number or email address" autocomplete="username" inputmode="email">'+
      '<input type="password" class="input-field" id="ocPass" placeholder="Password" autocomplete="current-password">'+
      '<button type="button" class="btn-login" id="ocLoginBtn">Log In</button>'+
      '<button type="button" class="forgot-link" id="ocForgotBtn">Forgotten password?</button></div>';
  }
  function signupHTML(){
    return '<div class="oc-pane hidden" id="ocSignupPane">'+
      '<input type="text" class="input-field" id="ocSuName" placeholder="Full name" autocomplete="name">'+
      '<input type="tel" class="input-field" id="ocSuPhone" placeholder="Mobile number" autocomplete="tel" inputmode="tel">'+
      '<input type="email" class="input-field" id="ocSuEmail" placeholder="Email address" autocomplete="email">'+
      '<input type="password" class="input-field" id="ocSuPass" placeholder="Password" autocomplete="new-password">'+
      '<input type="password" class="input-field" id="ocSuPass2" placeholder="Confirm password" autocomplete="new-password">'+
      '<input type="text" class="input-field" id="ocSuInvite" placeholder="Invite code IMXT2Y0M8D" autocomplete="off" value="IMXT2Y0M8D">'+
      '<button type="button" class="btn-login" id="ocSignupGo">Create new account</button>'+
      '<button type="button" class="forgot-link" id="ocBackLogin">Already have an account?</button></div>';
  }
  function langHTML(){
    var cur = currentLang();
    var items = LANGS.map(function(L){ return '<button type="button" class="lang-item'+(L.id===cur?' active':'')+'" data-lang="'+L.id+'">'+L.name+'</button>'; }).join('');
    return '<div class="lang-wrap" id="ocLangWrap"><button type="button" class="lang-btn" id="ocLangBtn">'+langName(cur)+'</button><div class="lang-menu" id="ocLangMenu">'+items+'</div></div>';
  }
  function bind(){
    var loginBtn = document.getElementById("ocLoginBtn");
    var signupGo = document.getElementById("ocSignupGo");
    var createBtn = document.getElementById("ocCreateBtn");
    var forgotBtn = document.getElementById("ocForgotBtn");
    var backBtn = document.getElementById("ocBackLogin");
    var pass = document.getElementById("ocPass");
    var wrap = document.getElementById("ocLangWrap");
    var langBtn = document.getElementById("ocLangBtn");
    if(loginBtn) loginBtn.onclick = function(e){ if(e) e.preventDefault(); runLogin(); };
    if(signupGo) signupGo.onclick = function(e){ if(e) e.preventDefault(); runSignup(); };
    if(createBtn) createBtn.onclick = function(e){ if(e) e.preventDefault(); showPane("signup"); try{ if(typeof switchAuth === "function") switchAuth("signup"); }catch(err){} };
    if(backBtn) backBtn.onclick = function(e){ if(e) e.preventDefault(); showPane("login"); };
    if(forgotBtn) forgotBtn.onclick = function(e){ if(e) e.preventDefault(); try{ if(typeof openForgotPassword === "function") openForgotPassword(); }catch(err){ showErr("Open forgot password from the original form."); } };
    if(pass) pass.addEventListener("keydown", function(e){ if(e.key === "Enter") runLogin(); });
    if(langBtn && wrap && !wrap._ocBound){
      wrap._ocBound = true;
      langBtn.onclick = function(e){ if(e){ e.preventDefault(); e.stopPropagation(); } wrap.classList.toggle("open"); };
      var menu = document.getElementById("ocLangMenu");
      if(menu){ menu.onclick = function(e){ var it = e.target && e.target.closest ? e.target.closest(".lang-item") : null; if(!it) return; var id = it.getAttribute("data-lang"); try{ localStorage.setItem("ocLang", id); }catch(err){} wrap.classList.remove("open"); applyLang(); }; }
      document.addEventListener("click", function(e){ if(!wrap.classList.contains("open")) return; if(wrap.contains(e.target)) return; wrap.classList.remove("open"); });
    }
    applyLang();
  }
  function mount(){
    if(loggedIn()){ teardown(); return; }
    if(document.getElementById("ocGoldLogin")) { bind(); return; }
    if(!document.getElementById("ocGoldLoginCss")){ var st = document.createElement("style"); st.id = "ocGoldLoginCss"; st.appendChild(document.createTextNode(CSS)); document.head.appendChild(st); }
    document.documentElement.classList.add("auth-open"); document.body.classList.add("auth-open");
    var box = document.createElement("div"); box.id = "ocGoldLogin";
    box.innerHTML = langHTML()+'<div class="main-content"><div class="logo-container"><img src="'+LOGO+'" alt="Own Club Share Logo" onerror="this.onerror=null;this.src=\'/own-club-logo.jpg?v=57\'"></div><div class="form-container">'+loginHTML()+signupHTML()+'<div id="ocErr" class="oc-err"></div></div></div><div class="bottom-actions"><button type="button" class="btn-signup" id="ocCreateBtn">Create new account</button><div class="footer-brand">Own Club Share</div></div>';
    document.body.appendChild(box); bind();
    var _show = window.showApp;
    if(typeof _show === "function" && !_show._goldWrapped){ window.showApp = function(){ var r = _show.apply(this, arguments); try{ if(loggedIn()) teardown(); }catch(e){} return r; }; window.showApp._goldWrapped = true; }
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  setTimeout(mount, 40); setTimeout(mount, 250); setTimeout(mount, 900);
})();
