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
     ".pitch",".pitch-lines",".pitch-midline","#homeBgUcl",".glow",".auth-sport-fx"].forEach(function(s){
      document.querySelectorAll(s).forEach(function(el){
        el.style.setProperty("display","none","important");
        el.style.setProperty("visibility","hidden","important");
        el.style.setProperty("opacity","0","important");
        el.style.setProperty("background","transparent","important");
        el.style.setProperty("background-image","none","important");
      });
    });
    document.documentElement.style.setProperty("background","#0a0a0c","important");
    document.body.style.setProperty("background","#0a0a0c","important");
    document.body.style.setProperty("background-color","#0a0a0c","important");
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
    nav.style.setProperty("top","auto","important");
    nav.style.setProperty("width","100%","important");
    nav.style.setProperty("max-width","100%","important");
    nav.style.setProperty("height","auto","important");
    nav.style.setProperty("min-height","calc(56px + " + safe + ")","important");
    nav.style.setProperty("padding","6px 0 calc(" + safe + " + 10px) 0","important");
    nav.style.setProperty("z-index","2147483000","important");
    nav.style.setProperty("transform","none","important");
    nav.style.setProperty("gap","0","important");
    nav.style.setProperty("background","#0b0d10","important");
    nav.style.setProperty("background-color","#0b0d10","important");
    nav.style.setProperty("border-top","1px solid #1a3348","important");
    nav.style.setProperty("box-shadow","0 -4px 20px rgba(0,0,0,.4)","important");
    nav.style.setProperty("border-radius","0","important");
    nav.querySelectorAll(".nav").forEach(function(btn){
      btn.style.setProperty("position","static","important");
      btn.style.setProperty("transform","none","important");
      btn.style.setProperty("top","auto","important");
      btn.style.setProperty("margin","0","important");
      btn.style.setProperty("height","50px","important");
      btn.style.setProperty("width","100%","important");
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
      main.style.setProperty("bottom","calc(64px + " + safe + " + 6px)","important");
      main.style.setProperty("background","#0a0a0c","important");
      main.style.setProperty("background-color","#0a0a0c","important");
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
    out = out.replace(/0780609970/g, NEW_LOCAL);
    return out;
  }

  function fixPhones(){
    document.querySelectorAll("a,span,p,div,button,td,li").forEach(function(el){
      if(el.children.length === 0 && el.textContent && /7805|7806|0780/.test(el.textContent)){
        el.textContent = swapPhonesInText(el.textContent);
      }
      if(el.href && /7805|7806|0780/.test(el.href)){
        el.href = swapPhonesInText(el.href);
      }
    });
  }

  function run(){
    setViewport();
    hideWall();
    pinNav();
    fixPhones();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
  setTimeout(run, 50);
  setTimeout(run, 250);
  setTimeout(run, 800);
  // Keep nav locked on orientation / visual viewport changes (Safari)
  window.addEventListener("resize", function(){ pinNav(); hideWall(); });
  window.addEventListener("orientationchange", function(){ setTimeout(function(){ pinNav(); hideWall(); }, 100); });
  if(window.visualViewport){
    window.visualViewport.addEventListener("resize", function(){ pinNav(); });
  }
  // Mutation observer to re-hide any late-injected pitch elements
  try {
    var obs = new MutationObserver(function(){ hideWall(); pinNav(); });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  } catch(e){}
})();
