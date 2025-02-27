import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ message: "Bot iniciado com sucesso!" });
  } catch (error) {
    console.error("Erro ao iniciar o bot:", error);
    return NextResponse.json({ error: "Erro ao iniciar o bot" }, { status: 500 });
  }
}
