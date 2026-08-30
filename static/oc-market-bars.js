(function(){
  if(window.__ocBars2) return;
  window.__ocBars2=1;
  var css=document.createElement("style");
  css.textContent="#market .scroll,#home .scroll{background:#06140f}#market .top,#home .top{background:rgba(6,20,15,.94)}.badge{width:36px!important;height:36px!important;border-radius:50%!important}.club{background:transparent!important;border:0!important;border-bottom:1px solid rgba(154,215,176,.08)!important;border-radius:0!important;padding:10px 4px!important}.spark{width:72px;height:30px;flex-shrink:0}.spark path.up{stroke:#3dcc8a;fill:none;stroke-width:1.6}.spark path.dn{stroke:#e57373;fill:none;stroke-width:1.6}.cap{font-size:13px;font-weight:700;color:#f4f7f4}.chg-up{color:#3dcc8a;font-size:11px;font-weight:700}.chg-dn{color:#e57373;font-size:11px;font-weight:700}";
  document.head.appendChild(css);
  var CAP={1:4200,2:4800,3:5310,4:3080,5:6040,6:2840,7:6000,8:5030,9:1490,10:1400,11:1220,12:914,13:790,14:4840,15:1920,18:1110,19:888,26:4140,27:805,36:246,37:712,38:406,39:893,40:378,41:1500,42:600};
  var hist={};
  function series(id){
    if(!hist[id]){var a=[],p=1;for(var i=0;i<16;i++){p*=1+(Math.random()-0.48)*0.05;a.push(p);}hist[id]=a;}
    hist[id].push(hist[id][hist[id].length-1]*(1+(Math.random()-0.48)*0.04));
    if(hist[id].length>16) hist[id].shift();
    return hist[id];
  }
  function fmt(m){ m=Number(m)||0; return m>=1000?("$"+(m/1000).toFixed(2)+"B"):("$"+m.toFixed(2)+"M"); }
  function line(h,up){
    var mn=Math.min.apply(null,h), mx=Math.max.apply(null,h), span=(mx-mn)||1,d="";
    for(var i=0;i<h.length;i++){ var x=(i/(h.length-1))*72,y=28-((h[i]-mn)/span)*24; d+=(i?" L":"M")+x.toFixed(1)+" "+y.toFixed(1); }
    return '<svg class="spark" viewBox="0 0 72 30" preserveAspectRatio="none"><path class="'+(up?"up":"dn")+'" d="'+d+'"/></svg>';
  }
  function apply(){
    document.querySelectorAll("button.club[data-id]").forEach(function(btn){
      var id=btn.getAttribute("data-id");
      var h=series(id);
      var up=h[h.length-1]>=h[0];
      var old=btn.querySelector("svg.spark");
      var mark=line(h,up);
      if(old) old.outerHTML=mark;
      else {
        var grow=btn.querySelector(".grow");
        if(grow&&grow.nextSibling) btn.insertBefore(document.createRange().createContextualFragment(mark), grow.nextSibling);
        else btn.insertAdjacentHTML("beforeend", mark);
      }
      var right=btn.querySelector("span[style*='text-align']")||btn.lastElementChild;
      if(right && CAP[id]){
        var live=CAP[id]*(h[h.length-1]/h[0]);
        right.innerHTML='<div class="cap num">'+fmt(live)+'</div><div class="'+(up?"chg-up":"chg-dn")+'">'+(up?"+":"")+(((h[h.length-1]/h[0])-1)*100).toFixed(2)+'%</div>';
      }
    });
  }
  apply();
  setInterval(apply, 3500);
  try{ new MutationObserver(apply).observe(document.body,{childList:true,subtree:true}); }catch(e){}
})();
