import NextAuth from "next-auth"
import {Role} from "@prisma/client";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            name: string | null;
            email: string;
            last_name: string | null;
            role: Role | null;
        }
    }
    interface User {
        role: Role | null;
        last_name: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: Role | null;
        last_name: string | null;
    }
}