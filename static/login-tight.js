(function(){
  var LOGO = "/static/own-club-logo.jpg?v=53";
  var CSS = [
    '#ocGoldLogin{position:fixed;inset:0;z-index:2147483646;background:#0b0c10;color:#ffffff;',
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    'overflow:hidden;width:100%;height:100%;margin:0;padding:0;',
    'display:flex;flex-direction:column;align-items:center;justify-content:space-between;',
    'padding:0 16px calc(24px + env(safe-area-inset-bottom,0px)) 16px;box-sizing:border-box;',
    '-webkit-tap-highlight-color:transparent;}',
    '#ocGoldLogin *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0;padding:0;}',
    '#ocGoldLogin .top-banner{width:calc(100% + 32px);margin-left:-16px;margin-right:-16px;',
    'background-color:#1f2833;padding:12px 16px;padding-top:calc(12px + env(safe-area-inset-top,0px));',
    'font-size:0.85rem;color:#c5a880;text-align:center;border-bottom:1px solid rgba(212,175,55,0.2);}',
    '#ocGoldLogin .top-banner a{color:#d4af37;text-decoration:none;font-weight:600;margin-left:4px;}',
    '#ocGoldLogin .language-text{color:#85929E;font-size:0.85rem;margin-top:14px;width:100%;text-align:center;}',
    '#ocGoldLogin .main-content{width:100%;max-width:380px;display:flex;flex-direction:column;',
    'align-items:center;justify-content:center;flex-grow:1;padding:10px 0;}',
    '#ocGoldLogin .logo-container{width:110px;height:110px;margin-bottom:24px;border-radius:50%;overflow:hidden;',
    'border:2px solid #d4af37;box-shadow:0 0 15px rgba(212,175,55,0.2);background-color:#000000;',
    'flex:0 0 110px;}',
    '#ocGoldLogin .logo-container img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}',
    '#ocGoldLogin .form-container{width:100%;}',
    '#ocGoldLogin .input-field{width:100%;padding:14px 16px;font-size:1rem;border:1px solid #c5a880;border-radius:12px;',
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
    '#authScreen.hidden,#ocGoldLogin.hidden{display:none!important;visibility:hidden!important;pointer-events:none!important;}',
    '#mainApp:not(.hidden){display:block!important;}',
    '#mainApp:not(.hidden) nav.bottom{display:grid!important;position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:10080!important;}',
    'body.auth-open .space-bg,body.auth-open #leagueFx,body.auth-open .league-fx,body.auth-open #particleCanvas,',
    'body.auth-open #homeBgUcl,body.auth-open .pitch,body.auth-open .pitch-lines{display:none!important;opacity:0!important;visibility:hidden!important;}'
  ].join('');

  function teardown(){
    var box=document.getElementById('ocGoldLogin');
    if(box) box.remove();
    var auth=document.getElementById('authScreen');
    if(auth){ auth.classList.add('hidden'); auth.style.setProperty('display','none','important'); }
    document.documentElement.classList.remove('auth-open');
    document.body.classList.remove('auth-open');
    var main=document.getElementById('mainApp');
    if(main){ main.classList.remove('hidden'); main.style.setProperty('display','block','important'); }
  }

  function mount(){
    var host=document.getElementById('authScreen')||document.body;
    if(document.getElementById('ocGoldLogin')) return;
    if(host.classList && host.classList.contains('hidden')) return;
    if(!document.getElementById('ocGoldLoginCss')){
      var st=document.createElement('style');
      st.id='ocGoldLoginCss';
      st.appendChild(document.createTextNode(CSS));
      document.head.appendChild(st);
    }
    document.documentElement.classList.add('auth-open');
    document.body.classList.add('auth-open');
    var box=document.createElement('div');
    box.id='ocGoldLogin';
    box.innerHTML=
      '<div class="top-banner"><span>Get the official app to browse faster. <a href="#" id="ocDl">Install</a></span></div>'+
      '<div class="language-text">English (UK)</div>'+
      '<div class="main-content">'+
        '<div class="logo-container"><img src="'+LOGO+'" alt="Own Club Share Logo" onerror="this.onerror=null;this.src=\'/own-club-logo.jpg\'"></div>'+
        '<div class="form-container">'+
          '<input type="text" class="input-field" id="ocId" placeholder="Mobile number or email address" autocomplete="username" required>'+
          '<input type="password" class="input-field" id="ocPass" placeholder="Password" autocomplete="current-password" required>'+
          '<button type="button" class="btn-login" id="ocLoginBtn">Log In</button>'+
          '<button type="button" class="forgot-link" id="ocForgotBtn">Forgotten password?</button>'+
        '</div>'+
      '</div>'+
      '<div class="bottom-actions">'+
        '<button type="button" class="btn-signup" id="ocCreateBtn">Create new account</button>'+
        '<div class="footer-brand">Own Club Share</div>'+
      '</div>';
    host.appendChild(box);

    function copy(){
      var a=document.getElementById('loginId')||document.querySelector('#loginForm input[type=email],#loginForm input[type=text]');
      var b=document.getElementById('loginPass')||document.querySelector('#loginForm input[type=password]');
      if(a) a.value=document.getElementById('ocId').value;
      if(b) b.value=document.getElementById('ocPass').value;
    }
    document.getElementById('ocLoginBtn').onclick=function(){
      copy();
      if(typeof doLogin==='function') doLogin();
      setTimeout(function(){
        var main=document.getElementById('mainApp');
        if(main && !main.classList.contains('hidden')) teardown();
      }, 80);
    };
    document.getElementById('ocPass').addEventListener('keydown',function(e){
      if(e.key==='Enter') document.getElementById('ocLoginBtn').click();
    });
    document.getElementById('ocForgotBtn').onclick=function(){
      if(typeof openForgotPassword==='function') openForgotPassword();
    };
    document.getElementById('ocCreateBtn').onclick=function(){
      if(typeof switchAuth==='function') switchAuth('signup');
    };
    document.getElementById('ocDl').onclick=function(e){ e.preventDefault(); };

    var _show = window.showApp;
    if(typeof _show==='function' && !_show._goldWrapped){
      window.showApp=function(){
        var r=_show.apply(this, arguments);
        try{
          var main=document.getElementById('mainApp');
          if(main && !main.classList.contains('hidden')) teardown();
        }catch(e){}
        return r;
      };
      window.showApp._goldWrapped=true;
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  setTimeout(mount, 30);
  setTimeout(mount, 200);
})();
