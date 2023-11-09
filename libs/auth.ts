import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {AuthOptions} from "next-auth";
import {prisma} from "@/libs/prisma";
import bcrypt from "bcrypt";
import {PrismaAdapter} from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Почта", type: "email", placeholder: "Введите почту"},
                password: { label: "Пароль", type: "password", placeholder: "Введите пароль"},
                name: { type: "text"},
                last_name: { type: "text" },
                location: { type: "text" },
                phone: { type: "text" },
                role: { type: "text" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if (!user) {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);

                    return prisma.user.create({
                        data: {
                            email: credentials?.email,
                            name: credentials?.name,
                            last_name: credentials?.last_name,
                            location: credentials?.location,
                            phone: credentials?.phone,
                            password: hashedPassword,
                            role: credentials?.role === "client" ? "CLIENT" : "FREELANCER",
                        },
                    })
                }
                const passwordMatch = await bcrypt.compare(credentials.password, user.password || "");

                if (!passwordMatch) {
                    return null;
                }

                return user
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        maxAge: 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login",
        signOut: "/signout",
        newUser: "/firststeps"
    },
    events: {
        signIn(message) {
            console.log(message.user, message.account)
        }
    },
    callbacks: {
        jwt: async ({token, user}) => {
            if(user) {
                token.last_name = user.last_name;
                token.role = user.role;
            }

            return token;
        },
        async session({session, token}) {
            session.user.role = token.role;
            session.user.last_name = token.last_name;
            return session;
        }
    }

}