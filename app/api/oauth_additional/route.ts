import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";

export async function POST(
    req: Request
) {
    try {
        const data = await req.json();
        if (data.role === "client" || data.role === "freelancer") {
            const user = await prisma.user.update({
                where: {
                    email: data.email,
                },
                data: {
                    last_name: data.last_name,
                    name: data.name,
                    location: data.location,
                    role: data.role.toUpperCase(),
                    birthdate: data.birthdate,
                }
            });

            return NextResponse.json({message: "User created"}, {status: 200});
        } else {
            throw new Error("INVALID ROLE")
        }
    } catch (err) {
        return NextResponse.json({error: err?.toString()}, {status: 500});
    }
}