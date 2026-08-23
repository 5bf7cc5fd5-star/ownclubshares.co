(function(){
  var NEW_PHONE = "+256779168109";
  var NEW_LOCAL = "0779168109";
  function setViewport(){
    var m = document.querySelector('meta[name="viewport"]');
    if(!m){ m=document.createElement("meta"); m.name="viewport"; document.head.appendChild(m); }
    m.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover");
  }
  function hideWall(){
    [".space-bg",".warp-img",".warp",".warp2",".warp-stars","#leagueFx",".league-fx","#particleCanvas",
     "img[src*='space-wallpaper']","img[src*='ucl-bg']",".bg-space",".wallpaper","#appBg",".app-bg",
     ".pitch",".pitch-lines",".pitch-midline","#homeBgUcl",".glow",".auth-sport-fx",".home-banner"].forEach(function(s){
      document.querySelectorAll(s).forEach(function(el){
        el.style.setProperty("display","none","important");
        el.style.setProperty("visibility","hidden","important");
        el.style.setProperty("opacity","0","important");
      });
    });
    document.documentElement.style.setProperty("background","#0b0c10","important");
    document.body.style.setProperty("background","#0b0c10","important");
  }
  function injectDashboard(){
    var home = document.getElementById("home");
    if(!home || document.getElementById("dashWallet")) return;
    var box = document.createElement("section");
    box.id = "dashWallet"; box.className = "wallet-card";
    box.innerHTML = '<div class="wallet-label">Total Balance</div><div class="wallet-main-balance" id="dashBal">UGX 0</div><div class="wallet-conversion" id="dashUsd">≈ $0.00</div><div class="wallet-actions"><button type="button" class="action-btn btn-deposit" id="dashDep">Deposit</button><button type="button" class="action-btn btn-withdraw" id="dashWd">Withdraw</button></div>';
    var grid = document.createElement("nav"); grid.className = "quick-grid";
    grid.innerHTML = '<button type="button" class="grid-item" data-go="machines"><span class="grid-icon">⚽</span><span class="grid-label">Shares</span></button><button type="button" class="grid-item" data-go="team"><span class="grid-icon">👥</span><span class="grid-label">Team</span></button><button type="button" class="grid-item" data-go="income"><span class="grid-icon">📦</span><span class="grid-label">Income</span></button><button type="button" class="grid-item" data-go="my"><span class="grid-icon">⚙️</span><span class="grid-label">Settings</span></button>';
    var anchor = home.querySelector(".stats-grid") || home.firstChild;
    home.insertBefore(grid, anchor); home.insertBefore(box, grid);
    var dep = document.getElementById("dashDep"); var wd = document.getElementById("dashWd");
    if(dep) dep.onclick = function(){ try{ if(typeof openDepositModal==="function") openDepositModal(); else if(typeof goPage==="function") goPage("income"); }catch(e){} };
    if(wd) wd.onclick = function(){ try{ if(typeof openWithdraw==="function") openWithdraw(); else if(typeof goPage==="function") goPage("income"); }catch(e){} };
    grid.querySelectorAll(".grid-item").forEach(function(it){
      it.onclick = function(){ var p = it.getAttribute("data-go"); if(typeof goPage==="function") goPage(p); };
    });
  }
  function syncDashBal(){
    var out = document.getElementById("dashBal"); if(!out) return;
    var src = document.getElementById("statBalanceTop") || document.getElementById("homeTodayEarn");
    var n = parseFloat(src ? String(src.textContent||"").replace(/[^\d.]/g,"") : "0") || 0;
    out.textContent = "UGX " + Math.round(n).toLocaleString();
    var usd = document.getElementById("dashUsd"); if(usd) usd.textContent = "≈ $" + (n/3700).toFixed(2);
  }
  function pinNav(){
    var nav = document.querySelector("nav.bottom"); if(!nav) return;
    if(nav.parentElement !== document.body) document.body.appendChild(nav);
    var safe = "env(safe-area-inset-bottom, 0px)";
    nav.style.setProperty("display","grid","important");
    nav.style.setProperty("grid-template-columns","1fr 1fr 1fr 1fr 1fr","important");
    nav.style.setProperty("position","fixed","important");
    nav.style.setProperty("left","0","important");
    nav.style.setProperty("right","0","important");
    nav.style.setProperty("bottom","0","important");
    nav.style.setProperty("top","auto","important");
    nav.style.setProperty("width","100%","important");
    nav.style.setProperty("max-width","100%","important");
    nav.style.setProperty("min-height","calc(56px + " + safe + ")","important");
    nav.style.setProperty("padding","8px 0 calc(" + safe + " + 8px) 0","important");
    nav.style.setProperty("z-index","2147483000","important");
    nav.style.setProperty("transform","none","important");
    nav.style.setProperty("background","#141923","important");
    nav.style.setProperty("border-top","1px solid rgba(212,175,55,0.15)","important");
    nav.querySelectorAll(".nav").forEach(function(btn){
      btn.style.setProperty("position","static","important");
      btn.style.setProperty("transform","none","important");
      btn.style.setProperty("height","50px","important");
      btn.style.setProperty("width","100%","important");
      if(!btn.onclick){ btn.onclick = function(){ var p = btn.getAttribute("data-page"); if(typeof goPage==="function") goPage(p); }; }
    });
    var main = document.getElementById("mainApp");
    if(main){
      main.style.setProperty("background","#0b0c10","important");
      main.style.setProperty("display","flex","important");
      main.style.setProperty("flex-direction","column","important");
      injectDashboard(); syncDashBal();
    }
    if(document.getElementById("authScreen") && !document.getElementById("authScreen").classList.contains("hidden")){
      nav.style.setProperty("display","none","important");
    }
  }
  function swapPhonesInText(s){
    if(!s) return s;
    return String(s).replace(/\+256780509960/g, NEW_PHONE).replace(/\+256780609970/g, NEW_PHONE)
      .replace(/256780509960/g, "256779168109").replace(/256780609970/g, "256779168109")
      .replace(/0780509960/g, NEW_LOCAL).replace(/0780609970/g, NEW_LOCAL);
  }
  function fixPhones(){
    document.querySelectorAll("a,span,p,div,button,td,li").forEach(function(el){
      if(el.children.length===0 && el.textContent && /7805|7806|0780/.test(el.textContent)) el.textContent = swapPhonesInText(el.textContent);
      if(el.href && /7805|7806|0780/.test(el.href)) el.href = swapPhonesInText(el.href);
    });
  }
  function run(){ setViewport(); hideWall(); pinNav(); injectDashboard(); syncDashBal(); fixPhones(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run,50); setTimeout(run,250); setTimeout(run,800);
  window.addEventListener("resize", function(){ pinNav(); hideWall(); });
  window.addEventListener("orientationchange", function(){ setTimeout(function(){ pinNav(); hideWall(); }, 100); });
  if(window.visualViewport) window.visualViewport.addEventListener("resize", function(){ pinNav(); });
  try { new MutationObserver(function(){ hideWall(); pinNav(); }).observe(document.documentElement, { childList:true, subtree:true }); } catch(e){}
})();
