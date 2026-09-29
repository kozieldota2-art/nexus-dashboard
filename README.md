# Nexus

Painel do cérebro operacional Nexus.

## Estrutura

- autenticação Google pelo Firebase;
- banco Firestore nomeado `nexus`;
- memória em grafo, backlinks, tags e revisões;
- decisões, projetos, agenda e trabalho do Codex;
- integração planejada com o T-Watch Ultra e QBIT.

## Desenvolvimento

```sh
npm install
npm run dev
```

Copie `.env.example` para `.env.local` e preencha a configuração pública do app Web Firebase. O arquivo `.env.local` não deve ser versionado.

## Segurança

As regras da base nomeada ficam em `firestore.nexus.rules`. Credenciais administrativas e chaves privadas nunca devem entrar no repositório.
