import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/libs/prisma';

export async function GET(req: NextRequest, {params}: {params: {category_id: string}}) {
  const {category_id} = params;
  const limit = req.nextUrl.searchParams.get('limit');
  const excludeVacancyId = req.nextUrl.searchParams.get('exclude_id');

  try {
    const vacancy = await prisma.vacancy.findMany({
      take: limit ? parseInt(limit) : 3,
      where: {
        jobTitle: {
          category_id: Number(category_id),
        },
        id: {
            not: excludeVacancyId || undefined
        }
      },
      include: {
        jobTitle: true,
        clientProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(vacancy);
  } catch (e) {
    console.log('Пойман на ошибке', e);
    return NextResponse.json({error: e?.toString}, {status: 500});
  }
}
