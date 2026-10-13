/* Diálogos do sistema (substituem prompt/confirm/alert do navegador).
   São HTML puro: não abrem janela do sistema, então não saem da tela cheia no Android.
   Uso (tudo assíncrono):
     WUI.confirm("Excluir?",{title:"Excluir",ok:"Excluir",danger:true}).then(function(ok){...})
     WUI.prompt("Nome da pasta:",def).then(function(n){...})   // null se cancelar
     WUI.alert("Deu erro").then(function(){...})
     WUI.password("Senha:")                                    // input mascarado
*/
(function(){
if(window.WUI)return;

var CSS=
'.wdl{position:fixed;inset:0;z-index:49;display:grid;place-items:center;padding:16px;background:rgba(5,12,45,.45);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);animation:wdl-in .12s ease-out}'+
'@keyframes wdl-in{from{opacity:0}to{opacity:1}}'+
'.wdl-c{width:min(420px,100%);max-height:calc(100% - 32px);display:flex;flex-direction:column;background:var(--glass-solid,rgba(32,34,46,.98));border:1px solid var(--line,rgba(255,255,255,.09));border-radius:12px;box-shadow:0 24px 60px rgba(0,0,0,.6);padding:18px 18px 14px;color:var(--fg,#fff);animation:wdl-pop .14s ease-out}'+
'@keyframes wdl-pop{from{transform:translateY(8px) scale(.98);opacity:0}to{transform:none;opacity:1}}'+
'.wdl-t{font-weight:600;font-size:15px;margin-bottom:6px}'+
'.wdl-m{font-size:13px;line-height:1.45;color:var(--mut,rgba(255,255,255,.62));white-space:pre-wrap;word-break:break-word;overflow:auto;user-select:text;-webkit-user-select:text}'+
'.wdl-i{width:100%;flex:none;margin-top:12px;height:36px;padding:0 10px;border-radius:6px;border:1px solid var(--line,rgba(255,255,255,.09));background:rgba(255,255,255,.06);color:inherit;font:inherit;outline:none;user-select:text;-webkit-user-select:text}'+
'.wdl-i:focus{border-color:#4cc2ff;background:rgba(255,255,255,.1)}'+
'.wdl-w{color:#ff8a80;font-size:12px;margin-top:6px}'+
'.wdl-w:empty{display:none}'+
'.wdl-b{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;flex:none}'+
'.wdl-b button{min-width:92px;height:34px;padding:0 14px;border:1px solid var(--line,rgba(255,255,255,.09));border-radius:6px;background:rgba(255,255,255,.06);color:inherit;font:inherit;cursor:pointer;flex:none}'+
'.wdl-b button:hover{background:var(--hover,rgba(255,255,255,.09))}'+
'.wdl-b button:focus-visible{outline:2px solid #4cc2ff;outline-offset:2px}'+
'.wdl-ok{background:#4cc2ff!important;border-color:transparent!important;color:#00111f!important;font-weight:600}'+
'.wdl-ok:hover{background:#7ad4ff!important}'+
'.wdl-dg .wdl-ok{background:#ff5f57!important;color:#2b0000!important}'+
'.wdl-dg .wdl-ok:hover{background:#ff7b74!important}'+
'@media (max-width:420px){.wdl-b button{min-width:0;flex:1}}';

var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);

var OPEN=null;

function node(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e}

/* Um diálogo por vez; resolve com o valor escolhido (null = cancelado). */
function open(o){
  return new Promise(function(done){
    var wrap=node("div","wdl"), card=node("div","wdl-c"+(o.danger?" wdl-dg":""));card.setAttribute("role","dialog");card.setAttribute("aria-modal","true");
    card.appendChild(node("div","wdl-t",o.title||""));
    var msg=node("div","wdl-m",o.msg||"");card.appendChild(msg);

    var inp=null, warn=null;
    if(o.kind==="prompt"){
      inp=node("input","wdl-i");inp.type=o.password?"password":"text";inp.value=o.value||"";
      if(o.placeholder)inp.placeholder=o.placeholder;
      inp.autocapitalize="off";inp.autocomplete="off";inp.spellcheck=false;
      card.appendChild(inp);
      warn=node("div","wdl-w");card.appendChild(warn);
    }

    var bar=node("div","wdl-b"), btnOk=node("button","wdl-ok",o.ok||"OK"), btnCa=null;
    if(o.kind!=="alert"){btnCa=node("button",null,o.cancel||"Cancelar");bar.appendChild(btnCa)}
    bar.appendChild(btnOk);card.appendChild(bar);
    wrap.appendChild(card);

    function shut(res){
      window.removeEventListener("keydown",keys,true);
      wrap.remove();OPEN=null;
      /* devolve o foco à janela de onde veio, sem rolar a página */
      if(foc&&foc.focus)try{foc.focus({preventScroll:true})}catch(_){}
      done(res);
    }
    function accept(){
      var v=inp?inp.value:true;
      if(inp&&o.required){
        var t=String(v==null?"":v).trim();
        if(!t){
          warn.textContent=o.requiredMsg||"Informe um valor.";
          card.animate&&card.animate([{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"none"}],{duration:180});
          inp.focus({preventScroll:true});inp.select&&inp.select();return;
        }
      }
      shut(inp?String(v==null?"":v).trim():true);
    }
    function cancel(){shut(inp?null:false)}

    function keys(e){
      var lk=document.getElementById("lock");
      if(lk&&!lk.hidden)return;              /* tela de bloqueio tem prioridade */
      e.stopPropagation();
      if(e.key==="Escape"){e.preventDefault();return cancel()}
      var t=e.target;
      /* com o foco num botão, deixa o próprio botão tratar o Enter (senão "Cancelar" confirmaria) */
      if(t&&t.tagName==="BUTTON"&&card.contains(t))return;
      if(e.key==="Enter"&&!(t&&t.tagName==="TEXTAREA")){e.preventDefault();accept()}
    }

    btnOk.onclick=accept;
    if(btnCa)btnCa.onclick=cancel;
    wrap.onpointerdown=function(e){if(e.target===wrap)cancel()};

    var foc=document.activeElement;
    OPEN=1;
    window.addEventListener("keydown",keys,true);
    document.body.appendChild(wrap);
    if(inp){inp.focus({preventScroll:true});inp.select&&inp.select()}
    else btnOk.focus({preventScroll:true});
  });
}

window.WUI={
  confirm:function(msg,o){return open(Object.assign({kind:"confirm",msg:msg,title:o&&o.title||"Confirmar"},o))},
  alert:function(msg,o){return open(Object.assign({kind:"alert",msg:msg,title:o&&o.title||"Aviso",ok:o&&o.ok||"OK"},o)).then(function(){return true})},
  prompt:function(msg,val,o){return open(Object.assign({kind:"prompt",msg:msg,value:val,title:o&&o.title||"Informe",ok:o&&o.ok||"OK"},o))},
  password:function(msg,o){return open(Object.assign({kind:"prompt",msg:msg,password:true,title:o&&o.title||"Senha",ok:o&&o.ok||"Entrar"},o))},
  busy:function(){return !!OPEN}
};
})();
