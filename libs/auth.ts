import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";
import { sendVerificationEmail } from "@/services/email-verification.service";
import { findClientSubscriptionById } from "@/services/client-subscription";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID || "",
      clientSecret: process.env.LINKEDIN_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      // works fine
      // @ts-ignore
      profile(profile, tokens) {
        const defaultImage =
          "https://cdn-icons-png.flaticon.com/512/174/174857.png";
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Почта", type: "email", placeholder: "Введите почту" },
        password: {
          label: "Пароль",
          type: "password",
          placeholder: "Введите пароль",
        },
        name: { type: "text" },
        last_name: { type: "text" },
        role: { type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            password: true,
            image: false,
            email: true,
            name: true,
            last_name: true,
            role: true,
            phone: true,
          },
        });

        if (!user) {
          if (credentials.role === "login") {
            return null;
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          // turn off email verification for now
          // await sendVerificationEmail({email: credentials.email})

          return prisma.user.create({
            data: {
              email: credentials?.email,
              name: credentials?.name,
              last_name: credentials?.last_name,
              password: hashedPassword,
              role: credentials?.role === "client" ? "CLIENT" : "FREELANCER",
            },
          });
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password || "",
        );

        if (!passwordMatch) {
          return null;
        }

        return { ...user, image: `/api/users/${user.id}/avatar` };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.last_name = user.last_name;
        token.role = user.role;
        token.phone = user.phone;

        const client = await prisma.clientProfile.findUnique({
          where: {
            userEmail: user.email!,
          },
          select: {
            id: true,
          },
        });

        if (client) {
          const clientSubscription = await findClientSubscriptionById(
            client.id,
          );

          if (clientSubscription) {
            token.client = {
              isSubscribed: true,
            };
          }
        }
        token.picture = `/api/users/${user.id}/avatar`;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.last_name = token.last_name;
        session.user.phone = token.phone;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + url;
    },
  },
};
