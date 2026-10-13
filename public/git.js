(function(){
var css=
'.gt{position:absolute;inset:0;display:flex;flex-direction:column;container-type:inline-size;font-size:13px;background:#202431}'+
'.gt button,.gt input,.gt textarea{font:inherit;color:inherit}.gt button{border:0;background:none;border-radius:6px;cursor:default}'+
'.gt button:hover{background:var(--hover)}.gt.busy .gh,.gt.busy .gc{opacity:.6;pointer-events:none}'+
'.gt input:not([type=checkbox]),.gt textarea{width:100%;padding:8px 10px;border:1px solid var(--line);border-bottom-color:#4cc2ff;border-radius:6px;background:rgba(255,255,255,.07);outline:0;user-select:text;-webkit-user-select:text}'+
'.gt textarea{resize:none}.gt input[type=checkbox]{width:18px;height:18px;accent-color:#4cc2ff;flex:none}'+
'.gh{display:flex;flex:none;gap:2px;padding:4px;background:#1b1e2b;border-bottom:1px solid var(--line)}'+
'.hb{flex:1;min-width:0;display:grid;text-align:left;padding:4px 10px;line-height:1.25}'+
'.hb small{color:var(--mut);font-size:11px}.hb b{font-weight:600}.hb small,.hb b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.hb.pr{background:rgba(76,194,255,.16)}.hm{width:36px;flex:none}'+
'.gb{flex:1;min-height:0;display:flex;flex-direction:column}'+
'.gtab{display:flex;flex:none;border-bottom:1px solid var(--line)}.gtab button{flex:1;height:34px;border-radius:0;border-bottom:2px solid transparent}'+
'.gtab button.on{border-bottom-color:#4cc2ff;font-weight:600}.gtab i{font-style:normal;margin-left:4px;padding:0 6px;border-radius:9px;background:rgba(255,255,255,.14);font-size:11px}'+
'.gm{flex:1;min-height:0;display:grid;grid-template-columns:minmax(260px,36%) 1fr}'+
'.gl{display:flex;flex-direction:column;min-height:0;border-right:1px solid var(--line)}.gf{flex:1;min-height:0;overflow:auto}'+
'.gfh{flex:none;padding:8px 10px;border-bottom:1px solid var(--line)}.gfh label{display:flex;align-items:center;gap:8px}.gfh .mg{display:flex;align-items:center;gap:8px;margin-top:6px;color:#ffb86b}'+
'.fr,.hr{display:flex;align-items:center;gap:8px;min-height:40px;padding:0 6px 0 10px;border-bottom:1px solid rgba(255,255,255,.04)}'+
'.fr:hover,.hr:hover{background:var(--hover)}.fr.on{background:rgba(76,194,255,.14)}'+
'.fn,.hs{flex:1;min-width:0}.fn b,.hs b{display:block;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.fn small,.hs small{display:block;color:var(--mut);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.hs b{font-weight:600}'+
'.hr{min-height:48px}.ua{color:#4cc2ff;font-weight:700}'+
'.bd{flex:none;width:20px;height:20px;display:grid;place-items:center;border-radius:4px;font-size:11px;font-weight:700}'+
'.sM{background:rgba(210,153,34,.25);color:#e3b341}.sA{background:rgba(46,160,67,.25);color:#56d364}.sD{background:rgba(248,81,73,.25);color:#ff7b72}.sR{background:rgba(56,139,253,.25);color:#79c0ff}.s\\!{background:rgba(255,134,0,.3);color:#ffb86b}'+
'.rv{flex:none;width:30px;height:30px}.hf{background:rgba(0,0,0,.18);padding:2px 0 6px}.hf .fr{min-height:34px;padding-left:22px}.hf .bt{margin:6px 10px 2px}'+
'.ge{padding:24px 16px;color:var(--mut);text-align:center}.ge small{display:block;margin-top:4px}'+
'.gc{flex:none;display:grid;gap:6px;padding:8px;border-top:1px solid var(--line)}'+
'.cb2,.pr2{height:36px;padding:0 14px;background:#4cc2ff!important;color:#00111f!important;font-weight:600}.cb2:disabled{opacity:.4}.gc .cb2:hover:not(:disabled){background:#7ad4ff!important}'+
'.cu{display:flex;align-items:center;gap:6px;color:var(--mut);font-size:12px}.cu i{flex:1;min-width:0;font-style:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cu button{padding:2px 8px;color:var(--fg)}'+
'.gt.th .gc,.gt.th .gfh{display:none}'+
'.gd{display:flex;flex-direction:column;min-width:0;min-height:0}.gdh{display:flex;align-items:center;gap:6px;flex:none;height:34px;padding:0 8px;border-bottom:1px solid var(--line)}'+
'.gdh b{font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gdh .bk{display:none;width:32px;height:28px;flex:none}.gdb{flex:1;min-height:0;overflow:auto}'+
'.df{border-collapse:collapse;min-width:100%;font:12px/1.5 ui-monospace,Menlo,Consolas,monospace}.df td{padding:0 6px;vertical-align:top}'+
'.df .ln{min-width:34px;text-align:right;color:var(--mut);opacity:.7;user-select:none}.df .lc{white-space:pre}'+
'.ra{background:rgba(46,160,67,.2)}.rm2{background:rgba(248,81,73,.2)}.rk{background:rgba(76,194,255,.12);color:#9ccaff}'+
'@container (max-width:720px){.gm{grid-template-columns:1fr}.gd{display:none}.gt.vd .gl{display:none}.gt.vd .gd{display:flex}.gdh .bk{display:block}}'+
'.gs{flex:none;max-height:80px;overflow:auto;padding:6px 12px;border-top:1px solid var(--line);color:var(--mut);font-size:12px;white-space:pre-wrap;user-select:text;-webkit-user-select:text}.gs.er{color:#ff8a80}'+
'.gp{position:absolute;z-index:6;top:52px;width:min(380px,calc(100% - 16px));max-height:72%;display:flex;flex-direction:column;background:#2d3243;border:1px solid var(--line);border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.55);overflow:hidden}'+
'.pq{margin:8px;width:calc(100% - 16px)!important}.pl{overflow:auto}.pi{display:block;width:100%;text-align:left;padding:8px 14px}.pi.on b{color:#4cc2ff}.pi small{display:block;color:var(--mut);font-size:11px}.pi.dim{color:var(--mut)}'+
'.p2{display:flex;align-items:center}.p2 .pi{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mi{flex:none;padding:4px 8px;font-size:12px}.dg{color:#ff8a80}'+
'.pf{display:grid;border-top:1px solid var(--line);padding:4px}.pf button{text-align:left;padding:9px 12px}'+
'.go{position:absolute;inset:0;z-index:8;display:grid;place-items:center;background:rgba(0,0,0,.55)}'+
'.gk{width:min(480px,calc(100% - 20px));max-height:calc(100% - 20px);display:flex;flex-direction:column;background:#2d3243;border:1px solid var(--line);border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.6);overflow:hidden}'+
'.gk h3{padding:14px 16px 4px;font-size:16px;font-weight:600}.gmb{overflow:auto;display:grid;gap:10px;padding:10px 16px}.gmb label{display:grid;gap:4px;color:var(--mut);font-size:12px}'+
'.gmb label.ck{display:flex;align-items:center;gap:8px;color:var(--fg);font-size:13px}.gmb a{color:#79c0ff}.gmb .gl2{max-height:180px;overflow:auto;border:1px solid var(--line);border-radius:6px}'+
'.gma{display:flex;align-items:center;gap:6px;padding:10px 16px 14px}.gma button{height:34px;padding:0 14px;background:rgba(255,255,255,.1)}.gme{flex:1;color:#ff8a80;font-size:12px}'+
'.wl{flex:1;display:grid;place-content:center;gap:10px;padding:24px;text-align:center;justify-items:center}.wl h2{font-size:20px}.wl p{color:var(--mut);max-width:340px}.wl button{width:260px;height:40px;background:rgba(255,255,255,.1)}';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

function esc(s){return String(s).replace(/[&<>"']/g,function(c){return"&#"+c.charCodeAt(0)+";"})}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k)||"";localStorage.setItem(k,v)}catch(_){return""}}
function enc(s){return encodeURIComponent(s)}
function ago(t){var s=Date.now()/1000-t;if(s<60)return"agora";if(s<3600)return Math.floor(s/60)+" min";if(s<86400)return Math.floor(s/3600)+" h";if(s<2592000)return Math.floor(s/86400)+" d";return new Date(t*1000).toLocaleDateString("pt-BR")}
function api(m,u,b){
  return fetch("/api/git/"+u,{method:m,headers:b?{"Content-Type":"application/json"}:{},body:b?JSON.stringify(b):undefined})
    .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.e||"Erro "+r.status);return j})});
}
function badge(f){
  var l=f.c?"!":f.x==="?"?"A":(f.x!=="."&&f.x!==" "?f.x:f.y);
  return'<span class="bd s'+l+'">'+l+'</span>';
}
function diffHTML(t){
  if(/^Binary files|\nBinary files/.test(t))return'<p class="ge">Arquivo binário — sem pré-visualização.</p>';
  var o=0,n=0,inh=0,h='<table class="df">';
  t.split("\n").forEach(function(l){
    if(l.indexOf("@@")===0){
      var m=/@@ -(\d+)(?:,\d+)? \+(\d+)/.exec(l);o=m?+m[1]:0;n=m?+m[2]:0;inh=1;
      h+='<tr class="rk"><td class="ln"></td><td class="ln"></td><td class="lc">'+esc(l)+'</td></tr>';
    }else if(inh&&l!==""){
      var c=l[0],a="",b="",k="";
      if(c==="+"){k="ra";b=n++}else if(c==="-"){k="rm2";a=o++}else if(c==="\\"){}else{a=o++;b=n++}
      h+='<tr class="'+k+'"><td class="ln">'+a+'</td><td class="ln">'+b+'</td><td class="lc">'+esc(l)+'</td></tr>';
    }
  });
  return inh?h+'</table>':'<p class="ge">Sem alterações de conteúdo (arquivo vazio, renomeado ou só permissões).</p>';
}

window.App_git=function(root){
  root.innerHTML='<div class="gt th0"><div class="gh"></div><div class="gb"></div><div class="gs" hidden></div><div class="gp" hidden></div><div class="go" hidden></div></div>';
  var $=function(s){return root.querySelector(s)},
      gt=$(".gt"),gh=$(".gh"),gb=$(".gb"),gs=$(".gs"),gp=$(".gp"),go=$(".go"),
      S={repos:[],acct:{},R:ls("gitrepo"),st:null,off:{},tab:"c",file:null,hist:[],more:false,busy:0},mt;

  function msg(t,er){gs.textContent=t||"";gs.hidden=!t;gs.className="gs"+(er?" er":"");clearTimeout(mt);if(t&&!er)mt=setTimeout(function(){msg("")},7000)}
  function run(label,fn){
    if(S.busy)return Promise.resolve();
    S.busy=1;gt.classList.add("busy");msg(label+"…");
    function done(){S.busy=0;gt.classList.remove("busy")}
    return fn().then(function(r){done();return r||{}},function(e){done();msg(e.message,1)});
  }
  function closePop(){gp.hidden=true}
  document.addEventListener("pointerdown",pd);
  function pd(e){if(!gp.hidden&&!gp.contains(e.target)&&!e.target.closest(".gh"))closePop()}

  /* ---------- carregamento ---------- */
  function init(){
    api("GET","state").then(function(j){
      S.repos=j.repos;S.acct=j.acct;
      if(!S.repos.some(function(r){return r.p===S.R}))S.R=S.repos.length?S.repos[0].p:"";
      ls("gitrepo",S.R);S.R?buildMain():welcome();header();if(S.R)load();
    }).catch(function(e){gb.innerHTML='<p class="ge">'+esc(e.message)+'</p>'});
  }
  function curName(){var r=S.repos.filter(function(r){return r.p===S.R})[0];return r?r.name:"Nenhum"}
  function sync(){
    var s=S.st;if(!s)return["Fetch origin","",""];var i=s.info;
    if(!s.remote)return["Publicar repositório","Sem remote","publish"];
    if(!i.up)return["Publicar branch","Branch local","push"];
    if(i.behind)return["Pull origin","↓"+i.behind+(i.ahead?" ↑"+i.ahead:""),"pull"];
    if(i.ahead)return["Push origin","↑"+i.ahead,"push"];
    return["Fetch origin","Atualizado","fetch"];
  }
  function header(){
    var s=sync(),b=S.st?S.st.info.branch:"—";
    gh.innerHTML='<button class="hb" data-a="repo"><small>Repositório atual</small><b>'+esc(curName())+' ▾</b></button>'+
      (S.R?'<button class="hb" data-a="branch"><small>Branch atual</small><b>'+esc(b)+' ▾</b></button>'+
      '<button class="hb pr" data-a="sync" data-s="'+s[2]+'"><small>'+esc(s[1])+'</small><b>'+esc(s[0])+'</b></button>':"")+
      '<button class="hm" data-a="more" title="Mais">⋯</button>';
  }
  function welcome(){
    gb.innerHTML='<div class="wl"><h2>Git</h2><p>Clone repositórios do GitHub, faça commits e envie suas alterações.</p>'+
      '<button data-m="clone">Clonar repositório…</button><button data-m="new">Criar novo repositório…</button><button data-m="add">Adicionar repositório local…</button>'+
      (S.acct.ok?"":'<button data-m="cfg">Conectar conta do GitHub…</button>')+'</div>';
  }
  function buildMain(){
    gb.innerHTML='<div class="gtab"><button data-t="c">Alterações <i>0</i></button><button data-t="h">Histórico</button></div>'+
      '<div class="gm"><div class="gl"><div class="gfh"></div><div class="gf"></div><div class="gc">'+
      '<input class="cs" type="text" maxlength="200" placeholder="Resumo (obrigatório)" autocomplete="off"><textarea class="cd" rows="2" placeholder="Descrição"></textarea>'+
      '<button class="cb2" data-a="commit">Commit</button><div class="cu"></div></div></div>'+
      '<div class="gd"><div class="gdh"><button class="bk" data-a="back">←</button><b></b></div><div class="gdb"><p class="ge">Selecione um item para ver as alterações.</p></div></div></div>';
    tabs();
  }
  function tabs(){
    gt.classList.toggle("th",S.tab==="h");gt.classList.remove("vd");
    Array.prototype.forEach.call(gb.querySelectorAll(".gtab button"),function(b){b.classList.toggle("on",b.dataset.t===S.tab)});
  }
  function load(){
    if(!S.R)return;
    api("GET","status?r="+enc(S.R)).then(function(j){
      S.st=j;header();
      var bt=gb.querySelector(".gtab i");if(bt)bt.textContent=j.files.length;
      if(S.tab==="c")renderChanges();else loadHist();
    }).catch(function(e){msg(e.message,1)});
  }

  /* ---------- alterações ---------- */
  function checked(){return S.st.files.filter(function(f){return!S.off[f.p]})}
  function renderChanges(){
    var fs=S.st.files,n=fs.length,on=checked().length,f=$(".gfh");
    f.innerHTML=(S.st.merging?'<div class="mg">⚠ Merge em andamento <button data-a="abort">Abortar</button></div>':"")+
      (n?'<label><input type="checkbox" class="all"> <span>'+n+' arquivo'+(n>1?"s":"")+' alterado'+(n>1?"s":"")+'</span></label>':"");
    var all=f.querySelector(".all");if(all){all.checked=on===n;all.indeterminate=on>0&&on<n}
    $(".gf").innerHTML=n?fs.map(function(x,i){
      var b=x.p.split("/").pop(),d=x.p.slice(0,x.p.length-b.length);
      return'<div class="fr'+(S.file&&S.file.p===x.p?" on":"")+'" data-i="'+i+'"><input type="checkbox"'+(S.off[x.p]?"":" checked")+'>'+
        '<span class="fn"><b>'+esc(b)+'</b>'+(d?'<small>'+esc(d)+'</small>':"")+'</span>'+badge(x)+'<button class="rv" data-r="1" title="Descartar alterações">↶</button></div>';
    }).join(""):'<div class="ge">Nenhuma alteração local.<small>Edite arquivos no repositório para vê-los aqui.</small></div>';
    commitBtn();
    $(".cu").innerHTML=S.st.last?'<i>Último commit: '+esc(S.st.last)+'</i><button data-a="undo">Desfazer</button>':"";
  }
  function commitBtn(){
    var b=$(".cb2");if(!b||!S.st)return;
    b.innerHTML="Commit para <b>"+esc(S.st.info.branch)+"</b>";
    b.disabled=!$(".cs").value.trim()||(!checked().length&&!S.st.merging);
  }
  function showDiff(title,url){
    gt.classList.add("vd");$(".gdh b").textContent=title;$(".gdb").innerHTML='<p class="ge">Carregando…</p>';
    api("GET",url).then(function(j){$(".gdb").innerHTML=diffHTML(j.t)+(j.cut?'<p class="ge">Diff truncado (muito grande).</p>':"")})
      .catch(function(e){$(".gdb").innerHTML='<p class="ge">'+esc(e.message)+'</p>'});
  }
  function pick(i){
    var f=S.st.files[i];S.file=f;renderChanges();
    showDiff(f.p,"diff?r="+enc(S.R)+"&p="+enc(f.p)+(f.o?"&o="+enc(f.o):""));
  }
  function commit(){
    var p=[];checked().forEach(function(f){p.push(f.p);if(f.o)p.push(f.o)});
    run("Criando commit",function(){return api("POST","commit_do",{r:S.R,msg:$(".cs").value,desc:$(".cd").value,paths:p})}).then(function(r){
      if(!r)return;$(".cs").value="";$(".cd").value="";S.off={};S.file=null;msg("Commit criado");load();
    });
  }
  function discard(paths,label){
    WUI.confirm("Descartar as alterações de "+label+"? Isso não pode ser desfeito.",{title:"Descartar",ok:"Descartar",danger:true}).then(function(ok){
      if(!ok)return;
      run("Descartando",function(){return api("POST","discard",{r:S.R,paths:paths})}).then(function(r){if(r){S.file=null;msg("Alterações descartadas");load()}});
    });
  }

  /* ---------- histórico ---------- */
  function loadHist(more){
    api("GET","log?r="+enc(S.R)+"&n=50&skip="+(more?S.hist.length:0)).then(function(rows){
      S.hist=more?S.hist.concat(rows):rows;S.more=rows.length===50;
      $(".gf").innerHTML=S.hist.length?S.hist.map(function(c,i){
        return'<div class="hr" data-i="'+i+'"><div class="hs"><b>'+esc(c.m)+'</b><small>'+esc(c.a)+' · '+ago(c.t)+' · '+c.s+'</small></div>'+(c.up?'<span class="ua" title="Ainda não enviado">↑</span>':"")+'</div><div class="hf" hidden></div>';
      }).join("")+(S.more?'<button class="pi" data-a="hmore">Carregar mais</button>':""):'<div class="ge">Sem commits ainda.</div>';
    }).catch(function(e){msg(e.message,1)});
  }
  function toggleCommit(row){
    var box=row.nextElementSibling,c=S.hist[+row.dataset.i];
    if(!box.hidden){box.hidden=true;return}
    box.hidden=false;box.innerHTML='<p class="ge">Carregando…</p>';
    api("GET","commit?r="+enc(S.R)+"&h="+c.h).then(function(j){
      box.innerHTML=(j.body?'<div class="ge" style="text-align:left;white-space:pre-wrap">'+esc(j.body)+'</div>':"")+
        j.files.map(function(f){var b=f.p.split("/").pop();
          return'<div class="fr" data-h="'+c.h+'" data-p="'+esc(f.p)+'"'+(f.o?' data-o="'+esc(f.o)+'"':"")+'><span class="fn"><b>'+esc(b)+'</b><small>'+esc(f.p)+'</small></span>'+badge({x:f.s,y:"."})+'</div>';
        }).join("")+'<button class="bt" data-v="'+c.h+'">Reverter este commit</button>';
    }).catch(function(e){box.innerHTML='<p class="ge">'+esc(e.message)+'</p>'});
  }

  /* ---------- menus e janelas ---------- */
  function pop(html,anchor){
    gp.innerHTML=html;gp.hidden=false;
    var a=anchor.getBoundingClientRect(),g=gt.getBoundingClientRect();
    gp.style.left=Math.max(8,Math.min(a.left-g.left,g.width-gp.offsetWidth-8))+"px";
  }
  function repoPop(a){
    pop('<div class="pl">'+S.repos.map(function(r){
      return'<button class="pi'+(r.p===S.R?" on":"")+'" data-r="'+esc(r.p)+'"><b>'+esc(r.name)+'</b><small>'+esc(r.p||"~")+(r.ok?"":" · pasta não encontrada")+'</small></button>';
    }).join("")+'</div><div class="pf"><button data-m="clone">Clonar repositório…</button><button data-m="new">Criar novo repositório…</button><button data-m="add">Adicionar repositório local…</button></div>',a);
  }
  function branchPop(a,flt){
    api("GET","branches?r="+enc(S.R)).then(function(j){
      var f=(flt||"").toLowerCase(),has={};j.local.forEach(function(l){has[l.n]=1});
      var h='<input class="pq" type="text" placeholder="Filtrar branches" value="'+esc(flt||"")+'">'+'<div class="pl">';
      j.local.filter(function(l){return l.n.toLowerCase().indexOf(f)>-1}).forEach(function(l){
        h+='<div class="p2"><button class="pi'+(l.cur?" on":"")+'" data-b="'+esc(l.n)+'">'+(l.cur?"✓ ":"")+esc(l.n)+'</button>'+
          (l.cur?"":'<button class="mi" data-g="'+esc(l.n)+'" title="Mesclar na branch atual">Mesclar</button><button class="mi dg" data-d="'+esc(l.n)+'" title="Excluir branch">×</button>')+'</div>';
      });
      j.remote.forEach(function(r){var n=r.slice(r.indexOf("/")+1);
        if(!has[n]&&r.toLowerCase().indexOf(f)>-1)h+='<button class="pi dim" data-b="'+esc(n)+'">'+esc(r)+'</button>';
      });
      pop(h+'</div><div class="pf"><button data-m="nb">Nova branch…</button></div>',a);
      var q=gp.querySelector(".pq");q.focus();q.setSelectionRange(q.value.length,q.value.length);
      q.oninput=function(){branchPop(a,q.value)};
    }).catch(function(e){msg(e.message,1)});
  }
  function morePop(a){
    var s=S.st,h='';
    function it(k,t,c){return'<button class="'+(c||"")+'" data-o="'+k+'">'+t+'</button>'}
    if(S.R)h+=it("fetch","Buscar (fetch)")+it("pull","Atualizar (pull)")+it("push","Enviar (push)")+
      (s&&s.merging?it("abort","Abortar merge"):"")+(s&&s.files.length?it("discall","Descartar todas as alterações","dg"):"");
    h+=it("cfg","Configurações e conta GitHub…");
    if(S.R)h+=it("rm","Remover da lista","dg");
    pop('<div class="pf">'+h+'</div>',a);
  }
  function modal(title,html,ok,onok,ready){
    go.hidden=false;
    go.innerHTML='<div class="gk"><h3>'+title+'</h3><div class="gmb">'+html+'</div><div class="gma"><span class="gme"></span><button data-x="no">Cancelar</button>'+(ok?'<button class="pr2" data-x="ok">'+ok+'</button>':"")+'</div></div>';
    var k=go.firstChild,err=k.querySelector(".gme"),
        val=function(n){var e=k.querySelector('[name="'+n+'"]');return e?(e.type==="checkbox"?e.checked:e.value.trim()):""};
    k.onclick=function(e){
      var b=e.target.closest("button");if(!b)return;
      if(b.dataset.x==="no")go.hidden=true;
      else if(b.dataset.x==="ok"){
        err.textContent="";b.disabled=true;
        Promise.resolve(onok(val,k)).then(function(){go.hidden=true},function(x){err.textContent=x.message;b.disabled=false});
      }
    };
    if(ready)ready(k,val);
    return k;
  }
  function selectRepo(r){S.R=r;ls("gitrepo",r);S.st=null;S.file=null;S.off={};S.hist=[];S.tab="c";closePop();buildMain();header();load()}
  function reload(sel){api("GET","state").then(function(j){S.repos=j.repos;S.acct=j.acct;if(sel)selectRepo(sel);else{if(!S.repos.some(function(r){return r.p===S.R}))S.R=S.repos.length?S.repos[0].p:"";S.R?(S.st||buildMain(),load()):welcome();header()}})}

  function cloneModal(){
    modal("Clonar repositório",
      '<label>URL do repositório<input type="text" name="url" placeholder="https://github.com/usuario/repo.git" autocapitalize="off" spellcheck="false"></label>'+
      '<label>Salvar em (pasta dentro de ~)<input type="text" name="dir" value="repos" autocapitalize="off"></label><div class="gh2"></div>',"Clonar",function(v){
        msg("Clonando… (pode demorar)");
        return api("POST","clone",{url:v("url"),dir:v("dir")}).then(function(j){msg("Clonado em ~/"+j.r);reload(j.r)},function(e){msg(e.message,1);throw e});
      },function(k){
        var box=k.querySelector(".gh2");
        if(!S.acct.ok){box.innerHTML='<small style="color:var(--mut)">Conecte sua conta em Configurações para listar seus repositórios e clonar os privados.</small>';return}
        box.innerHTML='<input class="pq" type="text" style="margin:0;width:100%!important" placeholder="Carregando seus repositórios…" disabled><div class="gl2" hidden></div>';
        api("GET","ghrepos").then(function(l){
          var q=box.querySelector(".pq"),list=box.querySelector(".gl2");q.disabled=false;q.placeholder="Filtrar seus repositórios ("+l.length+")";
          function draw(){var f=q.value.toLowerCase();list.hidden=false;list.innerHTML=l.filter(function(x){return x.n.toLowerCase().indexOf(f)>-1}).slice(0,60).map(function(x){
            return'<button class="pi" data-u="'+esc(x.u)+'"><b>'+(x.pr?"🔒 ":"")+esc(x.n)+'</b>'+(x.d?'<small>'+esc(x.d)+'</small>':"")+'</button>'}).join("")||'<p class="ge">Nada encontrado</p>'}
          q.oninput=draw;q.onfocus=draw;
          list.onclick=function(e){var b=e.target.closest("[data-u]");if(b){k.querySelector('[name="url"]').value=b.dataset.u;list.hidden=true}};
        }).catch(function(e){box.innerHTML='<small style="color:#ff8a80">'+esc(e.message)+'</small>'});
      });
  }
  function newModal(){
    modal("Criar novo repositório",
      '<label>Nome<input type="text" name="name" placeholder="meu-projeto" autocapitalize="off"></label>'+
      '<label>Pasta pai (dentro de ~)<input type="text" name="dir" value="repos" autocapitalize="off"></label>'+
      '<label class="ck"><input type="checkbox" name="readme" checked> Criar README.md</label>',"Criar",function(v){
        var n=v("name");if(!n)throw new Error("Informe o nome");
        return api("POST","init",{path:(v("dir")?v("dir")+"/":"")+n,readme:v("readme")}).then(function(j){msg("Repositório criado em ~/"+j.r);reload(j.r)});
      });
  }
  function addModal(){
    modal("Adicionar repositório local",
      '<label>Pasta do repositório (dentro de ~)<input type="text" name="path" placeholder="repos/meu-projeto" autocapitalize="off"></label><div class="gh2"><small style="color:var(--mut)">Procurando repositórios…</small></div>',"Adicionar",function(v){
        return api("POST","addrepo",{path:v("path")}).then(function(j){reload(j.r)});
      },function(k){
        api("GET","scan").then(function(l){
          var b=k.querySelector(".gh2");
          b.innerHTML=l.length?'<small style="color:var(--mut)">Encontrados:</small><div class="gl2">'+l.map(function(x){return'<button class="pi" data-p="'+esc(x)+'">'+esc(x)+'</button>'}).join("")+'</div>':'<small style="color:var(--mut)">Nenhum repositório novo encontrado.</small>';
          b.onclick=function(e){var c=e.target.closest("[data-p]");if(c)k.querySelector('[name="path"]').value=c.dataset.p};
        });
      });
  }
  function publishModal(){
    modal("Publicar no GitHub",
      '<label>Nome do repositório<input type="text" name="name" value="'+esc(curName())+'" autocapitalize="off"></label>'+
      '<label>Descrição (opcional)<input type="text" name="desc"></label><label class="ck"><input type="checkbox" name="private" checked> Manter este código privado</label>',"Publicar",function(v){
        msg("Publicando…");
        return api("POST","publish",{r:S.R,name:v("name"),desc:v("desc"),private:v("private")}).then(function(j){msg("Publicado: "+j.url);load()},function(e){msg(e.message,1);throw e});
      });
  }
  function cfgModal(){
    var a=S.acct;
    modal("Configurações",
      (a.ok?'<div>Conectado como <b>@'+esc(a.login)+'</b> <button data-s="logout" style="color:#ff8a80">Desconectar</button></div>'
        :'<label>Token de acesso pessoal do GitHub<input type="password" name="token" autocomplete="off" placeholder="ghp_…"></label>'+
         '<small style="color:var(--mut)">Crie um token com permissão <b>repo</b> em <a target="_blank" rel="noopener" href="https://github.com/settings/tokens/new?scopes=repo&description=win11-termux">github.com/settings/tokens</a> e cole acima. Ele fica salvo só no seu celular.</small>'+
         '<button data-s="auth" style="height:34px;background:rgba(255,255,255,.1)">Conectar</button>')+
      '<label>Nome nos commits<input type="text" name="name" value="'+esc(a.name||"")+'"></label>'+
      '<label>E-mail nos commits<input type="text" name="email" value="'+esc(a.email||"")+'" autocapitalize="off"></label>',"Salvar",function(v){
        return api("POST","ident",{name:v("name"),email:v("email")}).then(function(){msg("Configurações salvas");reload()});
      },function(k,val){
        var err=k.querySelector(".gme");
        k.addEventListener("click",function(e){
          var b=e.target.closest("[data-s]");if(!b)return;
          if(b.dataset.s==="logout")api("POST","logout",{}).then(function(){go.hidden=true;reload()});
          else{err.textContent="";b.disabled=true;
            api("POST","auth",{token:val("token")}).then(function(){go.hidden=true;msg("Conta conectada");reload()}).catch(function(x){err.textContent=x.message;b.disabled=false})}
        });
      });
  }
  function afterNet(r,what){
    if(!r)return;
    var o=(r.out||"").trim();
    if(/CONFLICT|conflict/.test(o))msg("Conflitos no merge. Resolva os arquivos marcados com ! e faça o commit.",1);
    else msg(what+(o?" — "+o.split("\n").slice(-1)[0]:""));
    load();
  }
  function net(a){
    var lab={fetch:"Buscando",pull:"Atualizando",push:"Enviando"}[a];
    run(lab,function(){return api("POST",a,{r:S.R})}).then(function(r){afterNet(r,{fetch:"Busca concluída",pull:"Pull concluído",push:"Push concluído"}[a])});
  }

  /* ---------- eventos ---------- */
  gt.addEventListener("click",function(e){
    var t=e.target,b=t.closest("button"),d=b?b.dataset:{};
    if(t.classList.contains("all")){S.off={};if(!t.checked)S.st.files.forEach(function(f){S.off[f.p]=1});return renderChanges()}
    var row=t.closest(".fr[data-i]");
    if(row&&gp.hidden&&!go.contains(t)&&S.tab==="c"){
      var f=S.st.files[+row.dataset.i];
      if(t.type==="checkbox"){if(t.checked)delete S.off[f.p];else S.off[f.p]=1;return renderChanges()}
      if(t.closest(".rv"))return discard([f.p].concat(f.o?[f.o]:[]),'"'+f.p+'"');
      return pick(+row.dataset.i);
    }
    var hf=t.closest(".fr[data-h]");
    if(hf)return showDiff(hf.dataset.p,"diff?r="+enc(S.R)+"&h="+hf.dataset.h+"&p="+enc(hf.dataset.p)+(hf.dataset.o?"&o="+enc(hf.dataset.o):""));
    if(b&&d.v){
      WUI.confirm("Reverter este commit criando um novo commit?",{title:"Reverter",ok:"Reverter"}).then(function(ok){
        if(ok)run("Revertendo",function(){return api("POST","revert",{r:S.R,b:d.v})}).then(function(r){afterNet(r,"Commit revertido");S.hist=[]});
      });
      return;
    }
    var hr=t.closest(".hr");if(hr)return toggleCommit(hr);
    if(!b)return;
    if(d.t){S.tab=d.t;S.file=null;tabs();if(d.t==="c"&&S.st)renderChanges();else loadHist();return}
    if(d.m){closePop();return{clone:cloneModal,new:newModal,add:addModal,cfg:cfgModal,nb:function(){
      WUI.prompt("Nome da nova branch (a partir de "+(S.st?S.st.info.branch:"")+"):","",{title:"Nova branch",ok:"Criar",required:true,requiredMsg:"Informe o nome da branch."}).then(function(v){
        var n=String(v==null?"":v).trim();
        if(n)run("Criando branch",function(){return api("POST","checkout",{r:S.R,b:n,create:true})}).then(function(r){if(r){msg("Branch criada");load()}});
      })}}[d.m]()}
    if(d.r&&b.classList.contains("pi")){return selectRepo(d.r)}
    if(d.b!==undefined&&b.classList.contains("pi")){closePop();return run("Trocando de branch",function(){return api("POST","checkout",{r:S.R,b:d.b})}).then(function(r){if(r){S.file=null;S.off={};S.hist=[];load()}})}
    if(d.g){closePop();return run("Mesclando",function(){return api("POST","merge",{r:S.R,b:d.g})}).then(function(r){afterNet(r,"Merge concluído")})}
    if(d.d){closePop();
      WUI.confirm('Excluir a branch "'+d.d+'"?',{title:"Excluir branch",ok:"Excluir",danger:true}).then(function(ok){
        if(!ok)return;
        run("Excluindo",function(){return api("POST","delbranch",{r:S.R,b:d.d})}).then(function(r){if(r)msg("Branch excluída")});
      });
      return}
    if(d.o){closePop();
      if(["fetch","pull","push"].indexOf(d.o)>-1)return net(d.o);
      if(d.o==="abort")return run("Abortando",function(){return api("POST","abort",{r:S.R})}).then(function(r){if(r){msg("Merge abortado");load()}});
      if(d.o==="discall")return discard(S.st.files.reduce(function(a,f){return a.concat(f.p,f.o||[])},[]),"todos os arquivos");
      if(d.o==="cfg")return cfgModal();
      if(d.o==="rm"){
        WUI.confirm("Remover da lista? Os arquivos não serão apagados.",{title:"Remover repositório",ok:"Remover",danger:true}).then(function(ok){
          if(ok)api("POST","rmrepo",{r:S.R}).then(function(){reload()});
        });
        return;
      }
    }
    var a=d.a;
    if(a==="hmore")return loadHist(true);
    if(a==="repo")return gp.hidden?repoPop(b):closePop();
    if(a==="branch")return gp.hidden?branchPop(b):closePop();
    if(a==="more")return gp.hidden?morePop(b):closePop();
    if(a==="sync"){closePop();return d.s==="publish"?publishModal():net(d.s)}
    if(a==="commit")return commit();
    if(a==="back")return gt.classList.remove("vd");
    if(a==="abort")return run("Abortando",function(){return api("POST","abort",{r:S.R})}).then(function(r){if(r){msg("Merge abortado");load()}});
    if(a==="undo"){
      var ahead=S.st&&S.st.info.up&&S.st.info.ahead===0;
      WUI.confirm("Desfazer o último commit? As alterações voltam para a lista."+(ahead?"\nAtenção: ele já foi enviado ao GitHub.":""),
        {title:"Desfazer commit",ok:"Desfazer",danger:true}).then(function(rem){
        if(!rem)return;
        run("Desfazendo",function(){return api("POST","undo",{r:S.R})}).then(function(r){if(r){$(".cs").value=r.msg||"";$(".cd").value=r.desc||"";msg("Commit desfeito");load()}});
      });
      return;
    }
  });
  gt.addEventListener("input",function(e){if(e.target.classList.contains("cs")||e.target.classList.contains("cd"))commitBtn()});

  init();
  return function(){document.removeEventListener("pointerdown",pd)};
};
})();
