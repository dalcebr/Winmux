(function(){
var CSS=`
.ai{position:absolute;inset:0;display:flex;flex-direction:column;background:#171a26;color:#e8eaf2;font-size:14px;line-height:1.5}
.ai button{border:0;background:none;color:inherit;font:inherit;border-radius:6px;cursor:default}
.ai button:hover{background:var(--hover)}
.ai svg{width:18px;height:18px;flex:none}
.ai-top{display:flex;align-items:center;gap:2px;flex:none;height:44px;padding:0 6px;background:#1f2333;border-bottom:1px solid var(--line)}
.ai-top>button{width:38px;height:36px;display:grid;place-items:center;flex:none}
.ai-tt{flex:1;min-width:0;padding:0 6px;line-height:1.2}
.ai-tt b{display:block;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ai-tt small{display:block;color:var(--mut);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ai-body{flex:1;min-height:0;position:relative;display:flex;flex-direction:column}
.ai-log{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;scroll-behavior:auto;-webkit-overflow-scrolling:touch}
.ai-in{max-width:780px;margin:0 auto;padding:14px 12px 20px;display:flex;flex-direction:column;gap:14px}
.ai-m{user-select:text;-webkit-user-select:text;min-width:0}
.ai-m:not(:last-child){content-visibility:auto;contain-intrinsic-size:auto 90px}
.ai-u{align-self:flex-end;max-width:92%;background:rgba(76,194,255,.14);border:1px solid rgba(76,194,255,.25);border-radius:14px 14px 4px 14px;padding:8px 12px;white-space:pre-wrap;word-break:break-word}
.ai-a{width:100%}
.ai-bd>*:first-child{margin-top:0}.ai-bd>*:last-child{margin-bottom:0}
.ai-md{word-break:break-word}
.ai-md p,.ai-md ul,.ai-md ol,.ai-md blockquote,.ai-md .ai-tw,.ai-md h1,.ai-md h2,.ai-md h3,.ai-md h4,.ai-md h5,.ai-md h6,.ai-md hr{margin:0 0 10px}
.ai-md>*:last-child{margin-bottom:0}
.ai-md h1{font-size:1.35em}.ai-md h2{font-size:1.2em}.ai-md h3{font-size:1.08em}.ai-md h4,.ai-md h5,.ai-md h6{font-size:1em}
.ai-md h1,.ai-md h2,.ai-md h3,.ai-md h4{font-weight:600;line-height:1.3;margin-top:14px}
.ai-md>:first-child{margin-top:0}
.ai-md ul,.ai-md ol{padding-left:22px}.ai-md li{margin:2px 0}.ai-md li>ul,.ai-md li>ol{margin:2px 0}
.ai-md a{color:#4cc2ff;text-decoration:underline;text-underline-offset:2px}
.ai-md hr{border:0;border-top:1px solid var(--line)}
.ai-md blockquote{padding:2px 12px;border-left:3px solid #4cc2ff;color:rgba(255,255,255,.78);background:rgba(255,255,255,.03)}
.ai-md code{font:12.5px ui-monospace,Menlo,"Cascadia Mono",Consolas,monospace;background:rgba(255,255,255,.1);padding:1px 5px;border-radius:4px;word-break:break-word}
.ai-md .ai-ck{font-size:1.1em}
.ai-tw{overflow-x:auto}
.ai-md table{border-collapse:collapse;font-size:13px}
.ai-md th,.ai-md td{border:1px solid var(--line);padding:5px 10px;text-align:left;vertical-align:top}
.ai-md th{background:rgba(255,255,255,.06);font-weight:600}
.ai-cb{margin:0 0 10px;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:#0c0c0c}
.ai-bd>.ai-cb:last-child{margin-bottom:0}
.ai-ch{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:2px 4px 2px 12px;background:#1b1e2b;font-size:12px;color:var(--mut)}
.ai-ch button{display:flex;align-items:center;gap:5px;height:28px;padding:0 8px;font-size:12px;color:#e8eaf2}
.ai-ch svg{width:14px;height:14px}
.ai-cb pre{margin:0;padding:10px 12px;overflow-x:auto;tab-size:4;-moz-tab-size:4}
.ai-cb code{display:block;font:12.5px/1.5 ui-monospace,Menlo,"Cascadia Mono",Consolas,"DejaVu Sans Mono",monospace;color:#d4d4d4;white-space:pre;background:none;padding:0;width:max-content;min-width:100%}
.ai-k{color:#ff7b9c}.ai-s{color:#9ece6a}.ai-n{color:#ff9e64}.ai-c{color:#6b7394;font-style:italic}
.ai-th{margin:0 0 8px;font-size:12.5px;color:var(--mut)}
.ai-th summary{cursor:default;padding:2px 0}
.ai-th div{white-space:pre-wrap;padding:4px 0 4px 10px;border-left:2px solid var(--line);max-height:220px;overflow:auto}
.ai-mf{display:flex;gap:2px;margin-top:4px;margin-left:-6px;opacity:.55}
.ai-mf:hover,.ai-mf:focus-within{opacity:1}
.ai-mf button{display:flex;align-items:center;gap:5px;height:28px;padding:0 8px;font-size:12px}
.ai-mf svg{width:14px;height:14px}
.ai-mf .ai-rg{display:none}.ai-last .ai-rg{display:flex}
.ai-u+.ai-mf,.ai-ufo{align-self:flex-end}
.ai-tl{display:flex;flex-direction:column;gap:6px;margin-top:8px}
.ai-tl:empty{display:none}
.ai-tc{border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.04);overflow:hidden;font-size:13px}
.ai-tc.ask{border-color:#e0a82e}.ai-tc.err,.ai-tc.no{border-color:rgba(255,138,128,.5)}
.ai-tg{display:flex;align-items:center;gap:8px;padding:7px 10px}
.ai-tg svg{width:16px;height:16px;color:#4cc2ff}
.ai-tg b{font-weight:600;flex:none}
.ai-tg code{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--mut);font:12px ui-monospace,Menlo,Consolas,monospace}
.ai-st{flex:none;font-size:11px;padding:1px 7px;border-radius:10px;background:rgba(255,255,255,.1);color:var(--mut)}
.ai-tc.ok .ai-st{background:rgba(110,231,168,.16);color:#6ee7a8}
.ai-tc.err .ai-st,.ai-tc.no .ai-st{background:rgba(255,138,128,.16);color:#ff8a80}
.ai-tc.ask .ai-st{background:rgba(224,168,46,.2);color:#ffd36b}
.ai-tc.run .ai-st::before{content:"";display:inline-block;width:8px;height:8px;margin-right:5px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:ai-sp .8s linear infinite;vertical-align:-1px}
@keyframes ai-sp{to{transform:rotate(360deg)}}
.ai-tp{padding:0 10px 10px;display:grid;gap:6px}
.ai-tp pre,.ai-tr pre{margin:0;padding:8px 10px;border-radius:6px;background:#0c0c0c;font:12px/1.45 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word;max-height:240px;overflow:auto;user-select:text;-webkit-user-select:text}
.ai-tp pre.ai-del{color:#ff9a90}.ai-tp pre.ai-add{color:#9ece6a}
.ai-tp .ai-pp{color:var(--mut);font-size:12px;word-break:break-all}
.ai-ab{display:flex;flex-wrap:wrap;gap:6px}
.ai-ab button{height:34px;padding:0 14px;background:rgba(255,255,255,.1)}
.ai-ab .ai-pri{background:#4cc2ff;color:#00111f;font-weight:600}
.ai-ab .ai-dg{color:#ff8a80}
.ai-tr{border-top:1px solid var(--line)}
.ai-tr summary{padding:5px 10px;color:var(--mut);font-size:12px;cursor:default}
.ai-tr pre{margin:0 10px 10px}
.ai-er{border:1px solid rgba(255,138,128,.5);background:rgba(255,138,128,.08);border-radius:8px;padding:8px 12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;user-select:text;-webkit-user-select:text}
.ai-er span{flex:1;min-width:160px;word-break:break-word}
.ai-er button{height:32px;padding:0 12px;background:rgba(255,255,255,.1)}
.ai-nt{align-self:center;color:var(--mut);font-size:12px;text-align:center}
.ai-pr{color:var(--mut);font-size:12px;padding:2px 0}
.ai-dots::after{content:"";display:inline-block;width:6px;height:6px;margin-left:4px;border-radius:50%;background:#4cc2ff;animation:ai-bl 1s ease-in-out infinite}
@keyframes ai-bl{50%{opacity:.2}}
.ai-emp{margin:auto;padding:30px 16px;text-align:center;display:grid;justify-items:center;gap:8px}
.ai-emp svg{width:48px;height:48px}
.ai-emp b{font-size:20px;font-weight:600}
.ai-emp p{color:var(--mut);max-width:420px}
.ai-ch2{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:10px}
.ai-ch2 button{padding:8px 14px;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.04);font-size:13px}
.ai-wn{margin-top:10px;padding:10px 14px;border-radius:8px;background:rgba(224,168,46,.14);border:1px solid rgba(224,168,46,.4);display:grid;gap:6px;justify-items:center}
.ai-wn button{height:32px;padding:0 14px;background:#e0a82e;color:#1b1300;font-weight:600}
.ai-dn{position:absolute;right:14px;bottom:96px;width:38px;height:38px;border-radius:50%!important;display:none;place-items:center;background:#2d3243!important;border:1px solid var(--line)!important;box-shadow:0 4px 14px rgba(0,0,0,.45);z-index:3}
.ai-dn.on{display:grid}
.ai-cmp{flex:none;padding:6px 10px 8px;background:#171a26}
.ai-cw{max-width:780px;margin:0 auto;display:flex;align-items:flex-end;gap:6px;padding:6px 6px 6px 12px;border:1px solid var(--line);border-bottom-color:#4cc2ff;border-radius:18px;background:rgba(255,255,255,.07)}
.ai-cw textarea{flex:1;min-width:0;max-height:200px;resize:none;border:0;background:none;color:#fff;font:inherit;font-size:14px;line-height:1.45;padding:6px 0;outline:0;user-select:text;-webkit-user-select:text}
.ai-cw textarea::placeholder{color:var(--mut)}
.ai-sd{width:36px;height:36px;flex:none;border-radius:50%!important;display:grid;place-items:center;background:#4cc2ff!important;color:#00111f!important}
.ai-sd:disabled{opacity:.35}
.ai-sd.stop svg{width:14px;height:14px}
.ai-hn{max-width:780px;margin:4px auto 0;display:flex;justify-content:space-between;gap:8px;color:var(--mut);font-size:11px}
.ai-hn button{padding:0 6px;font-size:11px;color:var(--mut);height:20px}
.ai-sc{position:absolute;inset:0;z-index:6;background:rgba(0,0,0,.45);display:none}
.ai-sc.on{display:block}
.ai-sb{position:absolute;left:0;top:0;bottom:0;z-index:7;width:min(280px,86%);display:flex;flex-direction:column;background:#1f2333;border-right:1px solid var(--line);transform:translateX(-102%);transition:transform .16s ease;box-shadow:0 0 30px rgba(0,0,0,.5)}
.ai-sb.on{transform:none}
.ai-sh{display:flex;align-items:center;justify-content:space-between;padding:8px 8px 8px 14px;font-weight:600;flex:none}
.ai-sh button{width:34px;height:34px;display:grid;place-items:center}
.ai-sl{flex:1;overflow:auto;padding:0 6px 8px}
.ai-ci{display:flex;align-items:center;border-radius:6px}
.ai-ci.on{background:rgba(76,194,255,.14)}
.ai-ci:hover{background:var(--hover)}
.ai-ci .ai-go{flex:1;min-width:0;text-align:left;padding:8px 10px;background:none!important}
.ai-ci .ai-go b{display:block;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ai-ci .ai-go small{color:var(--mut);font-size:11px}
.ai-ci>button:last-child{width:32px;height:32px;display:grid;place-items:center;flex:none;opacity:.6}
.ai-0{padding:16px;color:var(--mut)}
.ai-set{position:absolute;inset:0;z-index:8;display:none;flex-direction:column;background:#171a26}
.ai-set.on{display:flex}
.ai-sv{flex:1;min-height:0;overflow:auto;padding:12px}
.ai-sw{max-width:640px;margin:0 auto;display:grid;gap:18px}
.ai-sw h3{font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--mut);margin-bottom:8px}
.ai-sw section{display:grid;gap:10px}
.ai-sw label{display:grid;gap:4px;font-size:12px;color:var(--mut)}
.ai-sw input[type=text],.ai-sw input[type=password],.ai-sw input[type=number],.ai-sw textarea{width:100%;padding:8px 10px;border:1px solid var(--line);border-bottom-color:#4cc2ff;border-radius:6px;background:rgba(255,255,255,.07);color:#fff;font:14px ui-monospace,Menlo,Consolas,monospace;outline:0;user-select:text;-webkit-user-select:text}
.ai-sw textarea{resize:vertical;min-height:70px;font-family:inherit}
.ai-sw .ai-r2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ai-sw .ai-fk{display:flex;align-items:center;gap:8px;color:var(--fg);font-size:13px}
.ai-sw .ai-hp{font-size:12px;color:var(--mut)}
.ai-pm{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.03)}
.ai-pm>div:first-child{min-width:0}.ai-pm b{display:block;font-weight:600}.ai-pm small{color:var(--mut)}
.ai-sg{display:flex;flex:none;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.ai-sg button{height:32px;padding:0 10px;border-radius:0;font-size:12.5px}
.ai-sg button.on{background:#4cc2ff;color:#00111f;font-weight:600}
.ai-sg button.on.deny{background:#ff8a80}.ai-sg button.on.ask{background:#ffd36b}
.ai-fr{display:flex;align-items:center;gap:6px;padding:6px 6px 6px 10px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.03)}
.ai-fr code{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:13px ui-monospace,Menlo,Consolas,monospace}
.ai-fr button{height:30px;padding:0 10px;font-size:12px;background:rgba(255,255,255,.08);flex:none}
.ai-fr button.x{width:30px;padding:0;display:grid;place-items:center}
.ai-btn{height:36px;padding:0 14px;background:rgba(255,255,255,.1)!important}
.ai-btn.pri{background:#4cc2ff!important;color:#00111f!important;font-weight:600}
.ai-btn.dg{color:#ff8a80}
.ai-sf{display:flex;align-items:center;gap:8px;flex:none;padding:8px 12px;border-top:1px solid var(--line);background:#1f2333}
.ai-sf span{flex:1;color:var(--mut);font-size:12px}
.ai-pk{position:absolute;inset:0;z-index:9;display:none;flex-direction:column;background:#171a26}
.ai-pk.on{display:flex}
.ai-pk .ai-pl{flex:1;overflow:auto;padding:4px 8px}
.ai-pk .ai-pl button{display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:9px 10px}
.ai-pk .ai-pl svg{color:#ffd36b;fill:rgba(255,211,107,.2)}
.ai-pp2{padding:8px 12px;color:var(--mut);font-size:12px;word-break:break-all;border-bottom:1px solid var(--line)}
.ai-tt2{position:absolute;left:50%;bottom:84px;transform:translateX(-50%);z-index:12;padding:7px 14px;border-radius:8px;background:#2d3243;border:1px solid var(--line);box-shadow:0 6px 20px rgba(0,0,0,.5);font-size:13px;pointer-events:none}
@media (pointer:coarse){.ai-cw textarea{font-size:16px}.ai-sw input,.ai-sw textarea{font-size:16px!important}}
`;
var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);

/* ---------- utilidades ---------- */
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return"&#"+c.charCodeAt(0)+";"})}
var ic=function(d,f){return'<svg viewBox="0 0 24 24" fill="'+(f?"currentColor":"none")+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+d+'"/></svg>'};
var I={
 menu:ic("M4 6h16M4 12h16M4 18h16"),plus:ic("M12 5v14M5 12h14"),set:ic("M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"),
 send:ic("M12 19V5M5 12l7-7 7 7"),stop:ic("M5 5h14v14H5z",1),copy:ic("M8 8h12v12H8zM4 16V4h12"),ok:ic("M5 12l5 5 10-10"),down:ic("M12 5v14M5 12l7 7 7-7"),
 trash:ic("M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"),x:ic("M6 6l12 12M18 6L6 18"),re:ic("M20 11a8 8 0 1 0 1 5M20 4v7h-7"),
 dir:ic("M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"),file:ic("M6 3h8l4 4v14H6zM14 3v4h4"),
 find:ic("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5"),term:ic("M4 17l6-5-6-5M12 19h8"),edit:ic("M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"),
 mv:ic("M5 12h14M13 6l6 6-6 6"),up:ic("M12 19V5M6 11l6-6 6 6"),
 logo:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#4d6bfe"/><path d="M12 5.5l1.6 4.1 4.1 1.6-4.1 1.6L12 17l-1.6-4.2-4.1-1.6 4.1-1.6z" fill="#fff"/><circle cx="17.5" cy="6.5" r="1.3" fill="#bcd0ff"/></svg>'
};
var TL={
 list_dir:{l:"Listar pasta",i:I.dir,c:"read"},read_file:{l:"Ler arquivo",i:I.file,c:"read"},search_files:{l:"Buscar",i:I.find,c:"read"},
 write_file:{l:"Escrever arquivo",i:I.edit,c:"write"},edit_file:{l:"Editar arquivo",i:I.edit,c:"write"},make_dir:{l:"Criar pasta",i:I.dir,c:"write"},
 move_path:{l:"Mover",i:I.mv,c:"write"},copy_path:{l:"Copiar",i:I.copy,c:"write"},delete_path:{l:"Apagar",i:I.trash,c:"delete"},run_command:{l:"Executar comando",i:I.term,c:"cmd"}
};
var CATN={read:"Ler",write:"Escrever",delete:"Apagar",cmd:"Comandos"};
var SYM={allow:"✓",ask:"?",deny:"✗"};

function legacyCopy(t){
  var ta=document.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");
  ta.style.cssText="position:fixed;left:-9999px;top:0;opacity:0";document.body.appendChild(ta);
  ta.select();ta.setSelectionRange(0,t.length);
  var ok=false;try{ok=document.execCommand("copy")}catch(_){}
  ta.remove();return ok;
}
function copyText(t){
  if(navigator.clipboard&&window.isSecureContext)
    return navigator.clipboard.writeText(t).then(function(){return true},function(){return legacyCopy(t)});
  return Promise.resolve(legacyCopy(t));
}

/* ---------- realce de sintaxe leve ---------- */
var KW="function return if else elif for while do switch case break continue const let var def class import from export default new try catch except finally throw raise async await yield in of is not and or None True False null undefined true false self this public private protected static void int float double string bool char struct enum interface type extends implements package using namespace fn mut impl pub use func go defer with as pass lambda global echo fi then esac done select where SELECT FROM WHERE INSERT UPDATE DELETE CREATE TABLE JOIN ON AND OR NOT NULL AS INTO VALUES SET ORDER BY GROUP LIMIT print def end elsif module require local nil";
var KWR={};KW.split(" ").forEach(function(k){KWR[k]=1});
function hl(code,lang){
  lang=(lang||"").toLowerCase();
  var hash=/^(py|python|sh|bash|shell|zsh|yaml|yml|toml|rb|ruby|conf|ini|dockerfile|makefile|perl|r|properties|env)$/.test(lang),
      dash=/^(sql|lua|hs|haskell)$/.test(lang),
      slash=/^(js|javascript|jsx|ts|typescript|tsx|java|c|cpp|cs|csharp|go|rust|rs|php|kotlin|kt|swift|dart|css|scss|json|jsonc|json5|scala)$/.test(lang),
      html=/^(html|xml|svg|vue)$/.test(lang);
  if(!(hash||dash||slash||html)||code.length>30000)return esc(code);
  var p=[];
  if(html)p.push("<!--[\\s\\S]*?-->");
  if(slash||html)p.push("\\/\\*[\\s\\S]*?\\*\\/");
  if(slash)p.push("\\/\\/[^\\n]*");
  if(hash)p.push("#[^\\n]*");
  if(dash)p.push("--[^\\n]*");
  var nc=p.length;
  p.push("\"(?:\\\\.|[^\"\\\\\\n])*\"","'(?:\\\\.|[^'\\\\\\n])*'","`(?:\\\\[\\s\\S]|[^`\\\\])*`","\\b\\d+(?:\\.\\d+)?\\b","\\b[A-Za-z_][A-Za-z_0-9]*\\b");
  var re=new RegExp(p.join("|"),"g"),out="",last=0,m;
  while((m=re.exec(code))){
    var t=m[0],c;
    if(m.index>last)out+=esc(code.slice(last,m.index));
    last=re.lastIndex;
    var f=t.charAt(0);
    if(/[A-Za-z_]/.test(f)){c=KWR[t]&&!html?"k":null}
    else if(/\d/.test(f))c="n";
    else if(f==='"'||f==="'"||f==="`")c="s";
    else c="c";
    out+=c?'<span class="ai-'+c+'">'+esc(t)+"</span>":esc(t);
  }
  return out+esc(code.slice(last));
}

/* ---------- markdown ---------- */
function inline(s){
  var codes=[];
  s=s.replace(/(`+)([\s\S]*?[^`])\1(?!`)/g,function(_,a,b){codes.push("<code>"+esc(b.replace(/^ (.*) $/,"$1"))+"</code>");return"\u0000"+(codes.length-1)+"\u0000"});
  s=esc(s);
  s=s.replace(/!?\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g,function(_,t,u){return'<a href="'+u+'" target="_blank" rel="noopener noreferrer">'+t+"</a>"});
  s=s.replace(/(^|[\s(])(https?:\/\/[^\s<]*[^\s<.,;:!?)\]])/g,function(_,a,u){return a+'<a href="'+u+'" target="_blank" rel="noopener noreferrer">'+u+"</a>"});
  s=s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g,"<strong>$1</strong>");
  s=s.replace(/(^|[^\w*])\*(?=[^\s*])([^*\n]*?[^\s*])\*(?![\w*])/g,"$1<em>$2</em>");
  s=s.replace(/(^|[^\w])_(?=[^\s_])([^_\n]*?[^\s_])_(?!\w)/g,"$1<em>$2</em>");
  s=s.replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>");
  return s.replace(/\u0000(\d+)\u0000/g,function(_,i){return codes[+i]});
}
var RLI=/^(\s*)([-*+]|\d+[.)])\s+(.*)$/,RHR=/^\s{0,3}([-*_])(\s*\1){2,}\s*$/,RH=/^\s{0,3}(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/,
    RTS=/^(?=.*\|)\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
function cells(l){l=l.trim().replace(/^\|/,"").replace(/\|$/,"");return l.replace(/\\\|/g,"\u0001").split("|").map(function(c){return c.trim().replace(/\u0001/g,"|")})}
function special(L,i){
  var l=L[i];
  return RH.test(l)||RHR.test(l)||/^\s{0,3}>/.test(l)||RLI.test(l)||(l.indexOf("|")>-1&&i+1<L.length&&RTS.test(L[i+1])&&L[i+1].indexOf("-")>-1);
}
function mdList(L,i){
  var st=[],h="";
  while(i<L.length){
    var m=RLI.exec(L[i]);
    if(!m){
      if(!L[i].trim()){
        var j=i+1;while(j<L.length&&!L[j].trim())j++;
        if(j<L.length&&RLI.test(L[j])&&!RHR.test(L[j])){i=j;continue}
        break;
      }
      if(/^\s+\S/.test(L[i])&&st.length){h+="<br>"+inline(L[i].trim());i++;continue}
      break;
    }
    if(RHR.test(L[i]))break;
    var ind=m[1].replace(/\t/g,"    ").length,t=/\d/.test(m[2])?"ol":"ul";
    while(st.length&&ind<st[st.length-1].n)h+="</li></"+st.pop().t+">";
    var top=st[st.length-1];
    if(top&&ind===top.n&&top.t===t)h+="</li>";
    else if(!top||ind>top.n){st.push({t:t,n:ind});h+="<"+t+(t==="ol"&&parseInt(m[2],10)!==1?' start="'+parseInt(m[2],10)+'"':"")+">"}
    else{h+="</li></"+st.pop().t+">";st.push({t:t,n:ind});h+="<"+t+">"}
    var tk=/^\[([ xX])\]\s+(.*)$/.exec(m[3]);
    h+="<li>"+(tk?'<span class="ai-ck">'+(tk[1]===" "?"☐":"☑")+"</span> "+inline(tk[2]):inline(m[3]));
    i++;
  }
  while(st.length)h+="</li></"+st.pop().t+">";
  return[h,i];
}
function mdBlock(text){
  var L=text.split("\n"),o=[],i=0,m;
  while(i<L.length){
    var l=L[i];
    if(!l.trim()){i++;continue}
    if((m=RH.exec(l))){o.push("<h"+m[1].length+">"+inline(m[2])+"</h"+m[1].length+">");i++;continue}
    if(RHR.test(l)){o.push("<hr>");i++;continue}
    if(/^\s{0,3}>/.test(l)){
      var q=[];while(i<L.length&&/^\s{0,3}>/.test(L[i])){q.push(L[i].replace(/^\s{0,3}>\s?/,""));i++}
      o.push("<blockquote>"+mdBlock(q.join("\n"))+"</blockquote>");continue;
    }
    if(l.indexOf("|")>-1&&i+1<L.length&&RTS.test(L[i+1])&&L[i+1].indexOf("-")>-1){
      var hd=cells(l),al=cells(L[i+1]).map(function(c){return/^:-*:$/.test(c)?"center":/-:$/.test(c)?"right":""});
      i+=2;var rows="";
      while(i<L.length&&L[i].trim()&&L[i].indexOf("|")>-1){
        var r=cells(L[i]);rows+="<tr>"+hd.map(function(_,k){return"<td"+(al[k]?' style="text-align:'+al[k]+'"':"")+">"+inline(r[k]||"")+"</td>"}).join("")+"</tr>";i++;
      }
      o.push('<div class="ai-tw"><table><thead><tr>'+hd.map(function(c,k){return"<th"+(al[k]?' style="text-align:'+al[k]+'"':"")+">"+inline(c)+"</th>"}).join("")+"</tr></thead><tbody>"+rows+"</tbody></table></div>");
      continue;
    }
    if(RLI.test(l)){var r2=mdList(L,i);o.push(r2[0]);i=r2[1];continue}
    var p=[l.replace(/\s+$/,"")];i++;
    while(i<L.length&&L[i].trim()&&!special(L,i)){p.push(L[i].replace(/\s+$/,""));i++}
    o.push("<p>"+p.map(inline).join("<br>")+"</p>");
  }
  return o.join("");
}
/* separa texto e blocos de código (o último pode estar aberto durante o streaming) */
function split(md){
  var L=md.split("\n"),bl=[],buf=[],i=0;
  function flush(){if(buf.length){var t=buf.join("\n");if(t.trim())bl.push({k:"m",text:t});buf=[]}}
  while(i<L.length){
    var m=/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)[^`]*$/.exec(L[i]);
    if(m){
      flush();
      var ind=m[1].length,fc=m[2].charAt(0),fl=m[2].length,code=[],closed=false;i++;
      while(i<L.length){
        var t=L[i].trim();
        if(t.charAt(0)===fc&&t.length>=fl&&t.split(fc).join("")===""){closed=true;i++;break}
        var ln=L[i],k=0;while(k<ind&&ln.charAt(k)===" ")k++;
        code.push(ln.slice(k));i++;
      }
      bl.push({k:"c",lang:m[3],text:code.join("\n"),closed:closed});
    }else{buf.push(L[i]);i++}
  }
  flush();
  return bl;
}

/* ---------- app ---------- */
window.App_ai=function(root){
  var coarse=matchMedia("(pointer:coarse)").matches;
  root.innerHTML=
  '<div class="ai">'+
   '<div class="ai-top"><button data-a="side" title="Conversas">'+I.menu+'</button>'+
     '<div class="ai-tt"><b>Nova conversa</b><small></small></div>'+
     '<button data-a="new" title="Nova conversa">'+I.plus+'</button><button data-a="set" title="Configurações">'+I.set+'</button></div>'+
   '<div class="ai-body">'+
     '<div class="ai-log"><div class="ai-in"></div></div>'+
     '<button class="ai-dn" data-a="dn" title="Ir para o fim">'+I.down+'</button>'+
     '<div class="ai-cmp"><div class="ai-cw"><textarea rows="1" placeholder="Pergunte ou peça algo…" autocapitalize="sentences"></textarea>'+
       '<button class="ai-sd" data-a="send" title="Enviar">'+I.send+'</button></div>'+
       '<div class="ai-hn"><span class="ai-hs"></span><button data-a="set" title="Permissões"></button></div></div>'+
     '<div class="ai-sc" data-a="side"></div>'+
     '<div class="ai-sb"><div class="ai-sh"><span>Conversas</span><button data-a="side">'+I.x+'</button></div><div class="ai-sl"></div></div>'+
   '</div>'+
   '<div class="ai-set"></div><div class="ai-pk"></div>'+
  '</div>';
  var $=function(s){return root.querySelector(s)},
      ai=$(".ai"),log=$(".ai-log"),inn=$(".ai-in"),inp=$("textarea"),sd=$(".ai-sd"),dn=$(".ai-dn"),
      sb=$(".ai-sb"),sc=$(".ai-sc"),sl=$(".ai-sl"),setv=$(".ai-set"),pk=$(".ai-pk"),body=$(".ai-body"),
      cfg=null,chats=[],chat={id:uid(),t:"",m:[]},busy=false,stopped=false,ctrl=null,pend=null,stick=true,auto={},usage=0;

  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
  function api(u,o){
    return fetch(u,o).then(function(r){
      return r.json().then(function(j){if(!r.ok)throw new Error(j.e||("Erro "+r.status));return j});
    });
  }
  function put(u,b,m){return api(u,{method:m||"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b||{})})}
  function toast(t){
    var e=document.createElement("div");e.className="ai-tt2";e.textContent=t;body.appendChild(e);
    setTimeout(function(){e.remove()},2200);
  }
  function btnCopy(b,t){
    copyText(t).then(function(ok){
      if(!ok){toast("Não foi possível copiar — selecione o texto manualmente");return}
      var h=b.innerHTML;b.innerHTML=I.ok+"<span>Copiado</span>";
      clearTimeout(b._t);b._t=setTimeout(function(){b.innerHTML=h},1500);
    });
  }

  /* ----- rolagem ----- */
  function atEnd(){return log.scrollHeight-log.scrollTop-log.clientHeight<70}
  log.addEventListener("scroll",function(){stick=atEnd();dn.classList.toggle("on",!stick)},{passive:true});
  function keep(){if(stick)log.scrollTop=log.scrollHeight}
  function toEnd(){stick=true;log.scrollTop=log.scrollHeight;dn.classList.remove("on")}

  /* ----- elementos de mensagem ----- */
  function mkCode(){
    var d=document.createElement("div");d.className="ai-cb";
    d.innerHTML='<div class="ai-ch"><span></span><button data-a="cc">'+I.copy+'<span>Copiar</span></button></div><pre><code></code></pre>';
    return d;
  }
  function sync(bd,md){
    var bl=split(md),i,b,c;
    for(i=0;i<bl.length;i++){
      b=bl[i];c=bd.children[i];
      if(c&&c._k!==b.k){var n=b.k==="c"?mkCode():document.createElement("div");if(b.k==="m")n.className="ai-md";n._k=b.k;bd.replaceChild(n,c);c=n}
      else if(!c){c=b.k==="c"?mkCode():document.createElement("div");if(b.k==="m")c.className="ai-md";c._k=b.k;bd.appendChild(c)}
      if(b.k==="c"){
        var sig=b.lang+"|"+b.closed+"|"+b.text;
        if(c._s!==sig){
          c._s=sig;c.firstChild.firstChild.textContent=b.lang||"código";
          c.lastChild.firstChild.innerHTML=b.closed?hl(b.text,b.lang):esc(b.text);
        }
      }else if(c._s!==b.text){c._s=b.text;c.innerHTML=mdBlock(b.text)}
    }
    while(bd.children.length>bl.length)bd.lastChild.remove();
  }
  function addUser(t){
    var e=document.createElement("div");e.className="ai-m ai-u";e.textContent=t;inn.appendChild(e);
    var f=document.createElement("div");f.className="ai-mf ai-ufo";f.innerHTML='<button data-a="cu">'+I.copy+'<span>Copiar</span></button>';
    f._raw=t;e._raw=t;f.dataset.u=1;inn.appendChild(f);
    return e;
  }
  function addAsst(){
    var e=document.createElement("div");e.className="ai-m ai-a";
    e.innerHTML='<details class="ai-th" hidden><summary>Raciocínio</summary><div></div></details><div class="ai-bd"></div><div class="ai-pr" hidden></div><div class="ai-tl"></div>'+
      '<div class="ai-mf"><button data-a="cm">'+I.copy+'<span>Copiar</span></button><button class="ai-rg" data-a="rg">'+I.re+'<span>Regenerar</span></button></div>';
    var o={el:e,th:e.firstChild,thd:e.firstChild.lastChild,bd:e.children[1],pr:e.children[2],tl:e.children[3],cards:[],raf:0,raw:""};
    e._o=o;inn.appendChild(e);
    o.draw=function(a){
      o.raw=a.content||"";
      if(a.reasoning_content){o.th.hidden=false;o.thd.textContent=a.reasoning_content;if(busy&&!a.content)o.th.open=true}
      sync(o.bd,o.raw);
    };
    o.sched=function(a){
      if(o.raf)return;
      o.raf=requestAnimationFrame(function(){o.raf=0;o.draw(a);keep()});
    };
    return o;
  }
  function note(t){var e=document.createElement("div");e.className="ai-nt";e.textContent=t;inn.appendChild(e);keep()}
  function showErr(msg){
    var e=document.createElement("div");e.className="ai-er";
    e.innerHTML="<span>⚠ "+esc(msg)+'</span><button data-a="retry">Tentar de novo</button>';
    inn.appendChild(e);keep();
  }
  function lastMark(){
    var as=inn.querySelectorAll(".ai-a");
    for(var i=0;i<as.length;i++)as[i].classList.toggle("ai-last",i===as.length-1&&!busy);
  }

  /* ----- cartões de ferramentas ----- */
  function summ(n,a){
    if(n==="run_command")return a.command||"";
    if(n==="move_path"||n==="copy_path")return(a.from||"")+" → "+(a.to||"");
    if(n==="search_files")return(a.query||"")+(a.path?"  em "+a.path:"");
    return a.path||"";
  }
  function mkCard(o,tc){
    var a={};try{a=JSON.parse(tc.function.arguments||"{}")}catch(_){}
    var n=tc.function.name,d=TL[n]||{l:n,i:I.term,c:"cmd"},e=document.createElement("div");
    e.className="ai-tc run";e._n=n;e._a=a;e._c=d.c;
    e.innerHTML='<div class="ai-tg">'+d.i+"<b>"+esc(d.l)+"</b><code>"+esc(summ(n,a))+'</code><span class="ai-st">executando</span></div>'+
      '<div class="ai-tp" hidden></div><details class="ai-tr" hidden><summary>Resultado</summary><pre></pre></details>';
    o.tl.appendChild(e);o.cards.push(e);return e;
  }
  var STL={run:"executando",ask:"aguardando",ok:"concluído",err:"erro",no:"negado"};
  function cstate(e,s,res){
    e.className="ai-tc "+s;e.querySelector(".ai-st").textContent=STL[s];
    if(res!=null){
      var r=e.querySelector(".ai-tr");r.hidden=false;r.lastChild.textContent=res.length>6000?res.slice(0,6000)+"\n… ("+(res.length-6000)+" caracteres omitidos na tela)":res;
    }
  }
  function cut(s,n){s=String(s==null?"":s);return s.length>n?esc(s.slice(0,n))+"\n… (+"+(s.length-n)+" caracteres)":esc(s)}
  function preview(n,a){
    if(n==="run_command")return"<pre>$ "+cut(a.command,2000)+"</pre>"+(a.cwd?'<div class="ai-pp">em '+esc(a.cwd)+"</div>":"");
    if(n==="write_file")return'<div class="ai-pp">'+esc(a.path)+"</div><pre>"+cut(a.content,1500)+"</pre>";
    if(n==="edit_file")return'<div class="ai-pp">'+esc(a.path)+'</div><pre class="ai-del">'+cut("- "+String(a.old||"").split("\n").join("\n- "),900)+'</pre><pre class="ai-add">'+cut("+ "+String(a.new||"").split("\n").join("\n+ "),900)+"</pre>";
    if(n==="move_path"||n==="copy_path")return'<div class="ai-pp">'+esc(a.from)+" → "+esc(a.to)+"</div>";
    return'<div class="ai-pp">'+esc(a.path||"")+"</div>";
  }
  function approve(card,cat){
    return new Promise(function(res){
      cstate(card,"ask");
      var tp=card.querySelector(".ai-tp");
      tp.hidden=false;
      tp.innerHTML=preview(card._n,card._a)+'<div class="ai-ab"><button class="ai-pri" data-r="y">Permitir</button><button data-r="a">Sempre nesta conversa ('+esc(CATN[cat]||cat)+')</button><button class="ai-dg" data-r="n">Negar</button></div>';
      pend=function(v){pend=null;tp.hidden=true;tp.innerHTML="";res(v)};
      tp.onclick=function(ev){
        var b=ev.target.closest("[data-r]");if(!b)return;
        if(b.dataset.r==="a")auto[cat]=1;
        pend(b.dataset.r==="n"?"n":"y");
      };
      keep();
    });
  }
  async function runTool(card,tc){
    var a;
    try{a=JSON.parse(tc.function.arguments||"{}")}catch(_){cstate(card,"err","Argumentos inválidos");return"Erro: argumentos JSON inválidos"}
    var n=tc.function.name,r;
    try{
      r=await put("/api/ai/tool",{name:n,args:a,approved:false});
      if(r.ask){
        var cat=r.cat,v=auto[cat]?"y":await approve(card,cat);
        if(v==="s"||stopped){cstate(card,"no","Cancelado");return"Cancelado pelo usuário."}
        if(v==="n"){cstate(card,"no","Negado pelo usuário");return"O usuário NEGOU esta ação. Não tente novamente sem perguntar; ofereça uma alternativa."}
        cstate(card,"run");
        r=await put("/api/ai/tool",{name:n,args:a,approved:true});
      }
    }catch(e){cstate(card,"err",e.message);return"Erro: "+e.message}
    if(r.denied){var m="Ação bloqueada pelas configurações de permissão ("+(CATN[r.denied]||r.denied)+").";cstate(card,"no",m);return m}
    if(r.e){cstate(card,"err",r.e);return"Erro: "+r.e}
    cstate(card,"ok",r.r);return r.r;
  }

  /* ----- conversa ----- */
  function fixDangling(){
    var m=chat.m;
    for(var i=0;i<m.length;i++){
      var a=m[i];
      if(a.role!=="assistant"||!a.tool_calls)continue;
      var have={},j=i+1;
      while(j<m.length&&m[j].role==="tool"){have[m[j].tool_call_id]=1;j++}
      var add=a.tool_calls.filter(function(t){return!have[t.id]}).map(function(t){return{role:"tool",tool_call_id:t.id,content:"Cancelado pelo usuário."}});
      if(add.length){m.splice.apply(m,[j,0].concat(add));i=j+add.length-1}
    }
  }
  function payload(){
    var m=chat.m,n=m.length;
    return m.map(function(x,i){
      if(x.role==="tool"&&i<n-12&&x.content.length>3000)
        return{role:"tool",tool_call_id:x.tool_call_id,content:x.content.slice(0,1500)+"\n[… resultado antigo truncado …]\n"+x.content.slice(-500)};
      return x;
    });
  }
  async function callModel(){
    ctrl=new AbortController();
    var r=await fetch("/api/ai/stream",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:payload()}),signal:ctrl.signal});
    if(!r.ok){var j={};try{j=await r.json()}catch(_){}throw new Error(j.e||("Erro "+r.status))}
    var o=addAsst(),a={role:"assistant",content:""},tcs=[],rd=r.body.getReader(),dec=new TextDecoder(),buf="",aborted=false;
    o.pr.hidden=false;o.pr.innerHTML='<span class="ai-dots">Pensando</span>';
    lastMark();keep();
    try{
      for(;;){
        var x=await rd.read();if(x.done)break;
        buf+=dec.decode(x.value,{stream:true});
        var k;
        while((k=buf.indexOf("\n"))>=0){
          var ln=buf.slice(0,k).trim();buf=buf.slice(k+1);
          if(ln.indexOf("data:")!==0)continue;
          var p=ln.slice(5).trim();if(p==="[DONE]")continue;
          var jj;try{jj=JSON.parse(p)}catch(_){continue}
          if(jj.error)throw new Error(jj.error.message||String(jj.error));
          if(jj.usage&&jj.usage.prompt_tokens){usage=jj.usage.prompt_tokens;head()}
          var ch=jj.choices&&jj.choices[0];if(!ch)continue;
          var dl=ch.delta||{};
          if(dl.reasoning_content)a.reasoning_content=(a.reasoning_content||"")+dl.reasoning_content;
          if(dl.content)a.content+=dl.content;
          if(dl.tool_calls)dl.tool_calls.forEach(function(t){
            var c=tcs[t.index||0]=tcs[t.index||0]||{id:"",type:"function",function:{name:"",arguments:""}};
            if(t.id)c.id=t.id;
            if(t.function){if(t.function.name)c.function.name+=t.function.name;if(t.function.arguments)c.function.arguments+=t.function.arguments}
          });
          if(dl.content||dl.reasoning_content){o.pr.hidden=true;o.sched(a)}
          else if(dl.tool_calls){
            var tl=tcs.filter(Boolean),last=tl[tl.length-1];
            o.pr.hidden=false;o.pr.textContent="⚙ Preparando "+(TL[last.function.name]?TL[last.function.name].l:last.function.name)+"… ("+last.function.arguments.length+" caracteres)";
            keep();
          }
        }
      }
    }catch(e){
      if(e.name==="AbortError")aborted=true;
      else{cancelAnimationFrame(o.raf);o.raf=0;o.draw(a);o.pr.hidden=true;if(!a.content&&!a.reasoning_content)o.el.remove();else chat.m.push(a);throw e}
    }
    cancelAnimationFrame(o.raf);o.raf=0;o.pr.hidden=true;
    o.draw(a);
    tcs=tcs.filter(Boolean);
    tcs.forEach(function(t){if(!t.id)t.id="call_"+uid()});
    if(aborted){
      if(!a.content&&!a.reasoning_content)o.el.remove();else chat.m.push(a);
      return null;
    }
    if(tcs.length)a.tool_calls=tcs;
    if(!a.content&&!a.reasoning_content&&!tcs.length){o.el.remove();throw new Error("A IA devolveu uma resposta vazia.")}
    chat.m.push(a);
    o.cards=[];
    tcs.forEach(function(t){mkCard(o,t)});
    keep();
    return{a:a,o:o};
  }
  async function turn(){
    busy=true;stopped=false;ui();
    var steps=0;
    try{
      for(;;){
        if(++steps>cfg.steps){note("Limite de "+cfg.steps+" passos por mensagem atingido. Envie “continuar” para prosseguir.");break}
        fixDangling();
        var res=await callModel();
        if(!res||!res.a.tool_calls)break;
        for(var i=0;i<res.a.tool_calls.length;i++){
          var tc=res.a.tool_calls[i],out;
          if(stopped){cstate(res.o.cards[i],"no","Cancelado");out="Cancelado pelo usuário."}
          else out=await runTool(res.o.cards[i],tc);
          chat.m.push({role:"tool",tool_call_id:tc.id,content:String(out)});
        }
        save();
        if(stopped)break;
      }
    }catch(e){if(e.name!=="AbortError")showErr(e.message)}
    ctrl=null;busy=false;fixDangling();ui();lastMark();save();loadChats();
  }
  function stop(){
    stopped=true;
    if(ctrl)ctrl.abort();
    if(pend)pend("s");
  }
  function send(txt){
    txt=(txt||"").trim();
    if(!txt||busy)return;
    if(!cfg||!cfg.key_set){openSet("Configure a chave da API do DeepSeek para começar.");return}
    var emp=inn.querySelector(".ai-emp");if(emp)emp.remove();
    chat.m.push({role:"user",content:txt});
    if(!chat.t)chat.t=txt.replace(/\s+/g," ").slice(0,48);
    addUser(txt);inp.value="";fit();toEnd();head();turn();
  }
  function retry(){
    var errs=inn.querySelectorAll(".ai-er");errs.forEach(function(e){e.remove()});
    if(!busy)turn();
  }
  function regen(){
    if(busy)return;
    var i=chat.m.length-1;
    while(i>=0&&chat.m[i].role!=="user")i--;
    if(i<0)return;
    chat.m.length=i+1;render();turn();
  }

  /* ----- render completo (abrir conversa salva) ----- */
  function empty(){
    var e=document.createElement("div");e.className="ai-emp";
    e.innerHTML=I.logo+"<b>Como posso ajudar?</b><p>Posso ler, criar, editar e apagar arquivos nas pastas que você liberar, e rodar comandos — tudo conforme suas permissões.</p>"+
      '<div class="ai-ch2"><button data-s="Liste os arquivos da minha pasta inicial e me diga o que há nela.">Listar minhas pastas</button>'+
      '<button data-s="Crie uma pasta chamada projeto-teste com um arquivo README.md dentro.">Criar um projeto</button>'+
      '<button data-s="Explique o que este comando faz: ">Explicar um comando</button></div>'+
      (cfg&&!cfg.key_set?'<div class="ai-wn"><span>Falta configurar a chave da API do DeepSeek.</span><button data-a="set">Configurar agora</button></div>':"");
    inn.appendChild(e);
  }
  function render(){
    inn.innerHTML="";
    var m=chat.m;
    if(!m.length){empty();head();hint();return}
    var res={};m.forEach(function(x){if(x.role==="tool")res[x.tool_call_id]=x.content});
    m.forEach(function(x){
      if(x.role==="user")addUser(x.content);
      else if(x.role==="assistant"){
        var o=addAsst();o.draw(x);
        (x.tool_calls||[]).forEach(function(t){
          var c=mkCard(o,t),r=res[t.id];
          if(r==null)cstate(c,"no","Sem resultado");
          else cstate(c,/^Erro:/.test(r)?"err":/^(O usuário NEGOU|Ação bloqueada|Cancelado)/.test(r)?"no":"ok",r);
        });
      }
    });
    lastMark();head();hint();toEnd();
  }

  /* ----- persistência / lista ----- */
  var svT=0;
  function save(){
    if(!chat.m.length)return;
    clearTimeout(svT);
    put("/api/ai/chat?id="+chat.id,{t:chat.t,m:chat.m},"PUT").catch(function(){});
  }
  function when(ts){
    var d=new Date(ts*1000),n=new Date();
    return d.toDateString()===n.toDateString()?d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}):d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});
  }
  function drawSide(){
    sl.innerHTML=chats.length?chats.map(function(c){
      return'<div class="ai-ci'+(c.id===chat.id?" on":"")+'" data-id="'+c.id+'"><button class="ai-go" data-a="open"><b>'+esc(c.t||"Sem título")+"</b><small>"+when(c.ts)+'</small></button><button data-a="del" title="Apagar conversa">'+I.trash+"</button></div>";
    }).join(""):'<div class="ai-0">Nenhuma conversa salva.</div>';
  }
  function loadChats(){api("/api/ai/chats").then(function(j){chats=j;drawSide()}).catch(function(){})}
  function side(on){
    var s=on===undefined?!sb.classList.contains("on"):on;
    sb.classList.toggle("on",s);sc.classList.toggle("on",s);
    if(s)loadChats();
  }
  function openChat(id){
    if(busy)stop();
    api("/api/ai/chat?id="+id).then(function(j){chat={id:j.id,t:j.t||"",m:j.m||[]};auto={};render();side(false)}).catch(function(e){toast(e.message)});
  }
  function newChat(){
    if(busy)stop();
    chat={id:uid(),t:"",m:[]};auto={};render();side(false);inp.focus();
  }

  /* ----- cabeçalho / rodapé ----- */
  function head(){
    $(".ai-tt b").textContent=chat.t||"Nova conversa";
    $(".ai-tt small").textContent=(cfg?cfg.model:"")+(usage?" · "+(usage>=1000?(usage/1000).toFixed(1)+"k":usage)+" tokens de contexto":"");
  }
  function hint(){
    if(!cfg)return;
    $(".ai-hs").textContent=coarse?"":"Enter envia · Shift+Enter quebra linha";
    $(".ai-hn button").textContent=["read","write","delete","cmd"].map(function(k){return CATN[k]+" "+SYM[cfg.perms[k]]}).join(" · ");
  }
  function ui(){
    sd.innerHTML=busy?I.stop:I.send;sd.classList.toggle("stop",busy);sd.title=busy?"Parar":"Enviar";
    sd.disabled=!busy&&!inp.value.trim();
  }
  function fit(){inp.style.height="auto";inp.style.height=Math.min(inp.scrollHeight,200)+"px";ui()}
  inp.addEventListener("input",fit);
  inp.addEventListener("keydown",function(e){
    if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&!coarse){e.preventDefault();busy?0:send(inp.value)}
  });

  /* ----- configurações ----- */
  var draft=null,dirty=false;
  var PERM=[["read","Ler arquivos","Listar pastas, ler e buscar arquivos"],["write","Escrever","Criar, editar, mover e copiar"],["delete","Apagar","Remover arquivos e pastas"],["cmd","Executar comandos","Roda no shell do Termux; ignora o limite de pastas"]];
  function openSet(msg){
    api("/api/ai/cfg").then(function(c){cfg=c;draft=JSON.parse(JSON.stringify(c));drawSet(msg);setv.classList.add("on");side(false)}).catch(function(e){toast(e.message)});
  }
  function drawSet(msg){
    var d=draft;
    setv.innerHTML=
     '<div class="ai-top"><button data-a="sx">'+I.x+'</button><div class="ai-tt"><b>Configurações</b></div></div>'+
     '<div class="ai-sv"><div class="ai-sw">'+
      (msg?'<div class="ai-wn">'+esc(msg)+"</div>":"")+
      "<section><h3>Conexão DeepSeek</h3>"+
       '<label>Chave da API'+(d.key_set?" (salva: "+esc(d.key_hint)+" — deixe em branco para manter)":"")+'<input type="password" id="ai-key" autocomplete="off" placeholder="sk-…"></label>'+
       '<div class="ai-r2"><label>Modelo<input type="text" id="ai-mod" list="ai-mods" value="'+esc(d.model)+'"><datalist id="ai-mods"><option value="deepseek-chat"><option value="deepseek-reasoner"></datalist></label>'+
       '<label>Temperatura<input type="number" id="ai-tmp" min="0" max="2" step="0.1" value="'+d.temp+'"></label></div>'+
       '<label>Endereço da API<input type="text" id="ai-base" value="'+esc(d.base)+'"></label>'+
       (d.key_set?'<button class="ai-btn dg" data-a="ck">Remover chave salva</button>':"")+
      "</section>"+
      "<section><h3>Permissões</h3>"+
       PERM.map(function(p){
         return'<div class="ai-pm"><div><b>'+p[1]+"</b><small>"+p[2]+'</small></div><div class="ai-sg" data-c="'+p[0]+'">'+
          [["allow","Permitir"],["ask","Perguntar"],["deny","Negar"]].map(function(m){return'<button data-m="'+m[0]+'" class="'+m[0]+(d.perms[p[0]]===m[0]?" on":"")+'">'+m[1]+"</button>"}).join("")+"</div></div>";
       }).join("")+
      "</section>"+
      "<section><h3>Pastas acessíveis</h3>"+
       '<div class="ai-hp">'+(d.folders.length?"A IA só enxerga as pastas abaixo.":"Nenhuma pasta definida: a IA enxerga toda a pasta inicial ("+esc(d.root)+").")+"</div>"+
       d.folders.map(function(f,i){
         return'<div class="ai-fr" data-i="'+i+'"><code>'+(f.p?"~/"+esc(f.p):"~ (pasta inicial)")+'</code><button data-a="fw">'+(f.w?"Ler e escrever":"Somente leitura")+'</button><button class="x" data-a="fx" title="Remover">'+I.x+"</button></div>";
       }).join("")+
       '<button class="ai-btn" data-a="fa">+ Adicionar pasta</button>'+
      "</section>"+
      "<section><h3>Avançado</h3>"+
       '<div class="ai-r2"><label>Máx. de passos por mensagem<input type="number" id="ai-stp" min="1" max="100" value="'+d.steps+'"></label>'+
       '<label>Tempo limite de comando (s)<input type="number" id="ai-tmo" min="5" max="600" value="'+d.timeout+'"></label></div>'+
       '<label class="ai-fk"><input type="checkbox" id="ai-trs"'+(d.trash?" checked":"")+"> Guardar cópia na lixeira do assistente ao apagar ou sobrescrever</label>"+
       '<label>Instruções extras para a IA<textarea id="ai-ext" placeholder="Ex.: Sempre explique antes de alterar arquivos.">'+esc(d.extra)+"</textarea></label>"+
      "</section>"+
     "</div></div>"+
     '<div class="ai-sf"><span></span><button class="ai-btn" data-a="sx">Cancelar</button><button class="ai-btn pri" data-a="ss">Salvar</button></div>';
  }
  function readSet(){
    var g=function(i){return setv.querySelector("#"+i)};
    draft.model=g("ai-mod").value.trim()||"deepseek-chat";draft.base=g("ai-base").value.trim();
    draft.temp=parseFloat(g("ai-tmp").value);if(isNaN(draft.temp))draft.temp=0.5;
    draft.steps=parseInt(g("ai-stp").value,10)||25;draft.timeout=parseInt(g("ai-tmo").value,10)||60;
    draft.trash=g("ai-trs").checked;draft.extra=g("ai-ext").value;
    var k=g("ai-key").value.trim();if(k)draft.key=k;else delete draft.key;
  }
  function saveSet(){
    readSet();
    var o={base:draft.base,model:draft.model,temp:draft.temp,steps:draft.steps,timeout:draft.timeout,trash:draft.trash,extra:draft.extra,perms:draft.perms,folders:draft.folders};
    if(draft.key)o.key=draft.key;
    if(draft.clear_key)o.clear_key=true;
    put("/api/ai/cfg",o,"PUT").then(function(c){cfg=c;setv.classList.remove("on");head();hint();if(!chat.m.length)render();toast("Configurações salvas")}).catch(function(e){setv.querySelector(".ai-sf span").textContent="⚠ "+e.message});
  }
  function picker(rel){
    api("/api/ls?p="+encodeURIComponent(rel)).then(function(j){
      var dirs=j.i.filter(function(x){return x[1]}).sort(function(a,b){return a[0].localeCompare(b[0],undefined,{numeric:true,sensitivity:"base"})}),cur=j.p;
      pk.innerHTML='<div class="ai-top"><button data-a="px">'+I.x+'</button><div class="ai-tt"><b>Escolher pasta</b></div><button data-a="pu" title="Subir">'+I.up+"</button></div>"+
        '<div class="ai-pp2">~'+(cur?"/"+esc(cur):"")+'</div><div class="ai-pl">'+
        (dirs.length?dirs.map(function(x){return'<button data-p="'+esc(cur?cur+"/"+x[0]:x[0])+'">'+I.dir+"<span>"+esc(x[0])+"</span></button>"}).join(""):'<div class="ai-0">Sem subpastas.</div>')+
        '</div><div class="ai-sf"><span></span><button class="ai-btn pri" data-a="pp">Usar esta pasta</button></div>';
      pk._cur=cur;pk.classList.add("on");
    }).catch(function(e){toast(e.message)});
  }

  /* ----- eventos ----- */
  ai.addEventListener("contextmenu",function(e){e.stopPropagation()});
  ai.addEventListener("click",function(e){
    var t=e.target.closest("[data-a],[data-s],[data-m],[data-p]");
    if(!t)return;
    if(t.dataset.s){inp.value=t.dataset.s;fit();inp.focus();return}
    if(t.dataset.m&&!t.dataset.a){
      var g=t.parentNode;draft.perms[g.dataset.c]=t.dataset.m;
      [].forEach.call(g.children,function(b){b.classList.toggle("on",b===t)});return;
    }
    if(t.dataset.p!==undefined&&!t.dataset.a){picker(t.dataset.p);return}
    var a=t.dataset.a;
    switch(a){
      case"send":busy?stop():send(inp.value);break;
      case"side":side();break;
      case"new":newChat();break;
      case"set":openSet();break;
      case"dn":toEnd();break;
      case"open":openChat(t.closest(".ai-ci").dataset.id);break;
      case"del":
        var id=t.closest(".ai-ci").dataset.id;
        if(confirm("Apagar esta conversa?"))put("/api/ai/del?id="+id).then(function(){if(id===chat.id)newChat();loadChats()});
        break;
      case"cc":btnCopy(t,t.closest(".ai-cb").querySelector("code").textContent);break;
      case"cm":btnCopy(t,t.closest(".ai-m")._o.raw);break;
      case"cu":btnCopy(t,t.parentNode._raw);break;
      case"rg":regen();break;
      case"retry":retry();break;
      case"sx":setv.classList.remove("on");break;
      case"ss":saveSet();break;
      case"ck":draft.clear_key=true;draft.key_set=false;readSet();drawSet();break;
      case"fw":var f=draft.folders[+t.closest(".ai-fr").dataset.i];f.w=!f.w;readSet();drawSet();break;
      case"fx":draft.folders.splice(+t.closest(".ai-fr").dataset.i,1);readSet();drawSet();break;
      case"fa":picker("");break;
      case"px":pk.classList.remove("on");break;
      case"pu":picker((pk._cur||"").split("/").slice(0,-1).join("/"));break;
      case"pp":
        if(!draft.folders.some(function(f){return f.p===pk._cur}))draft.folders.push({p:pk._cur,w:true});
        pk.classList.remove("on");readSet();drawSet();break;
    }
  });
  document.addEventListener("keydown",onKey);
  function onKey(e){if(e.key==="Escape"&&busy&&ai.offsetParent&&ai.contains(document.activeElement))stop()}

  /* ----- início ----- */
  ui();
  api("/api/ai/cfg").then(function(c){cfg=c;head();hint();if(!chat.m.length){inn.innerHTML="";empty()}}).catch(function(e){inn.innerHTML="";empty();toast(e.message)});
  inn.innerHTML="";
  loadChats();
  setTimeout(function(){if(!coarse)inp.focus()},50);

  return function(){
    document.removeEventListener("keydown",onKey);
    stopped=true;if(ctrl)ctrl.abort();if(pend)pend("s");
  };
};
})();
