import { prisma } from '@/libs/prisma';
import { VacanciesQueryEnum } from '@/types/vacancies.types';
import { PricingType, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// /api/vacancies?limit=10&page=1
export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit');
  const page = req.nextUrl.searchParams.get(VacanciesQueryEnum.page);
  const cities = req.nextUrl.searchParams.getAll(VacanciesQueryEnum.cities);
  const categories = req.nextUrl.searchParams.getAll(VacanciesQueryEnum.category);
  const job_types = req.nextUrl.searchParams.getAll(VacanciesQueryEnum.job_types);

  try {
    if (!limit || !page) return NextResponse.json({error: 'no limit or page provided'}, {status: 400});

    const query: Prisma.VacancyFindManyArgs = {
      include: {
        jobTitle: true,
        clientProfile: true
      },
      where: {
        city: {
          in: cities.length > 0 ? cities : undefined, // Поиск вакансий, где город входит в массив выбранных городов
        },
        jobTitle: {
          category: {
            category_name: {
              in: categories.length > 0 ? categories : undefined,
            },
          },
        },
        pricingType: {
          in: job_types.length > 0 ? job_types as PricingType[] : undefined
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.vacancy.findMany({skip: parseInt(limit) * (parseInt(page) - 1), take: parseInt(limit), ...query}),
      prisma.vacancy.count({where: query.where}),
    ]);


    return NextResponse.json({data: data, count}, {status: 200});
  } catch (e) {
    console.log('Пойман на ошибке', e);
    return NextResponse.json({error: e?.toString}, {status: 500});
  }
}
