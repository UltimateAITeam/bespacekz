import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

// /api/vacancies?limit=10&page=1
export async function GET(
    req: NextRequest
) {
    // extract limit and offset from query params
    const limit = req.nextUrl.searchParams.get("limit");
    const page = req.nextUrl.searchParams.get("page");

    try {
        if (!limit || !page ) return NextResponse.json({error: "no limit or page provided"}, {status: 400})
        if (limit == "0" && page == "0") {
            const vacancyCount = await prisma.vacancy.count();
            console.log(vacancyCount)
            return NextResponse.json({count: vacancyCount}, {status: 200})
        } else {
            const data = await prisma.vacancy.findMany({
            skip: parseInt(limit) * (parseInt(page) - 1),
            take: parseInt(limit),
        })
        return NextResponse.json({data: data}, {status: 200})
        }
        
    } catch (e) {
        return NextResponse.json({error: e?.toString}, {status: 500});
    }
}