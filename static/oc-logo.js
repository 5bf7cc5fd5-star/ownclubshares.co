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
      s.textContent="html,body{background:#fff!important;margin:0;width:100%;height:100%;overflow:hidden}.stage{inset:0!important;width:100%!important;max-width:100%!important;left:0!important;transform:none!important}.stage.auth,#login .scroll{background:#fff!important}.stage.auth #dock,.stage.auth .tabs{display:none!important}.fb-hero img,.top img.logoTop,img.logoBig{display:none!important}select#suCode,select#loginCode,.phone-row select{display:none!important}.oc-mark{display:flex;align-items:center;justify-content:center;border-radius:50%;background:#111;color:#d4af37!important;font-weight:800;font-family:Helvetica,Arial,sans-serif;letter-spacing:-.04em;line-height:1;user-select:none;flex-shrink:0;border:1px solid rgba(212,175,55,.4)}.oc-mark-lg,#logoHero.oc-mark{width:72px!important;height:72px!important;margin:12px auto 28px!important;font-size:28px}.oc-mark-sm{width:40px!important;height:40px!important;font-size:15px}";
      document.head.appendChild(s);
    }
    document.querySelectorAll("select#suCode,select#loginCode,.phone-row select").forEach(function(sel){
      var h=document.createElement("input"); h.type="hidden"; h.id=sel.id||"suCode";
      h.value=sel.value||"+256";
      sel.parentNode.replaceChild(h,sel);
    });
    var hero=document.querySelector(".fb-hero");
    if(hero){
      var img=hero.querySelector("img");
      if(img){ var m=mark("lg"); m.id="logoHero"; img.parentNode.replaceChild(m,img); }
      else if(!hero.querySelector(".oc-mark")){ var m2=mark("lg"); m2.id="logoHero"; hero.insertBefore(m2, hero.firstChild); }
    }
    document.querySelectorAll(".top img, img.logoTop, img.logoBig").forEach(function(img){
      img.parentNode.replaceChild(mark("sm"),img);
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",paint);
  else paint();
  setTimeout(paint,30); setTimeout(paint,200); setTimeout(paint,800);
  document.addEventListener("gesturestart",function(e){e.preventDefault()},{passive:false});
})();
