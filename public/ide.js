(function(){
var CSS=`
.ide{position:absolute;inset:0;display:flex;flex-direction:column;background:#1e1e1e;color:#cccccc;font-size:13px;line-height:1.4;--fs:13px;--lh:20px;overflow:hidden}
.ide button{border:0;background:none;color:inherit;font:inherit;border-radius:5px;cursor:default}
.ide button:hover{background:rgba(255,255,255,.1)}
.ide svg{width:16px;height:16px;flex:none}
.ide input[type=text]{font:inherit;color:#fff;outline:0;user-select:text;-webkit-user-select:text}
.id-main{flex:1;min-height:0;display:flex;position:relative}
.id-sb{flex:none;width:260px;display:flex;flex-direction:column;background:#252526;border-right:1px solid #1a1a1a;min-height:0}
.id-sb.off{display:none}
.id-st{display:flex;flex:none;height:34px;align-items:stretch;border-bottom:1px solid #1a1a1a}
.id-st button{flex:1;border-radius:0;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#9d9d9d;border-bottom:2px solid transparent}
.id-st button.on{color:#fff;border-bottom-color:#1f6feb}
.id-sp{flex:1;min-height:0;display:none;flex-direction:column}
.id-sp.on{display:flex}
.id-sh{display:flex;align-items:center;gap:2px;flex:none;padding:4px 4px 4px 12px;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#bbb}
.id-sh span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.id-sh button{width:26px;height:26px;display:grid;place-items:center;color:#ccc}
.id-tr{flex:1;min-height:0;overflow:auto;padding-bottom:40px;overscroll-behavior:contain}
.id-r{display:flex;align-items:center;gap:4px;height:26px;padding-right:2px;white-space:nowrap;cursor:default;position:relative}
.id-r:hover{background:rgba(255,255,255,.06)}
.id-r.sel{background:rgba(31,111,235,.35)}
.id-r.act{background:rgba(255,255,255,.1)}
.id-r .ch{width:14px;flex:none;display:grid;place-items:center;color:#aaa;transition:transform .1s}
.id-r .ch svg{width:12px;height:12px}
.id-r.op .ch{transform:rotate(90deg)}
.id-r .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.id-r .mo{width:26px;height:24px;display:none;place-items:center;flex:none;color:#ccc}
.id-r:hover .mo,.id-r.sel .mo{display:grid}
@media (pointer:coarse){.id-r{height:34px}.id-r .mo{display:grid}}
.id-fi{width:16px;height:16px;flex:none}
.id-empty{padding:12px;color:#888;font-size:12px}
.id-ed{flex:1;min-width:0;display:flex;flex-direction:column;position:relative}
.id-tabs{display:flex;flex:none;height:36px;background:#252526;align-items:stretch}
.id-tabs>button{flex:none;width:36px;display:grid;place-items:center;border-radius:0;color:#bbb}
.id-tl{flex:1;min-width:0;display:flex;overflow-x:auto;scrollbar-width:none}
.id-tl::-webkit-scrollbar{display:none}
.id-t{display:flex;align-items:center;gap:6px;flex:none;max-width:220px;padding:0 4px 0 10px;background:#2d2d2d;color:#999;border-right:1px solid #1e1e1e;border-top:1px solid transparent;cursor:default;white-space:nowrap}
.id-t.on{background:#1e1e1e;color:#fff;border-top-color:#1f6feb}
.id-t .tn{overflow:hidden;text-overflow:ellipsis}
.id-t.cf .tn{color:#e0a82e}.id-t.rm .tn{text-decoration:line-through}
.id-t .tx{width:22px;height:22px;display:grid;place-items:center;border-radius:4px;flex:none;font-size:15px;font-style:normal}
.id-t .tx:hover{background:rgba(255,255,255,.15)}
.id-t .dt{width:8px;height:8px;border-radius:50%;background:#ddd;display:none}
.id-t.d .dt{display:block}.id-t.d .tx b{display:none}
.id-t:not(.d) .dt{display:none}
.id-t.d .tx:hover .dt{display:none}.id-t.d .tx:hover b{display:inline}
.id-bc{flex:none;height:22px;display:flex;align-items:center;padding:0 12px;font-size:12px;color:#999;background:#1e1e1e;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.id-fb{flex:none;display:none;gap:4px;padding:6px 8px;background:#252526;border-bottom:1px solid #1a1a1a;align-items:flex-start}
.id-fb.on{display:flex}
.id-fb .fc{flex:1;min-width:0;display:grid;gap:4px}
.id-fb .fr{display:flex;gap:2px;align-items:center}
.id-fb input[type=text]{flex:1;min-width:0;height:26px;padding:0 8px;background:#3c3c3c;border:1px solid transparent;border-radius:4px}
.id-fb input[type=text]:focus{border-color:#1f6feb}
.id-fb button{height:26px;min-width:26px;padding:0 6px;font-size:12px}
.id-fb button.on{background:rgba(31,111,235,.5);color:#fff}
.id-fb .cn{min-width:62px;text-align:center;color:#aaa;font-size:12px;flex:none}
.id-fb .rr{display:none}.id-fb.rep .rr{display:flex}
.id-cw{flex:1;min-height:0;position:relative;background:#1e1e1e}
.id-eb{position:absolute;inset:0;display:none}
.id-eb.on{display:flex}
.id-gt{flex:none;overflow:hidden;background:#1e1e1e;color:#6e7681;text-align:right;user-select:none;-webkit-user-select:none}
.id-gt pre,.id-hl,.id-ta,.id-mi,.id-fh{margin:0;font-family:ui-monospace,"Cascadia Mono",Menlo,Consolas,"DejaVu Sans Mono",monospace;font-size:var(--fs);line-height:var(--lh);tab-size:4;-moz-tab-size:4;letter-spacing:0;font-variant-ligatures:none}
.id-gt pre{padding:8px 10px 0 12px;white-space:pre}
.id-wr .id-gt{display:none}
.id-ew{flex:1;min-width:0;position:relative;overflow:hidden}
.id-al{position:absolute;left:0;right:0;height:var(--lh);background:rgba(255,255,255,.05);pointer-events:none;display:none}
.id-hl{position:absolute;inset:0;overflow:hidden;padding:8px 14px 0 12px;pointer-events:none;color:#d4d4d4;white-space:pre}
.id-hl code{display:block;font:inherit;padding:0 100px 140px 0;min-width:100%;width:max-content;background:none;color:inherit}
.id-ta{position:absolute;inset:0;width:100%;height:100%;padding:8px 14px 120px 12px;border:0;outline:0;resize:none;background:transparent;color:transparent;caret-color:#fff;box-sizing:border-box;white-space:pre;overflow:auto;overscroll-behavior:contain;user-select:text;-webkit-user-select:text;-webkit-text-fill-color:transparent;z-index:1}
.id-ta::selection{background:rgba(38,79,120,.95);-webkit-text-fill-color:transparent}
.id-wr .id-hl,.id-wr .id-ta,.id-wr .id-fh{white-space:pre-wrap;overflow-wrap:break-word;word-break:normal}
.id-wr .id-hl code,.id-wr .id-fh code{width:auto;padding-right:0;min-width:0}
.id-fh{position:absolute;inset:0;overflow:hidden;padding:8px 14px 0 12px;pointer-events:none;color:transparent;white-space:pre}
.id-fh code{display:block;font:inherit;padding:0 100px 140px 0;min-width:100%;width:max-content;color:transparent;background:none}
.id-fh mark{background:rgba(234,92,0,.33);color:transparent;border-radius:2px}
.id-fh mark.cur{background:rgba(81,92,106,.95);outline:1px solid #f0a050}
.id-ta[readonly]{caret-color:transparent}
.id-k{color:#569cd6}.id-kc{color:#c586c0}.id-s{color:#ce9178}.id-n{color:#b5cea8}.id-c{color:#6a9955;font-style:italic}.id-f{color:#dcdcaa}.id-t2{color:#4ec9b0}.id-l{color:#569cd6}.id-a{color:#9cdcfe}.id-v{color:#9cdcfe}
.id-bn{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:10px;color:#999;text-align:center;padding:20px;overflow:auto}
.id-bn img{max-width:92%;max-height:70vh;background:repeating-conic-gradient(#2a2a2a 0 25%,#333 0 50%) 50%/16px 16px;border-radius:4px}
.id-bn a,.id-bn button{padding:7px 14px;border-radius:5px;background:#1f6feb;color:#fff;text-decoration:none}
.id-wl{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:8px;color:#8a8a8a;text-align:center;padding:20px;overflow:auto}
.id-wl svg.lg{width:84px;height:84px;opacity:.25}
.id-wl table{border-collapse:collapse;margin-top:6px;text-align:left}
.id-wl td{padding:3px 12px;color:#9a9a9a}.id-wl td:first-child{color:#bbb;text-align:right}
.id-wl kbd{padding:1px 6px;border:1px solid #555;border-radius:4px;font:11px inherit;background:#2a2a2a;color:#ddd}
.id-wl .ab{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:8px}
.id-wl .ab button{padding:8px 14px;background:#1f6feb;color:#fff}
.id-wl .ab button+button{background:#3a3a3a}
.id-tm{flex:none;display:none;flex-direction:column;border-top:1px solid #1a1a1a;background:#0c0c0c;min-height:0}
.id-tm.on{display:flex}
.id-th{height:5px;margin-top:-3px;cursor:row-resize;flex:none;z-index:3;touch-action:none;position:relative}
.id-th::after{content:"";position:absolute;left:0;right:0;top:-6px;bottom:-6px}
.id-tb{display:flex;flex:none;align-items:center;height:30px;padding:0 4px 0 6px;background:#1b1b1b;gap:2px}
.id-tb .ts{flex:1;min-width:0;display:flex;gap:2px;overflow-x:auto;scrollbar-width:none}
.id-tb .ts button{flex:none;padding:0 4px 0 10px;height:24px;color:#999;display:flex;align-items:center;gap:6px}
.id-tb .ts button.on{background:rgba(255,255,255,.12);color:#fff}
.id-tb .ts i{font-style:normal;width:18px;height:18px;display:grid;place-items:center;border-radius:3px}
.id-tb .ts i:hover{background:rgba(255,255,255,.2)}
.id-tb>button{width:28px;height:24px;display:grid;place-items:center;color:#ccc;flex:none}
.id-tv{flex:1;min-height:0;position:relative}
.id-tv .xs{position:absolute;inset:0;padding:4px 0 0 6px;display:none}
.id-tv .xs.on{display:block}
.id-tv>p{padding:12px;color:#999}
.id-sbr{flex:none;display:flex;align-items:center;height:24px;background:#1f6feb;color:#fff;font-size:12px;overflow:hidden}
.id-sbr button{height:24px;padding:0 9px;border-radius:0;white-space:nowrap;display:flex;align-items:center;gap:5px;flex:none}
.id-sbr button:hover{background:rgba(255,255,255,.2)}
.id-sbr .sp{flex:1}
.id-sbr .msg{padding:0 9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.id-ky{flex:none;display:none;gap:4px;padding:5px 6px;overflow-x:auto;scrollbar-width:none;background:#252526;border-top:1px solid #1a1a1a}
.id-ky.on{display:flex}
.id-ky button{flex:none;min-width:38px;height:34px;padding:0 9px;background:rgba(255,255,255,.09);font-size:14px;font-family:ui-monospace,Menlo,monospace}
.id-ky button:active{background:#1f6feb}
.id-sc{position:absolute;inset:0;z-index:20;background:rgba(0,0,0,.5);display:none}
.id-nr .id-sb{position:absolute;left:0;top:0;bottom:0;z-index:21;width:min(300px,88%);box-shadow:0 0 30px rgba(0,0,0,.6)}
.id-nr .id-sb:not(.off)~.id-sc{display:block}
.id-nr .id-sbr .hd{display:none}
.id-sf{padding:8px;display:grid;grid-template-columns:minmax(0,1fr);gap:6px;flex:none}
.id-sf .ir{display:flex;gap:2px;align-items:center;min-width:0}
.id-sf input[type=text]{flex:1;min-width:0;height:28px;padding:0 8px;background:#3c3c3c;border:1px solid transparent;border-radius:4px}
.id-sf input[type=text]:focus{border-color:#1f6feb}
.id-sf button{height:28px;min-width:28px;padding:0 6px;font-size:12px}
.id-sf button.on{background:rgba(31,111,235,.5);color:#fff}
.id-sf .hp{font-size:11px;color:#888}
.id-rs{flex:1;min-height:0;overflow:auto;padding-bottom:40px}
.id-rf{display:flex;gap:6px;align-items:center;padding:3px 8px;cursor:default;font-weight:600;font-size:12px;position:sticky;top:0;background:#252526}
.id-rf small{color:#888;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}
.id-rf span.c{background:#4d4d4d;border-radius:9px;padding:0 6px;font-size:11px;font-weight:400}
.id-rm{padding:2px 8px 2px 24px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:default;font-size:12.5px;color:#bbb;font-family:ui-monospace,Menlo,Consolas,monospace}
.id-rm:hover,.id-rf:hover{background:rgba(255,255,255,.07)}
.id-rm mark{background:rgba(234,92,0,.45);color:#fff;border-radius:2px}
.id-cm{position:absolute;z-index:40;min-width:180px;padding:4px;background:#2b2b2b;border:1px solid #454545;border-radius:7px;box-shadow:0 8px 26px rgba(0,0,0,.6)}
.id-cm button{display:block;width:100%;text-align:left;padding:7px 12px;white-space:nowrap}
.id-cm button.dg{color:#ff8a80}
.id-cm hr{border:0;border-top:1px solid #454545;margin:4px 0}
.id-qp{position:absolute;inset:0;z-index:50;display:none;background:rgba(0,0,0,.35);align-items:flex-start;justify-content:center}
.id-qp.on{display:flex}
.id-qb{margin-top:34px;width:min(600px,94%);max-height:min(70%,480px);display:flex;flex-direction:column;background:#252526;border:1px solid #454545;border-radius:8px;box-shadow:0 10px 36px rgba(0,0,0,.65);overflow:hidden}
.id-qb input{height:38px;padding:0 12px;background:#3c3c3c;border:0;border-bottom:1px solid #1a1a1a;font-size:14px;flex:none;width:100%}
.id-ql{overflow:auto;padding:4px}
.id-qi{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:5px;cursor:default;white-space:nowrap;overflow:hidden}
.id-qi.on{background:#04395e;color:#fff}
.id-qi b{font-weight:400;overflow:hidden;text-overflow:ellipsis;flex:none;max-width:70%}
.id-qi small{color:#888;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}
.id-qi kbd{margin-left:auto;color:#999;font:11px inherit;flex:none}
.id-qi mark{background:none;color:#4fc1ff;font-weight:600}
.id-q0{padding:12px;color:#888}
.id-dl{position:absolute;inset:0;z-index:60;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.5);padding:12px}
.id-dl.on{display:flex}
.id-db{width:min(420px,100%);background:#2b2b2b;border:1px solid #454545;border-radius:10px;padding:16px;display:grid;gap:12px;box-shadow:0 10px 36px rgba(0,0,0,.65)}
.id-db b{font-size:14px;color:#fff}
.id-db p{color:#bbb;word-break:break-word;white-space:pre-wrap}
.id-db input{height:34px;padding:0 10px;background:#3c3c3c;border:1px solid #1f6feb;border-radius:5px;width:100%}
.id-db .bt{display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap}
.id-db .bt button{height:34px;padding:0 14px;background:rgba(255,255,255,.1)}
.id-db .bt button.pri{background:#1f6feb;color:#fff}
.id-db .bt button.dg{color:#ff8a80}
.id-pl{max-height:50vh;overflow:auto;border:1px solid #454545;border-radius:6px}
.id-pl button{display:flex;gap:8px;align-items:center;width:100%;text-align:left;padding:7px 10px}
.id-ts{position:absolute;left:50%;bottom:44px;transform:translateX(-50%);z-index:70;padding:7px 14px;border-radius:7px;background:#333;border:1px solid #555;box-shadow:0 6px 20px rgba(0,0,0,.5);pointer-events:none;max-width:90%;text-align:center}
.ide *::-webkit-scrollbar{width:12px;height:12px}
.ide *::-webkit-scrollbar-thumb{background:rgba(121,121,121,.4);border:3px solid transparent;background-clip:padding-box;border-radius:6px}
.ide *::-webkit-scrollbar-thumb:hover{background:rgba(150,150,150,.55);background-clip:padding-box}
.ide *::-webkit-scrollbar-corner{background:transparent}
@media (pointer:coarse){.id-ta,.id-fb input[type=text],.id-sf input[type=text],.id-qb input,.id-db input{font-size:16px}.id-ta{font-size:var(--fs)}}
`;
var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);

/* ---------- utilidades ---------- */
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return"&#"+c.charCodeAt(0)+";"})}
function escT(s){return s.replace(/[&<>]/g,function(c){return c==="&"?"&amp;":c==="<"?"&lt;":"&gt;"})}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(_){}}
function enc(s){return encodeURIComponent(s)}
function base(p){return p.slice(p.lastIndexOf("/")+1)}
function dir(p){var i=p.lastIndexOf("/");return i<0?"":p.slice(0,i)}
function join(a,b){return a?a+"/"+b:b}
function ext(n){var i=n.lastIndexOf(".");return i<=0?"":n.slice(i+1).toLowerCase()}
function uid(){return Math.random().toString(36).slice(2,9)}
var R=String.raw;

/* ---------- realce de sintaxe ---------- */
var EOT="(?![\\s\\S])";
var DQ=R`"(?:\\[\s\S]|[^"\\\n])*"?`,SQ=R`'(?:\\[\s\S]|[^'\\\n])*'?`,BT="`(?:\\\\[\\s\\S]|[^`\\\\])*`?";
var LC=R`\/\/[^\n]*`,BC=R`\/\*[\s\S]*?(?:\*\/|`+EOT+")",HC=R`#[^\n]*`;
var NUM=R`\b(?:0[xX][\da-fA-F_]+|0[bB][01_]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?)\b`;
var CALL=R`\b[A-Za-z_$][\w$]*(?=\s*\()`,TYPE=R`\b[A-Z][A-Za-z0-9_$]*\b`;
function words(s){return"\\b(?:"+s.trim().split(/\s+/).join("|")+")\\b"}
function mk(o){
  var r=[],i;
  (o.pre||[]).forEach(function(x){r.push(x)});
  (o.c||[]).forEach(function(x){r.push(["c",x])});
  (o.s||[]).forEach(function(x){r.push(["s",x])});
  (o.mid||[]).forEach(function(x){r.push(x)});
  if(o.num!==false)r.push(["n",o.numsrc||NUM]);
  if(o.kc)r.push(["kc",words(o.kc)]);
  if(o.k)r.push(["k",words(o.k)]);
  if(o.l)r.push(["l",words(o.l)]);
  if(o.t)r.push(["t2",words(o.t)]);
  if(o.call!==false)r.push(["f",o.callsrc||CALL]);
  if(o.type!==false)r.push(["t2",TYPE]);
  return{rules:r,flags:"gm"+(o.i?"i":"")};
}
function compile(sp){
  return new RegExp(sp.rules.map(function(x){return"("+x[1]+")"}).join("|"),sp.flags);
}
function hl(text,lang){
  var sp=LANGS[lang];
  if(!sp||text.length>400000)return escT(text);
  var re=sp.re||(sp.re=compile(sp)),out=[],last=0,m,i,r;
  re.lastIndex=0;
  while((m=re.exec(text))){
    if(m[0]===""){re.lastIndex++;continue}
    if(m.index>last)out.push(escT(text.slice(last,m.index)));
    i=1;while(m[i]===undefined)i++;
    r=sp.rules[i-1];
    out.push(r[2]?r[2](m[0]):'<span class="id-'+r[0]+'">'+escT(m[0])+"</span>");
    last=re.lastIndex;
  }
  out.push(escT(text.slice(last)));
  return out.join("");
}
function htmlTag(t){
  var m=/^(<\/?)([\w:.-]*)([\s\S]*?)(\/?>?)$/.exec(t);
  if(!m)return escT(t);
  var re=/([\w:@.\-]+)(\s*=\s*)?("[^"]*"?|'[^']*'?|[^\s"'<>]+)?/g,o="",last=0,x,mid=m[3];
  while((x=re.exec(mid))){
    if(x[0]==="")break;
    o+=escT(mid.slice(last,x.index))+'<span class="id-a">'+escT(x[1])+"</span>"+(x[2]?escT(x[2]):"")+(x[3]?'<span class="id-s">'+escT(x[3])+"</span>":"");
    last=re.lastIndex;
  }
  o+=escT(mid.slice(last));
  return'<span class="id-k">'+escT(m[1]+m[2])+"</span>"+o+'<span class="id-k">'+escT(m[4])+"</span>";
}
function embed(tag,lang){
  var open=new RegExp("^<"+tag+R`\b(?:"[^"]*"|'[^']*'|[^<>"'])*>`,"i");
  return function(t){
    var o=open.exec(t);if(!o)return escT(t);
    var rest=t.slice(o[0].length),k=rest.search(new RegExp("</"+tag+">","i"));
    return htmlTag(o[0])+hl(k<0?rest:rest.slice(0,k),lang)+(k<0?"":htmlTag(rest.slice(k)));
  };
}
var TAGSRC=R`<\/?[A-Za-z](?:"[^"]*"|'[^']*'|[^<>"'])*>?`;
function clike(kc,k,l,o){
  o=o||{};
  return mk({pre:o.pre,c:[LC,BC],s:o.s||[DQ,SQ],mid:o.mid,kc:kc,k:k,l:l,t:o.t});
}
var JSKC="if else for while do switch case break continue return throw try catch finally import export default await";
var JSK="const let var function class extends new typeof instanceof void delete in async static yield enum interface implements namespace declare abstract readonly public private protected keyof";
var JSL="true false null undefined NaN Infinity this super";
var LANGS={
 js:mk({c:[LC,BC],s:[DQ,SQ,BT],kc:JSKC,k:JSK,l:JSL}),
 ts:mk({c:[LC,BC],s:[DQ,SQ,BT],mid:[["f",R`@\w+`]],kc:JSKC,k:JSK,l:JSL,t:"string number boolean any unknown never object symbol bigint"}),
 json:mk({pre:[["a",R`"(?:\\[\s\S]|[^"\\\n])*"(?=\s*:)`]],s:[DQ],l:"true false null",call:false,type:false}),
 py:mk({c:[HC],s:[R`[rRbBuUfF]{0,2}(?:"""[\s\S]*?(?:"""|(?![\s\S]))|'''[\s\S]*?(?:'''|(?![\s\S])))`,R`[rRbBuUfF]{0,2}"(?:\\.|[^"\\\n])*"?`,R`[rRbBuUfF]{0,2}'(?:\\.|[^'\\\n])*'?`],
   mid:[["f",R`@[\w.]+`]],kc:"if elif else for while break continue return import from try except finally raise with yield await pass assert del",
   k:"def class lambda global nonlocal as async is in not and or",l:"True False None self cls"}),
 html:mk({pre:[["c","<!--[\\s\\S]*?(?:-->|"+EOT+")"],["k",R`<![Dd][Oo][Cc][Tt][Yy][Pp][Ee][^>]*>`],
   ["x","<script\\b(?:\"[^\"]*\"|'[^']*'|[^<>\"'])*>[\\s\\S]*?(?:</script>|"+EOT+")",embed("script","js")],
   ["x","<style\\b(?:\"[^\"]*\"|'[^']*'|[^<>\"'])*>[\\s\\S]*?(?:</style>|"+EOT+")",embed("style","css")],
   ["x",TAGSRC,htmlTag],["n",R`&#?\w+;`]],num:false,call:false,type:false}),
 css:mk({c:[BC],s:[DQ,SQ],mid:[["k",R`@[\w-]+`],["v",R`--[\w-]+`],["n",R`#[\da-fA-F]{3,8}\b`],["a",R`[a-zA-Z-]+(?=\s*:)`],["t2",R`[.#][a-zA-Z_][\w-]*`]],
   numsrc:R`\b\d+\.?\d*(?:%|[a-zA-Z]{1,4})?`,callsrc:R`[\w-]+(?=\()`,type:false}),
 md:mk({pre:[["s",R`^(?:\`\`\`|~~~)[^\n]*\n[\s\S]*?(?:\n(?:\`\`\`|~~~)|(?![\s\S]))`],["c","<!--[\\s\\S]*?(?:-->|"+EOT+")"],["k",R`^#{1,6}\s.*$`],["c",R`^>.*$`],
   ["n",R`^[ \t]*(?:[-*+]|\d+[.)])[ \t]`],["s",R`\`[^\`\n]+\``],["kc",R`\*\*[^*\n]+\*\*`],["f",R`\[[^\]\n]*\]\([^)\n]*\)`]],num:false,call:false,type:false}),
 sh:mk({pre:[["c",R`(?:^|[ \t;|&(])#[^\n]*`]],s:[R`"(?:\\[\s\S]|[^"\\])*"?`,R`'[^']*'?`],
   mid:[["v",R`\$(?:\{[^}\n]*\}|\([^)\n]*\)|[\w@#?*!$-]+)`],["a",R`(?:^|[ \t])--?[A-Za-z][\w-]*`]],
   kc:"if then else elif fi for while until do done case esac in function return break continue exit",
   k:"echo cd export local readonly source alias unset set shift test read eval exec trap sudo",type:false}),
 yaml:mk({pre:[["c",R`(?:^|[ \t])#[^\n]*`],["a",R`^[ \t-]*[\w.\-/"']+(?=:(?:[ \t]|$))`]],s:[DQ,SQ],mid:[["v",R`[&*][\w-]+`]],l:"true false null yes no on off ~",call:false,type:false}),
 ini:mk({pre:[["c",R`^[ \t]*[#;][^\n]*`],["k",R`^[ \t]*\[[^\]\n]+\]`],["a",R`^[ \t]*[\w.\-]+(?=[ \t]*=)`]],s:[DQ,SQ],l:"true false null",call:false,type:false}),
 sql:mk({c:[R`--[^\n]*`,BC],s:[R`'(?:''|[^'])*'?`,DQ],k:"select from where insert into values update set delete create table drop alter add join left right inner outer on group by order having limit offset as and or not null is in like between distinct union all index primary key foreign references default unique exists case when then else end count sum avg min max",i:true,type:false}),
 c:clike("if else for while do switch case break continue return goto default",
   "auto bool char double float int long short signed unsigned void struct union enum typedef static const extern inline volatile register class public private protected virtual namespace using template typename new delete operator sizeof",
   "true false NULL nullptr this",{pre:[["kc",R`^[ \t]*#[ \t]*\w+[^\n]*`]]}),
 java:clike("if else for while do switch case break continue return throw try catch finally default",
   "class interface extends implements new static final abstract public private protected void int long double float boolean char byte short import package enum var fun val object override suspend data open sealed record instanceof synchronized volatile",
   "true false null this super",{mid:[["f",R`@\w+`]]}),
 go:clike("if else for switch case break continue return goto fallthrough default range select go defer",
   "func package import var const type struct interface map chan",
   "true false nil iota",{s:[DQ,"`[^`]*`?"],t:"string int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 float32 float64 bool byte rune error any"}),
 rust:clike("if else match for while loop break continue return in",
   "fn let mut const static struct enum impl trait pub use mod crate self super as where move ref dyn type unsafe async await",
   "true false Some None Ok Err",{s:[DQ,R`'(?:\\.|[^'\\\n])'`],mid:[["f",R`#!?\[[^\]\n]*\]`]],t:"i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 bool char str String Vec Option Result Box"}),
 php:clike("if else elseif for foreach while do switch case break continue return throw try catch finally default match",
   "function class interface trait extends implements new static final abstract public private protected namespace use echo print var const global array isset unset empty require require_once include include_once",
   "true false null TRUE FALSE NULL",{pre:[["k",R`<\?php|<\?=|\?>`],["c",HC]],mid:[["v",R`\$\w+`]]}),
 rb:mk({c:[HC],s:[DQ,SQ],mid:[["v",R`:[A-Za-z_]\w*[?!]?`],["v",R`@{1,2}\w+`]],kc:"if elsif else unless while until for in do begin rescue ensure return yield case when then break next",
   k:"def class module end self require require_relative include extend attr_accessor attr_reader attr_writer puts print lambda proc and or not",l:"true false nil"}),
 lua:mk({c:[R`--\[\[[\s\S]*?(?:\]\]|(?![\s\S]))`,R`--[^\n]*`],s:[DQ,SQ],kc:"if then else elseif end for while do repeat until break return in goto",k:"function local and or not require",l:"true false nil",type:false}),
 docker:mk({pre:[["kc",R`^[ \t]*(?:FROM|RUN|CMD|LABEL|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b`]],c:[R`^[ \t]*#[^\n]*`],s:[DQ,SQ],mid:[["v",R`\$(?:\{[^}\n]*\}|\w+)`]],call:false,type:false,num:false,i:true})
};
LANGS.cpp=LANGS.c;LANGS.cs=LANGS.java;LANGS.kt=LANGS.java;LANGS.swift=LANGS.java;LANGS.dart=LANGS.java;
var EXT={js:"js",mjs:"js",cjs:"js",jsx:"js",ts:"ts",tsx:"ts",mts:"ts",cts:"ts",json:"json",jsonc:"json",json5:"json",webmanifest:"json",
 html:"html",htm:"html",xhtml:"html",vue:"html",svelte:"html",xml:"html",svg:"html",plist:"html",css:"css",scss:"css",less:"css",md:"md",markdown:"md",
 py:"py",pyw:"py",sh:"sh",bash:"sh",zsh:"sh",ash:"sh",yml:"yaml",yaml:"yaml",toml:"ini",ini:"ini",cfg:"ini",conf:"ini",env:"ini",properties:"ini",
 sql:"sql",c:"c",h:"c",cpp:"cpp",cc:"cpp",cxx:"cpp",hpp:"cpp",hh:"cpp",java:"java",kt:"kt",kts:"kt",swift:"swift",go:"go",rs:"rust",php:"php",
 rb:"rb",lua:"lua",dart:"dart",cs:"cs"};
var NAMES={js:"JavaScript",ts:"TypeScript",json:"JSON",html:"HTML",css:"CSS",md:"Markdown",py:"Python",sh:"Shell",yaml:"YAML",ini:"Config",sql:"SQL",
 c:"C",cpp:"C++",java:"Java",kt:"Kotlin",swift:"Swift",go:"Go",rust:"Rust",php:"PHP",rb:"Ruby",lua:"Lua",dart:"Dart",cs:"C#",docker:"Dockerfile",txt:"Texto simples"};
var CMT={js:"//",ts:"//",c:"//",cpp:"//",java:"//",kt:"//",swift:"//",dart:"//",cs:"//",go:"//",rust:"//",php:"//",py:"#",sh:"#",yaml:"#",ini:"#",rb:"#",docker:"#",sql:"--",lua:"--"};
function langOf(name){
  var n=name.toLowerCase();
  if(n==="dockerfile"||/^dockerfile\./.test(n))return"docker";
  if(/^\.(bashrc|zshrc|profile|bash_profile|zprofile|env)/.test(n)||n==="makefile"||n==="start.sh")return"sh";
  if(/^\.(gitignore|gitattributes|editorconfig)$/.test(n))return"ini";
  return EXT[ext(n)]||"txt";
}
var FIC={js:"#e8d44d",ts:"#3b9be0",json:"#e8c24d",html:"#e8743b",css:"#4aa8e8",md:"#6fb3ff",py:"#5aa5d6",sh:"#7bd88f",yaml:"#cb6a6a",ini:"#aaa",sql:"#e8a23b",
 c:"#6aa0d8",cpp:"#6aa0d8",java:"#e07a3b",kt:"#a97bff",swift:"#f0793b",go:"#4ec9d4",rust:"#d9825b",php:"#8f9bd8",rb:"#e05b5b",lua:"#5a7bd8",dart:"#4ec9b0",cs:"#9a6ad8",docker:"#4aa8e8"};
var IMG=/^(png|jpe?g|gif|webp|bmp|ico|avif)$/;

/* ---------- ícones ---------- */
var ic=function(d,f){return'<svg viewBox="0 0 24 24" fill="'+(f?"currentColor":"none")+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+d+'"/></svg>'};
var I={
 menu:ic("M4 6h16M4 12h16M4 18h16"),dots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',play:ic("M7 4l13 8-13 8z",1),x:ic("M6 6l12 12M18 6L6 18"),plus:ic("M12 5v14M5 12h14"),
 nf:ic("M6 3h8l4 4v14H6zM12 11v6M9 14h6"),nd:ic("M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 10v6M9 13h6"),
 re:ic("M20 11a8 8 0 1 0 1 5M20 4v7h-7"),fo:ic("M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1M3 9h18l-2 9a2 2 0 0 1-2 1.5H5A2 2 0 0 1 3 17z"),
 chev:ic("M9 6l6 6-6 6"),up:ic("M12 19V5M6 11l6-6 6 6"),dn:ic("M12 5v14M6 13l6 6 6-6"),term:ic("M4 17l6-5-6-5M12 19h8"),
 file:'<svg class="id-fi" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path fill="rgba(255,255,255,.45)" d="M14 2l6 6h-4a2 2 0 0 1-2-2z"/></svg>',
 dir:'<svg class="id-fi" viewBox="0 0 24 24"><path fill="#c09553" d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>',
 logo:'<svg class="lg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="#fff"/><path d="M9.5 8 5.5 12l4 4M14.5 8l4 4-4 4" fill="none" stroke="#1e1e1e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
function icon(n){
  if(n.dir)return I.dir;
  var l=langOf(n.name),c=FIC[l]||"#9aa4b2";
  return I.file.replace("<svg ",'<svg style="color:'+c+'" ');
}

/* ---------- copiar ---------- */
function copyText(t){
  function legacy(){
    var ta=document.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");
    ta.style.cssText="position:fixed;left:-9999px;top:0;opacity:0";document.body.appendChild(ta);ta.select();
    var ok=false;try{ok=document.execCommand("copy")}catch(_){}ta.remove();return ok;
  }
  if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(t).then(function(){return true},function(){return legacy()});
  return Promise.resolve(legacy());
}
function lineStart(v,s){return s?v.lastIndexOf("\n",s-1)+1:0}
function lineRange(v,s,e){
  var a=lineStart(v,s),b=e>s&&v.charAt(e-1)==="\n"?e-1:e,x=v.indexOf("\n",b);
  return[a,x<0?v.length:x];
}
function natcmp(a,b){return a.localeCompare(b,undefined,{numeric:true,sensitivity:"base"})}
function q1(s){return"'"+String(s).replace(/'/g,"'\\''")+"'"}
function fuzzy(q,s){
  var L=s.toLowerCase(),bs=L.lastIndexOf("/")+1,qi=0,sc=0,last=-2,idx=[],i,c;
  for(i=0;i<L.length&&qi<q.length;i++){
    if(L.charAt(i)===q.charAt(qi)){
      c=L.charAt(i-1);
      sc+=(i===last+1?5:1)+(i===bs||c==="/"||c==="."||c==="_"||c==="-"?4:0)+(i>=bs?2:0);
      last=i;qi++;idx.push(i);
    }
  }
  if(qi<q.length)return null;
  if(L.indexOf(q,bs)>=0)sc+=20;
  return{s:sc-L.length*0.05,i:idx};
}
var PAIRS={"(":")","[":"]","{":"}",'"':'"',"'":"'","`":"`"},CLOSE=")]}\"'`";
var THEME={background:"#0c0c0c",foreground:"#cccccc",cursor:"#ffffff",selectionBackground:"#264f78",
 black:"#0c0c0c",red:"#c50f1f",green:"#13a10e",yellow:"#c19c00",blue:"#0037da",magenta:"#881798",cyan:"#3a96dd",white:"#cccccc",
 brightBlack:"#767676",brightRed:"#e74856",brightGreen:"#16c60c",brightYellow:"#f9f1a5",brightBlue:"#3b78ff",brightMagenta:"#b4009e",brightCyan:"#61d6d6",brightWhite:"#f2f2f2"};
var XP=null;
function loadX(){
  if(window.Terminal&&window.FitAddon)return Promise.resolve();
  if(XP)return XP;
  var L={x:"/vendor/xterm.js",f:"/vendor/addon-fit.js",c:"/vendor/xterm.css"},
      C={x:"https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js",f:"https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js",c:"https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css"};
  function js(u,a,b){var s=document.createElement("script");s.src=u;s.onload=a;s.onerror=b;document.head.appendChild(s)}
  function use(S,ok,fail){js(S.x,function(){js(S.f,function(){var l=document.createElement("link");l.rel="stylesheet";l.href=S.c;document.head.appendChild(l);ok()},fail)},fail)}
  return XP=new Promise(function(ok,no){use(L,ok,function(){use(C,ok,function(){XP=null;no(new Error("não foi possível carregar o xterm.js (sem internet?)"))})})});
}

/* ======================================================================== */
window.App_ide=function(root){
  var coarse=matchMedia("(pointer:coarse)").matches,enc8=new TextEncoder();
  root.innerHTML=
  '<div class="ide">'+
   '<div class="id-main">'+
    '<div class="id-sb">'+
     '<div class="id-st"><button data-v="ex" class="on">Explorador</button><button data-v="se">Buscar</button></div>'+
     '<div class="id-sp on" data-p="ex"><div class="id-sh"><span class="id-ws"></span>'+
       '<button data-a="nf" title="Novo arquivo">'+I.nf+'</button><button data-a="nd" title="Nova pasta">'+I.nd+'</button>'+
       '<button data-a="rf" title="Atualizar">'+I.re+'</button><button data-a="of" title="Abrir pasta">'+I.fo+'</button></div>'+
       '<div class="id-tr"></div></div>'+
     '<div class="id-sp" data-p="se"><div class="id-sf">'+
       '<div class="ir"><input type="text" class="sq" placeholder="Buscar nos arquivos" autocomplete="off" spellcheck="false" autocapitalize="off">'+
         '<button data-o="cs" title="Diferenciar maiúsculas">Aa</button><button data-o="w" title="Palavra inteira">ab</button><button data-o="re" title="Expressão regular">.*</button></div>'+
       '<div class="ir"><input type="text" class="si" placeholder="Incluir: *.py, *.js" autocomplete="off" spellcheck="false" autocapitalize="off"></div>'+
       '<div class="ir"><input type="text" class="sx" placeholder="Excluir: *.min.js" autocomplete="off" spellcheck="false" autocapitalize="off"></div>'+
       '<div class="hp"></div></div><div class="id-rs"></div></div>'+
    '</div>'+
    '<div class="id-sc" data-a="sb"></div>'+
    '<div class="id-ed">'+
     '<div class="id-tabs"><button data-a="sb" title="Barra lateral (Ctrl+B)">'+I.menu+'</button><div class="id-tl"></div>'+
       '<button data-a="run" title="Executar arquivo">'+I.play+'</button><button data-a="pal" title="Comandos (Ctrl+Shift+P)">'+I.dots+'</button></div>'+
     '<div class="id-bc"></div>'+
     '<div class="id-fb"><button data-a="frt" title="Alternar substituição" style="height:56px">'+I.chev+'</button><div class="fc">'+
       '<div class="fr"><input type="text" class="ff" placeholder="Localizar" autocomplete="off" spellcheck="false" autocapitalize="off"><span class="cn"></span>'+
         '<button data-o="fcs" title="Diferenciar maiúsculas">Aa</button><button data-o="fw" title="Palavra inteira">ab</button><button data-o="fre" title="Expressão regular">.*</button>'+
         '<button data-a="fp" title="Anterior">'+I.up+'</button><button data-a="fn" title="Próximo">'+I.dn+'</button><button data-a="fx" title="Fechar">'+I.x+'</button></div>'+
       '<div class="fr rr"><input type="text" class="fr2" placeholder="Substituir" autocomplete="off" spellcheck="false" autocapitalize="off">'+
         '<button data-a="f1" title="Substituir">Subst.</button><button data-a="fa" title="Substituir tudo">Todos</button></div></div></div>'+
     '<div class="id-cw"></div>'+
     '<div class="id-tm"><div class="id-th"></div><div class="id-tb"><div class="ts"></div>'+
       '<button data-a="tadd" title="Novo terminal">'+I.plus+'</button><button data-a="tx" title="Fechar painel">'+I.x+'</button></div><div class="id-tv"></div></div>'+
    '</div>'+
   '</div>'+
   '<div class="id-ky"></div>'+
   '<div class="id-sbr"><button data-a="tm" title="Terminal (Ctrl+`)">'+I.term+'<span class="hd">Terminal</span></button><span class="msg"></span><span class="sp"></span>'+
     '<button data-a="gl" class="pos">Ln 1, Col 1</button><button data-a="ind" class="hd">Espaços: 2</button><button class="hd" data-a="noop">UTF-8</button>'+
     '<button data-a="eol" class="hd">LF</button><button data-a="lang" class="hd">Texto simples</button></div>'+
   '<div class="id-qp"><div class="id-qb"><input type="text" autocomplete="off" spellcheck="false" autocapitalize="off"><div class="id-ql"></div></div></div>'+
   '<div class="id-dl"><div class="id-db"></div></div>'+
  '</div>';
  var $=function(s){return root.querySelector(s)},
      ide=$(".ide"),sb=$(".id-sb"),trEl=$(".id-tr"),wsEl=$(".id-ws"),tl=$(".id-tl"),bc=$(".id-bc"),cw=$(".id-cw"),fb=$(".id-fb"),
      ff=$(".ff"),fr2=$(".fr2"),fcn=$(".cn"),tm=$(".id-tm"),tbs=$(".id-tm .ts"),tv=$(".id-tv"),ky=$(".id-ky"),sbr=$(".id-sbr"),
      qp=$(".id-qp"),qi=$(".id-qp input"),ql=$(".id-ql"),dl=$(".id-dl"),db=$(".id-db"),
      sq=$(".sq"),si=$(".si"),sx=$(".sx"),rs=$(".id-rs"),shp=$(".id-sf .hp");
  var S={ws:ls("ide.ws")||"",fs:+ls("ide.fs")||(coarse?14:13),wrap:ls("ide.wrap")===null?coarse:ls("ide.wrap")==="1",auto:ls("ide.auto")==="1",
         keys:ls("ide.keys")===null?coarse:ls("ide.keys")==="1",sb:null,th:+ls("ide.th")||240},
      T=[],act=null,guard=false,rootAbs="",tree=null,selP="",fl=null,flP=null,narrow=false,disposed=false,
      FO={fcs:0,fw:0,fre:0},SO={cs:0,w:0,re:0},mirror=null,pend=[],TS=[],tact=null,lastTerm=0;

  function api(u,o){
    return fetch(u,o).then(function(r){
      return r.json().catch(function(){return{}}).then(function(j){
        if(!r.ok){var e=new Error(j.e||("Erro "+r.status));e.status=r.status;e.data=j;throw e}
        return j;
      });
    });
  }
  function post(u,b,m){return api(u,{method:m||"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b||{})})}
  var LH=function(){return Math.round(S.fs*1.55)};
  var msgT=0;
  function msg(t){var m=$(".msg");m.textContent=t;clearTimeout(msgT);msgT=setTimeout(function(){m.textContent=""},2500)}
  function toast(t){
    var e=document.createElement("div");e.className="id-ts";e.textContent=t;ide.appendChild(e);
    setTimeout(function(){e.remove()},2600);
  }
  function setCss(){ide.style.setProperty("--fs",S.fs+"px");ide.style.setProperty("--lh",LH()+"px")}

  /* ---------- diálogos / menus ---------- */
  var dlRes=null;
  function dlg(o){
    return new Promise(function(res){
      dlRes=res;
      db.innerHTML="<b>"+esc(o.title||"")+"</b>"+(o.msg?"<p>"+esc(o.msg)+"</p>":"")+(o.input!==undefined?'<input type="text" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="'+esc(o.ph||"")+'">':"")+
        (o.html||"")+'<div class="bt">'+(o.buttons||[["OK","ok","pri"]]).map(function(b){return'<button data-v="'+b[1]+'" class="'+(b[2]||"")+'">'+esc(b[0])+"</button>"}).join("")+"</div>";
      dl.classList.add("on");
      var inp=db.querySelector("input");
      if(inp){inp.value=o.input;setTimeout(function(){inp.focus();var d=inp.value.lastIndexOf(".");inp.setSelectionRange(0,d>0&&o.sel?d:inp.value.length)},30)}
      db._o=o;
    });
  }
  function dlgEnd(v){
    if(!dlRes)return;
    var inp=db.querySelector("input"),r=dlRes;dlRes=null;
    dl.classList.remove("on");
    r({v:v,text:inp?inp.value:""});
    if(act&&!coarse)act.ta&&act.ta.focus();
  }
  dl.addEventListener("click",function(e){
    var b=e.target.closest("[data-v]");
    if(b)dlgEnd(b.dataset.v);
    else if(e.target===dl)dlgEnd("x");
  });
  db.addEventListener("keydown",function(e){
    if(e.key==="Enter"){var p=db.querySelector(".pri");if(p){e.preventDefault();dlgEnd(p.dataset.v)}}
  });
  var cm=null;
  function menuAt(x,y,items){
    closeMenu();
    cm=document.createElement("div");cm.className="id-cm";
    cm.innerHTML=items.map(function(it,i){return it==="-"?"<hr>":'<button data-i="'+i+'" class="'+(it.c||"")+'">'+esc(it.l)+"</button>"}).join("");
    ide.appendChild(cm);
    var r=ide.getBoundingClientRect(),w=cm.offsetWidth,h=cm.offsetHeight;
    cm.style.left=Math.max(4,Math.min(x-r.left,r.width-w-4))+"px";
    cm.style.top=Math.max(4,Math.min(y-r.top,r.height-h-4))+"px";
    cm.onclick=function(e){var b=e.target.closest("[data-i]");if(!b)return;var it=items[+b.dataset.i];closeMenu();it.f()};
  }
  function closeMenu(){if(cm){cm.remove();cm=null}}

  /* ---------- explorador ---------- */
  function mkNode(name,path,dirf,parent){return{name:name,path:path,dir:dirf,open:false,kids:null,parent:parent}}
  function wsName(){return S.ws?base(S.ws):"Pasta inicial"}
  function loadDir(n){
    return api("/api/ls?p="+enc(n.path)).then(function(j){
      var old={};(n.kids||[]).forEach(function(k){old[k.path]=k});
      n.kids=j.i.map(function(it){
        var p=join(n.path,it[0]),o=old[p];
        if(o&&o.dir===!!it[1])return o;
        return mkNode(it[0],p,!!it[1],n);
      }).sort(function(a,b){return a.dir!==b.dir?(a.dir?-1:1):natcmp(a.name,b.name)});
    });
  }
  function reloadOpen(n){
    return loadDir(n).then(function(){
      return Promise.all(n.kids.filter(function(k){return k.dir&&k.open}).map(function(k){return reloadOpen(k).catch(function(){k.open=false})}));
    });
  }
  function drawTree(){
    wsEl.textContent=wsName();wsEl.title="/"+S.ws;
    var h=[];
    (function walk(n,d){
      n.kids.forEach(function(k){
        h.push('<div class="id-r'+(k.dir&&k.open?" op":"")+(act&&act.path===k.path?" act":"")+(selP===k.path?" sel":"")+'" data-p="'+esc(k.path)+'" style="padding-left:'+(6+d*12)+'px"><span class="ch">'+(k.dir?I.chev:"")+"</span>"+icon(k)+
          '<span class="nm">'+esc(k.name)+'</span><button class="mo" data-a="mo" title="Mais">'+I.dots+"</button></div>");
        if(k.dir&&k.open&&k.kids)walk(k,d+1);
      });
    })(tree,0);
    trEl.innerHTML=h.join("")||'<div class="id-empty">Pasta vazia</div>';
  }
  function nodeOf(p){
    if(p===tree.path)return tree;
    var n=tree,parts=(p.slice(tree.path?tree.path.length+1:0)).split("/");
    for(var i=0;i<parts.length;i++){
      if(!n.kids)return null;
      n=n.kids.filter(function(k){return k.name===parts[i]})[0];
      if(!n)return null;
    }
    return n;
  }
  function findNode(p){try{return nodeOf(p)}catch(_){return null}}
  async function reveal(p){
    var rel=S.ws&&p.indexOf(S.ws+"/")===0?p.slice(S.ws.length+1):(S.ws?null:p);
    if(rel===null)return;
    var parts=rel.split("/").slice(0,-1),n=tree;
    for(var i=0;i<parts.length;i++){
      var k=(n.kids||[]).filter(function(x){return x.name===parts[i]&&x.dir})[0];
      if(!k)return;
      if(!k.kids)await loadDir(k);
      k.open=true;n=k;
    }
  }
  async function initTree(){
    tree=mkNode("",S.ws,true,null);tree.open=true;
    try{await loadDir(tree)}catch(e){tree.kids=[];toast(e.message)}
    drawTree();
  }
  async function refreshTree(){
    fl=null;
    try{await reloadOpen(tree)}catch(e){toast(e.message)}
    drawTree();
  }
  trEl.addEventListener("click",function(e){
    var r=e.target.closest(".id-r");if(!r)return;
    var p=r.dataset.p,n=findNode(p);if(!n)return;
    if(e.target.closest("[data-a=mo]")){rowMenu(n,e.clientX,e.clientY,e.target.closest("[data-a=mo]"));return}
    selP=p;
    if(n.dir){
      n.open=!n.open;
      if(n.open&&!n.kids){loadDir(n).then(drawTree).catch(function(er){toast(er.message);n.open=false;drawTree()})}
      drawTree();
    }else{open(p).then(function(){if(narrow)setSb(false)});drawTree()}
  });
  trEl.addEventListener("contextmenu",function(e){
    e.preventDefault();
    var r=e.target.closest(".id-r"),n=r&&findNode(r.dataset.p);
    rowMenu(n||tree,e.clientX,e.clientY);
  });
  function rowMenu(n,x,y,btn){
    if(btn){var b=btn.getBoundingClientRect();x=b.left;y=b.bottom}
    var d=n.dir?n.path:dir(n.path),it=[];
    if(!n.dir&&n!==tree)it.push({l:"Abrir",f:function(){open(n.path)}},"-");
    it.push({l:"Novo arquivo",f:function(){newItem("touch",d)}},{l:"Nova pasta",f:function(){newItem("mkdir",d)}});
    if(n!==tree){
      it.push("-",{l:"Renomear",f:function(){renameItem(n)}});
      it.push({l:"Duplicar",f:function(){dupItem(n)}});
    }
    it.push({l:"Copiar caminho",f:function(){copyPath(n.path)}});
    if(n.dir)it.push({l:"Atualizar",f:function(){refreshTree()}});
    if(n!==tree)it.push("-",{l:"Apagar",c:"dg",f:function(){delItem(n)}});
    menuAt(x,y,it);
  }
  function absOf(p){return rootAbs+(p?"/"+p:"")}
  function copyPath(p){copyText(absOf(p)).then(function(ok){toast(ok?"Caminho copiado":"Não foi possível copiar")})}
  async function mkdirs(p){
    if(!p)return;
    var parts=p.split("/"),cur="";
    for(var i=0;i<parts.length;i++){
      cur=join(cur,parts[i]);
      try{await post("/api/op",{op:"mkdir",p:cur})}catch(e){if(e.status!==409)throw e}
    }
  }
  async function newItem(kind,parent){
    var r=await dlg({title:kind==="mkdir"?"Nova pasta":"Novo arquivo",msg:"Em: /"+(parent||""),input:"",ph:kind==="mkdir"?"nome-da-pasta":"nome.ext (ou pasta/nome.ext)",buttons:[["Criar","ok","pri"],["Cancelar","x"]]});
    if(r.v!=="ok"||!r.text.trim())return;
    var p=join(parent,r.text.trim().replace(/^\/+|\/+$/g,""));
    try{
      if(kind==="mkdir")await mkdirs(p);
      else{await mkdirs(dir(p));await post("/api/op",{op:"touch",p:p})}
      fl=null;await reveal(p);
      if(kind==="mkdir"){var pn=findNode(dir(p));if(pn)await reloadOpen(pn).catch(function(){})}
      else{var pd=findNode(dir(p))||tree;await reloadOpen(pd).catch(function(){})}
      selP=p;drawTree();
      if(kind==="touch")open(p);
    }catch(e){toast(e.message)}
  }
  async function renameItem(n){
    var r=await dlg({title:"Renomear",input:n.name,sel:!n.dir,buttons:[["Renomear","ok","pri"],["Cancelar","x"]]});
    var nm=r.text.trim();
    if(r.v!=="ok"||!nm||nm===n.name)return;
    var to=join(dir(n.path),nm);
    try{
      await post("/api/op",{op:"mv",p:n.path,to:to});
      T.forEach(function(t){if(t.path===n.path||t.path.indexOf(n.path+"/")===0){t.path=to+t.path.slice(n.path.length);t.name=base(t.path);t.lang=langOf(t.name);if(t.kind==="text")render(t)}});
      fl=null;sess();drawTabs();crumb();stat();
      await reloadOpen(findNode(dir(n.path))||tree);drawTree();
    }catch(e){toast(e.message)}
  }
  async function dupItem(n){
    var d=dir(n.path),sib=(findNode(d)||tree).kids||[],nm,i=1,ex=ext(n.name),st=ex&&!n.dir?n.name.slice(0,-ex.length-1):n.name;
    do{nm=st+" copia"+(i>1?" "+i:"")+(ex&&!n.dir?"."+ex:"");i++}while(sib.some(function(k){return k.name===nm}));
    try{await post("/api/op",{op:"cp",p:n.path,to:join(d,nm)});fl=null;await reloadOpen(findNode(d)||tree);drawTree()}catch(e){toast(e.message)}
  }
  async function delItem(n){
    var r=await dlg({title:"Apagar",msg:'Apagar "'+n.name+'"?'+(n.dir?"\nTudo dentro da pasta também será apagado.":""),buttons:[["Apagar","ok","dg"],["Cancelar","x"]]});
    if(r.v!=="ok")return;
    try{
      await post("/api/op",{op:"rm",p:n.path});
      T.filter(function(t){return t.path===n.path||t.path.indexOf(n.path+"/")===0}).forEach(function(t){closeTab(t,true)});
      fl=null;await reloadOpen(findNode(dir(n.path))||tree);drawTree();
    }catch(e){toast(e.message)}
  }
  var pickNav=null;
  db.addEventListener("click",function(e){
    var b=e.target.closest("[data-d]");
    if(b&&db.querySelector(".id-pl")){pickNav=b.dataset.d;dlgEnd("d")}
  });
  async function pickFolder(){
    var cur=S.ws;
    for(;;){
      var j;
      try{j=await api("/api/ls?p="+enc(cur))}catch(e){toast(e.message);return}
      cur=j.p;
      var ds=j.i.filter(function(x){return x[1]}).map(function(x){return x[0]}).sort(natcmp);
      var h='<div style="color:#999;font-size:12px;word-break:break-all">/'+esc(cur)+'</div><div class="id-pl">'+
        (cur?'<button data-d="..">'+I.up+"<span>..</span></button>":"")+ds.map(function(d){return'<button data-d="'+esc(d)+'">'+I.dir+"<span>"+esc(d)+"</span></button>"}).join("")+
        (ds.length||cur?"":'<div class="id-empty">Sem subpastas</div>')+"</div>";
      var r=await dlg({title:"Abrir pasta",html:h,buttons:[["Usar esta pasta","ok","pri"],["Cancelar","x"]]});
      if(r.v==="ok"){S.ws=cur;ls("ide.ws",cur);fl=null;await initTree();return}
      if(r.v!=="d")return;
      cur=pickNav===".."?dir(cur):join(cur,pickNav);
    }
  }

  /* ---------- abas ---------- */
  function sess(){
    ls("ide.sess",JSON.stringify({t:T.filter(function(t){return t.kind!=="x"}).map(function(t){return t.path}),a:act?act.path:""}));
  }
  function drawTabs(){
    tl.innerHTML=T.map(function(t){
      return'<div class="id-t'+(t===act?" on":"")+(t.dirty?" d":"")+(t.conflict?" cf":"")+(t.removed?" rm":"")+'" data-id="'+t.id+'" title="'+esc(t.path)+(t.conflict?" — mudou no disco":"")+(t.removed?" — apagado do disco":"")+'">'+
        icon({name:t.name})+'<span class="tn">'+esc(t.name)+'</span><i class="tx" data-a="tc"><span class="dt"></span><b>×</b></i></div>';
    }).join("");
    var on=tl.querySelector(".on");
    if(on)on.scrollIntoView({block:"nearest",inline:"nearest"});
  }
  tl.addEventListener("click",function(e){
    var t=e.target.closest(".id-t");if(!t)return;
    var tab=T.filter(function(x){return x.id===t.dataset.id})[0];if(!tab)return;
    if(e.target.closest("[data-a=tc]"))closeTab(tab);else activate(tab);
  });
  tl.addEventListener("auxclick",function(e){
    if(e.button!==1)return;
    var t=e.target.closest(".id-t"),tab=t&&T.filter(function(x){return x.id===t.dataset.id})[0];
    if(tab){e.preventDefault();closeTab(tab)}
  });
  tl.addEventListener("contextmenu",function(e){
    var t=e.target.closest(".id-t"),tab=t&&T.filter(function(x){return x.id===t.dataset.id})[0];
    if(!tab)return;
    e.preventDefault();
    menuAt(e.clientX,e.clientY,[{l:"Fechar",f:function(){closeTab(tab)}},{l:"Fechar outras",f:async function(){for(var o of T.slice()){if(o!==tab&&!(await closeTab(o)))break}}},
      {l:"Fechar todas",f:async function(){for(var o of T.slice()){if(!(await closeTab(o)))break}}},"-",{l:"Copiar caminho",f:function(){copyPath(tab.path)}}]);
  });
  function crumb(){
    bc.textContent=act?"/"+act.path.split("/").join("  ›  "):"";bc.style.display=act?"":"none";
  }
  var wl=document.createElement("div");wl.className="id-wl";
  wl.innerHTML=I.logo+"<b style=\"font-size:18px;color:#ccc;font-weight:500\">Código</b>"+
    (coarse?"":"<table><tr><td>Abrir arquivo</td><td><kbd>Ctrl</kbd> <kbd>P</kbd></td></tr><tr><td>Comandos</td><td><kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd></td></tr>"+
    "<tr><td>Buscar nos arquivos</td><td><kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>F</kbd></td></tr><tr><td>Terminal</td><td><kbd>Ctrl</kbd> <kbd>`</kbd></td></tr></table>")+
    '<div class="ab"><button data-a="qo">Abrir arquivo</button><button data-a="of">Abrir pasta</button></div>';
  cw.appendChild(wl);

  function mkTab(path){
    var t={id:uid(),path:path,name:base(path),lang:langOf(base(path)),kind:"text",dirty:false,saved:"",mtime:"",eol:"lf",bom:false,unit:"  ",nl:0,conflict:false,removed:false,raf:0,fq:null};
    var el=t.el=document.createElement("div");el.className="id-eb"+(S.wrap?" id-wr":"");
    cw.appendChild(el);
    return t;
  }
  function buildEditor(t,text){
    var el=t.el;
    el.innerHTML='<div class="id-gt"><pre></pre></div><div class="id-ew"><div class="id-al"></div><pre class="id-fh"><code></code></pre><pre class="id-hl"><code></code></pre>'+
      '<textarea class="id-ta" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="'+(S.wrap?"soft":"off")+'"></textarea></div>';
    t.gt=el.querySelector(".id-gt");t.gp=t.gt.firstChild;t.al=el.querySelector(".id-al");t.fh=el.querySelector(".id-fh");t.fhc=t.fh.firstChild;
    t.hl=el.querySelector(".id-hl");t.code=t.hl.firstChild;t.ta=el.querySelector(".id-ta");
    t.ta.value=text;t.saved=text;t.unit=detectIndent(text,t.lang);
    var ta=t.ta;
    ta.addEventListener("input",function(){onInput(t)});
    ta.addEventListener("scroll",function(){sync(t)},{passive:true});
    ta.addEventListener("keydown",function(e){onKey(t,e)});
    ta.addEventListener("beforeinput",function(e){onBefore(t,e)});
    ["keyup","pointerup","focus","select"].forEach(function(n){ta.addEventListener(n,function(){curSoon(t)})});
    render(t);
  }
  function detectIndent(text,lang){
    var tabs=0,sp=0,mn=1e9,ws=[],L=text.slice(0,60000).split("\n");
    for(var i=0;i<L.length&&sp+tabs<400;i++){
      var m=/^( +|\t+)\S/.exec(L[i]);if(!m)continue;
      if(m[1].charAt(0)==="\t"){tabs++;continue}
      sp++;ws.push(m[1].length);if(m[1].length<mn)mn=m[1].length;
    }
    if(tabs>sp)return"\t";
    if(sp&&(mn===2||mn===3||mn===4||mn===8)&&ws.every(function(w){return w%mn===0}))return new Array(mn+1).join(" ");
    if(sp)return"  ";
    return lang==="go"?"\t":/^(py|c|cpp|java|kt|cs|swift|php|sh|docker|dart|rust)$/.test(lang)?"    ":"  ";
  }
  function render(t){
    if(t.kind!=="text")return;
    var v=t.ta.value;
    t.code.innerHTML=hl(v,t.lang)+"\n";
    var n=1,i=-1;while((i=v.indexOf("\n",i+1))>=0)n++;
    if(n!==t.nl){
      t.nl=n;
      var a=new Array(n);for(i=0;i<n;i++)a[i]=i+1;
      t.gp.textContent=a.join("\n");
      t.gt.style.width="calc("+Math.max(3,String(n).length)+"ch + 26px)";
    }
    if(t.fq)drawFind(t);
    fitSB(t);sync(t);
  }
  function fitSB(t){
    var sw=t.ta.offsetWidth-t.ta.clientWidth;
    t.hl.style.paddingRight=(14+sw)+"px";t.fh.style.paddingRight=(14+sw)+"px";
    var sh=t.ta.offsetHeight-t.ta.clientHeight;
    t.hl.style.paddingBottom=sh+"px";t.fh.style.paddingBottom=sh+"px";
  }
  function sync(t){
    var ta=t.ta;
    t.hl.scrollTop=ta.scrollTop;t.hl.scrollLeft=ta.scrollLeft;
    t.fh.scrollTop=ta.scrollTop;t.fh.scrollLeft=ta.scrollLeft;
    t.gt.scrollTop=ta.scrollTop;
    alPos(t);
  }
  function lcOf(t){
    var ta=t.ta,v=ta.value,s=ta.selectionStart,ln=1,i=v.indexOf("\n");
    while(i>=0&&i<s){ln++;i=v.indexOf("\n",i+1)}
    return{ln:ln,col:s-lineStart(v,s)+1,sel:ta.selectionEnd-s};
  }
  function alPos(t){
    if(S.wrap||t!==act){t.al.style.display="none";return}
    var p=lcOf(t);
    if(p.sel){t.al.style.display="none";return}
    t.al.style.display="block";t.al.style.top=(8+(p.ln-1)*LH()-t.ta.scrollTop)+"px";
  }
  var curR=0;
  function curSoon(t){
    if(curR)return;
    curR=requestAnimationFrame(function(){curR=0;if(t===act){stat();alPos(t)}});
  }
  document.addEventListener("selectionchange",onSel);
  function onSel(){if(act&&act.ta&&document.activeElement===act.ta)curSoon(act)}
  function stat(){
    var t=act,g=function(s){return $(s)};
    if(!t||t.kind!=="text"){g(".pos").textContent="";g("[data-a=ind]").textContent="";g("[data-a=eol]").textContent="";g("[data-a=lang]").textContent=t?"Arquivo":"";return}
    var p=lcOf(t);
    g(".pos").textContent="Ln "+p.ln+", Col "+p.col+(p.sel?" ("+p.sel+" sel.)":"");
    g("[data-a=ind]").textContent=t.unit==="\t"?"Tabulação":"Espaços: "+t.unit.length;
    g("[data-a=eol]").textContent=t.eol==="crlf"?"CRLF":"LF";
    g("[data-a=lang]").textContent=NAMES[t.lang]||"Texto simples";
  }
  function setDirty(t){
    var d=t.kind==="text"&&t.ta.value!==t.saved;
    if(d!==t.dirty){t.dirty=d;drawTabs()}
  }
  var asT=0;
  function onInput(t){
    if(!t.rq){t.rq=requestAnimationFrame(function(){t.rq=0;render(t)})}
    setDirty(t);curSoon(t);
    if(S.auto){clearTimeout(asT);asT=setTimeout(function(){if(t.dirty&&!t.conflict)save(t)},1000)}
  }
  async function open(path,o){
    o=o||{};
    var ex=T.filter(function(t){return t.path===path})[0];
    if(ex){activate(ex,!o.noFocus);if(o.line)goto(ex,o.line,o.col,o.len);return ex}
    var t=mkTab(path),e=ext(t.name);
    try{
      if(IMG.test(e)){
        t.kind="img";t.el.innerHTML='<div class="id-bn"><img src="/api/raw?p='+enc(path)+'" alt=""><span>'+esc(t.name)+"</span></div>";
      }else{
        var j=await api("/api/ide/read?p="+enc(path));
        if(j.bin){
          t.kind="bin";t.el.innerHTML='<div class="id-bn"><b>Arquivo binário</b><span>'+esc(t.name)+" — "+(j.size/1024).toFixed(1)+' KB</span><a href="/api/raw?p='+enc(path)+'&dl=1">Baixar</a></div>';
        }else{
          t.mtime=j.mtime;t.eol=j.eol;t.bom=j.bom;buildEditor(t,j.text);
        }
      }
    }catch(er){t.el.remove();toast(er.message);return null}
    T.push(t);
    activate(t,!o.noFocus&&!coarse);
    if(o.line)goto(t,o.line,o.col,o.len);
    sess();
    return t;
  }
  function activate(t,focus){
    act=t;
    T.forEach(function(x){x.el.classList.toggle("on",x===t)});
    wl.style.display=T.length?"none":"";
    drawTabs();crumb();
    if(t&&t.kind==="text"){fitSB(t);sync(t);if(t.fq||fb.classList.contains("on"))drawFind(t)}
    stat();updRun();
    if(t&&t.kind==="text"&&focus!==false&&!coarse)t.ta.focus({preventScroll:true});
    if(t){var n=findNode(t.path);if(n)selP=t.path;drawTree()}
    sess();
  }
  async function closeTab(t,force){
    if(t.dirty&&!force){
      var r=await dlg({title:"Salvar alterações?",msg:'"'+t.name+'" tem alterações não salvas.',buttons:[["Salvar","save","pri"],["Não salvar","no","dg"],["Cancelar","x"]]});
      if(r.v==="x")return false;
      if(r.v==="save"&&!(await save(t)))return false;
    }
    var i=T.indexOf(t);if(i<0)return true;
    T.splice(i,1);t.el.remove();
    if(act===t){act=null;var n=T[Math.min(i,T.length-1)];if(n)activate(n,true);else{wl.style.display="";drawTabs();crumb();stat();updRun();drawTree()}}
    else drawTabs();
    sess();return true;
  }
  function updRun(){$("[data-a=run]").style.display=act&&act.kind==="text"&&RUN[ext(act.name)]?"":"none"}

  /* ---------- salvar / recarregar ---------- */
  function save(t){
    t=t||act;
    if(!t||t.kind!=="text")return Promise.resolve(false);
    var txt=t.ta.value;
    return api("/api/ide/write?p="+enc(t.path)+"&m="+enc(t.mtime)+"&eol="+t.eol+"&bom="+(t.bom?1:0),{method:"PUT",body:txt}).then(function(j){
      t.mtime=j.mtime;t.saved=txt;t.conflict=false;t.removed=false;setDirty(t);drawTabs();msg("Salvo: "+t.name);return true;
    }).catch(function(e){
      if(e.status===409){
        return dlg({title:"O arquivo mudou no disco",msg:'"'+t.name+'" foi alterado por outro programa (ou pela IA) depois que você o abriu.',
          buttons:[["Sobrescrever","ow","dg"],["Recarregar do disco","rl"],["Cancelar","x"]]}).then(function(r){
          if(r.v==="ow"){
            return api("/api/ide/write?p="+enc(t.path)+"&force=1&eol="+t.eol+"&bom="+(t.bom?1:0),{method:"PUT",body:txt}).then(function(j){t.mtime=j.mtime;t.saved=txt;t.conflict=false;setDirty(t);drawTabs();msg("Salvo: "+t.name);return true});
          }
          if(r.v==="rl")return reload(t).then(function(){return false});
          return false;
        });
      }
      toast(e.message);return false;
    });
  }
  async function saveAll(){var n=0;for(var t of T){if(t.dirty&&await save(t))n++}if(n)msg(n+" arquivo(s) salvo(s)")}
  async function reload(t,silent){
    try{
      var j=await api("/api/ide/read?p="+enc(t.path));
      if(j.bin)return;
      var ta=t.ta,st=ta.scrollTop,sl=ta.scrollLeft,s=ta.selectionStart;
      ta.value=j.text;t.saved=j.text;t.mtime=j.mtime;t.eol=j.eol;t.bom=j.bom;t.conflict=false;t.removed=false;
      render(t);ta.scrollTop=st;ta.scrollLeft=sl;try{ta.setSelectionRange(Math.min(s,j.text.length),Math.min(s,j.text.length))}catch(_){}
      setDirty(t);drawTabs();sync(t);if(t===act)stat();
      if(!silent)msg("Recarregado do disco");
    }catch(e){toast(e.message)}
  }
  /* mudanças feitas fora do editor (ex.: pela IA) */
  var wt=setInterval(async function(){
    if(disposed||document.hidden||!ide.offsetParent)return;
    var ts=T.filter(function(t){return t.kind==="text"});
    if(!ts.length)return;
    try{
      var r=await post("/api/ide/stat",{paths:ts.map(function(t){return t.path})});
      for(var t of ts){
        var m=r[t.path];
        if(m===null){if(!t.removed){t.removed=true;drawTabs()}}
        else if(m!==t.mtime){
          if(t.dirty){if(!t.conflict){t.conflict=true;drawTabs();toast('"'+t.name+'" mudou no disco')}}
          else{await reload(t,true);toast('"'+t.name+'" atualizado do disco')}
        }else if(t.removed){t.removed=false;drawTabs()}
      }
    }catch(_){}
  },3000);

  /* ---------- edição ---------- */
  function ins(t,a,b,txt,s2,e2){
    var ta=t.ta;guard=true;
    try{
      if(document.activeElement!==ta)ta.focus({preventScroll:true});
      ta.setSelectionRange(a,b);
      var ok=txt===""?(a===b?true:document.execCommand("delete")):document.execCommand("insertText",false,txt);
      if(!ok){ta.setRangeText(txt,a,b,"end");ta.dispatchEvent(new Event("input",{bubbles:true}))}
    }catch(_){ta.setRangeText(txt,a,b,"end");ta.dispatchEvent(new Event("input",{bubbles:true}))}
    guard=false;
    if(s2!=null)ta.setSelectionRange(s2,e2==null?s2:e2);
  }
  function smartType(t,ch){
    var ta=t.ta,v=ta.value,s=ta.selectionStart,e=ta.selectionEnd,nx=v.charAt(e),pv=v.charAt(s-1);
    if(s===e&&CLOSE.indexOf(ch)>=0&&nx===ch){ta.setSelectionRange(s+1,s+1);return true}
    if(PAIRS[ch]){
      if(s!==e){ins(t,s,e,ch+v.slice(s,e)+PAIRS[ch],s+1,e+1);return true}
      var q=PAIRS[ch]===ch;
      if(q&&(/\w/.test(pv)||/\w/.test(nx)||t.lang==="md"||t.lang==="txt"))return false;
      if(!q&&/\w/.test(nx))return false;
      ins(t,s,e,ch+PAIRS[ch],s+1,s+1);return true;
    }
    return false;
  }
  function newline(t){
    var ta=t.ta,v=ta.value,s=ta.selectionStart,e=ta.selectionEnd,ls0=lineStart(v,s),line=v.slice(ls0,s),ind=/^[ \t]*/.exec(line)[0],pv=v.charAt(s-1),nx=v.charAt(e),u=t.unit;
    if(t.lang==="md"){
      var mm=/^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(line);
      if(mm&&s===e){
        if(!mm[3].trim()){ins(t,ls0,s,"",ls0);return}
        var mk=/\d/.test(mm[2])?(parseInt(mm[2],10)+1)+mm[2].slice(-1):mm[2];
        ins(t,s,e,"\n"+mm[1]+mk+" ");return;
      }
    }
    if(pv&&"{[(".indexOf(pv)>=0&&PAIRS[pv]===nx){var mid=ind+u;ins(t,s,e,"\n"+mid+"\n"+ind,s+1+mid.length);return}
    var extra=(pv&&"{[(".indexOf(pv)>=0)||(t.lang==="py"&&pv===":")?u:"";
    ins(t,s,e,"\n"+ind+extra);
  }
  function onBefore(t,e){
    if(guard)return;
    var it=e.inputType;
    if(it==="insertLineBreak"||it==="insertParagraph"){e.preventDefault();newline(t);return}
    if(it==="insertText"&&e.data&&e.data.length===1&&!e.isComposing){if(smartType(t,e.data))e.preventDefault();return}
    if(it==="deleteContentBackward"){
      var ta=t.ta,v=ta.value,s=ta.selectionStart;
      if(s===ta.selectionEnd&&s>0&&PAIRS[v.charAt(s-1)]&&PAIRS[v.charAt(s-1)]===v.charAt(s)){e.preventDefault();ins(t,s-1,s+1,"",s-1)}
    }
  }
  function indentLines(t,d){
    var ta=t.ta,v=ta.value,s=ta.selectionStart,e=ta.selectionEnd,r=lineRange(v,s,e),u=t.unit,d0=0,dt=0;
    var out=v.slice(r[0],r[1]).split("\n").map(function(l,i){
      var n=l;
      if(d>0){if(l.length)n=u+l}
      else{var m=(u==="\t"?/^(\t| {1,4})/:new RegExp("^(\\t| {1,"+u.length+"})")).exec(l);if(m)n=l.slice(m[0].length)}
      if(i===0)d0=n.length-l.length;
      dt+=n.length-l.length;return n;
    });
    ins(t,r[0],r[1],out.join("\n"),Math.max(r[0],s+d0),e+dt);
  }
  function toggleComment(t){
    var ta=t.ta,v=ta.value,s=ta.selectionStart,e=ta.selectionEnd,r=lineRange(v,s,e),tok=CMT[t.lang],pre,post;
    if(tok){pre=tok+" ";post=""}
    else if(t.lang==="html"||t.lang==="md"){pre="<!-- ";post=" -->"}
    else if(t.lang==="css"){pre="/* ";post=" */"}
    else return;
    var L=v.slice(r[0],r[1]).split("\n"),ne=L.filter(function(l){return l.trim()}),
        all=ne.length&&ne.every(function(l){var x=l.trim();return x.indexOf(pre.trim())===0&&(!post||x.slice(-post.trim().length)===post.trim())}),
        mi=Math.min.apply(null,ne.map(function(l){return/^[ \t]*/.exec(l)[0].length}).concat([1e9])),d0=0,dt=0;
    var out=L.map(function(l,i){
      var n=l;
      if(!l.trim()){n=l}
      else if(all){
        var ind=/^[ \t]*/.exec(l)[0],rest=l.slice(ind.length);
        rest=rest.slice(pre.trim().length);if(rest.charAt(0)===" ")rest=rest.slice(1);
        if(post){rest=rest.replace(new RegExp("\\s?"+post.trim().replace(/[*\/]/g,"\\$&")+"\\s*$"),"")}
        n=ind+rest;
      }else n=l.slice(0,mi)+pre+l.slice(mi)+post;
      if(i===0)d0=n.length-l.length;
      dt+=n.length-l.length;return n;
    });
    ins(t,r[0],r[1],out.join("\n"),Math.max(r[0],s+d0),e+dt);
  }
  function moveLines(t,d){
    var ta=t.ta,v=ta.value,s=ta.selectionStart,e=ta.selectionEnd,r=lineRange(v,s,e),blk=v.slice(r[0],r[1]);
    if(d<0){
      if(r[0]===0)return;
      var ps=lineStart(v,r[0]-1),pl=v.slice(ps,r[0]-1);
      ins(t,ps,r[1],blk+"\n"+pl,s-(pl.length+1),e-(pl.length+1));
    }else{
      if(r[1]>=v.length)return;
      var ne=v.indexOf("\n",r[1]+1);if(ne<0)ne=v.length;
      var nl=v.slice(r[1]+1,ne);
      ins(t,r[0],ne,nl+"\n"+blk,s+nl.length+1,e+nl.length+1);
    }
  }
  function dupLines(t,d){
    var ta=t.ta,v=ta.value,s=ta.selectionStart,e=ta.selectionEnd,r=lineRange(v,s,e),blk=v.slice(r[0],r[1]);
    if(d>0)ins(t,r[1],r[1],"\n"+blk,s+blk.length+1,e+blk.length+1);
    else ins(t,r[0],r[0],blk+"\n",s,e);
  }
  function delLine(t){
    var ta=t.ta,v=ta.value,r=lineRange(v,ta.selectionStart,ta.selectionEnd);
    if(r[1]<v.length)ins(t,r[0],r[1]+1,"",r[0]);
    else{var a=Math.max(0,r[0]-1);ins(t,a,r[1],"",a)}
  }
  function fmtJson(t){
    try{
      var o=JSON.parse(t.ta.value),u=t.unit==="\t"?"\t":t.unit;
      ins(t,0,t.ta.value.length,JSON.stringify(o,null,u)+"\n",0);
    }catch(e){toast("JSON inválido: "+e.message)}
  }
  function onKey(t,e){
    var c=e.ctrlKey||e.metaKey,k=e.key;
    if(k==="Tab"&&!c&&!e.altKey){
      e.preventDefault();
      var ta=t.ta,s=ta.selectionStart,en=ta.selectionEnd;
      if(s===en&&!e.shiftKey)ins(t,s,en,t.unit);else indentLines(t,e.shiftKey?-1:1);
      return;
    }
    if(c&&k==="/"){e.preventDefault();toggleComment(t);return}
    if(c&&e.shiftKey&&(k==="K"||k==="k")){e.preventDefault();delLine(t);return}
    if(e.altKey&&!c&&(k==="ArrowUp"||k==="ArrowDown")){
      e.preventDefault();
      if(e.shiftKey)dupLines(t,k==="ArrowUp"?-1:1);else moveLines(t,k==="ArrowUp"?-1:1);
    }
  }
  /* medir posição de um índice (funciona com quebra de linha) */
  function xy(t,idx){
    var ta=t.ta,m=mirror||(mirror=document.createElement("div"));
    m.className="id-mi";
    m.style.cssText="position:absolute;visibility:hidden;left:-99999px;top:0;box-sizing:border-box;padding:8px 14px 0 12px;width:"+ta.clientWidth+"px;white-space:"+(S.wrap?"pre-wrap":"pre")+";overflow-wrap:"+(S.wrap?"break-word":"normal");
    m.textContent=ta.value.slice(0,idx);
    var sp=document.createElement("span");sp.textContent="\u200b";m.appendChild(sp);
    ide.appendChild(m);
    var r={top:sp.offsetTop,left:sp.offsetLeft};
    m.remove();return r;
  }
  function revealIdx(t,idx,center){
    var ta=t.ta,p=xy(t,idx),lh=LH(),vis=ta.clientHeight;
    if(center||p.top<ta.scrollTop+lh||p.top>ta.scrollTop+vis-lh*3)ta.scrollTop=Math.max(0,p.top-(center?vis/2:vis/3));
    if(!S.wrap&&(p.left<ta.scrollLeft+40||p.left>ta.scrollLeft+ta.clientWidth-80))ta.scrollLeft=Math.max(0,p.left-ta.clientWidth/2);
    sync(t);
  }
  function goto(t,line,col,len){
    if(!t||t.kind!=="text")return;
    var v=t.ta.value,i=0,n=1;
    while(n<line){var x=v.indexOf("\n",i);if(x<0)break;i=x+1;n++}
    var a=Math.min(v.length,i+Math.max(0,(col||1)-1)),b=len?Math.min(v.length,a+len):a;
    if(!len){var x2=v.indexOf("\n",i);b=a}
    t.ta.setSelectionRange(a,b);
    revealIdx(t,a,true);
    if(!coarse||len)t.ta.focus({preventScroll:true});
    stat();alPos(t);
  }

  /* ---------- localizar / substituir ---------- */
  function fregex(){
    var q=ff.value;if(!q)return null;
    var src=FO.fre?q:q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    if(FO.fw)src="\\b(?:"+src+")\\b";
    try{return new RegExp(src,"gm"+(FO.fcs?"":"i"))}catch(_){return false}
  }
  function fmatches(t){
    var re=fregex();if(!re)return re===false?false:[];
    var v=t.ta.value,out=[],m;
    while((m=re.exec(v))&&out.length<20000){
      if(m[0]==="")re.lastIndex++;else out.push([m.index,m[0].length]);
    }
    return out;
  }
  function drawFind(t){
    if(!t||t.kind!=="text")return;
    if(!fb.classList.contains("on")){t.fq=null;t.fhc.innerHTML="";return}
    t.fq=1;
    var ms=fmatches(t),v=t.ta.value;
    if(ms===false){fcn.textContent="inválido";t.fhc.innerHTML="";return}
    var cur=-1,s=t.ta.selectionStart,e=t.ta.selectionEnd;
    ms.forEach(function(m,i){if(m[0]===s&&m[0]+m[1]===e)cur=i});
    fcn.textContent=ms.length?(cur>=0?(cur+1)+" de ":"")+ms.length:"Sem resultados";
    if(!ms.length){t.fhc.innerHTML="";return}
    var o=[],last=0;
    ms.slice(0,3000).forEach(function(m,i){
      o.push(escT(v.slice(last,m[0])),'<mark'+(i===cur?' class="cur"':"")+">"+escT(v.substr(m[0],m[1]))+"</mark>");last=m[0]+m[1];
    });
    o.push(escT(v.slice(last)));
    t.fhc.innerHTML=o.join("")+"\n";
  }
  function openFind(rep){
    if(!act||act.kind!=="text")return;
    fb.classList.add("on");fb.classList.toggle("rep",!!rep);
    var t=act,sel=t.ta.value.slice(t.ta.selectionStart,t.ta.selectionEnd);
    if(sel&&sel.indexOf("\n")<0)ff.value=sel;
    drawFind(t);fitAll();
    ff.focus();ff.select();
  }
  function closeFind(){
    fb.classList.remove("on");
    T.forEach(function(t){if(t.kind==="text"){t.fq=null;t.fhc.innerHTML=""}});
    if(act&&act.kind==="text"&&!coarse)act.ta.focus();
    fitAll();
  }
  function fitAll(){setTimeout(function(){if(act&&act.kind==="text")fitSB(act)},0)}
  function fstep(d){
    var t=act;if(!t||t.kind!=="text")return;
    var ms=fmatches(t);
    if(!ms||!ms.length){drawFind(t);return}
    var s=t.ta.selectionStart,e=t.ta.selectionEnd,pick=null,i;
    if(d>0){for(i=0;i<ms.length;i++)if(ms[i][0]>=e){pick=ms[i];break}if(!pick)pick=ms[0]}
    else{for(i=ms.length-1;i>=0;i--)if(ms[i][0]<s){pick=ms[i];break}if(!pick)pick=ms[ms.length-1]}
    t.ta.setSelectionRange(pick[0],pick[0]+pick[1]);
    revealIdx(t,pick[0]);drawFind(t);stat();
  }
  function frepl(all){
    var t=act;if(!t||t.kind!=="text")return;
    var re=fregex();if(!re)return;
    var v=t.ta.value,rp=fr2.value;
    if(all){
      var n=0,nv=v.replace(re,function(){n++;return FO.fre?arguments[0].replace(new RegExp(re.source,re.flags.replace("g","")),rp):rp});
      if(!n){toast("Nada para substituir");return}
      ins(t,0,v.length,nv,0);toast(n+" substituição(ões)");drawFind(t);return;
    }
    var s=t.ta.selectionStart,e=t.ta.selectionEnd,cur=v.slice(s,e),r1=new RegExp(re.source,re.flags.replace("g",""));
    var mm=r1.exec(cur);
    if(mm&&mm[0]===cur&&cur!==""){ins(t,s,e,FO.fre?cur.replace(r1,rp):rp,s+(FO.fre?cur.replace(r1,rp):rp).length)}
    fstep(1);
  }
  ff.addEventListener("input",function(){if(act)drawFind(act)});
  ff.addEventListener("keydown",function(e){
    if(e.key==="Enter"){e.preventDefault();fstep(e.shiftKey?-1:1)}
    else if(e.key==="Escape"){e.preventDefault();closeFind()}
  });
  fr2.addEventListener("keydown",function(e){
    if(e.key==="Enter"){e.preventDefault();frepl(false)}
    else if(e.key==="Escape"){e.preventDefault();closeFind()}
  });
  fb.addEventListener("click",function(e){
    var o=e.target.closest("[data-o]");
    if(o){var k=o.dataset.o;FO[k]=FO[k]?0:1;o.classList.toggle("on",!!FO[k]);if(act)drawFind(act);return}
    var b=e.target.closest("[data-a]");if(!b)return;
    var a=b.dataset.a;
    if(a==="fn")fstep(1);else if(a==="fp")fstep(-1);else if(a==="fx")closeFind();
    else if(a==="f1")frepl(false);else if(a==="fa")frepl(true);
    else if(a==="frt"){fb.classList.toggle("rep");fitAll()}
  });

  /* ---------- busca nos arquivos ---------- */
  var stT=0;
  function runSearch(){
    var q=sq.value;
    if(!q){rs.innerHTML="";shp.textContent="";return}
    shp.textContent="Buscando…";
    var u="/api/ide/search?p="+enc(S.ws)+"&q="+enc(q)+"&cs="+SO.cs+"&w="+SO.w+"&re="+SO.re+"&inc="+enc(si.value)+"&exc="+enc(sx.value),my=++stT;
    api(u).then(function(j){
      if(my!==stT)return;
      var g={},ord=[];
      j.r.forEach(function(r){if(!g[r[0]]){g[r[0]]=[];ord.push(r[0])}g[r[0]].push(r)});
      shp.textContent=j.r.length?j.r.length+" resultado(s) em "+ord.length+" arquivo(s)"+(j.cut?" (parcial)":""):"Nenhum resultado";
      rs.innerHTML=ord.map(function(p){
        return'<div class="id-rf" data-p="'+esc(p)+'">'+icon({name:base(p)})+"<span>"+esc(base(p))+"</span><small>"+esc(dir(p))+'</small><span class="c">'+g[p].length+"</span></div>"+
          g[p].map(function(r){
            var tx=r[4],a=r[2],b=r[3];
            return'<div class="id-rm" data-p="'+esc(p)+'" data-l="'+r[1]+'" data-c="'+(r[5]+a+1)+'" data-n="'+(b-a)+'">'+escT(tx.slice(0,a).replace(/^\s+/,""))+"<mark>"+escT(tx.slice(a,b))+"</mark>"+escT(tx.slice(b))+"</div>";
          }).join("");
      }).join("");
    }).catch(function(e){if(my===stT){shp.textContent=e.message;rs.innerHTML=""}});
  }
  var srT=0;
  [sq,si,sx].forEach(function(i){
    i.addEventListener("input",function(){clearTimeout(srT);srT=setTimeout(runSearch,350)});
    i.addEventListener("keydown",function(e){if(e.key==="Enter"){clearTimeout(srT);runSearch()}});
  });
  rs.addEventListener("click",function(e){
    var m=e.target.closest(".id-rm,.id-rf");if(!m)return;
    open(m.dataset.p,m.dataset.l?{line:+m.dataset.l,col:+m.dataset.c,len:+m.dataset.n}:{}).then(function(){if(narrow)setSb(false)});
  });
  $(".id-sf").addEventListener("click",function(e){
    var o=e.target.closest("[data-o]");if(!o)return;
    var k=o.dataset.o;SO[k]=SO[k]?0:1;o.classList.toggle("on",!!SO[k]);runSearch();
  });

  /* ---------- paleta de comandos / abrir arquivo ---------- */
  var qs={items:[],sel:0,mode:"files"};
  function RUNC(){return RUN[ext(act.name)]}
  var CMDS=[
   {l:"Salvar",k:"Ctrl+S",f:function(){save()}},
   {l:"Salvar todos",f:saveAll},
   {l:"Fechar aba",f:function(){if(act)closeTab(act)}},
   {l:"Ir para linha…",k:"Ctrl+G",f:function(){openQ(":")}},
   {l:"Localizar",k:"Ctrl+F",f:function(){openFind(false)}},
   {l:"Substituir",k:"Ctrl+H",f:function(){openFind(true)}},
   {l:"Buscar nos arquivos",k:"Ctrl+Shift+F",f:function(){setSb(true);setView("se");sq.focus();sq.select()}},
   {l:"Abrir arquivo…",k:"Ctrl+P",f:function(){openQ("")}},
   {l:"Abrir pasta…",f:function(){pickFolder()}},
   {l:"Novo arquivo",f:function(){newItem("touch",selDir())}},
   {l:"Nova pasta",f:function(){newItem("mkdir",selDir())}},
   {l:"Alternar barra lateral",k:"Ctrl+B",f:function(){setSb()}},
   {l:"Alternar terminal",k:"Ctrl+`",f:function(){togTerm()}},
   {l:"Novo terminal",f:function(){termOpen(true)}},
   {l:"Executar arquivo",f:function(){runFile()}},
   {l:"Alternar quebra de linha",k:"Alt+Z",f:function(){setWrap(!S.wrap)}},
   {l:"Alternar salvamento automático",f:function(){S.auto=!S.auto;ls("ide.auto",S.auto?"1":"0");toast("Salvamento automático "+(S.auto?"ligado":"desligado"))}},
   {l:"Alternar teclas extras",f:function(){S.keys=!S.keys;ls("ide.keys",S.keys?"1":"0");ky.classList.toggle("on",S.keys)}},
   {l:"Aumentar fonte",k:"Ctrl+=",f:function(){setFont(1)}},
   {l:"Diminuir fonte",k:"Ctrl+-",f:function(){setFont(-1)}},
   {l:"Formatar JSON",f:function(){if(act&&act.kind==="text")fmtJson(act)}},
   {l:"Recarregar do disco",f:function(){if(act&&act.kind==="text")reload(act)}},
   {l:"Copiar caminho do arquivo",f:function(){if(act)copyPath(act.path)}},
   {l:"Atualizar explorador",f:function(){refreshTree()}}
  ];
  function selDir(){var n=selP&&findNode(selP);return n?(n.dir?n.path:dir(n.path)):S.ws}
  function loadFiles(){
    if(fl&&flP===S.ws)return Promise.resolve(fl);
    flP=S.ws;
    return api("/api/ide/files?p="+enc(S.ws)).then(function(j){fl=j.f;return fl}).catch(function(e){fl=null;toast(e.message);return[]});
  }
  function openQ(pref){
    qp.classList.add("on");qi.value=pref;qi.focus();qs.sel=0;drawQ();
    if(pref!==">"&&pref!==":")loadFiles().then(drawQ);
  }
  function closeQ(){qp.classList.remove("on");if(act&&act.kind==="text"&&!coarse)act.ta.focus()}
  function mark(s,idx){
    if(!idx||!idx.length)return esc(s);
    var o="",set={};idx.forEach(function(i){set[i]=1});
    for(var i=0;i<s.length;i++)o+=set[i]?"<mark>"+esc(s.charAt(i))+"</mark>":esc(s.charAt(i));
    return o;
  }
  function drawQ(){
    var v=qi.value,items=[];
    if(v.charAt(0)===">"){
      qs.mode="cmd";var q=v.slice(1).trim().toLowerCase();
      CMDS.forEach(function(c){var f=q?fuzzy(q,c.l):{s:0,i:[]};if(f)items.push({l:c.l,k:c.k,s:f.s,i:f.i,f:c.f})});
      items.sort(function(a,b){return b.s-a.s});
    }else if(v.charAt(0)===":"){
      qs.mode="line";var n=parseInt(v.slice(1),10);
      items.push({l:isNaN(n)?"Digite o número da linha":"Ir para a linha "+n,f:function(){if(!isNaN(n))goto(act,n,1)}});
    }else{
      qs.mode="files";
      var q2=v.trim().toLowerCase();
      if(!fl&&q2){ql.innerHTML='<div class="id-q0">Carregando arquivos…</div>';return}
      var all=fl||[],open0=T.map(function(t){return t.path});
      if(!q2){
        open0.concat(all.filter(function(p){return open0.indexOf(p)<0}).slice(0,60)).forEach(function(p){items.push({l:base(p),d:dir(p),s:0,i:[],p:p})});
      }else{
        for(var i=0;i<all.length;i++){
          var f=fuzzy(q2,all[i]);
          if(f)items.push({l:base(all[i]),d:dir(all[i]),p:all[i],s:f.s+(open0.indexOf(all[i])>=0?3:0),i:f.i});
        }
        items.sort(function(a,b){return b.s-a.s});
      }
    }
    items=items.slice(0,60);
    qs.items=items;if(qs.sel>=items.length)qs.sel=0;
    ql.innerHTML=items.length?items.map(function(it,i){
      var full=it.p?it.p:it.l,off=it.p?full.length-it.l.length:0,nm=[],dr=[];
      if(it.p){(it.i||[]).forEach(function(x){if(x>=off)nm.push(x-off);else dr.push(x)})}
      return'<div class="id-qi'+(i===qs.sel?" on":"")+'" data-i="'+i+'">'+(it.p?icon({name:it.l}):"")+"<b>"+(it.p?mark(it.l,nm):mark(it.l,it.i))+"</b>"+(it.d?"<small>"+mark(it.d,dr)+"</small>":"")+(it.k?"<kbd>"+esc(it.k)+"</kbd>":"")+"</div>";
    }).join(""):'<div class="id-q0">'+(qs.mode==="files"?"Nenhum arquivo encontrado":"Nenhum comando")+"</div>";
    var on=ql.querySelector(".on");if(on)on.scrollIntoView({block:"nearest"});
  }
  function pickQ(i){
    var it=qs.items[i];if(!it)return;
    closeQ();
    if(it.p)open(it.p);else if(it.f)it.f();
  }
  qi.addEventListener("input",function(){qs.sel=0;drawQ()});
  qi.addEventListener("keydown",function(e){
    if(e.key==="ArrowDown"){e.preventDefault();qs.sel=Math.min(qs.items.length-1,qs.sel+1);drawQ()}
    else if(e.key==="ArrowUp"){e.preventDefault();qs.sel=Math.max(0,qs.sel-1);drawQ()}
    else if(e.key==="Enter"){e.preventDefault();pickQ(qs.sel)}
    else if(e.key==="Escape"){e.preventDefault();closeQ()}
  });
  ql.addEventListener("click",function(e){var i=e.target.closest(".id-qi");if(i)pickQ(+i.dataset.i)});
  qp.addEventListener("mousedown",function(e){if(e.target===qp)closeQ()});
  qp.addEventListener("touchstart",function(e){if(e.target===qp)closeQ()},{passive:true});

  /* ---------- terminal integrado ---------- */
  var RUN={py:"python3",js:"node",mjs:"node",sh:"bash",rb:"ruby",php:"php",lua:"lua",go:"go run"};
  function termSend(s,d){if(s.ws&&s.ws.readyState===1)s.ws.send(d)}
  function termFit(s){
    if(!s||!s.term||s.el.offsetWidth<20)return;
    try{s.fit.fit()}catch(_){}
    if(s.ws&&s.ws.readyState===1)s.ws.send(enc8.encode(JSON.stringify({r:[s.term.cols,s.term.rows]})));
  }
  function drawTS(){
    tbs.innerHTML=TS.map(function(s,i){return'<button data-s="'+s.n+'" class="'+(s===tact?"on":"")+'"><span>bash '+s.n+'</span><i data-x="'+s.n+'" title="Encerrar">×</i></button>'}).join("");
  }
  var tn=0;
  function termSel(s){
    tact=s;TS.forEach(function(x){x.el.classList.toggle("on",x===s)});drawTS();
    setTimeout(function(){termFit(s);if(!coarse&&s)s.term.focus()},0);
  }
  async function termOpen(newOne,cmd){
    tm.classList.add("on");tm.style.height=S.th+"px";
    if(!newOne&&TS.length){termSel(tact||TS[0]);if(cmd)termSend(tact,cmd+"\r");return}
    try{await loadX()}catch(e){tv.innerHTML="<p>"+esc(e.message)+"</p>";return}
    if(!TS.length)tv.innerHTML="";
    var s={n:++tn,el:document.createElement("div"),ws:null,dead:false,init:cmd||"",first:true};
    s.el.className="xs";tv.appendChild(s.el);
    s.term=new Terminal({fontSize:coarse?13:13,fontFamily:'ui-monospace,Menlo,"Cascadia Mono",Consolas,monospace',cursorBlink:true,scrollback:5000,theme:THEME});
    s.fit=new FitAddon.FitAddon();s.term.loadAddon(s.fit);s.term.open(s.el);
    s.term.onData(function(d){termSend(s,d)});
    TS.push(s);termSel(s);
    try{
      var j=await api("/api/term/new?cols="+s.term.cols+"&rows="+s.term.rows,{method:"POST"});
      if(!j.id)throw new Error(j.e||"Erro ao criar sessão");
      s.id=j.id;termConnect(s);
    }catch(e){s.term.write("\r\n\x1b[31m"+e.message+"\x1b[0m")}
  }
  function termConnect(s){
    var ws=s.ws=new WebSocket((location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws?id="+s.id);
    ws.binaryType="arraybuffer";
    ws.onopen=function(){
      termFit(s);
      if(s.first){
        s.first=false;
        var d=absOf(S.ws);
        ws.send("cd "+q1(d)+" && clear\r");
        if(s.init)ws.send(s.init+"\r");
      }
    };
    ws.onmessage=function(e){
      if(typeof e.data==="string"){try{if(JSON.parse(e.data).exit)termClose(s,true)}catch(_){}return}
      s.term.write(new Uint8Array(e.data));
    };
    ws.onclose=function(){if(!s.dead&&!disposed&&s.ws===ws)setTimeout(function(){if(!s.dead&&!disposed&&(!s.ws||s.ws.readyState>1))termConnect(s)},1500)};
    clearInterval(s.pg);
    s.pg=setInterval(function(){if(ws.readyState===1)ws.send(enc8.encode('{"p":1}'))},25000);
  }
  function termClose(s,gone){
    if(s.dead)return;
    s.dead=true;clearInterval(s.pg);try{s.ws&&s.ws.close()}catch(_){}
    if(!gone&&s.id)fetch("/api/term/kill?id="+s.id,{method:"POST"}).catch(function(){});
    try{s.term.dispose()}catch(_){}
    s.el.remove();
    var i=TS.indexOf(s);if(i>=0)TS.splice(i,1);
    if(!TS.length){tact=null;tm.classList.remove("on");fitAll()}
    else if(tact===s)termSel(TS[Math.max(0,i-1)]);
    else drawTS();
  }
  function togTerm(){
    if(tm.classList.contains("on")){tm.classList.remove("on");fitAll();if(act&&act.kind==="text"&&!coarse)act.ta.focus()}
    else termOpen(false);
  }
  tm.addEventListener("click",function(e){
    var x=e.target.closest("[data-x]");
    if(x){var s=TS.filter(function(q){return q.n==+x.dataset.x})[0];if(s)termClose(s);return}
    var b=e.target.closest("[data-s]");
    if(b){var s2=TS.filter(function(q){return q.n==+b.dataset.s})[0];if(s2)termSel(s2);return}
    var a=e.target.closest("[data-a]");
    if(a){if(a.dataset.a==="tadd")termOpen(true);else if(a.dataset.a==="tx")togTerm()}
  });
  new ResizeObserver(function(){clearTimeout(tv._r);tv._r=setTimeout(function(){termFit(tact)},60)}).observe(tv);
  (function(){
    var h=$(".id-th"),sy=0,sh=0,drag=false;
    h.addEventListener("pointerdown",function(e){drag=true;sy=e.clientY;sh=tm.offsetHeight;h.setPointerCapture(e.pointerId);e.preventDefault()});
    h.addEventListener("pointermove",function(e){
      if(!drag)return;
      var max=ide.clientHeight-150;
      S.th=Math.max(80,Math.min(max,sh+(sy-e.clientY)));tm.style.height=S.th+"px";
    });
    h.addEventListener("pointerup",function(){if(drag){drag=false;ls("ide.th",S.th);fitAll()}});
  })();
  async function runFile(){
    var t=act;if(!t||t.kind!=="text"){toast("Abra um arquivo para executar");return}
    var r=RUN[ext(t.name)];if(!r){toast("Sem executor para ."+ext(t.name));return}
    if(t.dirty&&!(await save(t)))return;
    var d=dir(t.path),cmd="cd "+q1(absOf(d))+" && "+r+" "+q1(t.name);
    await termOpen(false,cmd);
  }

  /* ---------- barra lateral / visual ---------- */
  function setSb(on){
    S.sb=on===undefined?sb.classList.contains("off"):on;
    sb.classList.toggle("off",!S.sb);
    if(!narrow)ls("ide.sb",S.sb?"1":"0");
    fitAll();
  }
  function setView(v){
    root.querySelectorAll(".id-st button").forEach(function(b){b.classList.toggle("on",b.dataset.v===v)});
    root.querySelectorAll(".id-sp").forEach(function(p){p.classList.toggle("on",p.dataset.p===v)});
  }
  function setWrap(w){
    S.wrap=w;ls("ide.wrap",w?"1":"0");
    T.forEach(function(t){
      t.el.classList.toggle("id-wr",w);
      if(t.kind==="text"){t.ta.wrap=w?"soft":"off";render(t)}
    });
    if(act)stat();
  }
  function setFont(d){
    S.fs=Math.max(9,Math.min(32,S.fs+d));ls("ide.fs",S.fs);setCss();
    T.forEach(function(t){if(t.kind==="text")render(t)});
    if(act&&act.kind==="text")alPos(act);
  }
  root.querySelectorAll(".id-st button").forEach(function(b){b.addEventListener("click",function(){setView(b.dataset.v);if(b.dataset.v==="se"){sq.focus()}})});

  /* ---------- teclas extras (celular) ---------- */
  var KEYS=[["⇥","tab"],["↶","undo"],["↷","redo"],["←","l"],["→","r"],["↑","u"],["↓","d"],["{","{"],["}","}"],["(","("],[")",")"],["[","["],["]","]"],["<","<"],[">",">"],[";",";"],[":",":"],
    ['"','"'],["'","'"],["`","`"],["=","="],["/","/"],["\\","\\"],["|","|"],["&","&"],["!","!"],["_","_"],["-","-"],["+","+"],["*","*"],["#","#"],["$","$"],["%","%"],["~","~"],["?","?"],[",",","],[".","."]];
  ky.innerHTML=KEYS.map(function(k,i){return'<button data-k="'+i+'">'+esc(k[0])+"</button>"}).join("");
  ky.addEventListener("mousedown",function(e){e.preventDefault()});
  ky.addEventListener("click",function(e){
    var b=e.target.closest("[data-k]"),t=act;if(!b||!t||t.kind!=="text")return;
    var k=KEYS[+b.dataset.k][1],ta=t.ta,v=ta.value,s=ta.selectionStart,en=ta.selectionEnd;
    t.ta.focus({preventScroll:true});
    if(k==="tab"){if(s===en)ins(t,s,en,t.unit);else indentLines(t,1)}
    else if(k==="undo")document.execCommand("undo");
    else if(k==="redo")document.execCommand("redo");
    else if(k==="l"){ta.setSelectionRange(Math.max(0,s-1),Math.max(0,s-1))}
    else if(k==="r"){ta.setSelectionRange(Math.min(v.length,en+1),Math.min(v.length,en+1))}
    else if(k==="u"||k==="d"){
      var ls0=lineStart(v,s),col=s-ls0,np;
      if(k==="u"){if(ls0===0)np=0;else{var ps=lineStart(v,ls0-1);np=ps+Math.min(col,ls0-1-ps)}}
      else{var ne=v.indexOf("\n",s);if(ne<0)np=v.length;else{var ne2=v.indexOf("\n",ne+1);if(ne2<0)ne2=v.length;np=ne+1+Math.min(col,ne2-ne-1)}}
      ta.setSelectionRange(np,np);
    }
    else if(!smartType(t,k))ins(t,s,en,k);
    curSoon(t);
  });
  ky.classList.toggle("on",S.keys);

  /* ---------- eventos gerais ---------- */
  ide.addEventListener("contextmenu",function(e){e.stopPropagation()});
  document.addEventListener("pointerdown",function(e){if(cm&&!cm.contains(e.target))closeMenu()},true);
  ide.addEventListener("click",function(e){
    var b=e.target.closest("[data-a]");if(!b||b.closest(".id-tm,.id-fb"))return;
    switch(b.dataset.a){
      case"sb":setSb();break;
      case"nf":newItem("touch",selDir());break;
      case"nd":newItem("mkdir",selDir());break;
      case"rf":refreshTree();break;
      case"of":pickFolder();break;
      case"qo":openQ("");break;
      case"run":runFile();break;
      case"pal":openQ(">");break;
      case"tm":togTerm();break;
      case"gl":if(act&&act.kind==="text")openQ(":");break;
      case"ind":if(act&&act.kind==="text"){var r=b.getBoundingClientRect();menuAt(r.left,r.top-150,[2,4,8].map(function(n){return{l:"Espaços: "+n,f:function(){act.unit=new Array(n+1).join(" ");stat()}}}).concat([{l:"Tabulação",f:function(){act.unit="\t";stat()}}]))}break;
      case"eol":if(act&&act.kind==="text"){act.eol=act.eol==="crlf"?"lf":"crlf";act.dirty=true;drawTabs();stat();msg("Fim de linha: "+act.eol.toUpperCase()+" (salve para aplicar)")}break;
      case"lang":if(act&&act.kind==="text"){var r2=b.getBoundingClientRect(),ks=Object.keys(NAMES).filter(function(k){return k!=="cs"});menuAt(r2.left-120,Math.max(10,r2.top-300),ks.map(function(k){return{l:NAMES[k],f:function(){act.lang=k;render(act);stat()}}}))}break;
    }
  });
  document.addEventListener("keydown",onGlobalKey,true);
  function onGlobalKey(e){
    if(disposed||!ide.offsetParent)return;
    var inside=ide.contains(document.activeElement)||ide.contains(e.target);
    if(!inside)return;
    var c=e.ctrlKey||e.metaKey,k=e.key,kl=k.length===1?k.toLowerCase():k;
    if(e.target.closest&&e.target.closest(".id-tm")){
      if(c&&k==="`"){e.preventDefault();togTerm()}
      return;
    }
    if(k==="Escape"){
      if(dl.classList.contains("on")){dlgEnd("x");return}
      if(qp.classList.contains("on")){closeQ();return}
      if(cm){closeMenu();return}
      if(fb.classList.contains("on")){closeFind();return}
      return;
    }
    if(c&&kl==="s"){e.preventDefault();save();return}
    if(c&&e.shiftKey&&kl==="p"||k==="F1"){e.preventDefault();openQ(">");return}
    if(c&&kl==="p"&&!e.shiftKey){e.preventDefault();openQ("");return}
    if(c&&e.shiftKey&&kl==="f"){e.preventDefault();CMDS[6].f();return}
    if(c&&kl==="f"){e.preventDefault();openFind(false);return}
    if(c&&kl==="h"){e.preventDefault();openFind(true);return}
    if(c&&kl==="g"){e.preventDefault();openQ(":");return}
    if(c&&kl==="b"){e.preventDefault();setSb();return}
    if(c&&k==="`"){e.preventDefault();togTerm();return}
    if(c&&(k==="="||k==="+")){e.preventDefault();setFont(1);return}
    if(c&&k==="-"){e.preventDefault();setFont(-1);return}
    if(e.altKey&&kl==="z"){e.preventDefault();setWrap(!S.wrap);return}
    if(c&&k==="Enter"&&fb.classList.contains("on")&&document.activeElement===fr2){e.preventDefault();frepl(true)}
  }

  /* ---------- tamanho ---------- */
  var rt=0;
  var ro=new ResizeObserver(function(){
    clearTimeout(rt);
    rt=setTimeout(function(){
      var w=ide.clientWidth,n=w<720;
      if(n!==narrow){narrow=n;ide.classList.toggle("id-nr",n);if(n)setSb(false);else setSb(ls("ide.sb")!=="0")}
      if(act&&act.kind==="text"){fitSB(act);sync(act)}
    },50);
  });
  ro.observe(ide);

  /* ---------- início ---------- */
  (async function(){
    setCss();
    narrow=ide.clientWidth<720;ide.classList.toggle("id-nr",narrow);
    S.sb=narrow?false:ls("ide.sb")!=="0";sb.classList.toggle("off",!S.sb);
    try{rootAbs=(await api("/api/ide/info")).root}catch(_){}
    await initTree();
    var ss;try{ss=JSON.parse(ls("ide.sess")||"null")}catch(_){}
    if(ss&&ss.t&&ss.t.length){
      for(var p of ss.t)await open(p,{noFocus:true});
      var a=T.filter(function(t){return t.path===ss.a})[0];
      if(a)activate(a,false);
    }
    updRun();crumb();stat();
  })();

  return function(){
    disposed=true;clearInterval(wt);ro.disconnect();
    document.removeEventListener("keydown",onGlobalKey,true);document.removeEventListener("selectionchange",onSel);
    TS.slice().forEach(function(s){termClose(s)});
  };
};
})();
