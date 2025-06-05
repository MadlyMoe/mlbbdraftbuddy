import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Discord({
    profile(profile) {
      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.avatar,
        role: "user", // 👈 default role
      };
    },
  }),
];

export const authConfig = {
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "user";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (session.user && token?.role) {
        session.user.id = user?.id ?? token?.sub ?? null;
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
} satisfies NextAuthConfig;

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
