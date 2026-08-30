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
      s.textContent="html,body{background:#fff!important;margin:0;width:100%;height:100%}.stage{inset:0!important;width:100%!important;max-width:100%!important;left:0!important;transform:none!important}.stage.auth,#login .scroll{background:#fff!important}.stage.auth #dock,.stage.auth .tabs{display:none!important}select#suCode,select#loginCode,.phone-row select,select.fb-select{display:none!important}.fb-hero img,.top img.logoTop,img.logoBig{display:none!important}.oc-mark{display:flex;align-items:center;justify-content:center;border-radius:50%;background:#111;color:#d4af37!important;font-weight:800;font-family:Helvetica,Arial,sans-serif;letter-spacing:-.04em;line-height:1;border:1px solid rgba(212,175,55,.4)}.oc-mark-lg,#logoHero.oc-mark{width:72px!important;height:72px!important;margin:12px auto 28px!important;font-size:28px}.oc-mark-sm{width:40px!important;height:40px!important;font-size:15px}";
      document.head.appendChild(s);
    }
    document.querySelectorAll("select").forEach(function(sel){
      if(sel.id==="langSelect") return;
      var h=document.createElement("input"); h.type="hidden"; h.id=sel.id||""; h.value=sel.value||"";
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
  function bind(){
    var form=document.getElementById("loginForm");
    if(!form || form.getAttribute("data-ocfix")) return;
    form.setAttribute("data-ocfix","1");
    form.addEventListener("submit",function(e){
      e.preventDefault(); e.stopPropagation();
      var err=document.getElementById("authErr");
      var idEl=document.getElementById("loginId")||document.querySelector("#loginForm input[type=tel],#loginForm input[type=email],#loginForm input[type=text]");
      var pwEl=document.getElementById("loginPass")||document.querySelector("#loginForm input[type=password]");
      var identifier=((idEl&&idEl.value)||"").trim();
      var password=(pwEl&&pwEl.value)||"";
      if(!identifier||!password){ if(err) err.textContent="Enter mobile/email and password"; return false; }
      fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier:identifier,email:identifier,phone:identifier,password:password})})
        .then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});})
        .then(function(res){
          if(res.ok&&(res.j.token||res.j.user)){
            try{ localStorage.setItem("ocToken", res.j.token||""); }catch(ex){}
            if(typeof afterAuth==="function") afterAuth(res.j);
            else if(typeof go==="function") go("home");
          }else if(err) err.textContent=(res.j&&(res.j.error||res.j.message))||"Check details";
        })
        .catch(function(){ if(err) err.textContent="Network error"; });
      return false;
    }, true);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",function(){paint();bind();});
  else { paint(); bind(); }
  setTimeout(function(){paint();bind();},200);
  setTimeout(function(){paint();bind();},800);
})();
