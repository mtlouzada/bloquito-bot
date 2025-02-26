import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { AuthOptions } from "next-auth";
import clientPromise from "./db";

export const authOptions = {
    providers: [
        DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID!,
          clientSecret: process.env.DISCORD_CLIENT_SECRET!,
          authorization: {
            params: {scope: "identify guilds"}, // Adicionando "guilds"
          }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt", // Use JWT for session storage
    },
    callbacks: {
        async jwt({ token, user }: any) {
        // If user object is available, it's a sign-in event
        if (user) {
            token.id = user.id; // Attach the user ID to the token
        }
        return token;
        },
        async session({ session, token }: any) {
        // Attach the user ID from the token to the session
        if (token?.id) {
            session.user.id = token.id;
        }
        return session;
        },
    },
} as AuthOptions