import {getServerSession, Session} from "next-auth";
import {prisma} from "@/libs/prisma";

export const checkSessionAndGetData = async (req: Request) => {
    const session = await getServerSession();
    if (!session) {
        throw new Error('Unauthorized');
    }

    const data = await req.json();
    if (!data) {
        throw new Error('No data provided');
    }
    return {data, session};
}

export const getProfileBySession = async (session: Session) => {
    return prisma.freelancerProfile.upsert({
        where: {
            userEmail: session.user.email,
        },
        create: {
            userEmail: session.user.email,
        },
        update: {}
    })
}