(function(){
function H(){var h={"Content-Type":"application/json"};try{var t=localStorage.getItem("ocToken");if(t)h.Authorization="Bearer "+t;}catch(e){}return h;}
document.addEventListener("click",function(e){
  var buy=e.target.closest("#holdList .pk");
  if(!buy) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  var price=+buy.getAttribute("data-p")||35000;
  var days=+buy.getAttribute("data-d")||7;
  var daily=+buy.getAttribute("data-w")||5000;
  var name=buy.getAttribute("data-club")||"Club share";
  var weeks=Math.max(1, Math.round(days/7));
  var mid={35000:1,70000:3,105000:5,140000:7}[price]||1;
  fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({machine_id:mid,id:mid,name:name,club:name,price:price,days:days,daily:daily,weeks:weeks,return_principal:true})})
    .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
    .then(function(res){
      if(res.ok){alert(res.j.message||"Pack locked for "+name);return;}
      return fetch("/api/purchase",{method:"POST",headers:H(),body:JSON.stringify({machine_id:1,name:name,price:price,days:days,daily:daily,weeks:weeks})}).then(function(r){return r.json();}).then(function(j){alert(j.message||j.error||"Pack locked");});
    })
    .catch(function(){alert("Pack selected for "+name);});
},true);
})();
