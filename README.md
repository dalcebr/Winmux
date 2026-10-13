# Meu PC — um "Windows 11" no navegador, rodando no Termux

Servidor web leve (somente biblioteca padrão do Python, sem `pip`) que transforma o Termux em um desktop acessível pelo navegador — no próprio celular ou em qualquer aparelho da mesma rede Wi-Fi.

**Apps incluídos:** Arquivos · Terminal · Git · Assistente IA (DeepSeek) · Código (IDE).

---

## Sumário

1. [Requisitos](#1-requisitos)
2. [Instalação e execução](#2-instalação-e-execução)
3. [Senha e segurança](#3-senha-e-segurança)
4. [Estrutura do projeto](#4-estrutura-do-projeto)
5. [A interface (desktop, janelas, menu Iniciar)](#5-a-interface)
6. [Apps](#6-apps)
   - [Arquivos](#61-arquivos) · [Terminal](#62-terminal) · [Git](#63-git) · [Assistente IA](#64-assistente-ia) · [Código (IDE)](#65-código-ide)
7. [Referência da API](#7-referência-da-api)
8. [Dados, variáveis de ambiente e configuração](#8-dados-variáveis-de-ambiente-e-configuração)
9. [Como criar um novo app](#9-como-criar-um-novo-app)
10. [Solução de problemas](#10-solução-de-problemas)
11. [Limitações conhecidas](#11-limitações-conhecidas)

---

## 1. Requisitos

| Item | Detalhe |
|---|---|
| Termux | Com `python` instalado (`pkg install python`) |
| Git (opcional) | `pkg install git` — necessário para o app Git, para o IDE não |
| Navegador | Chrome/Edge/Firefox/Safari recentes (usa `fetch`, `async/await`, `ResizeObserver`, `WebSocket`) |
| Internet | Só para: primeiro download do xterm.js (depois funciona offline), API do DeepSeek e GitHub |

Nenhuma dependência Python além da biblioteca padrão.

## 2. Instalação e execução

```sh
# 1. extraia o zip dentro do Termux
unzip ~/storage/downloads/win11-termux.zip -d ~

# 2. inicie
cd ~/win11-termux && sh start.sh
```

Na **primeira vez** o servidor pede para criar uma senha (mínimo 6 caracteres). Ao subir, ele mostra:

```
Servidor ativo (Ctrl+C para parar)
Neste celular : http://localhost:8080
Na sua rede   : http://192.168.1.14:8080
Arquivos em   : /data/data/com.termux/files/home
```

- Porta diferente: `sh start.sh 9000` (qualquer argumento numérico vira a porta; padrão `8080`).
- O `start.sh` ativa o `termux-wake-lock` (se existir) para o Android não suspender o servidor.
- Para parar: `Ctrl+C`. Para matar um servidor esquecido em segundo plano: `pkill -f server.py`.
- **Depois de atualizar os arquivos, reinicie o servidor e recarregue a página** — o menu de apps vive dentro da página, então uma aba aberta mostra a versão antiga.

### Trocar a senha

```sh
cd ~/win11-termux && python3 server.py --senha
```

Ou apague `~/.win11-termux/auth.json` e inicie de novo.

## 3. Senha e segurança

- **Login:** senha única, guardada apenas como hash PBKDF2-SHA256 (100 000 iterações, salt aleatório) em `~/.win11-termux/auth.json` (permissão `600`).
- **Sessão:** cookie `sid` (`HttpOnly`, `SameSite=Strict`) válido por 30 dias. O botão **Sair** do menu Iniciar encerra a sessão.
- **Força bruta:** 5 tentativas erradas por IP em 60 s bloqueiam o IP por 1 minuto; cada erro tem atraso de 0,8 s.
- **Todas as rotas `/api/*` e o WebSocket exigem login**, exceto `/api/auth` e `/api/login`.
- **Pasta raiz:** as APIs de arquivos (`/api/ls`, `/raw`, `/put`, `/op`, `/zip`, IDE) só enxergam o que está dentro de `~` (ou de `FM_ROOT`). Caminhos com `..` são rejeitados.
- **O Terminal e o `run_command` da IA não têm essa limitação** — dão acesso total ao Termux. Por isso a senha é obrigatória.
- Arquivos HTML/SVG servidos por `/api/raw` recebem `Content-Security-Policy: sandbox` (não executam scripts com acesso à sua sessão).

> ⚠️ O servidor usa **HTTP simples** e escuta em `0.0.0.0`. Use apenas em Wi-Fi de confiança. Para acesso pela internet, coloque atrás de um túnel/proxy com HTTPS (Cloudflare Tunnel, Tailscale, etc.). Em HTTP não-localhost o navegador bloqueia a API de área de transferência; o app usa um método alternativo para copiar.

**Segredos guardados em texto simples** (com permissão `600`) em `~/.win11-termux/`: chave da API DeepSeek (`ai.json`) e token do GitHub (`github.json`). Proteja o aparelho/backup de acordo.

## 4. Estrutura do projeto

```
win11-termux/
├── start.sh            # inicia o servidor (wake-lock + python3 server.py)
├── server.py           # servidor HTTP, arquivos (/api/ls, raw, put, op, zip), roteamento
├── termsrv.py          # login, terminal (PTY + WebSocket), comandos salvos, xterm.js offline
├── gitsrv.py           # app Git (usa o `git` do Termux + API do GitHub)
├── aisrv.py            # Assistente IA: proxy DeepSeek, ferramentas, permissões, conversas
├── idesrv.py           # IDE: leitura/gravação segura, lista de arquivos, busca no projeto
└── public/
    ├── index.html      # desktop: papel de parede, barra de tarefas, Iniciar, janelas, login
    ├── fm.js           # app Arquivos
    ├── term.js         # app Terminal
    ├── git.js          # app Git
    ├── ai.js           # app Assistente IA
    └── ide.js          # app Código (IDE)
```

Cada módulo `*srv.py` expõe uma função `route(h, method, path, q)` que devolve `True` se tratou a rota; o `server.py` as encadeia: terminal/login → git → IA → IDE → arquivos.

## 5. A interface

- **Barra de tarefas:** botão Iniciar, Pesquisar, ícones dos apps abertos (clique minimiza/restaura), tela cheia, relógio.
- **Menu Iniciar / Pesquisar:** grade de apps com filtro por nome; **Sair** encerra a sessão. `Esc` fecha.
- **Janelas:**
  - **Mover:** arraste a barra de título.
  - **Redimensionar:** arraste as bordas e os cantos (mínimo 320×240; não passa da tela). Os apps recebem um evento `resize` ao terminar.
  - **Maximizar/restaurar:** botão ou duplo clique no título. **Minimizar:** botão (volta pelo ícone na barra).
  - **Trazer para frente:** clique em qualquer ponto da janela.
  - **Celular (largura ≤ 700 px):** as janelas ocupam a tela toda; sem arrastar/redimensionar.
- Cada app abre uma única janela; reabrir só a traz para frente.

## 6. Apps

### 6.1 Arquivos

Gerenciador de arquivos da pasta raiz (`~`).

- Navegar por pastas, ordenar por nome, tamanho, data de modificação e de criação.
- Criar arquivo/pasta, renomear, **copiar/recortar/colar**, **excluir**.
- **Baixar** arquivo (ou várias seleções como `.zip` gerado na hora) e enviar arquivos do aparelho.
- **Extrair** arquivos compactados (zip, tar, gz, bz2, xz e, quando disponível, 7z).
- Editor de texto simples integrado (`Ctrl+S` salva, `Tab` indenta). Para edição séria use o app **Código**.

### 6.2 Terminal

Terminal real (PTY) no navegador, usando xterm.js.

- Até **8 sessões** simultâneas; as sessões continuam no servidor se você fechar a janela e **reconectam** com o histórico recente (buffer de 128 KB).
- Shell: `$SHELL`, ou `bash`, ou `/system/bin/sh`.
- Barra de teclas especiais para celular (Esc, Tab, Ctrl, Alt, setas…), ajuste de fonte (A−/A+).
- **Comandos salvos:** lista de atalhos (nome, comando, "executar ao tocar") guardada em `~/.win11-termux/commands.json`. Padrões: Limpar terminal, Listar arquivos, Atualizar pacotes.
- O xterm.js é baixado uma vez para `~/.win11-termux/vendor/` (servido em `/vendor/`); sem internet, o navegador tenta o CDN.

### 6.3 Git

Cliente estilo GitHub Desktop, usando o `git` instalado no Termux.

- **Conta GitHub:** conectar com *Personal Access Token* (permissão de repositório). O nome/e-mail usados nos commits são configuráveis.
- **Repositórios:** clonar (por URL ou escolhendo da sua conta), criar novo, adicionar pasta local existente, varrer o aparelho atrás de repositórios, remover da lista (não apaga arquivos).
- **Alterações:** ver arquivos modificados e o diff, escolher o que entra, **commit**, descartar alterações, desfazer o último commit.
- **Histórico:** lista de commits (com "carregar mais") e detalhes de cada um; **reverter** um commit.
- **Branches:** criar, trocar, mesclar, excluir; abortar merge/revert em andamento.
- **Remoto:** fetch, pull, push e publicar branch.
- Operações de rede têm tempo limite (clone: 30 min) e bloqueio por repositório para evitar comandos simultâneos.

### 6.4 Assistente IA

Chat com a API do **DeepSeek** (compatível com OpenAI) que **age no seu aparelho**: lê, cria, edita, move, copia e apaga arquivos e executa comandos — sempre dentro das permissões que você configura.

**Primeiro uso:** abra o app → ⚙ → cole a chave da API (`sk-…`) → Salvar.

**Chat**
- Respostas em *streaming*, Markdown completo (títulos, listas, tabelas, citações, links) e realce de sintaxe.
- **Copiar:** cada bloco de código tem botão *Copiar*; cada mensagem também. Funciona mesmo em HTTP.
- Parar a geração a qualquer momento, **regenerar** a última resposta, "Tentar de novo" após erro.
- Conversas salvas no servidor (menu ☰): reabrir, apagar. Resultados antigos de ferramentas são truncados no envio para economizar contexto.
- Modelos: `deepseek-chat` (rápido) e `deepseek-reasoner` (raciocínio — o texto de pensamento aparece em bloco recolhível). Campo livre para outros nomes.

**Ferramentas disponíveis para a IA**

| Ferramenta | Categoria | O que faz |
|---|---|---|
| `list_dir` | Ler | Lista uma pasta |
| `read_file` | Ler | Lê arquivo (com `start`/`end` de linhas; até 5 MB) |
| `search_files` | Ler | Busca por nome ou conteúdo (recursivo, até 100 resultados) |
| `write_file` | Escrever | Cria/sobrescreve arquivo |
| `edit_file` | Escrever | Troca um trecho exato (único, ou `replace_all`) |
| `make_dir` | Escrever | Cria pasta |
| `move_path` / `copy_path` | Escrever | Move/renomeia e copia |
| `delete_path` | Apagar | Apaga arquivo/pasta |
| `run_command` | Comandos | Executa no shell do Termux (saída até 20 000 caracteres, tempo limite configurável) |

**Permissões (⚙ → Permissões)**

Cada categoria (**Ler, Escrever, Apagar, Comandos**) pode ser:

- **Permitir** — a IA executa direto;
- **Perguntar** — aparece um cartão com o que será feito (comando, conteúdo, *diff*) e os botões *Permitir*, *Sempre nesta conversa* e *Negar*;
- **Negar** — a ferramenta nem é oferecida à IA.

Padrão: Ler = Permitir; Escrever, Apagar e Comandos = Perguntar.

**Pastas acessíveis:** você escolhe as pastas (com seletor) e marca cada uma como *Ler e escrever* ou *Somente leitura*. Sem nenhuma pasta definida, a IA enxerga toda a pasta inicial. A pasta de dados (`~/.win11-termux`) é **sempre bloqueada** para a IA.

> `run_command` roda no shell e **não respeita** o limite de pastas. Deixe em *Perguntar* se quiser revisar cada comando.

**Outras opções:** temperatura, endereço da API (para outros provedores compatíveis), máximo de passos por mensagem (padrão 25), tempo limite de comando (padrão 60 s), lixeira, instruções extras para a IA.

**Lixeira:** ao apagar ou sobrescrever, uma cópia vai para `~/.win11-termux/ai_trash/<data-hora>/`. Para desfazer, copie de volta manualmente.

**Segurança no servidor:** as permissões são verificadas no servidor a cada chamada (não só na interface); caminhos são resolvidos com `realpath` (links simbólicos não escapam das pastas liberadas).

### 6.5 Código (IDE)

Editor de código com explorador, abas, busca, terminal e execução.

**Editor**
- Realce de sintaxe: JavaScript, TypeScript, JSON, HTML (com `<script>`/`<style>` embutidos), CSS/SCSS, Markdown, Python, Shell, YAML, INI/TOML, SQL, C/C++, Java/C#/Kotlin/Swift/Dart, Go, Rust, PHP, Ruby, Lua, Dockerfile.
- Números de linha, linha atual destacada, indentação detectada automaticamente (2/4/8 espaços ou tabulação), auto-indentação, fechamento automático de `() [] {} "" '' \`\``, continuação de listas no Markdown.
- Desfazer/refazer nativos, quebra de linha opcional (ligada por padrão no celular; oculta os números de linha), zoom de fonte.
- Imagens abrem em pré-visualização; arquivos binários mostram opção de baixar; arquivos > 5 MB ou fora de UTF-8 são recusados. Preserva **CRLF/LF**, BOM e permissão de execução ao salvar.

**Explorador (barra lateral)**
- Árvore carregada sob demanda, ícones por tipo; menu de contexto (botão ⋮ ou botão direito / toque longo): novo arquivo/pasta (aceita `pasta/sub/arquivo.txt`), renomear, duplicar, copiar caminho, apagar, atualizar.
- **Abrir pasta…** define a pasta de trabalho (explorador, busca e terminal usam ela).
- A sessão (pasta, abas abertas, preferências) é lembrada no navegador.

**Busca**
- `Ctrl+P` — abrir arquivo por nome (busca aproximada).
- `Ctrl+F` / `Ctrl+H` — localizar/substituir no arquivo, com todos os resultados destacados; opções *Aa* (maiúsculas), *ab* (palavra inteira), `.*` (regex).
- `Ctrl+Shift+F` — buscar em todos os arquivos (filtros incluir/excluir, ex.: `*.py`), resultado abre direto na linha.

**Integração**
- **Terminal integrado** (`` Ctrl+` ``): usa as mesmas sessões do servidor e já abre na pasta de trabalho. Várias abas de terminal.
- **▶ Executar:** salva e roda o arquivo atual no terminal — `.py` (python3), `.js`/`.mjs` (node), `.sh` (bash), `.rb`, `.php`, `.lua`, `.go` (`go run`).
- **Mudanças externas:** a cada 3 s o IDE confere os arquivos abertos. Se a IA (ou outro programa) alterou um arquivo sem alterações suas, a aba atualiza sozinha; se você tinha edições, a aba fica marcada e ao salvar aparece *Sobrescrever / Recarregar / Cancelar* (detecção por data de modificação em nanossegundos). Arquivo apagado fica riscado.

**Atalhos**

| Atalho | Ação |
|---|---|
| `Ctrl+S` | Salvar |
| `Ctrl+P` | Abrir arquivo |
| `Ctrl+Shift+P` / `F1` | Paleta de comandos |
| `Ctrl+F` / `Ctrl+H` | Localizar / Substituir |
| `Ctrl+Shift+F` | Buscar nos arquivos |
| `Ctrl+G` | Ir para linha |
| `Ctrl+B` | Mostrar/ocultar barra lateral |
| `` Ctrl+` `` | Mostrar/ocultar terminal |
| `Ctrl+/` | Comentar/descomentar linhas |
| `Tab` / `Shift+Tab` | Indentar / recuar (seleção inclusive) |
| `Alt+↑` / `Alt+↓` | Mover linha |
| `Shift+Alt+↑` / `Shift+Alt+↓` | Duplicar linha |
| `Ctrl+Shift+K` | Apagar linha |
| `Ctrl+=` / `Ctrl+-` | Aumentar / diminuir fonte |
| `Alt+Z` | Alternar quebra de linha |
| `Esc` | Fecha diálogos, paleta, busca |

A **paleta de comandos** também tem: salvar todos, salvamento automático, teclas extras, formatar JSON, recarregar do disco, executar arquivo, novo terminal, abrir pasta, etc. A barra de status permite trocar indentação, fim de linha (LF/CRLF) e linguagem.

**Celular:** barra de teclas extras (`⇥ ↶ ↷ ← → ↑ ↓ { } ( ) [ ] < > ; : " ' \` = / \ | & ! _ - + * # $ % ~ ? , .`), barra lateral que abre por cima do editor e botão ⋮ para a paleta.

---

## 7. Referência da API

Todas as rotas exigem o cookie `sid`, exceto onde indicado. Erros retornam JSON `{"e": "mensagem"}` com o código HTTP adequado. Caminhos (`p`) são **relativos à pasta raiz**.

### Autenticação e sistema (`termsrv.py`)

| Método e rota | Descrição |
|---|---|
| `GET /api/auth` *(livre)* | `{ok: true/false}` — a sessão é válida? |
| `POST /api/login` *(livre)* | Corpo `{p: "senha"}`; define o cookie `sid` |
| `POST /api/logout` | Encerra a sessão |
| `GET /api/term/list` | IDs das sessões de terminal |
| `POST /api/term/new?cols=&rows=` | Cria sessão → `{id}` (máx. 8) |
| `POST /api/term/kill?id=` | Encerra a sessão |
| `GET /ws?id=` | WebSocket do terminal (veja abaixo) |
| `GET` / `PUT /api/cmds` | Lê/salva os comandos salvos `[{n, c, e}]` |
| `GET /vendor/<arquivo>` | xterm.js / addon-fit / css |

**Protocolo do WebSocket:** o cliente envia texto (teclas digitadas); quadros binários com JSON controlam o terminal — `{"r":[cols,rows]}` redimensiona, `{"p":1}` é *ping*. O servidor envia binário (saída do terminal) e, ao encerrar o processo, um texto JSON `{"exit": …}`.

### Arquivos (`server.py`)

| Método e rota | Descrição |
|---|---|
| `GET /api/ls?p=` | `{p, i:[[nome, éPasta, tamanho, modificado, criado], …]}` |
| `GET /api/raw?p=[&dl=1]` | Conteúdo do arquivo (`dl=1` força download) |
| `GET /api/zip?p=&n=a&n=b` | Zip em *streaming* dos itens `n` dentro de `p` |
| `PUT /api/put?p=` | Grava o corpo da requisição no arquivo (envio/edição) |
| `POST /api/op` | Corpo `{op, p, to?}` com `op` = `mkdir`, `touch`, `mv`, `cp`, `rm` ou `x` (extrair; `fresh` recusa destino existente) |

Códigos: `409` já existe, `404` não encontrado, `403` sem permissão, `400` pedido inválido.

### Git (`gitsrv.py`) — prefixo `/api/git/`

`state` · `auth` · `logout` · `ident` · `ghrepos` · `scan` · `clone` · `init` · `addrepo` · `rmrepo` · `status` · `diff` · `log` · `commit` (detalhes de um commit) · `commit_do` (cria commit) · `branches` · `discard` · `undo` · `checkout` · `delbranch` · `merge` · `revert` · `abort` · `fetch` · `pull` · `push` · `publish`

### Assistente IA (`aisrv.py`) — prefixo `/api/ai/`

| Método e rota | Descrição |
|---|---|
| `GET /cfg` | Configuração (a chave nunca é devolvida; só `key_set` e `key_hint`) |
| `PUT /cfg` | Atualiza (`key`, `clear_key`, `base`, `model`, `temp`, `steps`, `timeout`, `trash`, `extra`, `perms`, `folders`) |
| `POST /stream` | Corpo `{messages}` → *proxy* em streaming (SSE) para o DeepSeek, injetando chave, prompt de sistema e ferramentas permitidas |
| `POST /tool` | Corpo `{name, args, approved}` → `{r}` resultado, `{e}` erro, `{ask:1, cat}` precisa de aprovação ou `{denied}` |
| `GET /chats` | Lista de conversas `[{id, t, ts}]` |
| `GET` / `PUT /chat?id=` | Lê/salva uma conversa `{t, m}` |
| `POST /del?id=` | Apaga uma conversa |

### IDE (`idesrv.py`) — prefixo `/api/ide/`

| Método e rota | Descrição |
|---|---|
| `GET /read?p=` | `{text, mtime, size, eol, bom}` ou `{bin:1}` |
| `PUT /write?p=&m=&eol=&bom=[&force=1]` | Grava o corpo (texto). `m` = `mtime` conhecido; se o arquivo mudou no disco responde `409 {e:"conflict"}`. Mantém permissões |
| `GET /files?p=` | Lista recursiva de arquivos `{f:[…], cut}` (ignora `.git`, `node_modules`, `__pycache__`…; até 30 000) |
| `GET /search?p=&q=&cs=&w=&re=&inc=&exc=` | Busca de texto: `{r:[[arquivo, linha, ini, fim, trecho, offset]], n, cut}` (até 500 resultados, 20 s) |
| `POST /stat` | Corpo `{paths:[…]}` → `{caminho: mtime|null}` |
| `GET /info` | `{root}` — caminho absoluto da pasta raiz |

---

## 8. Dados, variáveis de ambiente e configuração

### Variáveis de ambiente

| Variável | Padrão | Função |
|---|---|---|
| `FM_ROOT` | `~` | Pasta raiz visível aos apps |
| `WIN11_DATA` | `~/.win11-termux` | Pasta de dados do sistema |

Exemplo: `FM_ROOT=$HOME/projetos sh start.sh 9000`

### Pasta de dados (`~/.win11-termux/`)

| Arquivo/pasta | Conteúdo |
|---|---|
| `auth.json` | Hash e salt da senha |
| `commands.json` | Comandos salvos do Terminal |
| `github.json` | Token, login, nome e e-mail do GitHub |
| `repos.json` | Lista de repositórios do app Git |
| `ai.json` | Configuração da IA (chave, modelo, permissões, pastas) |
| `ai_chats/` | Conversas da IA (`<id>.json` + `index.json`) |
| `ai_trash/` | Cópias de segurança de arquivos apagados/sobrescritos pela IA |
| `vendor/` | xterm.js baixado |

### Preferências guardadas no navegador (`localStorage`)

IDE: `ide.ws` (pasta), `ide.sess` (abas abertas), `ide.fs` (fonte), `ide.wrap`, `ide.auto`, `ide.keys`, `ide.sb`, `ide.th` (altura do terminal). Terminal e Git guardam seus próprios ajustes.

### Backup / migração

Copie `~/.win11-termux/` para manter senha, token, chave da IA, conversas e comandos.

---

## 9. Como criar um novo app

**Frontend** — crie `public/meuapp.js`:

```js
window.App_meuapp = function (root) {
  root.innerHTML = '<div style="padding:16px">Olá!</div>';
  // ... use fetch('/api/...') normalmente (o cookie vai junto)
  return function cleanup() {          // opcional: chamado ao fechar a janela
    // cancele timers, WebSockets, listeners...
  };
};
```

Registre no array `APPS` do `public/index.html`:

```js
{ id: "meuapp", name: "Meu App", src: "meuapp.js?v=1",
  icon: '<svg viewBox="0 0 24 24">…</svg>' }
```

O `id` precisa bater com o nome `App_<id>`. O `root` é o corpo da janela (posicione seu conteúdo com `position:absolute; inset:0`). Prefixe suas classes CSS (ex.: `.ma-`) — o CSS é global. Quando mudar o arquivo, aumente o `?v=` para vencer o cache.

**Backend (opcional)** — crie `meuappsrv.py`:

```python
ROOT = ""            # o server.py preenche

def route(h, method, path, q):
    if not path.startswith("/api/meuapp/"):
        return False          # não é comigo
    h.js({"ok": 1})           # h.js(obj, código=200) responde JSON
    return True
```

No `server.py`: `import meuappsrv as M`, acrescente `or M.route(self, method, u.path, q)` na cadeia de rotas e `M.ROOT = ROOT` no `main`. Para ler o corpo da requisição use `termsrv._body(h, limite_em_bytes)`.

## 10. Solução de problemas

| Sintoma | Causa / solução |
|---|---|
| App novo não aparece no menu | Servidor antigo ainda rodando ou aba com cache. `pkill -f server.py`, `sh start.sh`, depois recarregue (ou feche a aba e abra de novo) |
| `Defina a senha rodando: python3 server.py --senha` | Iniciou sem terminal interativo; rode manualmente uma vez |
| `Address already in use` | Já há um servidor na porta. `pkill -f server.py` ou use outra porta (`sh start.sh 9000`) |
| Terminal: "não foi possível carregar o xterm.js" | Primeira execução sem internet. Conecte e reinicie para baixar (fica em `~/.win11-termux/vendor/`) |
| Não abre de outro aparelho | Confira se estão na mesma rede e use o IP mostrado em "Na sua rede"; alguns roteadores isolam clientes Wi-Fi |
| Servidor para quando a tela apaga | Instale `pkg install termux-api` (para `termux-wake-lock`) e desative a otimização de bateria do Termux |
| IA: `DeepSeek (401)` | Chave inválida — refaça em ⚙ |
| IA: `DeepSeek (402)` | Saldo insuficiente na conta DeepSeek |
| IA: `DeepSeek (429)` | Limite de requisições; aguarde |
| IA: "Fora das pastas permitidas" | O caminho não está em ⚙ → Pastas acessíveis |
| IA: "Limite de N passos" | Envie "continuar" ou aumente em ⚙ → Avançado |
| IDE: "O arquivo mudou no disco" | Outro programa (ou a IA) alterou o arquivo; escolha *Recarregar* ou *Sobrescrever* |
| IDE: "não está em UTF-8" | O editor só abre texto UTF-8; converta com `iconv` no terminal |
| Git: falha ao enviar/clonar | Confira o token (permissão de repositório) e a internet; veja a mensagem do `git` exibida no app |
| "Sessão expirada" / tela de login | Cookie vencido ou servidor reiniciado (as sessões ficam em memória): entre de novo |

## 11. Limitações conhecidas

- **Um único usuário/senha.** Sessões de login ficam em memória: reiniciar o servidor desloga todos.
- **HTTP sem criptografia** (veja o aviso na seção 3).
- **IDE:** sem autocompletar/LSP, sem múltiplos cursores, sem controle de versão embutido (use o app Git), arquivos de texto UTF-8 até 5 MB; com quebra de linha ligada os números de linha ficam ocultos.
- **IA:** o contexto do modelo é limitado — em conversas longas com muitos arquivos, comece uma nova conversa; `run_command` não é limitado por pastas; a lixeira não tem restauração automática.
- **Arquivos:** operações em pastas gigantes carregam a listagem inteira de uma vez.
- Pensado para Termux/Linux (usa `pty`, `termios`); não roda no Windows nativo.
