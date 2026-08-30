(function(){
  if(window.__ocBoost) return; window.__ocBoost=1;
  var PACKS=[[35000,7,5000],[70000,14,7500],[105000,21,10000],[140000,28,12500]];
  var BADGE={"Arsenal":"https://a.espncdn.com/i/teamlogos/soccer/500/359.png","Man City":"https://a.espncdn.com/i/teamlogos/soccer/500/382.png","Liverpool":"https://a.espncdn.com/i/teamlogos/soccer/500/364.png","Chelsea":"https://a.espncdn.com/i/teamlogos/soccer/500/363.png","Manchester United":"https://a.espncdn.com/i/teamlogos/soccer/500/360.png","Man United":"https://a.espncdn.com/i/teamlogos/soccer/500/360.png","Tottenham Hotspur":"https://a.espncdn.com/i/teamlogos/soccer/500/367.png","Tottenham":"https://a.espncdn.com/i/teamlogos/soccer/500/367.png","Real Madrid":"https://a.espncdn.com/i/teamlogos/soccer/500/86.png","FC Barcelona":"https://a.espncdn.com/i/teamlogos/soccer/500/83.png","Barcelona":"https://a.espncdn.com/i/teamlogos/soccer/500/83.png","Al Hilal":"https://a.espncdn.com/i/teamlogos/soccer/500/929.png","Al Nassr":"https://a.espncdn.com/i/teamlogos/soccer/500/2509.png","Al Ahli":"https://a.espncdn.com/i/teamlogos/soccer/500/983.png","Bayern Munich":"https://a.espncdn.com/i/teamlogos/soccer/500/132.png","LA Galaxy":"https://a.espncdn.com/i/teamlogos/soccer/500/187.png","Atlanta United":"https://a.espncdn.com/i/teamlogos/soccer/500/202.png","Paris Saint-Germain":"https://a.espncdn.com/i/teamlogos/soccer/500/160.png","Paris SG":"https://a.espncdn.com/i/teamlogos/soccer/500/160.png"};
  var selected=null,current=null,busy=false;
  function chances(){try{return parseInt(localStorage.getItem("ocRaffle")||"0",10)||0;}catch(e){return 0;}}
  function setCh(n){try{localStorage.setItem("ocRaffle",String(Math.max(0,n)));}catch(e){} var el=document.getElementById("raffleChances"); if(el)el.textContent="Chances: "+Math.max(0,n);}
  function css(){
    if(document.getElementById("ocBoostCss")) return;
    var s=document.createElement("style"); s.id="ocBoostCss";
    s.textContent=".badge{width:36px;height:36px;border-radius:50%;overflow:hidden;background:#07140e;display:grid;place-items:center;flex-shrink:0}.badge img{width:100%;height:100%;object-fit:contain}.pack-row{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:8px}.pack-btn{background:#1a2230;border:1px solid rgba(212,175,55,.16);border-radius:10px;padding:8px;text-align:left;color:#f4f1ea;font-size:12px}.pack-btn b{display:block;color:#d4af37}.pack-btn.on{border-color:#d4af37}.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}.grid4 button{background:#1a2230;border:1px solid rgba(212,175,55,.16);border-radius:12px;padding:10px 2px;color:#f4f1ea}.grid4 span{font-size:10px;display:block}.modalX{position:absolute;inset:0;background:rgba(0,0,0,.72);z-index:80;display:flex;align-items:flex-end}.modalX.hidden{display:none}.sheetX{background:#141820;border-radius:18px 18px 0 0;width:100%;padding:18px 16px 28px;color:#f4f1ea}.raffle-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.rcard{height:110px;perspective:700px}.rcard .inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .55s}.rcard.open .inner{transform:rotateY(180deg)}.rcard .face{position:absolute;inset:0;border-radius:12px;display:flex;align-items:center;justify-content:center;backface-visibility:hidden}.rcard .back{background:linear-gradient(160deg,#1a2230,#d4af37);font-weight:800;color:#111}.rcard .front{background:#1a2230;transform:rotateY(180deg);color:#d4af37}";
    document.head.appendChild(s);
  }
  function ensureModals(){
    if(document.getElementById("modalRaffle")) return;
    var wrap=document.createElement("div");
    wrap.innerHTML='<div id="modalRaffle" class="modalX hidden"><div class="sheetX"><h3>Raffle cards</h3><p id="raffleChances">Chances: 0</p><div class="raffle-grid" id="raffleGrid"></div><p id="raffleResult"></p><button class="btn" type="button" id="raffleClose">Close</button></div></div><div id="modalGeneric" class="modalX hidden"><div class="sheetX"><h3 id="genTitle">Info</h3><p id="genBody"></p><button class="btn" type="button" id="genClose">OK</button></div></div>';
    document.body.appendChild(wrap);
    document.getElementById("raffleClose").onclick=function(){document.getElementById("modalRaffle").classList.add("hidden");};
    document.getElementById("genClose").onclick=function(){document.getElementById("modalGeneric").classList.add("hidden");};
  }
  function deal(){
    var prizes=[{u:0,l:"Try again"},{u:0,l:"Try again"},{u:3000,l:"Gift"},{u:5000,l:"Gift"},{u:15000,l:"Gift"},{u:105000,l:"Jackpot"}];
    for(var i=prizes.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=prizes[i];prizes[i]=prizes[j];prizes[j]=t;}
    document.getElementById("raffleGrid").innerHTML=prizes.map(function(p){return '<div class="rcard" data-u="'+p.u+'"><div class="inner"><div class="face back">OC</div><div class="face front"><b>'+(p.u?("UGX "+p.u.toLocaleString()):p.l)+'</b></div></div></div>';}).join("");
  }
  window.openRaffle=function(){ensureModals();setCh(chances());busy=false;deal();document.getElementById("raffleResult").textContent="";document.getElementById("modalRaffle").classList.remove("hidden");};
  function play(card){
    if(busy) return;
    if(chances()<1){document.getElementById("raffleResult").textContent="Buy a share pack first.";return;}
    busy=true; card.classList.add("open");
    document.querySelectorAll("#raffleGrid .rcard").forEach(function(c){if(c!==card)setTimeout(function(){c.classList.add("open");},250);});
    var u=+card.getAttribute("data-u");
    document.getElementById("raffleResult").textContent=u>0?("You won UGX "+u.toLocaleString()):"No win this time.";
    setCh(chances()-1);
  }
  function paintAccount(){
    var acc=document.getElementById("account"); if(!acc) return;
    var pad=acc.querySelector(".pad"); if(!pad||pad.querySelector("#accGrid")) return;
    var grid=document.createElement("div"); grid.className="grid4"; grid.id="accGrid";
    var items=[["deposit","\ud83d\udcb3","Deposit"],["withdraw","\ud83d\udcb8","Withdraw"],["bill","\ud83d\udcc4","Bill"],["invite","\ud83e\udd1d","Invite"],["team","\ud83d\udc65","My team"],["vip","\u2b50","VIP Task"],["reward","\ud83c\udf81","Reward"],["raffle","\ud83c\udfab","Raffle"],["manager","\ud83c\udfa7","Manager"],["settings","\u2699\ufe0f","Settings"],["wdiv","\ud83d\udcb0","Withdraw Dividend"],["credit","\ud83c\udfe6","Credit to Wallet"],["support","\ud83d\udcac","Support"]];
    grid.innerHTML=items.map(function(a){return '<button type="button" data-act="'+a[0]+'"><div>'+a[1]+'</div><span>'+a[2]+'</span></button>';}).join("");
    var so=pad.querySelector("#signOut"); if(so) pad.insertBefore(grid,so); else pad.appendChild(grid);
    grid.onclick=function(e){
      var b=e.target.closest("button[data-act]"); if(!b)return;
      var act=b.getAttribute("data-act");
      if(act==="raffle") openRaffle();
      else if(act==="team"||act==="invite"){ if(typeof go==="function") go("team"); }
      else { ensureModals(); document.getElementById("genTitle").textContent=b.textContent.trim(); document.getElementById("genBody").textContent="Use this desk or contact the manager."; document.getElementById("modalGeneric").classList.remove("hidden"); }
    };
  }
  function paintShares(){
    var box=document.getElementById("holdList"); if(!box) return;
    box.querySelectorAll(".card").forEach(function(card,i){
      var title=(card.querySelector("b")||{}).textContent||"";
      var src=BADGE[title];
      if(src && !card.querySelector(".badge")){
        var row=document.createElement("div"); row.style.cssText="display:flex;align-items:center;gap:8px;margin-bottom:6px";
        row.innerHTML='<span class="badge"><img src="'+src+'" alt=""></span>';
        var b=card.querySelector("b"); card.insertBefore(row, card.firstChild); if(b) row.appendChild(b);
      }
      if(!card.querySelector(".pack-btn")){
        var pr=document.createElement("div"); pr.className="pack-row";
        pr.innerHTML=PACKS.map(function(p){return '<button type="button" class="pack-btn" data-p="'+p[0]+'" data-d="'+p[1]+'" data-w="'+p[2]+'"><b>'+p[0].toLocaleString()+'</b>'+p[1]+' days \u00b7 Daily '+p[2].toLocaleString()+'</button>';}).join("");
        var buy=card.querySelector("button"); if(buy) card.insertBefore(pr,buy); else card.appendChild(pr);
      }
      var buy=card.querySelector("button.btn, button"); if(buy){ buy.classList.add("buy-club"); }
    });
  }
  document.addEventListener("click",function(e){
    var pb=e.target.closest(".pack-btn");
    if(pb){ selected={p:+pb.getAttribute("data-p"),d:+pb.getAttribute("data-d"),w:+pb.getAttribute("data-w")}; document.querySelectorAll(".pack-btn.on").forEach(function(x){x.classList.remove("on");}); pb.classList.add("on"); current=pb.closest(".card"); }
    var buy=e.target.closest("#holdList .btn, #holdList .buy-club");
    if(buy){
      e.preventDefault(); e.stopPropagation();
      if(!selected){ var first=buy.parentNode.querySelector(".pack-btn"); if(first) first.click(); }
      if(!selected){ alert("Select a lock pack first"); return; }
      var name=((current&&current.querySelector("b"))||{}).textContent||"Club";
      var token=null; try{token=localStorage.getItem("ocToken");}catch(ex){}
      var headers={"Content-Type":"application/json"}; if(token) headers.Authorization="Bearer "+token;
      fetch("/api/purchase",{method:"POST",headers:headers,body:JSON.stringify({name:name,price:selected.p,days:selected.d,daily:selected.w,weeks:Math.round(selected.d/7)})}).finally(function(){ setCh(chances()+1); openRaffle(); });
    }
    var card=e.target.closest("#raffleGrid .rcard"); if(card) play(card);
  }, true);
  var _go=window.go; window.go=function(id){ if(typeof _go==="function") _go(id); if(id==="shares") setTimeout(paintShares,40); if(id==="account") setTimeout(paintAccount,40); };
  css(); ensureModals(); setTimeout(function(){paintShares();paintAccount();},500);
})();
