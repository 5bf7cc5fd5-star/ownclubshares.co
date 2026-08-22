(function(){
  var NEW_PHONE = "+256779168109";
  var NEW_LOCAL = "0779168109";

  function setViewport(){
    var m = document.querySelector('meta[name="viewport"]');
    if(!m){ m=document.createElement("meta"); m.name="viewport"; document.head.appendChild(m); }
    m.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover");
  }

  function hideWall(){
    [".space-bg",".warp-img",".warp","#leagueFx",".league-fx","#particleCanvas",
     "img[src*='space-wallpaper']","img[src*='ucl-bg']",".bg-space",".wallpaper","#appBg",".app-bg"].forEach(function(s){
      document.querySelectorAll(s).forEach(function(el){
        el.style.setProperty("display","none","important");
        el.style.setProperty("visibility","hidden","important");
        el.style.setProperty("opacity","0","important");
      });
    });
    document.documentElement.style.setProperty("background","#07140f","important");
    document.body.style.setProperty("background","#07140f","important");
  }

  function pinNav(){
    var nav = document.querySelector("nav.bottom");
    if(!nav) return;
    if(nav.parentElement !== document.body) document.body.appendChild(nav);
    var safe = "env(safe-area-inset-bottom, 0px)";
    nav.style.setProperty("display","grid","important");
    nav.style.setProperty("grid-template-columns","1fr 1fr 1fr 1fr 1fr","important");
    nav.style.setProperty("grid-template-rows","50px","important");
    nav.style.setProperty("position","fixed","important");
    nav.style.setProperty("left","0","important");
    nav.style.setProperty("right","0","important");
    nav.style.setProperty("bottom","0","important");
    nav.style.setProperty("width","100%","important");
    nav.style.setProperty("max-width","100%","important");
    nav.style.setProperty("height","auto","important");
    nav.style.setProperty("min-height","calc(56px + " + safe + ")","important");
    nav.style.setProperty("padding","6px 0 calc(" + safe + " + 10px) 0","important");
    nav.style.setProperty("z-index","2147483000","important");
    nav.style.setProperty("transform","none","important");
    nav.style.setProperty("gap","0","important");
    nav.style.setProperty("background","#0b0d10","important");
    nav.style.setProperty("border-top","1px solid #1a3348","important");
    nav.style.setProperty("box-shadow","0 -4px 20px rgba(0,0,0,.35)","important");
    nav.querySelectorAll(".nav").forEach(function(btn){
      btn.style.setProperty("position","static","important");
      btn.style.setProperty("transform","none","important");
      btn.style.setProperty("top","auto","important");
      btn.style.setProperty("margin","0","important");
      btn.style.setProperty("height","50px","important");
      if(!btn.onclick){
        btn.onclick = function(){
          var p = btn.getAttribute("data-page");
          if(typeof goPage === "function") goPage(p);
        };
      }
    });
    // Lift mainApp so content never sits under the taller nav
    var main = document.getElementById("mainApp");
    if(main){
      main.style.setProperty("bottom","calc(64px + " + safe + " + 8px)","important");
    }
    if(document.getElementById("authScreen") && !document.getElementById("authScreen").classList.contains("hidden")){
      nav.style.setProperty("display","none","important");
    }
  }

  function swapPhonesInText(s){
    if(!s) return s;
    var out = String(s);
    out = out.replace(/\+256780509960/g, NEW_PHONE);
    out = out.replace(/\+256780609970/g, NEW_PHONE);
    out = out.replace(/256780509960/g, "256779168109");
    out = out.replace(/256780609970/g, "256779168109");
    out = out.replace(/0780509960/g, NEW_LOCAL);
    return out;
  }

  function fixState(){
    try{
      if(window.state && Array.isArray(state.users)){
        state.users.forEach(function(u){
          if(!u) return;
          var em = (u.email||"").toLowerCase();
          if(em === "k_hmed@yahoo.com" || u.id === "admin" || String(u.name||"").indexOf("Admin")===0){
            u.phone = NEW_PHONE;
          } else if(u.phone){
            u.phone = swapPhonesInText(u.phone);
          }
        });
      }
    }catch(e){}
    try{
      var raw = localStorage.getItem("Own Club");
      if(raw && /0780509960|780509960|780609970/.test(raw)){
        localStorage.setItem("Own Club", swapPhonesInText(raw));
      }
    }catch(e){}
  }

  function fixDomPhones(){
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n;
    while((n = walk.nextNode())){
      if(n.nodeValue && /0780509960|780509960|780609970/.test(n.nodeValue)){
        n.nodeValue = swapPhonesInText(n.nodeValue);
      }
    }
    document.querySelectorAll("input,textarea").forEach(function(el){
      if(el.value && /0780509960|780509960|780609970/.test(el.value)){
        el.value = swapPhonesInText(el.value);
      }
    });
  }

  function fillMarket(){
    try{
      if(typeof startMarketFeed==="function") startMarketFeed();
      if(typeof renderMarketList==="function") renderMarketList();
    }catch(e){}
  }

  function boot(){
    setViewport();
    hideWall();
    pinNav();
    fixState();
    fixDomPhones();
    var main=document.getElementById("mainApp");
    if(main && !main.classList.contains("hidden")) fillMarket();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  setTimeout(boot, 200);
  setTimeout(boot, 900);
  setTimeout(boot, 2000);
  window.addEventListener("resize", pinNav);
  window.addEventListener("orientationchange", function(){ setTimeout(pinNav, 300); });
})();
