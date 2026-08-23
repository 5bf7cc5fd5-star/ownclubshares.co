(function(){
  var L = window.OC_LOGO || "/own-club-logo.jpg?v=lock2";
  window.OC_LOGO = window.OC_LOGO || L;
  function lock(){
    document.querySelectorAll("img").forEach(function(img){
      var s=(img.getAttribute("src")||"")+(img.getAttribute("alt")||"");
      var hit=img.getAttribute("data-oc-logo")==="1"||/own-club-logo|Own Club Share/i.test(s);
      if(!hit && img.parentElement && /logo-container|hero|top/.test(img.parentElement.className||"")) hit=true;
      if(hit){
        img.setAttribute("data-oc-logo","1");
        if((img.getAttribute("src")||"").indexOf("own-club-logo")>=0 || img.getAttribute("data-oc-logo")==="1"){
          if(img.getAttribute("src")!==L && (img.src||"").indexOf("data:image")<0) img.src=L;
        }
        img.onerror=function(){this.onerror=null;this.src="/own-club-logo.jpg?v=lock2";};
      }
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",lock);
  else lock();
  setTimeout(lock,20); setTimeout(lock,200);
  try{new MutationObserver(lock).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();
