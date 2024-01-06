import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

// /api/vacancies?cities=Astana&limit=10&page=1
export async function GET(
    req: NextRequest
) {
    // getAll - дает параметры виде массива /api/vacancies?cities=Astana&cities=Almaty - ['Astana','Almaty']
    const categories = req.nextUrl.searchParams.getAll("categories"); 
    const employment = req.nextUrl.searchParams.getAll("employment");
    const cities = req.nextUrl.searchParams.getAll("cities");

    // extract limit and offset from query params
    const limit = req.nextUrl.searchParams.get("limit");
    const page = req.nextUrl.searchParams.get("page");


    console.log('cities', cities);
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
                orderBy: {
                    createdAt: 'desc',
                },
                where: {
                    city: {
                        in: cities.length ? cities : undefined, // Поиск вакансий, где город входит в массив выбранных городов
                    },
                    
                }
            })
            return NextResponse.json({data: data}, {status: 200})
        }
        
    } catch (e) {
        console.log("Пойман на ошибке", e);
        return NextResponse.json({error: e?.toString}, {status: 500});
    }
}