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
        const user = await prisma.clientProfile.create({
            data: {
                userEmail: session.user.email as string,
                isCompany: data?.isCompany as boolean,
                companyInfo: data?.companyInfo as string,
                sphereOfWork: data?.sphereOfWork as string,
            } as any
        });

        return NextResponse.json({message: "User created"}, {status: 200});
    } catch (err) {
        console.log(err?.toString())
        return NextResponse.json({error: err?.toString()}, {status: 500});
    }
}