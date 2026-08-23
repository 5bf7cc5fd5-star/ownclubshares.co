(function(){
  var L = "https://raw.githubusercontent.com/5bf7cc5fd5-star/ownclubshares.co/main/own-club-logo.jpg";
  window.OC_LOGO = L;
  function lock(){
    document.querySelectorAll("img#logoHero, img.logoTop, img.logoBig, .hero img, .top img").forEach(function(img){
      if((img.src||"").indexOf("raw.githubusercontent")<0) img.src = L;
      img.onerror = function(){ this.onerror=null; this.src=L; };
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", lock);
  else lock();
  setTimeout(lock, 20); setTimeout(lock, 200); setTimeout(lock, 800);
  try{ new MutationObserver(lock).observe(document.documentElement, {childList:true, subtree:true}); }catch(e){}
})();
