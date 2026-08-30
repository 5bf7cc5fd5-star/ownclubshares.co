(function(){
  if(window.__ocLive) return;
  window.__ocLive=1;
  function $(id){return document.getElementById(id);}
  var langSel=$("langSelect");
  if(langSel){
    var extra=[["de","Deutsch"],["it","Italiano"],["nl","Nederlands"],["ru","Русский"],["ja","日本語"],["ko","한국어"],["id","Bahasa Indonesia"],["th","ไทย"],["vi","Tiếng Việt"],["pl","Polski"],["uk","Українська"],["fa","فارسی"],["ur","اردو"],["bn","বাংলা"],["ha","Hausa"],["he","עברית"],["fil","Filipino"],["ms","Bahasa Melayu"]];
    extra.forEach(function(p){ if(!langSel.querySelector('option[value="'+p[0]+'"]')){ var o=document.createElement("option"); o.value=p[0]; o.textContent=p[1]; langSel.appendChild(o);} });
  }
  document.querySelectorAll("p,div,.note,.hint").forEach(function(el){
    if(/Practice market/i.test(el.textContent||"")){
      el.id=el.id||"mktNote";
      el.textContent="Live club values. Prices move with the market. Lock packs and daily coupons sit in Shares.";
    }
    if(/Get Last month Salary/i.test(el.textContent||"")) el.textContent="Withdraw Dividend";
  });
  var grid=$("accGrid")||document.querySelector(".grid4");
  if(grid){
    grid.querySelectorAll("button").forEach(function(b){
      var t=(b.textContent||"").toLowerCase();
      if(t.indexOf("salary")>=0){ b.setAttribute("data-act","wdiv"); b.innerHTML='<div class="ico">💰</div><span>Withdraw Dividend</span>'; }
    });
    if(!grid.querySelector('[data-act="credit"]')){
      var b=document.createElement("button"); b.type="button"; b.setAttribute("data-act","credit");
      b.innerHTML='<div class="ico">🏦</div><span>Credit to Wallet</span>'; grid.appendChild(b);
    }
    if(!grid.querySelector('[data-act="wdiv"]')){
      var b2=document.createElement("button"); b2.type="button"; b2.setAttribute("data-act","wdiv");
      b2.innerHTML='<div class="ico">💰</div><span>Withdraw Dividend</span>'; grid.appendChild(b2);
    }
  }
  var su=$("suCode");
  if(su && su.tagName==="INPUT"){
    var sel=document.createElement("select"); sel.id="suCode"; sel.className="fb-select";
    [["+1","USD","1","United States · USD · +1"],["+44","GBP","0.79","United Kingdom · GBP · +44"],["+971","AED","3.67","UAE · AED · +971"],["+966","SAR","3.75","Saudi Arabia · SAR · +966"],["+965","KWD","0.31","Kuwait · KWD · +965"],["+256","UGX","3700","Uganda · UGX · +256"],["+254","KES","129","Kenya · KES · +254"],["+234","NGN","1600","Nigeria · NGN · +234"],["+27","ZAR","18","South Africa · ZAR · +27"],["+90","TRY","34","Turkey · TRY · +90"],["+91","INR","84","India · INR · +91"],["+86","CNY","7.2","China · CNY · +86"],["+49","EUR","0.92","Germany · EUR · +49"],["+55","BRL","5.5","Brazil · BRL · +55"],["+61","AUD","1.52","Australia · AUD · +61"]].forEach(function(r){
      var o=document.createElement("option"); o.value=r[0]; o.setAttribute("data-ccy",r[1]); o.setAttribute("data-rate",r[2]); o.textContent=r[3]; if(r[1]==="UGX") o.selected=true; sel.appendChild(o);
    });
    sel.onchange=function(){ if(window.onCountryCode) window.onCountryCode(); };
    su.parentNode.insertBefore(sel, su); su.parentNode.removeChild(su);
  }
  function extraClubs(){
    return [
      {id:43,name:"Al Ahli",league:"Saudi Pro League",badge:"https://a.espncdn.com/i/teamlogos/soccer/500/983.png",val:720},
      {id:44,name:"Atlanta United",league:"MLS",badge:"https://a.espncdn.com/i/teamlogos/soccer/500/202.png",val:850},
      {id:19,name:"LA Galaxy",league:"MLS",badge:"https://a.espncdn.com/i/teamlogos/soccer/500/187.png",val:888}
    ];
  }
  function packsHtml(id){
    return [[35000,7,5000],[70000,14,7500],[105000,21,10000],[140000,28,12500]].map(function(p){
      return '<button type="button" class="pack-btn" data-club="'+id+'" data-p="'+p[0]+'" data-d="'+p[1]+'" data-w="'+p[2]+'"><b>'+p[0].toLocaleString()+'</b>'+p[1]+' days · Daily withdrawal '+p[2].toLocaleString()+'</button>';
    }).join("");
  }
  function ensureShares(){
    var box=$("holdList"); if(!box) return;
    extraClubs().forEach(function(c){
      if(box.querySelector('[data-share="'+c.id+'"],[data-club="'+c.id+'"]')) return;
      var d=document.createElement("div"); d.className="card"; d.style.marginBottom="10px"; d.setAttribute("data-share",c.id);
      d.innerHTML='<div class="row"><span class="badge"><img src="'+c.badge+'" alt="'+c.name+'"></span><div class="grow"><b>'+c.name+'</b><br/><span class="subtle">'+c.league+'</span></div><div style="text-align:right"><b class="cap">$'+(c.val>=1000?(c.val/1000).toFixed(2)+"B":c.val.toFixed(2)+"M")+'</b></div></div><div class="pack-row">'+packsHtml(c.id)+'</div><button type="button" class="btn buy-club" data-club="'+c.id+'">Purchase</button>';
      box.appendChild(d);
    });
    box.querySelectorAll(".card").forEach(function(card){
      if(card.querySelector(".pack-btn")) return;
      var id=card.getAttribute("data-share")||"0";
      var row=document.createElement("div"); row.className="pack-row"; row.innerHTML=packsHtml(id);
      card.appendChild(row);
    });
  }
  function ensureMarket(){
    var list=$("marketList"); if(!list) return;
    extraClubs().forEach(function(c){
      if(list.querySelector('[data-id="'+c.id+'"]')) return;
      var b=document.createElement("button"); b.className="club"; b.type="button"; b.setAttribute("data-id",c.id);
      b.innerHTML='<span class="badge"><img src="'+c.badge+'" alt="'+c.name+'"></span><span class="grow"><b>'+c.name+'</b><br/><span class="subtle" style="font-size:11px">'+c.league+'</span></span>';
      list.appendChild(b);
    });
  }
  ensureShares(); ensureMarket();
  setInterval(function(){ ensureShares(); ensureMarket(); }, 4000);
  var dock=$("dock"); var stage=$("stage");
  if(stage && stage.classList.contains("auth") && dock) dock.style.display="none";
})();
