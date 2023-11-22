import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";

export async function POST(
    req: Request
) {
    try {
        const data = await req.json();
        const session = await getServerSession();
        if (!session || !session.user.email) {
            return NextResponse.json({error: "Email is required"}, {status: 400});
        }

        const clientProfile = await prisma.clientProfile.findUnique({
            where: {
                userEmail: session.user.email,
            }
        })
        if (!clientProfile) return NextResponse.json({error: "Client profile not found for user"}, {status: 404});

        const vacancy = await prisma.vacancy.create({
            data: {
                clientId: clientProfile.id,
                ...data
            }
        });

        console.log(vacancy);

        return NextResponse.json({message: "Vacancy created"}, {status: 200});
    } catch (err) {
        console.log(err?.toString())
        return NextResponse.json({error: err?.toString()}, {status: 500});
    }
}