import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      image: any;
      /** The user's postal address. */
      id: string;
      name: string | null;
      email: string;
      last_name: string | null;
      role: Role | null;
      location: string | null;
      phone: string | null;
    };
  }
  interface User {
    id: string;
    role: Role | null;
    last_name: string | null;
          phone: string | null;

  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role | null;
    last_name: string | null;
          phone: string | null;

    client?: {
      isSubscribed: boolean;
    };
  }
}
