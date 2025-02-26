import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", () => {
  console.log(`🤖 Bot iniciado como ${client.user?.tag}`);
});

export async function startBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error("Token do bot não encontrado!");

  await client.login(token);
}
