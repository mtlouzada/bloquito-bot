const { Client, GatewayIntentBits, PermissionFlagsBits } = require("discord.js");
require("dotenv").config();

console.log("Token do bot:", process.env.DISCORD_BOT_TOKEN);

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers, // Necessário para buscar membros
  ],
});

// Evento quando o bot estiver pronto
bot.once("ready", () => {
  console.log(`🤖 Bot online como ${bot.user?.tag}`);
});

// Comandos do bot
bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "!ping") {
    await message.reply("Pong! 🏓");
  }

  if (message.content.toLowerCase() === "bloquito") {
    await message.reply("Estou presente chefia!");
  }
});

// Função para conceder permissão a um usuário em um canal
async function grantAccessToChannel(guildId, channelId, userId) {
  try {
    const guild = await bot.guilds.fetch(guildId);
    if (!guild) throw new Error("Guilda não encontrada!");

    const channel = await guild.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) throw new Error("Canal inválido!");

    await channel.permissionOverwrites.edit(userId, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true,
    });

    console.log(`✅ Acesso concedido ao usuário ${userId} no canal ${channelId}`);
    return { success: true, message: "Permissão concedida com sucesso!" };
  } catch (error) {
    console.error("❌ Erro ao conceder permissão:", error);
    return { success: false, message: "Erro ao conceder permissão" };
  }
}

// Login do bot
bot.login(process.env.DISCORD_BOT_TOKEN);

// Exporta a função para ser usada na API Next.js
module.exports = { bot, grantAccessToChannel };