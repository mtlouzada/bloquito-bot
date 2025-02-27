import { Client, GatewayIntentBits, PermissionFlagsBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

export async function grantAccessToChannel(
  guildId,
  channelId,
  userId
) {
  try {
    // Obtém o servidor
    const guild = await client.guilds.fetch(guildId);
    if (!guild) throw new Error("Guilda não encontrada!");

    // Obtém o canal
    const channel = await guild.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) throw new Error("Canal inválido!");

    // Define permissões para o usuário
    await channel.permissionOverwrites.edit(userId, {
      ViewChannel: true, // Permite ver o canal
      SendMessages: true, // Permite enviar mensagens
      ReadMessageHistory: true, // Pode ler mensagens antigas
    });

    console.log(`Acesso concedido ao usuário ${userId} no canal ${channelId}`);
    return { success: true, message: "Permissão concedida com sucesso!" };
  } catch (error) {
    console.error("Erro ao conceder permissão:", error);
    return { success: false, message: "Erro ao conceder permissão" };
  }
}

// Login do bot
client.login(process.env.DISCORD_BOT_TOKEN);
