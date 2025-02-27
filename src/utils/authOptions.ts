import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AuthOptions } from "next-auth";
import clientPromise from "./db";

export const authOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            authorization: {
                params: { scope: "identify guilds email" }, // Adicione mais escopos se necessário
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt", // 🔥 Garante que a sessão seja armazenada corretamente no MongoDB
    },
    callbacks: {
        async jwt({ token, user }:any) {
            console.log("JWT Callback", { token, user });
            if (user) {
                token.id = user.id ?? user._id;
            }
            return token;
        },
        async session({ session, token }:any) {
            console.log("Session Callback", { session, token });
            if (token?.id) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    debug: true,
} as AuthOptions;
