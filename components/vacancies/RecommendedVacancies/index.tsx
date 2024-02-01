import {Prisma} from '@prisma/client';
import VacancyCard from '../VacancyCard';

type Vacancy = Prisma.VacancyGetPayload<{
  include: {
    jobTitle: true;
    clientProfile: true;
  };
}>;

export async function RecommendedVacancies({category_id, exclude_vac_id}: {category_id: number, exclude_vac_id: string}) {
  const data: Vacancy[] = await fetch(`${process.env.API_URL}/api/vacancies/by_category/${category_id}?exclude_id=${exclude_vac_id}&limit=3`).then((res) =>
    res.json()
  );

  return (
    <div className="space-y-8">
      {data.map((vacancy) => {
        return <VacancyCard key={vacancy.id} {...vacancy} />;
      })}
    </div>
  );
}
