import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";

export async function POST(
    req: Request
) {
    try {
        const data = await req.json();
        if (data.prompt && data.prompt.length > 0) {
            console.log(data.prompt)
        }
        return NextResponse.json({generatedText: "Hello, how are doing?"}, {status: 200});
    } catch (err) {
        console.log(err?.toString())
        return NextResponse.json({error: err?.toString()}, {status: 500});
    }
}