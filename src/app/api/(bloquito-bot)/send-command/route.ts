import { NextRequest, NextResponse } from "next/server";
import {bot} from "@/bloquito-bot/main.js"; // Importa o bot

export async function POST(req: NextRequest) {
  try {
    const { command, channelId } = await req.json();

    if (!command || !channelId) {
      return NextResponse.json(
        { error: "Faltando command ou channelId" },
        { status: 400 }
      );
    }

    const channel = await bot.channels.fetch(channelId);

    if (!channel || !channel.isTextBased()) {
      return NextResponse.json(
        { error: "Canal inválido ou não encontrado" },
        { status: 404 }
      );
    }

    if (command === "ping") {
      (channel as any).send("Pong!");
    } else {
      (channel as any).send(`Comando não reconhecido: ${command}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar comando:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}