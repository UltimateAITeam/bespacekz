import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/libs/prisma';

export async function GET(req: NextRequest) {
  // Только те категории у которых есть вакансии
  const records = await prisma.jobCategory.findMany({
    where: {
      JobTitles: {
        some: {
          Vacancy: {
            some: {},
          },
        },
      },
    }
  });
  return NextResponse.json(records, {status: 200});
}
