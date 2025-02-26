"use client";
import { useState } from "react";

export default function BotControl() {
  const [status, setStatus] = useState<string | null>(null);

  const startBot = async () => {
    setStatus("Iniciando...");
    try {
      const res = await fetch("/api/start-bloquito", { method: "POST" });
      const data = await res.json();
      setStatus(data.message || "Erro ao iniciar bot");
    } catch (error) {
      setStatus("Erro ao iniciar bot");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Controle do Bot</h2>
      <button onClick={startBot} disabled={status === "Iniciando..."}>
        🚀 Iniciar Bot
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
