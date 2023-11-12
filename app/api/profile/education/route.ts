import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";

export async function POST(
    req: Request
) {
    try {
        
    } catch (err) {
        return NextResponse.json({error: err?.toString()}, {status: 500});
    }
}