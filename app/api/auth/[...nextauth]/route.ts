import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: "my-next-app-secret-for-sessi%#on-and-password",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user || !credentials?.password) return null;
        const isvalid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isvalid) return null;
        return { id: user.id, firstName: user.firstName, email: user.email };
      },
    }),
  ],
});
export { handler as GET, handler as POST };
