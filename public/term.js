(function(){
var css=
'.tm{position:absolute;inset:0;display:flex;flex-direction:column;background:#0c0c0c;font-size:13px}'+
'.tm button{border:0;background:none;color:inherit;font:inherit;border-radius:6px;cursor:default}'+
'.tm button:hover{background:var(--hover)}'+
'.tt{display:flex;align-items:flex-end;flex:none;gap:2px;padding:4px 4px 0;background:#1b1e2b}'+
'.tabs{display:flex;flex:1;min-width:0;gap:2px;overflow-x:auto;scrollbar-width:none}'+
'.tb{display:flex;align-items:center;flex:none;gap:6px;height:32px;padding:0 4px 0 12px;border-radius:8px 8px 0 0;color:var(--mut);white-space:nowrap}'+
'.tb.on{background:#0c0c0c;color:#fff}'+
'.tb i{width:22px;height:22px;display:grid;place-items:center;border-radius:4px;font-style:normal;font-size:15px}.tb i:hover{background:var(--hover)}'+
'.tt>button{flex:none;width:34px;height:32px;display:grid;place-items:center;margin-bottom:0}.tt svg{width:18px;height:18px}'+
'.tv{flex:1;min-height:0;position:relative}'+
'.tc{position:absolute;inset:0;padding:4px 0 0 6px;display:none}.tc.on{display:block}'+
'.tv>p{padding:14px;color:var(--mut)}'+
'.xk{display:none;flex:none;gap:4px;padding:6px;overflow-x:auto;scrollbar-width:none;background:#1b1e2b}'+
'.tm.ek .xk{display:flex}'+
'.xk button{flex:none;min-width:42px;height:36px;padding:0 10px;background:rgba(255,255,255,.08)}'+
'.xk button.on{background:#4cc2ff;color:#00111f}'+
'.fab{position:absolute;right:14px;bottom:14px;z-index:4;width:48px;height:48px;border-radius:50%!important;display:grid;place-items:center;background:#4cc2ff!important;color:#00111f!important;box-shadow:0 4px 16px rgba(0,0,0,.5)}'+
'.fab svg{width:22px;height:22px}'+
'.tm.ek .fab{bottom:62px}'+
'.cp{position:absolute;z-index:5;right:14px;bottom:72px;width:min(360px,calc(100% - 28px));max-height:min(440px,calc(100% - 90px));display:flex;flex-direction:column;background:#2d3243;border:1px solid var(--line);border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.55);overflow:hidden}'+
'.tm.ek .cp{bottom:120px}'+
'.ch{display:flex;align-items:center;justify-content:space-between;flex:none;padding:8px 8px 8px 14px;border-bottom:1px solid var(--line)}'+
'.ch button{width:34px;height:34px;display:grid;place-items:center}.ch svg,.ci svg{width:18px;height:18px}'+
'.cl{overflow:auto;padding:4px}.ce{padding:16px;color:var(--mut)}'+
'.ci{display:flex;align-items:center;gap:2px}'+
'.ci .cu{flex:1;min-width:0;text-align:left;padding:8px 10px}'+
'.ci .cu b{display:block;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.ci .cu code{display:block;margin-top:2px;color:var(--mut);font:12px ui-monospace,Menlo,Consolas,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.ci>button:last-child{width:34px;height:34px;flex:none;display:grid;place-items:center}'+
'.cf{display:grid;gap:10px;padding:12px 14px;overflow:auto}'+
'.cf label{display:grid;gap:4px;font-size:12px;color:var(--mut)}'+
'.cf input[type=text],.cf textarea{width:100%;padding:8px 10px;border:1px solid var(--line);border-bottom-color:#4cc2ff;border-radius:6px;background:rgba(255,255,255,.07);color:#fff;font:14px ui-monospace,Menlo,Consolas,monospace;outline:0;user-select:text;-webkit-user-select:text}'+
'.cf textarea{resize:vertical}.cf .fk{display:flex;align-items:center;gap:8px;color:var(--fg);font-size:13px}'+
'.cb{display:flex;gap:6px;align-items:center}.cb span{flex:1}.cb button{height:34px;padding:0 14px;background:rgba(255,255,255,.1)}'+
'.cb .sv{background:#4cc2ff;color:#00111f;font-weight:600}.cb .dg{color:#ff8a80}';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

var coarse=matchMedia("(pointer:coarse)").matches,XP=null,enc=new TextEncoder(),
 FONT='ui-monospace,Menlo,"Cascadia Mono",Consolas,"DejaVu Sans Mono",monospace',
 THEME={background:"#0c0c0c",foreground:"#cccccc",cursor:"#ffffff",selectionBackground:"#264f78",
  black:"#0c0c0c",red:"#c50f1f",green:"#13a10e",yellow:"#c19c00",blue:"#0037da",magenta:"#881798",cyan:"#3a96dd",white:"#cccccc",
  brightBlack:"#767676",brightRed:"#e74856",brightGreen:"#16c60c",brightYellow:"#f9f1a5",brightBlue:"#3b78ff",brightMagenta:"#b4009e",brightCyan:"#61d6d6",brightWhite:"#f2f2f2"},
 ic=function(d,w){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round"><path d="'+d+'"/></svg>'},
 PLUS=ic("M12 5v14M5 12h14"),EDIT=ic("M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"),
 BOLT='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
 KB=ic("M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10");
function esc(s){return s.replace(/[&<>"']/g,function(c){return"&#"+c.charCodeAt(0)+";"})}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(_){}}

function loadX(){
  if(XP)return XP;
  var L={x:"/vendor/xterm.js",f:"/vendor/addon-fit.js",c:"/vendor/xterm.css"},
      C={x:"https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js",f:"https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js",c:"https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css"};
  function js(u,a,b){var s=document.createElement("script");s.src=u;s.onload=a;s.onerror=b;document.head.appendChild(s)}
  function use(S,ok,fail){js(S.x,function(){js(S.f,function(){var l=document.createElement("link");l.rel="stylesheet";l.href=S.c;document.head.appendChild(l);ok()},fail)},fail)}
  return XP=new Promise(function(ok,no){
    use(L,ok,function(){use(C,ok,function(){XP=null;no(new Error("não foi possível carregar o xterm.js (sem internet?)"))})});
  });
}

window.App_term=function(root){
  root.innerHTML='<div class="tm"><div class="tt"><div class="tabs"></div>'+
    '<button data-a="add" title="Nova sessão">'+PLUS+'</button><button data-a="fm" title="Diminuir fonte">A−</button>'+
    '<button data-a="fp" title="Aumentar fonte">A+</button><button data-a="kb" title="Teclas extras">'+KB+'</button></div>'+
    '<div class="tv"><p>Carregando terminal…</p></div><div class="xk"></div>'+
    '<button class="fab" title="Comandos salvos" aria-label="Comandos salvos">'+BOLT+'</button><div class="cp" hidden></div></div>';
  var $=function(s){return root.querySelector(s)},
      tm=$(".tm"),tabs=$(".tabs"),tv=$(".tv"),xk=$(".xk"),cp=$(".cp"),fab=$(".fab"),
      S=[],act=null,fsz=+ls("tmfs")||(coarse?13:14),mod={c:0,a:0},cmds=[],rt,xb={};
  tm.classList.toggle("ek",ls("tmek")===null?coarse:ls("tmek")==="1");

  function send(s,d){if(s&&s.ws&&s.ws.readyState===1)s.ws.send(d)}
  function rs(s){if(s.ws&&s.ws.readyState===1)s.ws.send(enc.encode(JSON.stringify({r:[s.term.cols,s.term.rows]})))}
  function fitS(s){if(!s||s.el.offsetWidth<20)return;try{s.fit.fit()}catch(_){}rs(s)}
  function mods(d){
    if(d.length===1){
      if(mod.c){var c=d.charCodeAt(0);if(c>=64&&c<=127)d=String.fromCharCode(c&31);mod.c=0}
      if(mod.a){d="\x1b"+d;mod.a=0}
      upd();
    }
    return d;
  }
  function upd(){xb.C.classList.toggle("on",!!mod.c);xb.A.classList.toggle("on",!!mod.a)}

  /* teclas extras */
  [["Esc","\x1b"],["Tab","\t"],["Ctrl","C"],["Alt","A"],["↵","\r"],["↑","\x1b[A"],["↓","\x1b[B"],["←","\x1b[D"],["→","\x1b[C"],
   ["^C","\x03"],["^D","\x04"],["|","|"],["/","/"],["-","-"],["~","~"]].forEach(function(k){
    var b=document.createElement("button");b.textContent=k[0];
    b.onmousedown=function(e){e.preventDefault()};
    b.onclick=function(){
      if(k[1]==="C"||k[1]==="A"){mod[k[1].toLowerCase()]^=1;upd();return}
      if(act)send(act,k[1].length===1?mods(k[1]):k[1]);
      if(act&&!coarse)act.term.focus();
    };
    if(k[1]==="C"||k[1]==="A")xb[k[1]]=b;
    xk.appendChild(b);
  });

  /* sessões */
  function label(s){s.tab.firstChild.textContent="Sessão "+(s.id||"…")}
  function mk(id){
    var s={id:id,el:document.createElement("div"),tab:document.createElement("div"),ws:null,dead:false,tries:0};
    s.el.className="tc";tv.appendChild(s.el);
    s.term=new Terminal({fontSize:fsz,fontFamily:FONT,cursorBlink:true,scrollback:5000,theme:THEME});
    s.fit=new FitAddon.FitAddon();s.term.loadAddon(s.fit);s.term.open(s.el);
    s.term.onData(function(d){send(s,mods(d))});
    s.tab.className="tb";s.tab.innerHTML='<span></span><i title="Encerrar sessão">×</i>';label(s);
    s.tab.onclick=function(e){e.target.tagName==="I"?close(s):sel(s)};
    tabs.appendChild(s.tab);S.push(s);
    if(id)connect(s);
    return s;
  }
  function sel(s){
    act=s;
    S.forEach(function(x){x.el.classList.toggle("on",x===s);x.tab.classList.toggle("on",x===s)});
    s.tab.scrollIntoView({block:"nearest",inline:"nearest"});
    setTimeout(function(){fitS(s);if(!coarse)s.term.focus()},0);
  }
  function add(){
    var s=mk(null);sel(s);
    fetch("/api/term/new?cols="+s.term.cols+"&rows="+s.term.rows,{method:"POST"}).then(function(r){return r.json()}).then(function(j){
      if(!j.id)throw new Error(j.e||"Erro ao criar sessão");
      s.id=j.id;label(s);connect(s);
    }).catch(function(e){s.term.write("\r\n\x1b[31m"+e.message+"\x1b[0m")});
  }
  function connect(s){
    var ws=s.ws=new WebSocket((location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws?id="+s.id);
    ws.binaryType="arraybuffer";
    ws.onopen=function(){s.tries=0;s.term.reset();if(s===act)fitS(s);else rs(s)};
    ws.onmessage=function(e){
      if(typeof e.data==="string"){try{if(JSON.parse(e.data).exit)close(s,true)}catch(_){}return}
      s.term.write(new Uint8Array(e.data));
    };
    ws.onclose=function(){if(!s.dead&&s.ws===ws)recon(s)};
    clearInterval(s.pg);
    s.pg=setInterval(function(){if(ws.readyState===1)ws.send(enc.encode('{"p":1}'))},25000);
  }
  function recon(s){
    fetch("/api/term/list").then(function(r){return r.json()}).then(function(ids){
      if(s.dead||!Array.isArray(ids))return;
      if(ids.indexOf(s.id)<0)return close(s,true);
      setTimeout(function(){if(!s.dead&&(!s.ws||s.ws.readyState>1))connect(s)},Math.min(5000,500*(++s.tries)));
    }).catch(function(){setTimeout(function(){if(!s.dead)recon(s)},2000)});
  }
  function close(s,gone){
    if(s.dead)return;
    function shut(){
      s.dead=true;clearInterval(s.pg);try{s.ws&&s.ws.close()}catch(_){}
      if(!gone&&s.id)fetch("/api/term/kill?id="+s.id,{method:"POST"});
      try{s.term.dispose()}catch(_){}
      s.el.remove();s.tab.remove();
      var i=S.indexOf(s);S.splice(i,1);
      if(!S.length)add();else if(act===s)sel(S[Math.max(0,i-1)]);
    }
    if(gone)return shut();
    WUI.confirm("Encerrar esta sessão? Programas em execução nela serão finalizados.",{title:"Encerrar sessão",ok:"Encerrar",danger:true})
      .then(function(ok){if(ok)shut()});
  }
  function font(d){
    fsz=Math.max(8,Math.min(28,fsz+d));ls("tmfs",fsz);
    S.forEach(function(s){s.term.options.fontSize=fsz});fitS(act);
  }

  tm.addEventListener("click",function(e){
    var b=e.target.closest(".tt>button"),a=b&&b.dataset.a;
    if(a==="add")add();
    else if(a==="fm")font(-1);
    else if(a==="fp")font(1);
    else if(a==="kb"){var on=tm.classList.toggle("ek");ls("tmek",on?"1":"0")}
  });
  var ro=new ResizeObserver(function(){clearTimeout(rt);rt=setTimeout(function(){fitS(act)},60)});
  ro.observe(tv);
  function vis(){if(!document.hidden)S.forEach(function(s){if(!s.dead&&(!s.ws||s.ws.readyState>1))recon(s)})}
  document.addEventListener("visibilitychange",vis);

  /* comandos salvos */
  function saveCmds(){fetch("/api/cmds",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(cmds)}).catch(function(){})}
  function listV(){
    var h='<div class="ch"><b>Comandos</b><button data-c="new" title="Novo comando">'+PLUS+'</button></div><div class="cl">';
    if(!cmds.length)h+='<p class="ce">Nenhum comando salvo. Toque em + para criar.</p>';
    cmds.forEach(function(c,i){
      h+='<div class="ci"><button class="cu" data-i="'+i+'"><b>'+esc(c.n)+'</b><code>'+esc(c.c.split("\n")[0])+'</code></button><button data-e="'+i+'" title="Editar">'+EDIT+'</button></div>';
    });
    cp.innerHTML=h+'</div>';
  }
  function formV(i){
    var c=i>=0?cmds[i]:{n:"",c:"",e:false};
    cp.dataset.i=i;
    cp.innerHTML='<div class="ch"><b>'+(i>=0?"Editar comando":"Novo comando")+'</b></div><div class="cf">'+
      '<label>Nome<input type="text" class="fn" maxlength="100" placeholder="Limpar terminal" autocomplete="off"></label>'+
      '<label>Comando<textarea class="fc" rows="3" spellcheck="false" autocapitalize="off" placeholder="clear"></textarea></label>'+
      '<label class="fk"><input type="checkbox" class="fe"> Executar ao clicar (envia Enter)</label>'+
      '<div class="cb">'+(i>=0?'<button data-c="del" class="dg">Excluir</button>':'')+'<span></span><button data-c="cancel">Cancelar</button><button data-c="save" class="sv">Salvar</button></div></div>';
    cp.querySelector(".fn").value=c.n;cp.querySelector(".fc").value=c.c;cp.querySelector(".fe").checked=!!c.e;
    cp.querySelector(".fn").focus();
  }
  function paste(c){
    cp.hidden=true;
    if(!act)return;
    act.term.paste(c.c);
    if(c.e)send(act,"\r");else act.term.focus();
  }
  fab.onclick=function(){cp.hidden=!cp.hidden;if(!cp.hidden)listV()};
  tm.addEventListener("pointerdown",function(e){if(!cp.hidden&&!cp.contains(e.target)&&!fab.contains(e.target))cp.hidden=true});
  cp.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    var d=b.dataset,i=+cp.dataset.i;
    if(b.classList.contains("cu"))paste(cmds[+d.i]);
    else if(d.e!==undefined)formV(+d.e);
    else if(d.c==="new")formV(-1);
    else if(d.c==="cancel")listV();
    else if(d.c==="del"){
      WUI.confirm('Excluir "'+cmds[i].n+'"?',{title:"Excluir comando",ok:"Excluir",danger:true}).then(function(ok){
        if(ok){cmds.splice(i,1);saveCmds();listV()}
      });
    }
    else if(d.c==="save"){
      var n=cp.querySelector(".fn").value.trim(),c=cp.querySelector(".fc").value;
      if(!n||!c.trim()){cp.querySelector(n?".fc":".fn").focus();return}
      var o={n:n,c:c,e:cp.querySelector(".fe").checked};
      if(i>=0)cmds[i]=o;else cmds.push(o);
      saveCmds();listV();
    }
  });

  /* início */
  loadX().then(function(){
    tv.textContent="";
    fetch("/api/cmds").then(function(r){return r.json()}).then(function(c){if(Array.isArray(c))cmds=c}).catch(function(){});
    return fetch("/api/term/list").then(function(r){return r.json()});
  }).then(function(ids){
    if(!Array.isArray(ids))throw new Error("Não autorizado");
    if(!ids.length)return add();
    ids.forEach(function(id){mk(id)});sel(S[S.length-1]);
  }).catch(function(e){tv.innerHTML="<p>Erro: "+esc(e.message)+"</p>"});

  return function(){  /* ao fechar a janela: as sessões continuam vivas no servidor */
    document.removeEventListener("visibilitychange",vis);ro.disconnect();
    S.forEach(function(s){s.dead=true;clearInterval(s.pg);try{s.ws&&s.ws.close()}catch(_){}try{s.term.dispose()}catch(_){}});
  };
};
})();
