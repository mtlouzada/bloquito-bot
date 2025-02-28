import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../declarations/bloco_de_nft_backend"; // Ajuste o caminho assim que possivel

const canisterId = process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai"; // Substitua pelo seu ID real

const agent = new HttpAgent({
  host: "http://localhost:4943", // Para local, use playground ou localhost:8000 para um dfx start normal
});

agent.fetchRootKey();

export const blocoDeNftBackend = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
