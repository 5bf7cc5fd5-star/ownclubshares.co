(function(){
function apply(){
  document.querySelectorAll(".wd-note").forEach(function(n){
    n.innerHTML="<b>Note:</b><br><br>Withdrawals are subject to 10% service charge.<br><br>Your withdrawal will arrive instantly.<br><br>There must be at least 1 day interval between each withdrawal application day.<br><br>On the day you are eligible to apply, you may submit an unlimited number of withdrawal applications.";
  });
  var amt=document.getElementById("wdAmt");
  if(amt){
    amt.oninput=function(){
      var a=parseFloat(this.value||0)||0;
      var el=document.getElementById("wdNetAmt");
      if(el) el.textContent="UGX "+Math.round(a*0.90).toLocaleString();
    };
  }
}
var obs=new MutationObserver(apply);
obs.observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener("click",function(){setTimeout(apply,30);},true);
})();
