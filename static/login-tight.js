(function(){
  var LOGO = "/static/own-club-logo.jpg?v=56";
  var CSS = [
    '#ocGoldLogin{position:fixed;inset:0;z-index:2147483646;background:#0b0c10;color:#ffffff;',
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    'overflow:auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;margin:0;',
    'display:flex;flex-direction:column;align-items:center;justify-content:space-between;',
    'padding:0 16px calc(24px + env(safe-area-inset-bottom,0px)) 16px;box-sizing:border-box;',
    '-webkit-tap-highlight-color:transparent;pointer-events:auto;}',
    '#ocGoldLogin *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;pointer-events:auto;}',
    '#ocGoldLogin .language-text{color:#85929E;font-size:0.85rem;margin-top:0;width:100%;text-align:center;',
    'padding-top:calc(18px + env(safe-area-inset-top,0px));}',
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
      try{
        el.dispatchEvent(new Event("input", {bubbles:true}));
        el.dispatchEvent(new Event("change", {bubbles:true}));
      }catch(e){}
    }
    return el;
  }

  function loggedIn(){
    try{
      if(typeof currentUser === "function" && currentUser()) return true;
    }catch(e){}
    try{
      if(window.state && state.currentUserId) return true;
    }catch(e){}
    var main = document.getElementById("mainApp");
    return !!(main && !main.classList.contains("hidden") && main.style.display !== "none");
  }

  function teardown(){
    var box = document.getElementById("ocGoldLogin");
    if(box) box.remove();
    var auth = document.getElementById("authScreen");
    if(auth){
      auth.classList.add("hidden");
      auth.style.setProperty("display","none","important");
      auth.style.visibility = "hidden";
    }
    document.documentElement.classList.remove("auth-open");
    document.body.classList.remove("auth-open");
    var main = document.getElementById("mainApp");
    if(main){
      main.classList.remove("hidden");
      main.style.setProperty("display","block","important");
      main.style.visibility = "visible";
    }
  }

  function showErr(msg){
    var el = document.getElementById("ocErr");
    if(el){ el.className = "oc-err"; el.textContent = msg || ""; }
  }
  function showOk(msg){
    var el = document.getElementById("ocErr");
    if(el){ el.className = "oc-ok"; el.textContent = msg || ""; }
  }

  function showPane(which){
    var login = document.getElementById("ocLoginPane");
    var signup = document.getElementById("ocSignupPane");
    if(login) login.classList.toggle("hidden", which !== "login");
    if(signup) signup.classList.toggle("hidden", which !== "signup");
    showErr("");
  }

  function copyLogin(){
    var id = (document.getElementById("ocId") || {}).value || "";
    var pass = (document.getElementById("ocPass") || {}).value || "";
    setVal("loginId", id);
    setVal("loginPass", pass);
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
    setVal("suEmail", email);
    setVal("suPass", pass);
    setVal("suPass2", pass2);
    setVal("suInvite", invite || "IMXT2Y0M8D");
    try{ if(typeof updatePhonePreview === "function") updatePhonePreview(); }catch(e){}
    try{ if(typeof onSignupCountryChange === "function") onSignupCountryChange(); }catch(e){}
  }

  function finishIfIn(){
    if(loggedIn()){
      try{ if(typeof showApp === "function") showApp(); }catch(e){}
      teardown();
      return true;
    }
    return false;
  }

  function runLogin(){
    showErr("");
    var creds = copyLogin();
    if(!creds.id){ showErr("Enter mobile number or email"); return; }
    if(!creds.pass){ showErr("Enter password"); return; }
    var oldAlert = window.alert;
    var captured = "";
    window.alert = function(m){ captured = String(m||""); };
    try{
      if(typeof doLogin === "function") doLogin();
      else if(typeof window.doLogin === "function") window.doLogin();
      else captured = "Login engine not loaded. Refresh the page.";
    }catch(err){
      captured = (err && err.message) ? err.message : String(err);
    }
    window.alert = oldAlert;
    setTimeout(function(){
      if(finishIfIn()){ showOk("Welcome"); return; }
      if(captured) showErr(captured.replace(/\n/g," — "));
      else showErr("Login did not complete. Check details and try again.");
    }, 60);
  }

  function runSignup(){
    showErr("");
    copySignup();
    var name = (document.getElementById("ocSuName") || {}).value || "";
    var phone = (document.getElementById("ocSuPhone") || {}).value || "";
    var email = (document.getElementById("ocSuEmail") || {}).value || "";
    var pass = (document.getElementById("ocSuPass") || {}).value || "";
    var pass2 = (document.getElementById("ocSuPass2") || {}).value || "";
    if(!String(name).trim() || !String(phone).trim() || !String(email).trim() || !pass){
      showErr("Fill name, mobile, email and password");
      return;
    }
    if(pass !== pass2){ showErr("Passwords do not match"); return; }
    var oldAlert = window.alert;
    var captured = "";
    window.alert = function(m){ captured = String(m||""); };
    try{
      if(typeof switchAuth === "function") switchAuth("signup");
      if(typeof doSignup === "function") doSignup();
      else captured = "Signup engine not loaded. Refresh the page.";
    }catch(err){
      captured = (err && err.message) ? err.message : String(err);
    }
    window.alert = oldAlert;
    setTimeout(function(){
      if(finishIfIn()){ showOk("Account created"); return; }
      if(captured) showErr(captured.replace(/\n/g," — "));
      else showErr("Could not create account. Check the invite code and try again.");
    }, 80);
  }

  function loginHTML(){
    return ''+
      '<div class="oc-pane" id="ocLoginPane">'+
        '<input type="text" class="input-field" id="ocId" placeholder="Mobile number or email address" autocomplete="username" inputmode="email">'+
        '<input type="password" class="input-field" id="ocPass" placeholder="Password" autocomplete="current-password">'+
        '<button type="button" class="btn-login" id="ocLoginBtn">Log In</button>'+
        '<button type="button" class="forgot-link" id="ocForgotBtn">Forgotten password?</button>'+
      '</div>';
  }

  function signupHTML(){
    return ''+
      '<div class="oc-pane hidden" id="ocSignupPane">'+
        '<input type="text" class="input-field" id="ocSuName" placeholder="Full name" autocomplete="name">'+
        '<input type="tel" class="input-field" id="ocSuPhone" placeholder="Mobile number" autocomplete="tel" inputmode="tel">'+
        '<input type="email" class="input-field" id="ocSuEmail" placeholder="Email address" autocomplete="email">'+
        '<input type="password" class="input-field" id="ocSuPass" placeholder="Password" autocomplete="new-password">'+
        '<input type="password" class="input-field" id="ocSuPass2" placeholder="Confirm password" autocomplete="new-password">'+
        '<input type="text" class="input-field" id="ocSuInvite" placeholder="Invite code IMXT2Y0M8D" autocomplete="off" value="IMXT2Y0M8D">'+
        '<button type="button" class="btn-login" id="ocSignupGo">Create new account</button>'+
        '<button type="button" class="forgot-link" id="ocBackLogin">Already have an account?</button>'+
      '</div>';
  }

  function bind(){
    var loginBtn = document.getElementById("ocLoginBtn");
    var signupGo = document.getElementById("ocSignupGo");
    var createBtn = document.getElementById("ocCreateBtn");
    var forgotBtn = document.getElementById("ocForgotBtn");
    var backBtn = document.getElementById("ocBackLogin");
    var pass = document.getElementById("ocPass");
    if(loginBtn) loginBtn.onclick = function(e){ if(e) e.preventDefault(); runLogin(); };
    if(signupGo) signupGo.onclick = function(e){ if(e) e.preventDefault(); runSignup(); };
    if(createBtn) createBtn.onclick = function(e){
      if(e) e.preventDefault();
      showPane("signup");
      try{ if(typeof switchAuth === "function") switchAuth("signup"); }catch(err){}
    };
    if(backBtn) backBtn.onclick = function(e){ if(e) e.preventDefault(); showPane("login"); };
    if(forgotBtn) forgotBtn.onclick = function(e){
      if(e) e.preventDefault();
      try{ if(typeof openForgotPassword === "function") openForgotPassword(); }
      catch(err){ showErr("Open forgot password from the original form."); }
    };
    if(pass) pass.addEventListener("keydown", function(e){ if(e.key === "Enter") runLogin(); });
  }

  function mount(){
    if(loggedIn()){ teardown(); return; }
    if(document.getElementById("ocGoldLogin")) { bind(); return; }
    if(!document.getElementById("ocGoldLoginCss")){
      var st = document.createElement("style");
      st.id = "ocGoldLoginCss";
      st.appendChild(document.createTextNode(CSS));
      document.head.appendChild(st);
    }
    document.documentElement.classList.add("auth-open");
    document.body.classList.add("auth-open");
    var box = document.createElement("div");
    box.id = "ocGoldLogin";
    box.innerHTML =
      '<div class="language-text">English (UK)</div>'+
      '<div class="main-content">'+
        '<div class="logo-container"><img src="'+LOGO+'" alt="Own Club Share Logo" onerror="this.onerror=null;this.src=\'/own-club-logo.jpg?v=56\'"></div>'+
        '<div class="form-container">'+loginHTML()+signupHTML()+'<div id="ocErr" class="oc-err"></div></div>'+
      '</div>'+
      '<div class="bottom-actions">'+
        '<button type="button" class="btn-signup" id="ocCreateBtn">Create new account</button>'+
        '<div class="footer-brand">Own Club Share</div>'+
      '</div>';
    document.body.appendChild(box);
    bind();
    var _show = window.showApp;
    if(typeof _show === "function" && !_show._goldWrapped){
      window.showApp = function(){
        var r = _show.apply(this, arguments);
        try{ if(loggedIn()) teardown(); }catch(e){}
        return r;
      };
      window.showApp._goldWrapped = true;
    }
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
  setTimeout(mount, 40);
  setTimeout(mount, 250);
  setTimeout(mount, 900);
})();
