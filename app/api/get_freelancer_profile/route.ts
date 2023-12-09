import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {prisma} from "@/libs/prisma";


export async function GET(req: NextRequest) {
    const session = await getServerSession();
    if (!session) return NextResponse.json({"error": "Unauthorized"}, {status: 401});
    const profile = await prisma.freelancerProfile.findUnique({
        where: {
            userEmail: session.user?.email,
        },
        include: {
            Education: true,
            Experience: true,
            Skill: true,
            Pricing: true,
            Portfolio: true,
        },
    })
    const userInfo = await prisma.user.findUnique({
        where: {
            email: session.user?.email,
        },
        select: {
            name: true,
            last_name: true,
            phone: true,
            email: true,
            image: true,
            location: true,
            about: true,
        }
    })
    if (!profile || !userInfo) return NextResponse.json({"error": "User not found"}, {status: 404});
    return NextResponse.json({...profile, ...userInfo}, {status: 200});
}