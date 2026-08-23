(function(){
  var NEW_PHONE = "+256779168109";
  var NEW_LOCAL = "0779168109";
  var TABS = [
    {page:"home", label:"Home"},
    {page:"market", label:"Market"},
    {page:"machines", label:"Shares"},
    {page:"my", label:"Account"}
  ];
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
        el.remove();
      });
    });
    document.documentElement.style.setProperty("background","#0b0c10","important");
    document.body.style.setProperty("background","#0b0c10","important");
  }
  function pinNav(){
    var nav = document.querySelector("nav.bottom");
    if(!nav){
      nav = document.createElement("nav");
      nav.className = "bottom";
      document.body.appendChild(nav);
    }
    if(nav.parentElement !== document.body) document.body.appendChild(nav);
    if(!nav.getAttribute("data-oc4")){
      nav.setAttribute("data-oc4","1");
      nav.innerHTML = TABS.map(function(t){
        return '<button type="button" class="nav" data-page="'+t.page+'">'+t.label+'</button>';
      }).join("");
    }
    var logged = !document.body.classList.contains("auth-open") && (location.pathname==="/app" || !!localStorage.getItem("ocToken"));
    nav.style.setProperty("display", logged ? "grid" : "none", "important");
    nav.style.setProperty("grid-template-columns","1fr 1fr 1fr 1fr","important");
    nav.style.setProperty("position","fixed","important");
    nav.style.setProperty("left","0","important");
    nav.style.setProperty("right","0","important");
    nav.style.setProperty("bottom","0","important");
    nav.style.setProperty("width","100%","important");
    nav.style.setProperty("padding-bottom","calc(8px + env(safe-area-inset-bottom, 0px))","important");
    nav.style.setProperty("z-index","2147483000","important");
    nav.style.setProperty("background","#0b0c10","important");
    nav.style.setProperty("border-top","1px solid #262626","important");
    nav.style.setProperty("transform","none","important");
    nav.querySelectorAll(".nav").forEach(function(btn){
      btn.style.setProperty("position","static","important");
      btn.style.setProperty("transform","none","important");
      btn.style.setProperty("color","#a8a8a8","important");
      btn.style.setProperty("background","transparent","important");
      btn.style.setProperty("border","0","important");
      btn.style.setProperty("padding","10px 0","important");
      btn.style.setProperty("font-size","12px","important");
      btn.style.setProperty("font-weight","600","important");
      btn.onclick = function(){
        var p = btn.getAttribute("data-page");
        nav.querySelectorAll(".nav").forEach(function(b){ b.style.color = "#a8a8a8"; });
        btn.style.color = "#d4af37";
        if(typeof goPage==="function") goPage(p);
      };
    });
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
  function run(){ setViewport(); hideWall(); pinNav(); fixPhones(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run,50); setTimeout(run,250); setTimeout(run,800);
  window.addEventListener("resize", function(){ pinNav(); hideWall(); });
})();
