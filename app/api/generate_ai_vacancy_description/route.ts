import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {prisma} from "@/libs/prisma";


export async function GET(req: NextRequest) {
    // const user_input = req.query.user_input as string;
    return NextResponse.json({message: "Hello world!"}, {status: 200});
}