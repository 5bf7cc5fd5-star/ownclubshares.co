(function(){
  if(window.__ocBars) return;
  window.__ocBars=1;
  var css=document.createElement("style");
  css.textContent=".spark{width:64px;height:28px;flex-shrink:0;display:block;margin:0 4px}.spark rect.up{fill:#3dcc8a}.spark rect.dn{fill:#e57373}";
  document.head.appendChild(css);
  var hist={};
  function series(id){
    if(!hist[id]){
      var a=[],p=1;
      for(var i=0;i<16;i++){p=p*(1+(Math.random()-0.48)*0.06);a.push(p);}
      hist[id]=a;
    }
    var last=hist[id][hist[id].length-1];
    hist[id].push(last*(1+(Math.random()-0.48)*0.05));
    if(hist[id].length>16) hist[id].shift();
    return hist[id];
  }
  function svg(h){
    var mn=Math.min.apply(null,h), mx=Math.max.apply(null,h), span=(mx-mn)||1;
    var n=h.length, gap=1, bw=Math.max(1.6,(64-(n-1)*gap)/n), out='<svg class="spark" viewBox="0 0 64 28" preserveAspectRatio="none">';
    for(var i=0;i<n;i++){
      var prev=i?h[i-1]:h[0], v=h[i], barH=Math.max(2,((v-mn)/span)*24);
      out+='<rect class="'+(v>=prev?"up":"dn")+'" x="'+(i*(bw+gap)).toFixed(2)+'" y="'+(26-barH).toFixed(2)+'" width="'+bw.toFixed(2)+'" height="'+barH.toFixed(2)+'" rx="0.4"/>';
    }
    return out+"</svg>";
  }
  function apply(){
    document.querySelectorAll("button.club[data-id]").forEach(function(btn){
      var id=btn.getAttribute("data-id");
      var mark=svg(series(id));
      var old=btn.querySelector("svg.spark");
      if(old){ old.outerHTML=mark; return; }
      var grow=btn.querySelector(".grow");
      if(grow&&grow.nextSibling) btn.insertBefore(document.createRange().createContextualFragment(mark), grow.nextSibling);
      else btn.insertAdjacentHTML("beforeend", mark);
    });
  }
  apply();
  setInterval(apply, 3500);
  try{ new MutationObserver(apply).observe(document.body,{childList:true,subtree:true}); }catch(e){}
})();
