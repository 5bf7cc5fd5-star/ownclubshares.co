(function(){
  function mark(size){
    var d=document.createElement("div");
    d.className="oc-mark "+(size==="lg"?"oc-mark-lg":"oc-mark-sm");
    d.textContent="OC";
    return d;
  }
  function paint(){
    if(!document.getElementById("ocMarkCss")){
      var s=document.createElement("style"); s.id="ocMarkCss";
      s.textContent=".oc-mark{display:flex;align-items:center;justify-content:center;border-radius:50%;background:#111;color:#d4af37!important;font-weight:800;font-family:Helvetica,Arial,sans-serif;letter-spacing:-.04em;line-height:1;user-select:none;flex-shrink:0;border:1px solid rgba(212,175,55,.4)}.oc-mark-lg,#logoHero.oc-mark{width:72px!important;height:72px!important;margin:12px auto 28px!important;font-size:28px}.oc-mark-sm{width:40px!important;height:40px!important;font-size:15px}.fb-hero img,.top img.logoTop,img.logoBig{display:none!important}.stage.auth #dock,.stage.auth .tabs{display:none!important}.stage{width:390px;max-width:390px;left:50%;transform:translateX(-50%)}.stage.auth,#login .scroll{background:#fff!important}";
      document.head.appendChild(s);
    }
    var hero=document.querySelector(".fb-hero");
    if(hero){
      var img=hero.querySelector("img,#logoHero:not(.oc-mark)");
      if(img && img.tagName==="IMG"){
        var m=mark("lg"); m.id="logoHero";
        img.parentNode.replaceChild(m,img);
      }else if(!hero.querySelector(".oc-mark")){
        var m=mark("lg"); m.id="logoHero"; hero.insertBefore(m, hero.firstChild);
      }
    }
    document.querySelectorAll(".top img, img.logoTop, img.logoBig").forEach(function(img){
      var m=mark("sm");
      img.parentNode.replaceChild(m,img);
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",paint);
  else paint();
  setTimeout(paint,30); setTimeout(paint,200); setTimeout(paint,800);
  try{ new MutationObserver(paint).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
})();
