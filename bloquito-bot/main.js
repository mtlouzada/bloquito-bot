const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
console.log("Token do bot:", process.env.DISCORD_BOT_TOKEN);

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.once("ready", () => {
  console.log(`🤖 Bot online como ${bot.user?.tag}`);
});

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "!ping") {
    await message.reply("Pong! 🏓");
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);
