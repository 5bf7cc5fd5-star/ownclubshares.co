(function(){
  var CSS = [
    '#market,#page-market,.page-market{background:#07140f!important;}',
    '#ocMarketBoard{padding:8px 12px 90px;background:#07140f;min-height:100%;}',
    '#ocMarketBoard .mkt-row{display:grid;grid-template-columns:36px 1fr 78px 88px;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);}',
    '#ocMarketBoard .mkt-badge{width:32px;height:32px;object-fit:contain;border-radius:50%;background:#0b0c10;}',
    '#ocMarketBoard .mkt-name{color:#fff;font-size:14px;font-weight:600;line-height:1.15;}',
    '#ocMarketBoard .mkt-sub{color:#8aa396;font-size:11px;margin-top:2px;}',
    '#ocMarketBoard .mkt-spark svg{width:78px;height:28px;display:block;}',
    '#ocMarketBoard .mkt-price{color:#fff;font-size:13px;font-weight:600;text-align:right;}',
    '#ocMarketBoard .mkt-chg{font-size:12px;text-align:right;font-weight:600;}',
    '#ocMarketBoard .mkt-chg.up{color:#2ee56a;}',
    '#ocMarketBoard .mkt-chg.down{color:#ff5b5b;}',
    '#ocMarketBoard .mkt-live{color:#8aa396;font-size:11px;padding:6px 0 10px;}'
  ].join('');
  var CLUBS = [
    {id:32,code:"Ipswich Town",league:"Championship",mv:245.82e6,photo:"https://crests.football-data.org/349.png"},
    {id:12,code:"Villarreal CF",league:"La Liga",mv:711.54e6,photo:"https://crests.football-data.org/94.png"},
    {id:30,code:"Leeds United",league:"Championship",mv:406.42e6,photo:"https://crests.football-data.org/341.png"},
    {id:21,code:"Al Hilal",league:"Saudi Pro League",mv:913.53e6,photo:"https://crests.football-data.org/998.png"},
    {id:6,code:"Tottenham Hotspur",league:"Premier League",mv:2.84e9,photo:"https://crests.football-data.org/73.png"},
    {id:27,code:"LA Galaxy",league:"MLS",mv:887.59e6,photo:"https://crests.football-data.org/747.png"},
    {id:17,code:"Paris Saint-Germain",league:"Ligue 1",mv:4.14e9,photo:"https://crests.football-data.org/524.png"},
    {id:16,code:"SSC Napoli",league:"Serie A",mv:1.22e9,photo:"https://crests.football-data.org/113.png"},
    {id:22,code:"Al Nassr",league:"Saudi Pro League",mv:790.14e6,photo:"https://crests.football-data.org/992.png"},
    {id:19,code:"Bayern Munich",league:"Bundesliga",mv:4.84e9,photo:"https://crests.football-data.org/5.png"},
    {id:20,code:"Borussia Dortmund",league:"Bundesliga",mv:1.92e9,photo:"https://crests.football-data.org/4.png"},
    {id:10,code:"Athletic Club",league:"La Liga",mv:893.22e6,photo:"https://crests.football-data.org/77.png"},
    {id:25,code:"Inter Miami CF",league:"MLS",mv:1.11e9,photo:"https://crests.football-data.org/1835.png"},
    {id:4,code:"Chelsea",league:"Premier League",mv:3.08e9,photo:"https://crests.football-data.org/61.png"},
    {id:5,code:"Manchester United",league:"Premier League",mv:6.04e9,photo:"https://crests.football-data.org/66.png"},
    {id:8,code:"FC Barcelona",league:"La Liga",mv:5.03e9,photo:"https://crests.football-data.org/81.png"},
    {id:18,code:"Olympique Marseille",league:"Ligue 1",mv:804.54e6,photo:"https://crests.football-data.org/516.png"},
    {id:9,code:"Atlético Madrid",league:"La Liga",mv:1.49e9,photo:"https://crests.football-data.org/78.png"},
    {id:31,code:"Southampton FC",league:"Championship",mv:378.29e6,photo:"https://crests.football-data.org/340.png"},
    {id:14,code:"Inter Milan",league:"Serie A",mv:1.40e9,photo:"https://crests.football-data.org/108.png"},
    {id:3,code:"Liverpool",league:"Premier League",mv:5.31e9,photo:"https://crests.football-data.org/64.png"},
    {id:15,code:"AC Milan",league:"Serie A",mv:1.50e9,photo:"https://crests.football-data.org/98.png"},
    {id:23,code:"Al Ittihad",league:"Saudi Pro League",mv:600.14e6,photo:"https://crests.football-data.org/991.png"},
    {id:7,code:"Real Madrid",league:"La Liga",mv:6.00e9,photo:"https://crests.football-data.org/86.png"},
    {id:1,code:"Manchester City",league:"Premier League",mv:5.00e9,photo:"https://crests.football-data.org/65.png"},
    {id:2,code:"Arsenal",league:"Premier League",mv:3.50e9,photo:"https://crests.football-data.org/57.png"},
    {id:13,code:"Juventus",league:"Serie A",mv:2.00e9,photo:"https://crests.football-data.org/109.png"}
  ];
  function fmt(n){
    var a=Math.abs(n);
    if(a>=1e9) return "$"+(n/1e9).toFixed(2)+"B";
    if(a>=1e6) return "$"+(n/1e6).toFixed(2)+"M";
    return "$"+Math.round(n).toLocaleString();
  }
  var st={};
  function seed(){
    for(var i=0;i<CLUBS.length;i++){
      var c=CLUBS[i];
      if(st[c.id]) continue;
      var hist=[], p=c.mv;
      for(var h=0;h<20;h++){ p=p*(1+(Math.random()-0.5)*0.01); hist.push(p); }
      st[c.id]={price:p,open:c.mv,base:c.mv,hist:hist,chg:((p-c.mv)/c.mv)*100};
    }
  }
  function spark(hist,up){
    if(!hist||hist.length<2) return "";
    var min=Math.min.apply(null,hist), max=Math.max.apply(null,hist), range=(max-min)||1;
    var w=78,h=28,pad=2,pts=[];
    for(var i=0;i<hist.length;i++){
      pts.push((pad+(i/(hist.length-1))*(w-pad*2)).toFixed(1)+","+(h-pad-((hist[i]-min)/range)*(h-pad*2)).toFixed(1));
    }
    return '<svg viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none"><polyline fill="none" stroke="'+(up?"#2ee56a":"#ff5b5b")+'" stroke-width="1.8" stroke-linejoin="round" points="'+pts.join(" ")+'"/></svg>';
  }
  function host(){
    var box=document.getElementById("ocMarketBoard") || document.getElementById("marketList");
    if(box) return box;
    var page=document.getElementById("market") || document.getElementById("page-market") || document.querySelector("[data-page='market']");
    if(!page){
      page=document.createElement("section");
      page.id="market";
      var main=document.getElementById("mainApp") || document.body;
      main.appendChild(page);
    }
    box=document.createElement("div");
    box.id="ocMarketBoard";
    page.appendChild(box);
    return box;
  }
  function paint(){
    if(!document.getElementById("ocMktCss")){
      var stl=document.createElement("style"); stl.id="ocMktCss"; stl.textContent=CSS; document.head.appendChild(stl);
    }
    var box=host(); if(!box) return;
    seed();
    var rows=[];
    for(var i=0;i<CLUBS.length;i++) rows.push({c:CLUBS[i],s:st[CLUBS[i].id]});
    rows.sort(function(a,b){ return Math.abs(b.s.chg)-Math.abs(a.s.chg); });
    var html='<div class="mkt-live">LIVE · Club valuations</div>';
    for(var r=0;r<rows.length;r++){
      var c=rows[r].c, s=rows[r].s, up=s.chg>=0;
      html+='<div class="mkt-row">'+
        '<img class="mkt-badge" src="'+c.photo+'" alt="">'+
        '<div><div class="mkt-name">'+c.code+'</div><div class="mkt-sub">'+c.league+'</div></div>'+
        '<div class="mkt-spark">'+spark(s.hist,up)+'</div>'+
        '<div><div class="mkt-price">'+fmt(s.price)+'</div><div class="mkt-chg '+(up?"up":"down")+'">'+(up?"+":"")+s.chg.toFixed(2)+'%</div></div></div>';
    }
    box.innerHTML=html;
  }
  function tick(){
    seed();
    Object.keys(st).forEach(function(id){
      var s=st[id];
      s.price=Math.max(s.base*0.92, Math.min(s.base*1.08, s.price*(1+(Math.random()-0.5)*0.008)));
      s.hist.push(s.price); if(s.hist.length>24) s.hist.shift();
      s.chg=((s.price-s.open)/s.open)*100;
    });
    paint();
  }
  function start(){
    seed(); paint();
    if(window.__ocMkt) clearInterval(window.__ocMkt);
    window.__ocMkt=setInterval(tick, 2500);
  }
  window.renderMarketList=paint;
  window.startMarketFeed=start;
  window.CLUB_MARKET_SEED=CLUBS;
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", start); else start();
  setTimeout(start, 400);
  setTimeout(start, 1600);
})();
