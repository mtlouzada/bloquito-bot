import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

// Essa função precisa que o Id do servidor do discord seja passado como guildId
export async function POST(req: NextRequest) {
  const session:any = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { guildId } = await req.json();
  const url = `https://discord.com/api/v10/guilds/${guildId}/channels`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Erro ao obter canais" }, { status: res.status });
    }

    const channels = await res.json();

    // Filtrar canais válidos (texto e voz)
    const filteredChannels = channels
      .filter((channel: any) => channel.type === 0 || channel.type === 2) // 0 = Texto, 2 = Voz
      .map((channel: any) => ({
        id: channel.id,
        name: channel.name,
        type: channel.type === 0 ? "Texto" : "Voz",
      }));

    return NextResponse.json(filteredChannels);
  } catch (error) {
    console.error("Erro ao buscar canais:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}