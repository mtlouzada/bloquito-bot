import { authOptions } from "@/utils/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const session:any = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        // Requisição para obter os servidores do usuário
        const response = await axios.get("https://discord.com/api/users/@me/guilds", {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
    
        // Filtra apenas servidores onde o usuário é dono (owner) ou tem permissão de administração
        const adminGuilds = response.data.filter((guild: any) => (guild.permissions & 0x20) === 0x20);
    
        return NextResponse.json(adminGuilds, {status: 200});
      } catch (error) {
        console.error("Erro ao buscar servidores:", error);
        return NextResponse.json({error: "Erro ao buscar servidores"}, { status: 500});
      }
}