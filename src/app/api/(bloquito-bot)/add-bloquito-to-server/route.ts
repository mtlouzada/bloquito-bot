import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function GET() {
  const session:any = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const res = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) throw new Error("Erro ao buscar servidores");

    const guilds = await res.json();

    // Filtra apenas servidores onde o usuário é administrador
    const adminGuilds = guilds.filter((guild: any) => (guild.permissions & 0x8) === 0x8);

    const inviteLinks = adminGuilds.map((guild: any) => ({
      guildName: guild.name,
      inviteUrl: `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=bot&permissions=8&guild_id=${guild.id}`,
    }));

    return NextResponse.json(inviteLinks);
  } catch (error) {
    console.error("Erro ao obter servidores:", error);
    return NextResponse.json({ error: "Erro ao obter servidores" }, { status: 500 });
  }
}
