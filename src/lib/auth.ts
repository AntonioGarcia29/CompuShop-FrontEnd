import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google" && account.id_token) {
        // First login: send Google token to backend and get our JWT
        try {
          const res = await fetch(`${API_BASE_URL}/auth/google/callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: account.id_token }),
          });

          if (res.ok) {
            const data = await res.json();
            token.accessToken = data.access_token;
            token.userId = data.user?.id;
          }
        } catch (error) {
          console.error("Error exchanging Google token with backend:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userId = token.userId as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

// Type augmentation
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userId?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    userId?: string;
  }
}
