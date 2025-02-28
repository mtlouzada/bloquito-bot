# Bloquito-BOT - Dapp na ICP com Next.js

Este é um projeto [Next.js](https://nextjs.org) que se conecta a um **canister** na **Internet Computer (ICP)**. Foi configurado usando [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Como começar

### 1️⃣ Instale as dependências

Certifique-se de ter o **Node.js** e o **DFX SDK** instalados. Em seguida, rode:

```bash
npm install
# ou
yarn install
```

### 2️⃣ Inicie o ambiente local
O DFX é necessário para rodar o backend ICP localmente:

```bash
dfx start --background
```

### 3️⃣ Implante os canisters no ambiente local

```bash
dfx deploy
```

Se tudo der certo, o backend será iniciado e retornará um ID de canister.

### 4️⃣ Rode o frontend Next.js
Agora, inicie a aplicação:

```bash
npm run dev
# ou
yarn dev
```
Abra http://localhost:3000 no navegador para ver o resultado.

## 🎯 Configurando o Canister no Frontend
No frontend, usamos @dfinity/agent para interagir com o backend ICP.

### 1️⃣ Instale o Dfinity Agent

```bash
npm install @dfinity/agent
```

### 2️⃣ Crie um serviço para se conectar ao canister
Edite utils/icp.ts:

```bash
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../declarations/backend";

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

// O ID do canister backend é gerado no deploy
const canisterId = process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID!;

export const backendActor = Actor.createActor(idlFactory, { agent, canisterId });
```

### 📚 Mais informações
Para aprender mais sobre Next.js e ICP:

[Nextjs Docs](https://nextjs.org/docs)

[ICP Docs](https://internetcomputer.org/docs/home)

[Canister Guide](https://internetcomputer.org/docs/building-apps/essentials/canisters)