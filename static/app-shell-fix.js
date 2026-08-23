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
      });
    });
    document.documentElement.style.setProperty("background","#0b0c10","important");
    document.body.style.setProperty("background","#0b0c10","important");
  }
  function hideOldChrome(){
    var needles = /System Dashboard|Company fund pool|Customers \u2014 tap|Customers — tap|OPEN APPROVALS|LOG IN SIGN UP|Security note: passwords/i;
    document.querySelectorAll("h1,h2,h3,h4,section,article,.card,.panel,.box,.wrap").forEach(function(el){
      if(el.id==="ocGoldLogin" || (el.closest && el.closest("#ocGoldLogin"))) return;
      var t = (el.textContent||"").replace(/\s+/g," ").slice(0,160);
      if(needles.test(t)){
        var box = el.closest("section, article, .card, .panel, .box") || el;
        box.classList.add("oc-old-hide");
        box.style.setProperty("display","none","important");
      }
    });
    document.querySelectorAll("a,button").forEach(function(el){
      var t=(el.textContent||"").replace(/\s+/g," ").trim();
      if(t==="LOG IN" || t==="SIGN UP" || t==="LOG IN SIGN UP"){
        var bar = el.parentElement;
        if(bar) bar.style.setProperty("display","none","important");
      }
    });
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
    var logged = !document.body.classList.contains("auth-open");
    nav.style.setProperty("display", logged ? "grid" : "none", "important");
    nav.style.setProperty("grid-template-columns","1fr 1fr 1fr 1fr 1fr","important");
    nav.style.setProperty("position","fixed","important");
    nav.style.setProperty("left","0","important");
    nav.style.setProperty("right","0","important");
    nav.style.setProperty("bottom","0","important");
    nav.style.setProperty("width","100%","important");
    nav.style.setProperty("z-index","2147483000","important");
    nav.style.setProperty("background","#141923","important");
    nav.querySelectorAll(".nav").forEach(function(btn){
      btn.style.setProperty("position","static","important");
      if(!btn.onclick){ btn.onclick = function(){ var p = btn.getAttribute("data-page"); if(typeof goPage==="function") goPage(p); }; }
    });
    injectDashboard(); syncDashBal();
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
  function run(){ setViewport(); hideWall(); hideOldChrome(); pinNav(); injectDashboard(); syncDashBal(); fixPhones(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run,50); setTimeout(run,250); setTimeout(run,800);
  window.addEventListener("resize", function(){ pinNav(); hideWall(); });
  try { new MutationObserver(function(){ hideWall(); hideOldChrome(); }).observe(document.documentElement, { childList:true, subtree:true }); } catch(e){}
})();
