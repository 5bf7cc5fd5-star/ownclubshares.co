(function(){
function tm(id){return "https://tmssl.akamaized.net/images/wappen/head/"+id+".png";}
function af(id){return "https://media.api-sports.io/football/teams/"+id+".png";}
var FIX={
  "Al Nassr":[tm(18544),af(2938)],
  "Al Ahli":[tm(18487),af(2932)],
  "LA Galaxy":[tm(1061),af(1602)],
  "Atlanta United":[tm(31358),af(1608)],
  "Al Ahly":[tm(3595),af(1027)],
  "Mamelodi Sundowns":[tm(6643),af(1015)],
  "AS FAR":[tm(21854),af(967)],
  "Esperance":[tm(6646),af(1028)]
};
function apply(){
  (window.CLUBS||[]).forEach(function(c){
    var x=FIX[c.n]; if(!x) return;
    c.b=x[0]; c.b2=x[1];
  });
}
apply();
var _g=window.go;
window.go=function(id){apply(); if(typeof _g==="function") _g(id);};
})();
