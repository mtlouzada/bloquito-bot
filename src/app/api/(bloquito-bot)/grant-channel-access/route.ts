import { NextResponse } from "next/server";
import { grantAccessToChannel } from "@/bloquito-bot/main.js"; // Importa a função do bot

export async function POST(req: Request) {
  const { guildId, channelId, userId } = await req.json();

  if (!guildId || !channelId || !userId) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const result = await grantAccessToChannel(guildId, channelId, userId);
  return NextResponse.json(result);
}