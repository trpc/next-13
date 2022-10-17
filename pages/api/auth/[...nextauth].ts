import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "github",
      name: "Mocked GitHub",
      async authorize(credentials) {
        const name = credentials?.name as string;
        const user: User = {
          id: name,
          name: name,
          email: name,
        };
        return user;
      },
      credentials: {
        name: { type: "test" },
      },
    }),
  ],
};

export default NextAuth(nextAuthOptions);
