import { prisma } from "@/libs/prisma";
import { VacanciesQueryEnum } from "@/types/vacancies.types";
import { PricingType, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// /api/freelancers?limit=10&page=1
export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit");
  const page = req.nextUrl.searchParams.get(VacanciesQueryEnum.page);
  const cities = req.nextUrl.searchParams.getAll(VacanciesQueryEnum.cities);
  const categories = req.nextUrl.searchParams.getAll(
    VacanciesQueryEnum.category,
  );

  try {
    if (!limit || !page)
      return NextResponse.json(
        { error: "no limit or page provided" },
        { status: 400 },
      );

    const query: Prisma.FreelancerProfileFindManyArgs = {
      select: {
        user: {
          select: {
            image: true,
            about: true,
            name: true,
            last_name: true,
            location: true,
          },
        },
        Education: true,
        Experience: true,
        Languages: true,
        Pricing: true,
        Portfolio: true,
        jobTitle: true,
        Skills: true,
        id: true,
      },
      where: {
        user: {
          role: "FREELANCER",
        },
        jobTitle: {
          category: {
            category_name: {
              in: categories.length ? categories : undefined,
            },
          },
        },
        /*  city: {
          in: cities.length ? cities : undefined, // Поиск вакансий, где город входит в массив выбранных городов
        },
        jobTitle: {
          category: {
            category_name: {
              in: categories.length ? categories : undefined,
            },
          },
        } */
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.freelancerProfile.findMany({
        skip: parseInt(limit) * (parseInt(page) - 1),
        take: parseInt(limit),
        ...query,
      }),
      prisma.freelancerProfile.count({ where: query.where }),
    ]);

    return NextResponse.json({ data: data, count }, { status: 200 });
  } catch (e) {
    console.log("Пойман на ошибке", e);
    return NextResponse.json({ error: e?.toString }, { status: 500 });
  }
}
