(function(){
var AI_AGENTS=[{id:"james",name:"James",role:"Lead support"},{id:"eve",name:"Eve",role:"Deposits & wallet"},{id:"hellen",name:"Hellen",role:"Withdrawals"},{id:"samson",name:"Samson",role:"Share packs"},{id:"barnabus",name:"Barnabus",role:"Team & invites"},{id:"peter",name:"Peter",role:"VIP & rewards"},{id:"jackie",name:"Jackie",role:"Raffle desk"},{id:"lucy",name:"Lucy",role:"Night support"}];
var activeAgent="james";
var raffleBusy=false;
function raffleChances(){try{return parseInt(localStorage.getItem("ocRaffle")||"0",10)||0;}catch(e){return 0;}}
function setRaffleChances(n){try{localStorage.setItem("ocRaffle",String(Math.max(0,n)));}catch(e){} var el=document.getElementById("raffleChances"); if(el)el.textContent="Chances: "+Math.max(0,n);}
function grantRaffleChance(serverN){ var n=(typeof serverN==="number")?serverN:(raffleChances()+1); setRaffleChances(n); }
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function dealRaffleCards(){
  var prizes=shuffle([{ugx:0,label:"Try again"},{ugx:0,label:"Try again"},{ugx:3000,label:"Gift"},{ugx:5000,label:"Gift"},{ugx:7000,label:"Gift"},{ugx:15000,label:"Gift"},{ugx:25000,label:"Rare"},{ugx:50000,label:"Rare"},{ugx:105000,label:"Jackpot"}]).slice(0,6);
  var grid=document.getElementById("raffleGrid"); if(!grid)return;
  grid.innerHTML=prizes.map(function(p){
    return '<div class="rcard" data-ugx="'+p.ugx+'" data-label="'+p.label+'"><div class="inner"><div class="face back">OWN<br/>CLUB</div><div class="face front"><b>'+(p.ugx?("UGX "+p.ugx.toLocaleString()):p.label)+'</b><span class="subtle">'+(p.ugx?("USD "+(p.ugx/UGX_RATE).toFixed(2)):"Chance miss")+'</span></div></div></div>';
  }).join("");
}
function openRaffle(){
  setRaffleChances(raffleChances());
  var note=document.getElementById("raffleNote"); if(note) note.textContent="Each share purchase gives one card play. Flip one card. Winning is by chance.";
  var res=document.getElementById("raffleResult"); if(res) res.textContent="";
  dealRaffleCards(); raffleBusy=false; openModal("modalRaffle");
}
function finishRaffleLocal(ugx,label){
  var res=document.getElementById("raffleResult");
  if(res) res.textContent=ugx>0?("You won "+label+" · UGX "+ugx.toLocaleString()+" ≈ USD "+(ugx/UGX_RATE).toFixed(2)):"No win this time. Buy another pack for a new card.";
  setRaffleChances(raffleChances()-1);
}
function playPickedCard(card){
  if(raffleBusy)return;
  if(raffleChances()<1){var r=document.getElementById("raffleResult"); if(r)r.textContent="Buy a share pack to get a raffle card.";return;}
  raffleBusy=true; card.classList.add("open"); if(Number(card.getAttribute("data-ugx"))>0) card.classList.add("win");
  document.querySelectorAll("#raffleGrid .rcard").forEach(function(c){ if(c!==card) setTimeout(function(){c.classList.add("open");},280); });
  var headers={"Content-Type":"application/json"}; if(typeof token!=="undefined" && token) headers.Authorization="Bearer "+token;
  fetch("/api/raffle/play",{method:"POST",headers:headers,body:"{}"})
    .then(function(r){return r.json();})
    .then(function(j){
      if(j&&j.ok){
        if(typeof j.raffle_chances==="number") setRaffleChances(j.raffle_chances);
        if(j.user){me=j.user; if(typeof applyMe==="function") applyMe();}
        var res=document.getElementById("raffleResult");
        if(res) res.textContent=j.win?("You won "+j.label+" · UGX "+Number(j.amount_ugx).toLocaleString()+" ≈ USD "+j.amount_usd):"No win this time. Chance used.";
      } else finishRaffleLocal(Number(card.getAttribute("data-ugx")), card.getAttribute("data-label"));
    }).catch(function(){finishRaffleLocal(Number(card.getAttribute("data-ugx")), card.getAttribute("data-label"));});
}
function agentById(id){return AI_AGENTS.find(function(a){return a.id===id;})||AI_AGENTS[0];}
function renderAgentPills(){var box=document.getElementById("agentPills"); if(!box)return; box.innerHTML=AI_AGENTS.map(function(a){return '<button type="button" class="'+(activeAgent===a.id?"on":"")+'" data-ag="'+a.id+'">'+a.name+'</button>';}).join("");}
function appendBubble(role,name,text){var log=document.getElementById("chatLog"); if(!log)return; var d=document.createElement("div"); d.className="bubble "+(role==="me"?"me":"ag"); d.innerHTML='<div class="who">'+name+'</div>'+text; log.appendChild(d); log.scrollTop=log.scrollHeight;}
function localAgentReply(text){var a=agentById(activeAgent); var t=(text||"").toLowerCase();
  if(/deposit|momo|usdt|crypto|txid|pay/.test(t)) return "Hi, I am "+a.name+". Send MoMo to 0779168109 or USDT TRC20 to TLvT3czNGgpPH3oXURZFtyd4XTQUL2NhGy, then paste TxID in Deposit.";
  if(/withdraw|cash/.test(t)) return "Hi, I am "+a.name+". Withdrawals go Pending then Admin review.";
  if(/raffle|gift|card/.test(t)) return "Hi, I am "+a.name+". Each share pack gives one raffle card. Flip one — winning is by chance.";
  if(/pack|share|lock|buy/.test(t)) return "Hi, I am "+a.name+". Four packs: 35k/7d, 70k/14d, 105k/21d, 140k/28d.";
  if(/invite|team|refer/.test(t)) return "Hi, I am "+a.name+". Share your Team link so people join under you.";
  return "Hi, I am "+a.name+" — "+a.role+". How can I help with deposits, withdrawals, shares or raffle?";
}
function paintThread(thread){var log=document.getElementById("chatLog"); if(!log)return; log.innerHTML=""; (thread&&thread.messages||[]).forEach(function(m){appendBubble(m.from==="me"?"me":"ag", m.name||"Support", m.text);});}
function openSupport(){
  renderAgentPills();
  var who=document.getElementById("supportWho"); var a=agentById(activeAgent);
  if(who) who.textContent="On duty: "+a.name+" · "+a.role+" (admin chooses the live agent)";
  var log=document.getElementById("chatLog"); if(log && !log.children.length) appendBubble("ag", a.name, "Hello, I am "+a.name+" from Own Club Support. How can I help?");
  var headers={}; if(typeof token!=="undefined" && token) headers.Authorization="Bearer "+token;
  fetch("/api/support/chat",{headers:headers}).then(function(r){return r.json();}).then(function(j){
    if(j&&j.active) activeAgent=j.active; if(j&&j.thread) paintThread(j.thread); renderAgentPills();
    var ag=agentById(activeAgent); if(who) who.textContent="On duty: "+ag.name+" · "+ag.role;
  }).catch(function(){});
  openModal("modalSupport");
}
function sendChat(){
  var inp=document.getElementById("chatInput"); if(!inp)return; var text=inp.value.trim(); if(!text)return; inp.value="";
  appendBubble("me",(typeof me!=="undefined"&&me&&me.name)||"You",text);
  var headers={"Content-Type":"application/json"}; if(typeof token!=="undefined" && token) headers.Authorization="Bearer "+token;
  fetch("/api/support/chat",{method:"POST",headers:headers,body:JSON.stringify({text:text})})
    .then(function(r){return r.json();})
    .then(function(j){ if(j&&j.thread) paintThread(j.thread); else appendBubble("ag", agentById(activeAgent).name, localAgentReply(text)); })
    .catch(function(){appendBubble("ag", agentById(activeAgent).name, localAgentReply(text));});
}
document.addEventListener("click",function(e){
  var card=e.target.closest("#raffleGrid .rcard"); if(card) playPickedCard(card);
  var ag=e.target.closest("#agentPills button[data-ag]");
  if(ag){ activeAgent=ag.getAttribute("data-ag"); renderAgentPills(); var a=agentById(activeAgent); var who=document.getElementById("supportWho"); if(who) who.textContent="Talking to "+a.name+" · "+a.role; }
});
var _pr=document.getElementById("btnPlayRaffle"); if(_pr)_pr.onclick=function(){dealRaffleCards();raffleBusy=false;var r=document.getElementById("raffleResult");if(r)r.textContent="";};
var _cs=document.getElementById("btnChatSend"); if(_cs)_cs.onclick=sendChat;
var _ci=document.getElementById("chatInput"); if(_ci)_ci.addEventListener("keydown",function(e){if(e.key==="Enter")sendChat();});
var grid=document.getElementById("accGrid");
if(grid) grid.addEventListener("click",function(e){
  var b=e.target.closest("button[data-act]"); if(!b)return;
  var act=b.getAttribute("data-act");
  if(act==="raffle"){ e.stopPropagation(); openRaffle(); }
  if(act==="support"||act==="manager"){ e.stopPropagation(); openSupport(); }
}, true);
window.openRaffle=openRaffle; window.openSupport=openSupport;
var buy=document.getElementById("buyBtn");
if(buy) buy.onclick=function(){
  if(typeof selectedPack==="undefined" || !selectedPack){var e=document.getElementById("buyErr"); if(e)e.textContent="Select a pack first";return;}
  var err=document.getElementById("buyErr"); if(err) err.textContent="Buying pack...";
  var payload={machine_id:current&&current.id,club_id:current&&current.id,name:current&&current.name,price:selectedPack.price,days:selectedPack.days,daily:selectedPack.daily,weeks:Math.round((selectedPack.days||7)/7)};
  var headers={"Content-Type":"application/json"}; if(typeof token!=="undefined" && token) headers.Authorization="Bearer "+token;
  fetch("/api/purchase",{method:"POST",headers:headers,body:JSON.stringify(payload)})
    .then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j};});})
    .then(function(res){
      if(res.j&&res.j.user){me=res.j.user; if(typeof applyMe==="function") applyMe();}
      grantRaffleChance(res.j&&res.j.raffle_chances);
      if(err) err.textContent="Pack locked. You earned a raffle card.";
      openRaffle();
    }).catch(function(){grantRaffleChance(); if(err)err.textContent="Raffle chance saved locally"; openRaffle();});
};
})();
