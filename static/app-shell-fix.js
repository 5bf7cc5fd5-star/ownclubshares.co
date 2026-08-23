(function(){
  var TABS = [
    {page:"home", label:"Home"},
    {page:"market", label:"Market"},
    {page:"machines", label:"Shares"},
    {page:"team", label:"Team"},
    {page:"my", label:"Account"}
  ];
  function setViewport(){
    var m = document.querySelector('meta[name="viewport"]');
    if(!m){ m=document.createElement("meta"); m.name="viewport"; document.head.appendChild(m); }
    m.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover");
  }
  function hideWall(){
    [".space-bg",".warp-img",".warp",".warp2","#leagueFx",".league-fx","#particleCanvas",
     "img[src*='ucl-bg']","img[src*='space-wallpaper']","#homeBgUcl",".pitch",".pitch-lines",
     ".auth-sport-fx","#authScreen"].forEach(function(s){
      document.querySelectorAll(s).forEach(function(el){ el.remove(); });
    });
    document.documentElement.style.setProperty("background","#0b0c10","important");
    document.body.style.setProperty("background","#0b0c10","important");
    document.body.style.setProperty("transform","none","important");
    document.body.style.setProperty("width","100%","important");
    document.body.style.setProperty("max-width","100vw","important");
  }
  function hideLanding(){
    document.querySelectorAll("a,button,div,span").forEach(function(el){
      var t=(el.textContent||"").replace(/\s+/g," ").trim();
      if(t==="About Us" || t==="LOG IN" || t==="SIGN UP" || t==="LOG IN SIGN UP"){
        var box = el.parentElement && el.parentElement.parentElement ? el.parentElement.parentElement : el.parentElement;
        if(box && box.id!=="mainApp"){
          box.setAttribute("data-oc-hide","1");
          box.style.setProperty("display","none","important");
        }
      }
    });
  }
  function pinNav(){
    var nav = document.querySelector("nav.bottom");
    if(!nav){
      nav = document.createElement("nav");
      nav.className = "bottom";
      document.body.appendChild(nav);
    }
    if(nav.parentElement !== document.body) document.body.appendChild(nav);
    nav.innerHTML = TABS.map(function(t){
      return '<button type="button" class="nav" data-page="'+t.page+'">'+t.label+'</button>';
    }).join("");
    nav.style.setProperty("display","grid","important");
    nav.style.setProperty("grid-template-columns","repeat(5,1fr)","important");
    nav.style.setProperty("position","fixed","important");
    nav.style.setProperty("left","0","important");
    nav.style.setProperty("right","0","important");
    nav.style.setProperty("bottom","0","important");
    nav.style.setProperty("width","100%","important");
    nav.style.setProperty("z-index","2147483000","important");
    nav.style.setProperty("background","#0b0c10","important");
    nav.querySelectorAll(".nav").forEach(function(btn){
      btn.onclick = function(){
        var p = btn.getAttribute("data-page");
        nav.querySelectorAll(".nav").forEach(function(b){ b.style.color="#a8a8a8"; });
        btn.style.color="#d4af37";
        if(typeof goPage==="function") goPage(p);
        if(typeof window.renderMarketList==="function") window.renderMarketList();
      };
    });
  }
  function paintMarketOnHome(){
    if(typeof window.renderMarketList==="function") window.renderMarketList();
    var home=document.getElementById("home");
    var board=document.getElementById("ocMarketBoard");
    if(home && board && !document.getElementById("ocMarketHome")){
      var clone=board.cloneNode(true);
      clone.id="ocMarketHome";
      home.appendChild(clone);
    }
  }
  function run(){
    setViewport(); hideWall(); hideLanding(); pinNav(); paintMarketOnHome();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run,80); setTimeout(run,400); setTimeout(run,1200);
})();
