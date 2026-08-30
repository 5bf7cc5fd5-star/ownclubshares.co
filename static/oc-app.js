(function(){
var OC_LOGO='https://raw.githubusercontent.com/5bf7cc5fd5-star/ownclubshares.co/main/own-club-logo.jpg';
function applyLogos(){
  document.querySelectorAll('#logoHero,.logoTop,.logoBig').forEach(function(img){
    img.src=OC_LOGO; img.onerror=function(){this.onerror=null;this.src=OC_LOGO;};
  });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyLogos); else applyLogos();
setTimeout(applyLogos,80);
var PACKS=[{price:35000,days:7,daily:5000},{price:70000,days:14,daily:7500},{price:105000,days:21,daily:10000},{price:140000,days:28,daily:12500}];
var GIFTS=[3000,7000,15000,25000,50000,3000,5000,140000,105000,5000,3000];
var UGX_RATE=3700, localCcy='UGX', rate=3700, token=null, me=null, selectedPack=null;
var stage=document.getElementById('stage');
var dock=document.getElementById('dock');
function fmtUSD(n){return 'USD '+Math.round(Number(n)||0).toLocaleString();}
function fmtLocal(n){return localCcy+' '+Math.round((Number(n)||0)*rate).toLocaleString();}
function dual(n){return fmtUSD(n)+' · '+fmtLocal(n);}
function openModal(id){var m=document.getElementById(id); if(m.parentNode!==stage) stage.appendChild(m); m.classList.remove('hidden');}
function closeModal(id){document.getElementById(id).classList.add('hidden');}
window.closeModal=closeModal;
window.copyText=function(t){try{navigator.clipboard.writeText(t);alert('Copied');}catch(e){alert(t);}};
function showLoginPane(signup){
  document.getElementById('loginForm').classList.toggle('hidden',!!signup);
  document.getElementById('signupForm').classList.toggle('hidden',!signup);
}
window.go=function(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.toggle('on',s.id===id);});
  dock.style.display=id==='login'?'none':'grid';
  stage.classList.toggle('auth',id==='login');
  applyLogos();
};
dock.style.display='none';
dock.addEventListener('click',function(e){var b=e.target.closest('button'); if(b&&b.getAttribute('data-go')) go(b.getAttribute('data-go'));});
document.getElementById('tabSignup').onclick=function(){showLoginPane(true);};
document.getElementById('backLogin').onclick=function(){showLoginPane(false);};
document.getElementById('btnForgot').onclick=function(){document.getElementById('authErr').textContent='Contact manager for password reset.';};
document.getElementById('signOut').onclick=function(){localStorage.removeItem('ocToken');token=null;me=null;showLoginPane(false);go('login');};
window.onCountryCode=function(){
  var sel=document.getElementById('suCode');
  var opt=sel.options[sel.selectedIndex];
  localCcy=opt.getAttribute('data-ccy')||'UGX';
  rate=parseFloat(opt.getAttribute('data-rate')||'3700');
  document.getElementById('ccyHint').textContent='Currency: '+localCcy+' · 1 USD ≈ '+rate.toLocaleString()+' '+localCcy;
};
onCountryCode();
function applyMe(){
  var bal=me&&me.balance||0;
  ['homeBal','accBal','homeBook','holdVal'].forEach(function(id){var el=document.getElementById(id); if(el) el.textContent=fmtUSD(bal);});
  ['homeBalLocal','accBalLocal','homeBookLocal','holdValLocal'].forEach(function(id){var el=document.getElementById(id); if(el) el.textContent='Local: '+fmtLocal(bal);});
  document.getElementById('accName').textContent=(me&&me.name)||'Member';
  document.getElementById('accSub').textContent=(me&&(me.email||me.phone))||'Signed in';
  document.getElementById('accInit').textContent=((me&&me.name)||'A').charAt(0).toUpperCase();
  document.getElementById('myCode').textContent=(me&&me.invite_code)||'IMXT2Y0M8D';
  document.getElementById('inviteLink').textContent='https://ownclubshares.co/app?ref='+encodeURIComponent((me&&me.invite_code)||'IMXT2Y0M8D');
}
function afterAuth(j){
  if(j.token){token=j.token; try{localStorage.setItem('ocToken',j.token);}catch(e){}}
  me=j.user||me; applyMe(); go('home');
}
document.getElementById('loginForm').onsubmit=function(e){
  e.preventDefault();
  var err=document.getElementById('authErr'); err.textContent='';
  var code=document.getElementById('loginCode').value;
  var id=document.getElementById('loginId').value.trim();
  var identifier=id.indexOf('@')>=0?id:(code+id.replace(/^0+/,''));
  fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({identifier:identifier,password:document.getElementById('loginPass').value})})
    .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
    .then(function(res){if(res.ok&&(res.j.token||res.j.user)) afterAuth(res.j); else err.textContent=(res.j&&(res.j.error||res.j.message))||'Check details';})
    .catch(function(){err.textContent='Network error';});
};
document.getElementById('signupForm').onsubmit=function(e){
  e.preventDefault();
  var err=document.getElementById('authErr'); err.textContent='';
  var code=document.getElementById('suCode').value;
  var phone=code+document.getElementById('suPhone').value.trim().replace(/^0+/,'');
  var opt=document.getElementById('suCode').options[document.getElementById('suCode').selectedIndex];
  fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:document.getElementById('suName').value.trim(),phone:phone,email:document.getElementById('suEmail').value.trim(),password:document.getElementById('suPass').value,invite_code:document.getElementById('suInvite').value.trim()||'IMXT2Y0M8D',country:opt.getAttribute('data-ccy')||'UGX'})})
    .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
    .then(function(res){if(res.ok&&(res.j.token||res.j.user)) afterAuth(res.j); else err.textContent=(res.j&&(res.j.error||res.j.message))||'Could not create account';})
    .catch(function(){err.textContent='Network error';});
};
document.getElementById('accGrid').addEventListener('click',function(e){
  var b=e.target.closest('button[data-act]'); if(!b) return;
  var act=b.getAttribute('data-act');
  if(act==='deposit') openModal('modalDeposit');
  else if(act==='withdraw') openModal('modalWithdraw');
  else if(act==='raffle'){
    document.getElementById('giftList').innerHTML=GIFTS.map(function(g,i){return '<div class="gift" data-g="'+g+'">Gift '+(i+1)+' · UGX '+g.toLocaleString()+' ≈ USD '+(g/UGX_RATE).toFixed(2)+'</div>';}).join('');
    openModal('modalRaffle');
  }
  else if(act==='team'||act==='invite') go('team');
  else {document.getElementById('genTitle').textContent=act; document.getElementById('genBody').textContent='MoMo 0779168109 · USDT TLvT3czNGgpPH3oXURZFtyd4XTQUL2NhGy'; openModal('modalGeneric');}
});
document.getElementById('giftList').addEventListener('click',function(e){
  var g=e.target.closest('[data-g]'); if(!g) return;
  alert('Selected gift UGX '+Number(g.getAttribute('data-g')).toLocaleString());
});
document.getElementById('btnWithdrawDiv').onclick=function(){alert('Dividend moved to balance.');};
document.getElementById('btnCreditWallet').onclick=function(){alert('Dividend credited to wallet.');};
document.getElementById('btnCopyLink').onclick=function(){copyText(document.getElementById('inviteLink').textContent);};
document.getElementById('btnShare').onclick=function(){copyText(document.getElementById('inviteLink').textContent);};
document.getElementById('btnCopyMomo').onclick=function(){copyText('0779168109');};
document.getElementById('btnCopyCrypto').onclick=function(){copyText('TLvT3czNGgpPH3oXURZFtyd4XTQUL2NhGy');};
document.getElementById('btnDoWithdraw').onclick=function(){
  var a=document.getElementById('wdAmt').value,d=document.getElementById('wdDest').value;
  if(!a||!d){alert('Enter amount and destination');return;}
  alert('Withdrawal pending admin review: '+fmtUSD(a)); closeModal('modalWithdraw');
};
document.getElementById('btnSubmitDep').onclick=function(){
  var tx=document.getElementById('depTxid').value.trim();
  if(!tx){alert('Paste TxID after you pay');return;}
  alert('Deposit TxID submitted: '+tx); closeModal('modalDeposit');
};
document.getElementById('buyBtn').onclick=function(){
  document.getElementById('buyErr').textContent=selectedPack?'Need wallet cover of '+dual(selectedPack.price):'Select a pack first';
};
try{var u=new URL(location.href);var ref=u.searchParams.get('ref'); if(ref){var inv=document.getElementById('suInvite'); if(inv) inv.value=ref;}}catch(e){}
try{token=localStorage.getItem('ocToken');}catch(e){}
if(token){
  fetch('/api/me',{headers:{Authorization:'Bearer '+token}}).then(function(r){return r.json();}).then(function(j){if(j&&j.user){me=j.user;applyMe();go('home');}}).catch(function(){});
}
})();
