import { useEffect, useState } from "react";

export default function GuildList() {
  const [guilds, setGuilds] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/discord/servers")
      .then((res) => res.json())
      .then((data) => setGuilds(data))
      .catch((err) => console.error("Erro ao buscar servidores:", err));
  }, []);

  return (
    <div>
      <h2>Seus Servidores</h2>
      <ul>
        {guilds.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          guilds.map((guild) => (
            <li key={guild.id}>
              {guild.name}{" "}
              <a
                href={`https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=bot&permissions=8&guild_id=${guild.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ➕ Adicionar Bot
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
