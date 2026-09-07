# Nexus — Dashboard (Camada 3)

Site estático, sem build — um `index.html` só. Login com Google, mostra a
fila de tarefas do Firestore em tempo real.

## 1. Regras de Segurança do Firestore (fazer ANTES de testar o site)

Sem isso, o Firestore bloqueia toda leitura por padrão e o dashboard não
mostra nada.

**Passo 1 — regra temporária, só pra testar o login:**

Firebase Console → projeto `erp-galpas` → Firestore Database → aba
**Regras** → substitui pelo conteúdo abaixo → **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /nexus_tasks/{doc} {
      allow read, write: if request.auth != null;
    }
    match /nexus_meta/{doc} {
      allow read, write: if request.auth != null;
    }
    match /nexus_usage_log/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Isso libera as coleções do Nexus pra **qualquer usuário autenticado** —
temporário, só pra você conseguir logar uma vez e pegar seu UID (o
dashboard mostra ele assim que você loga, num aviso amarelo no topo).

**Passo 2 — regra final, travada só no seu UID:**

Depois de logar e copiar seu UID do aviso amarelo, troca a regra por
essa (troca `COLE_SEU_UID_AQUI` pelo valor real):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /nexus_tasks/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == "COLE_SEU_UID_AQUI";
    }
    match /nexus_meta/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == "COLE_SEU_UID_AQUI";
    }
    match /nexus_usage_log/{doc} {
      allow read, write: if request.auth != null && request.auth.uid == "COLE_SEU_UID_AQUI";
    }
  }
}
```

**Publica de novo.** A partir daqui, mesmo alguém logando com outra conta
Google não consegue ler nem escrever nada nessas coleções — só a sua.

## 2. Testar local antes de publicar

Abre o `index.html` direto no navegador (duplo clique) e testa o login.
Se aparecer popup de login bloqueado, é o navegador barrando popup de
arquivo local — tudo bem, isso não acontece depois de publicado num
domínio de verdade (Netlify).

## 3. Publicar no Netlify

Caminho mais rápido (sem git, sem terminal):
1. Vai em https://app.netlify.com/drop
2. Arrasta a pasta com o `index.html` pra essa página
3. Ele gera uma URL pública na hora (tipo `nome-aleatorio.netlify.app`)

Isso é suficiente pra acessar de fora de casa, do jeito que você pediu.

## 4. Autorizar o domínio no Firebase (obrigatório)

O login com Google só funciona em domínios que o Firebase conhece.
Depois de publicar:

Firebase Console → Authentication → aba **Settings** → **Authorized
domains** → **Add domain** → cola o domínio que o Netlify te deu
(ex: `nome-aleatorio.netlify.app`, sem `https://`).

Sem esse passo, o login falha com erro de domínio não autorizado.

## O que esse dashboard mostra hoje

- Tarefas ativas (pendentes) em tempo real
- Gasto de hoje e total histórico
- Lista das últimas 50 tarefas: hora, status, prompt, custo

## O que ele NÃO faz ainda (de propósito — é só a Camada 3)

- Não cria tarefa nova (isso continua sendo `node dispatcher.js add` no
  terminal por enquanto)
- Não tem tela de configurações
- Não mostra o log de uso detalhado (`nexus_usage_log`) — só o resumo

## Sobre a apiKey aparecer no código

Isso é esperado e não é o segredo de verdade — a `apiKey` do Firebase é
pública por design em qualquer app web. A segurança real está inteira
nas Regras de Segurança que você configurou no passo 1. Nunca coloque
nesse arquivo a chave de admin (`firebase-key.json` ou parecido) — essa
sim é secreta e não tem lugar num site público.
