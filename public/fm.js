(function(){
var css=
'.fm{position:absolute;inset:0;display:flex;flex-direction:column;container-type:inline-size;font-size:13px}'+
'.fm button{border:0;background:none;color:inherit;font:inherit;border-radius:6px;cursor:default}'+
'.fm button:hover{background:var(--hover)}.fm button:disabled{opacity:.35;pointer-events:none}'+
'.fm .ft{display:flex;align-items:center;gap:2px;flex:none;padding:6px 8px;border-bottom:1px solid var(--line)}'+
'.fm .ft>button{width:36px;height:36px;display:grid;place-items:center;flex:none}'+
'.fm svg{width:18px;height:18px;display:block}'+
'.bc{flex:1;min-width:0;display:flex;align-items:center;overflow-x:auto;scrollbar-width:none;margin:0 4px;padding:0 6px;height:36px;background:rgba(255,255,255,.05);border-radius:6px}'+
'.bc button{padding:4px 6px;white-space:nowrap;flex:none}.bc i{opacity:.4;font-style:normal}.bc svg{width:16px;height:16px}'+
'.fl{flex:1;min-height:0;overflow:auto}'+
'.r{display:flex;align-items:center;gap:12px;min-height:48px;padding:0 6px 0 14px;border-bottom:1px solid rgba(255,255,255,.04)}'+
'.rh{min-height:30px;position:sticky;top:0;z-index:1;background:#202431;color:var(--mut);font-size:12px}.rh:hover{background:#202431}'+
'.r:hover{background:var(--hover)}'+
'.ri svg{width:24px;height:24px}'+
'.rn{flex:1;min-width:0}.rn b{display:block;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.rn small{display:none;margin-top:1px;color:var(--mut);font-size:11px}'+
'.rs{width:70px;flex:none;text-align:right;color:var(--mut)}.rd{width:132px;flex:none;color:var(--mut);font-size:12px}.rx{width:36px;flex:none}'+
'.rm{width:36px;height:36px;flex:none;display:grid;place-items:center}'+
'@container (max-width:680px){.c3,.rh{display:none}.rn small{display:block}}'+
'.fm.dz .fl{outline:2px dashed #4cc2ff;outline-offset:-4px}'+
'.fs2{flex:none;min-height:28px;padding:6px 14px;color:var(--mut);font-size:12px;border-top:1px solid var(--line)}'+
'.mu{position:absolute;z-index:3;min-width:170px;padding:4px;background:#2d3243;border:1px solid var(--line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.5)}'+
'.mu button{display:block;width:100%;text-align:left;padding:10px 12px}'+
'.ed{display:none;flex:1;min-height:0;flex-direction:column}'+
'.fm.on .ed{display:flex}.fm.on>.ft,.fm.on>.fl,.fm.on>.fs2{display:none}'+
'.ed textarea{flex:1;min-height:0;resize:none;border:0;outline:0;padding:12px 14px;background:#161925;color:#e6e9f2;font:13px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:pre;overflow:auto;tab-size:2;user-select:text;-webkit-user-select:text}'+
'.en{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;padding:0 8px}'+
'.fm .sv{padding:0 16px;height:36px;background:#4cc2ff;color:#00111f;font-weight:600}.fm .sv:hover{background:#7ad4ff}'+
'.ck{display:none;width:18px;height:18px;flex:none;border:2px solid var(--mut);border-radius:4px;position:relative}'+
'.fm.sm .ck{display:block}.fm.sm .rm{visibility:hidden}'+
'.r.sel{background:rgba(76,194,255,.16)}.r.sel .ck{background:#4cc2ff;border-color:#4cc2ff}'+
'.r.sel .ck::after{content:"";position:absolute;left:4px;top:0;width:5px;height:10px;border:solid #00111f;border-width:0 2px 2px 0;transform:rotate(45deg)}'+
'.sb{display:none;align-items:center;gap:2px;flex:none;padding:6px 8px;border-bottom:1px solid var(--line);overflow-x:auto;scrollbar-width:none;white-space:nowrap}'+
'.fm.sm>.sb{display:flex}.fm.on>.sb{display:none}'+
'.sb button{flex:none;height:36px;padding:0 12px}.sb svg{width:18px;height:18px}.sb span{flex:1;min-width:90px;padding:0 6px}.sb .dg{color:#ff8a80}'+
'.ft>button.pb{width:auto;display:flex;align-items:center;gap:6px;padding:0 10px;background:rgba(76,194,255,.16);color:#cdeaff}'+
'.ft>button.pb:hover{background:rgba(76,194,255,.26)}.ft>button.pb[hidden]{display:none}'+
'.ft>button.pb b{font-size:11px;font-weight:600;opacity:.85}'+
'.r.cut{opacity:.45}'+
'@container (max-width:520px){.ft>button.pb b{display:none}}';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

var ic=function(d,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round"><path d="'+d+'"/></svg>'},
 I={paste:ic("M9 3h6v4H9zM9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"),
    up:ic("M12 19V5M5 12l7-7 7 7"),rf:ic("M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"),plus:ic("M12 5v14M5 12h14"),
    upl:ic("M12 16V4M6 10l6-6 6 6M4 20h16"),more:ic("M12 6h.01M12 12h.01M12 18h.01",3),home:ic("M3 11l9-8 9 8M5 9.5V20h14V9.5"),back:ic("M19 12H5M12 19l-7-7 7-7"),x:ic("M6 6l12 12M18 6L6 18"),sel:ic("M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9")},
 FOLDER='<svg viewBox="0 0 24 24"><path fill="#f5c04a" d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>',
 FILE='<svg viewBox="0 0 24 24"><path fill="#aeb8cc" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path fill="#7f8ba3" d="M14 2l6 6h-4a2 2 0 0 1-2-2z"/></svg>',
 MEDIA=/^(png|jpe?g|gif|webp|svg|bmp|ico|avif|pdf|mp4|webm|mkv|mp3|ogg|wav|m4a|flac)$/,
 BIN=/^(zip|gz|tar|7z|rar|apk|so|bin|exe|dll|jar|class|pyc|db|sqlite|iso|img|deb|xz|bz2|woff2?|ttf|otf|docx|xlsx|pptx|odt)$/,
 df=new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});

function esc(s){return s.replace(/[&<>"']/g,function(c){return"&#"+c.charCodeAt(0)+";"})}
function sz(n){var u=["B","KB","MB","GB"],i=0;while(n>=1024&&i<3){n/=1024;i++}return(i?n.toFixed(n<10?1:0):n)+" "+u[i]}
function join(a,b){return a?a+"/"+b:b}
function enc(s){return encodeURIComponent(s)}
var ARC=/\.(zip|tar|tgz|tbz2|txz|gz|bz2|xz|7z|rar)$/i;
function stem(n){return n.replace(/\.(tar\.(gz|bz2|xz)|tgz|tbz2|txz|tar|zip|gz|bz2|xz|7z|rar)$/i,"")||n}
function api(u,o){
  return fetch(u,o).then(function(r){
    if(r.ok)return r;
    return r.json().catch(function(){return{}}).then(function(j){throw new Error(j.e||"Erro "+r.status)});
  });
}

window.App_fm=function(root){
  root.innerHTML=
   '<div class="fm">'+
    '<div class="ft"><button data-a="up" title="Subir">'+I.up+'</button><button data-a="rf" title="Atualizar">'+I.rf+'</button>'+
      '<div class="bc"></div><button data-a="sel" title="Selecionar">'+I.sel+'</button><button data-a="new" title="Novo">'+I.plus+'</button><button data-a="upl" title="Enviar arquivos ou pastas">'+I.upl+'</button>'+
      '<button data-a="paste" class="pb" title="Colar" hidden>'+I.paste+'<b></b></button>'+
      '<input type="file" multiple hidden><input type="file" webkitdirectory hidden></div>'+
    '<div class="sb"></div><div class="fl"></div><div class="fs2"></div>'+
    '<div class="ed"><div class="ft"><button data-a="bk" title="Voltar">'+I.back+'</button><b class="en"></b><button class="sv">Salvar</button></div>'+
      '<textarea spellcheck="false" autocapitalize="off" autocomplete="off"></textarea><div class="fs2 es"></div></div>'+
   '</div>';
  var $=function(s){return root.querySelector(s)},
      fm=$(".fm"),list=$(".fl"),sb=$(".sb"),bc=$(".bc"),stt=$(".fs2"),es=$(".es"),ta=$("textarea"),inp=root.querySelectorAll("input")[0],inpd=root.querySelectorAll("input")[1],
      cwd="",items=[],cur="",dirty=false,sel={},selOn=false,clip=loadClip();

  function stat(t){stt.textContent=t}
  function err(e){stat("⚠ "+e.message);es.textContent=e.message}

  function go(p){
    stat("Carregando…");
    api("/api/ls?p="+enc(p)).then(function(r){return r.json()}).then(function(j){
      cwd=j.p;
      items=j.i.sort(function(a,b){return b[1]-a[1]||a[0].localeCompare(b[0],undefined,{numeric:true,sensitivity:"base"})});
      draw();
    }).catch(err);
  }

  function draw(){
    sel={};selOn=false;fm.classList.remove("sm");
    var h='<button data-p="" title="Início">'+I.home+'</button>',acc="";
    cwd&&cwd.split("/").forEach(function(s){acc=join(acc,s);h+='<i>›</i><button data-p="'+esc(acc)+'">'+esc(s)+'</button>'});
    bc.innerHTML=h;bc.scrollLeft=bc.scrollWidth;
    $('[data-a=up]').disabled=!cwd;
    var d=function(t){return t?df.format(t*1000):"—"};
    list.innerHTML=(items.length?'<div class="r rh"><span class="ck"></span><span style="width:24px;flex:none"></span><span class="rn">Nome</span><span class="rd c3">Criado em</span><span class="rd c3">Modificado em</span><span class="rs c3">Tamanho</span><span class="rx"></span></div>':"")+
    items.map(function(it,i){
      return '<div class="r" data-i="'+i+'"><span class="ck"></span><span class="ri">'+(it[1]?FOLDER:FILE)+'</span><span class="rn"><b>'+esc(it[0])+'</b><small>'+
        (it[1]?"":sz(it[2])+" · ")+'Criado '+d(it[4])+'</small></span><span class="rd c3">'+d(it[4])+'</span><span class="rd c3">'+d(it[3])+
        '</span><span class="rs c3">'+(it[1]?"":sz(it[2]))+'</span><button class="rm" aria-label="Opções">'+I.more+'</button></div>';
    }).join("");
    markCut();
    stat(items.length?items.length+" itens":"Pasta vazia");
  }

  function ext(n){var i=n.lastIndexOf(".");return i>0?n.slice(i+1).toLowerCase():""}
  function open(it){
    var p=join(cwd,it[0]),e=ext(it[0]);
    if(it[1])return go(p);
    if(ARC.test(it[0])){WUI.confirm('Extrair "'+it[0]+'" para uma pasta?',{title:"Extrair",ok:"Extrair"}).then(function(ok){if(ok)run([xop(it,false)])});return}
    if(MEDIA.test(e))return window.open("/api/raw?p="+enc(p),"_blank");
    if(BIN.test(e)||it[2]>1048576)return dl(p);
    edit(p,it[0]);
  }
  function link(u){var a=document.createElement("a");a.href=u;a.download="";document.body.appendChild(a);a.click();a.remove()}
  function dl(p){link("/api/raw?p="+enc(p)+"&dl=1")}
  function dlMany(l){
    if(l.length===1&&!l[0][1])return dl(join(cwd,l[0][0]));
    link("/api/zip?p="+enc(cwd)+l.map(function(it){return"&n="+enc(it[0])}).join(""));
  }

  function edit(p,name){
    stat("Abrindo…");
    api("/api/raw?p="+enc(p)).then(function(r){return r.text()}).then(function(t){
      if(/[\u0000\ufffd]/.test(t)){stat("Arquivo binário — use Baixar");return}
      cur=p;ta.value=t;dirty=false;es.textContent="";
      $(".en").textContent=name;fm.classList.add("on");ta.focus({preventScroll:true});stat("");
    }).catch(err);
  }
  function save(){
    es.textContent="Salvando…";
    api("/api/put?p="+enc(cur),{method:"PUT",body:ta.value}).then(function(){dirty=false;es.textContent="Salvo"}).catch(err);
  }
  function back(){
    if(dirty){
      WUI.confirm("Descartar alterações não salvas?",{title:"Descartar",ok:"Descartar",danger:true}).then(function(ok){
        if(!ok)return;fm.classList.remove("on");dirty=false;go(cwd);
      });
      return;
    }
    fm.classList.remove("on");dirty=false;go(cwd);
  }
  ta.oninput=function(){dirty=true;es.textContent="Modificado"};
  ta.onkeydown=function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==="s"){e.preventDefault();save()}
    else if(e.key==="Tab"){e.preventDefault();ta.setRangeText("  ",ta.selectionStart,ta.selectionEnd,"end");dirty=true}
  };
  $(".sv").onclick=save;

  function run(ops){
    var i=0,fail=0,msg="";
    (function nx(){
      if(i>=ops.length){go(cwd);if(fail)WUI.alert(fail+" falhou(aram): "+msg,{title:"Falha na operação",danger:true});return}
      stat("Processando "+(i+1)+"/"+ops.length+"…");
      api("/api/op",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(ops[i])})
        .catch(function(x){fail++;msg=x.message}).then(function(){i++;nx()});
    })();
  }
  function op(o){run([o])}

  /* área de transferência do gerenciador (sobrevive a fechar/reabrir a janela) */
  function loadClip(){
    try{
      var c=JSON.parse(sessionStorage.getItem("winmux.fm.clip")||"null");
      return c&&(c.m==="cp"||c.m==="mv")&&typeof c.d==="string"&&c.n&&c.n.length?c:null;
    }catch(_){return null}
  }
  function setClip(c){
    clip=c;
    try{c?sessionStorage.setItem("winmux.fm.clip",JSON.stringify(c)):sessionStorage.removeItem("winmux.fm.clip")}catch(_){}
    updClip();
  }
  function updClip(){
    var b=$('.ft [data-a="paste"]');
    if(!b)return;
    b.hidden=!clip;
    if(!clip)return;
    b.title=(clip.m==="mv"?"Mover":"Copiar")+" "+clip.n.length+" item(ns) de "+(clip.d||"raiz")+" — colar em "+(cwd||"raiz");
    b.querySelector("b").textContent=clip.n.length;
    markCut();
  }
  function markCut(){
    var on=!!(clip&&clip.m==="mv"&&clip.d===cwd);
    Array.prototype.forEach.call(list.querySelectorAll(".r:not(.rh)"),function(r){
      var it=items[r.dataset.i];
      r.classList.toggle("cut",on&&!!it&&clip.n.indexOf(it[0])>-1);
    });
  }
  function xop(it,here){return{op:"x",p:join(cwd,it[0]),to:here?cwd:join(cwd,uniq(stem(it[0]))),fresh:here?0:1}}
  function setSel(on){
    selOn=on;sel={};fm.classList.toggle("sm",on);
    Array.prototype.forEach.call(list.querySelectorAll(".r.sel"),function(r){r.classList.remove("sel")});
    if(on)updSel();
  }
  function tog(r){var i=r.dataset.i;if(sel[i])delete sel[i];else sel[i]=1;r.classList.toggle("sel",!!sel[i]);updSel()}
  function updSel(){
    var n=Object.keys(sel).length,ar=Object.keys(sel).some(function(i){return!items[i][1]&&ARC.test(items[i][0])});
    sb.innerHTML='<button data-s="x" title="Cancelar">'+I.x+'</button><span>'+n+' selecionado'+(n==1?"":"s")+'</span><button data-s="all">'+(n&&n===items.length?"Nenhum":"Todos")+'</button>'+
      (n?'<button data-s="cp">Copiar</button><button data-s="mv">Recortar</button><button data-s="dl">Baixar</button>'+(ar?'<button data-s="ex">Extrair</button>':'')+'<button data-s="rm" class="dg">Excluir</button>':"");
  }
  function act(a){
    if(a==="x")return setSel(false);
    if(a==="all"){
      var all=Object.keys(sel).length!==items.length;sel={};
      Array.prototype.forEach.call(list.querySelectorAll(".r:not(.rh)"),function(r){if(all)sel[r.dataset.i]=1;r.classList.toggle("sel",all)});
      return updSel();
    }
    var l=Object.keys(sel).map(function(i){return items[i]});
    if(!l.length)return;
    if(a==="cp"||a==="mv"){
      setClip({m:a,d:cwd,n:l.map(function(it){return it[0]})});setSel(false);
      stat(l.length+(a==="cp"?" copiado(s)":" recortado(s)")+" — abra a pasta de destino e toque em Colar (ou Ctrl+V)");
    }else if(a==="dl"){dlMany(l);setSel(false)}
    else if(a==="ex")run(l.filter(function(it){return!it[1]&&ARC.test(it[0])}).map(function(it){return xop(it,false)}));
    else if(a==="rm"){
      var dg=l.some(function(it){return it[1]});
      WUI.confirm("Excluir "+l.length+" item(ns)?"+(dg?"\nO conteúdo das pastas também será apagado.":""),{title:"Excluir",ok:"Excluir",danger:true})
        .then(function(ok){if(ok)run(l.map(function(it){return{op:"rm",p:join(cwd,it[0])}}))});
    }
  }
  function uniq(n){
    var u={};items.forEach(function(it){u[it[0]]=1});
    var i=n.lastIndexOf("."),b=i>0?n.slice(0,i):n,e=i>0?n.slice(i):"",c=b+" (cópia)"+e,k=2;
    while(u[c])c=b+" (cópia "+(k++)+")"+e;
    return c;
  }
  function paste(){
    if(!clip){stat("Nada para colar");return}
    if(clip.m==="mv"&&clip.d===cwd){stat("Os itens já estão nesta pasta");return}
    var c={m:clip.m,d:clip.d,n:clip.n.slice()},same=c.d===cwd;
    var exists=function(n){return items.some(function(it){return it[0]===n})};
    /* recortar por cima de nome existente só substitui com confirmação */
    var dup=(c.m==="mv"&&!same)?c.n.filter(exists):[];
    function apply(){
      var ops=[],rm=[];
      dup.forEach(function(n){rm.push({op:"rm",p:join(cwd,n)})});
      c.n.forEach(function(n){ops.push({op:c.m,p:join(c.d,n),to:join(cwd,(c.m==="cp"&&(same||exists(n)))?uniq(n):n)})});
      /* a área de transferência é consumida ao colar (como nos gerenciadores do Android):
         o indicador sai da barra e o próximo Colar pede uma nova cópia */
      setClip(null);
      run(rm.concat(ops));
    }
    if(!dup.length)return apply();
    var temPasta=dup.some(function(n){return items.filter(function(it){return it[0]===n})[0][1]});
    WUI.confirm("Já existe(m) aqui: "+dup.join(", ")+".\nSubstituir o(s) item(ns) desta pasta?"
        +(temPasta?"\nAtenção: há pastas nessa lista e todo o conteúdo delas será apagado.":""),
      {title:"Substituir",ok:"Substituir",danger:temPasta}).then(function(ok){if(ok)apply()});
  }
  /* prompt do sistema: devolve Promise<string|null>; nome vazio/inválido pede de novo */
  function name(msg,def,o){
    return WUI.prompt(msg,def||"",Object.assign({required:true,requiredMsg:"Informe um nome válido.",ok:"Confirmar"},o)).then(function(v){
      if(v==null)return null;
      var n=String(v).trim();
      if(!n||/[\/\0]/.test(n)){stat("⚠ Nome inválido");return null}
      return n;
    });
  }
  function mk(kind){name(kind==="mkdir"?"Nome da nova pasta:":"Nome do novo arquivo:").then(function(n){if(n)op({op:kind,p:join(cwd,n)})})}
  function ren(it){name("Novo nome:",it[0]).then(function(n){if(n&&n!==it[0])op({op:"mv",p:join(cwd,it[0]),to:join(cwd,n)})})}
  function del(it){
    WUI.confirm('Excluir "'+it[0]+'"?'+(it[1]?"\nTudo dentro dela também será apagado.":""),
      {title:"Excluir",ok:"Excluir",danger:true}).then(function(ok){if(ok)op({op:"rm",p:join(cwd,it[0])})});
  }
  function put(u,f,pr){
    return new Promise(function(ok,no){
      var x=new XMLHttpRequest();x.open("PUT",u);
      x.upload.onprogress=function(e){if(e.lengthComputable)pr(Math.round(e.loaded*100/e.total))};
      x.onload=function(){if(x.status<300)return ok();var m;try{m=JSON.parse(x.responseText).e}catch(_){}no(new Error(m||"Erro "+x.status))};
      x.onerror=function(){no(new Error("Falha de rede"))};
      x.send(f);
    });
  }
  function upload(l){
    if(!l.length)return;
    var tops={};l.forEach(function(e){tops[e.n.split("/")[0]]=1});
    var dup=items.some(function(it){return tops[it[0]]}),i=0,fail=0,msg="";
    function next(){
      if(i>=l.length){go(cwd);if(fail)WUI.alert(fail+" arquivo(s) não foram enviados: "+msg,{title:"Envio incompleto",danger:true});return}
      var e=l[i];
      put("/api/put?p="+enc(join(cwd,e.n)),e.f,function(p){stat("Enviando "+(i+1)+"/"+l.length+" — "+e.n+" "+p+"%")})
        .catch(function(x){fail++;msg=x.message}).then(function(){i++;next()});
    }
    if(!dup)return next();
    WUI.confirm("Já existem itens com o mesmo nome. Substituir?",{title:"Substituir",ok:"Substituir",danger:true})
      .then(function(ok){if(ok)next()});
  }
  function pick(el){
    var l=Array.prototype.map.call(el.files,function(f){return{f:f,n:f.webkitRelativePath||f.name}});
    el.value="";upload(l);
  }
  inp.onchange=function(){pick(inp)};inpd.onchange=function(){pick(inpd)};
  function walk(en,pre,out){
    return new Promise(function(ok){
      if(en.isFile)return en.file(function(f){out.push({f:f,n:pre+en.name});ok()},ok);
      var rd=en.createReader(),all=[];
      (function more(){
        rd.readEntries(function(r){
          if(!r.length)return Promise.all(all.map(function(c){return walk(c,pre+en.name+"/",out)})).then(ok);
          all=all.concat(Array.prototype.slice.call(r));more();
        },ok);
      })();
    });
  }
  fm.addEventListener("dragover",function(e){e.preventDefault();if(!fm.classList.contains("on"))fm.classList.add("dz")});
  fm.addEventListener("dragleave",function(e){if(e.target===list||e.target===fm)fm.classList.remove("dz")});
  fm.addEventListener("drop",function(e){
    e.preventDefault();fm.classList.remove("dz");
    if(fm.classList.contains("on"))return;
    var dt=e.dataTransfer,out=[],ens=[];
    if(dt.items&&dt.items.length&&dt.items[0].webkitGetAsEntry){
      for(var k=0;k<dt.items.length;k++){var en=dt.items[k].webkitGetAsEntry();if(en)ens.push(en)}
      stat("Lendo arquivos…");
      Promise.all(ens.map(function(en){return walk(en,"",out)})).then(function(){upload(out)});
    }else upload(Array.prototype.map.call(dt.files,function(f){return{f:f,n:f.name}}));
  });

  function closeMenu(){var m=$(".mu");if(m)m.remove()}
  function menu(a,entries){
    closeMenu();
    var m=document.createElement("div");m.className="mu";
    entries.forEach(function(e){
      var b=document.createElement("button");b.textContent=e[0];
      b.onclick=function(){closeMenu();e[1]()};m.appendChild(b);
    });
    fm.appendChild(m);
    var fr=fm.getBoundingClientRect(),br=a.getBoundingClientRect(),t=br.bottom-fr.top;
    m.style.left=Math.max(4,Math.min(br.right-fr.left-m.offsetWidth,fr.width-m.offsetWidth-4))+"px";
    if(t+m.offsetHeight>fr.height-4)t=br.top-fr.top-m.offsetHeight;
    m.style.top=Math.max(4,t)+"px";
  }
  fm.addEventListener("pointerdown",function(e){if(!e.target.closest(".mu"))closeMenu()});

  var lp=0,skip=0;
  list.addEventListener("pointerdown",function(e){
    skip=0;
    var r=e.target.closest(".r");
    if(selOn||e.pointerType==="mouse"||!r||r.classList.contains("rh")||e.target.closest(".rm"))return;
    lp=setTimeout(function(){skip=1;setSel(true);tog(r)},500);
  });
  ["pointerup","pointermove","pointercancel"].forEach(function(t){list.addEventListener(t,function(){clearTimeout(lp)})});
  list.onclick=function(e){
    if(skip){skip=0;return}
    var r=e.target.closest(".r");if(!r||r.classList.contains("rh"))return;
    var it=items[r.dataset.i],rm=e.target.closest(".rm");
    if(selOn){if(!rm)tog(r);return}
    if(rm){
      var m=[[it[1]?"Abrir":"Abrir / editar",function(){open(it)}],["Selecionar",function(){setSel(true);tog(r)}]];
      if(!it[1]&&ARC.test(it[0])){
        m[0]=["Extrair para pasta",function(){run([xop(it,false)])}];
        m.splice(1,0,["Extrair aqui",function(){
          WUI.confirm("Extrair aqui? Arquivos com o mesmo nome serão substituídos.",{title:"Extrair aqui",ok:"Extrair",danger:true})
            .then(function(ok){if(ok)run([xop(it,true)])});
        }]);
      }
      m.push([it[1]?"Baixar (.zip)":"Baixar",function(){dlMany([it])}]);
      m.push(["Copiar",function(){setClip({m:"cp",d:cwd,n:[it[0]]});stat('"'+it[0]+'" copiado — abra a pasta de destino e toque em Colar')}],
             ["Recortar",function(){setClip({m:"mv",d:cwd,n:[it[0]]});stat('"'+it[0]+'" recortado — abra a pasta de destino e toque em Colar')}]);
      if(clip)m.push(["Colar aqui"+(clip.m==="mv"?" (mover)":" (copiar)"),paste]);
      m.push(["Renomear",function(){ren(it)}],["Excluir",function(){del(it)}]);
      menu(rm,m);
    }else if(e.ctrlKey||e.metaKey||e.shiftKey){setSel(true);tog(r)}
    else open(it);
  };
  fm.onclick=function(e){
    var s=e.target.closest(".sb button");
    if(s)return act(s.dataset.s);
    var b=e.target.closest(".ft button"),a=b&&b.dataset.a;
    if(b&&b.dataset.p!==undefined)go(b.dataset.p);
    else if(a==="up")go(cwd.split("/").slice(0,-1).join("/"));
    else if(a==="rf")go(cwd);
    else if(a==="sel")setSel(!selOn);
    else if(a==="paste")paste();
    else if(a==="upl")menu(b,[["Enviar arquivos",function(){inp.click()}],["Enviar pasta",function(){inpd.click()}]]);
    else if(a==="bk")back();
    else if(a==="new"){
      var m=[["Nova pasta",function(){mk("mkdir")}],["Novo arquivo",function(){mk("touch")}]];
      if(clip)m.push(["Colar ("+clip.n.length+")",paste],["Cancelar cópia/recorte",function(){setClip(null);stat("Área de transferência limpa")}]);
      menu(b,m);
    }
  };
  /* atalhos Ctrl+C / Ctrl+X / Ctrl+V (só com esta janela à frente) */
  function front(){
    var lk=document.getElementById("lock");
    if(lk&&!lk.hidden)return false;
    var w=root.closest(".win");
    if(!w||w.classList.contains("hid"))return false;
    var m=0;
    Array.prototype.forEach.call(document.querySelectorAll(".win"),function(o){m=Math.max(m,parseInt(o.style.zIndex)||0)});
    return (parseInt(w.style.zIndex)||0)>=m;
  }
  function onKey(e){
    if(!(e.ctrlKey||e.metaKey)||e.altKey||e.shiftKey)return;
    var t=e.target,k=(e.key||"").toLowerCase();
    if(t&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable))return;
    if(fm.classList.contains("on"))return;
    if(!front())return;
    if(k==="c"||k==="x"){
      var l=Object.keys(sel).map(function(i){return items[i]&&items[i][0]}).filter(Boolean);
      if(!l.length){stat("Selecione item(ns) antes: Ctrl+clique, toque longo ou botão Selecionar");return}
      setClip({m:k==="c"?"cp":"mv",d:cwd,n:l});
      stat(l.length+(k==="c"?" copiado(s)":" recortado(s)")+" — abra a pasta de destino e use Ctrl+V");
      e.preventDefault();
    }else if(k==="v"){
      if(!clip)return;
      paste();e.preventDefault();
    }
  }
  document.addEventListener("keydown",onKey);

  updClip();
  go("");

  return function(){document.removeEventListener("keydown",onKey)};
};
})();
