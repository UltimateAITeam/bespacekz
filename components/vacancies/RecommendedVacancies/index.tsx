import {Prisma} from '@prisma/client';
import VacancyCard from '../VacancyCard';

type Vacancy = Prisma.VacancyGetPayload<{
  include: {
    jobTitle: true;
    clientProfile: true;
  };
}>;

export async function RecommendedVacancies({
  category_id,
  exclude_vac_id,
}: {
  category_id: number;
  exclude_vac_id: string;
}) {
  const res = await fetch(
    `${process.env.API_URL}/api/get_vacancies/by_category/${category_id}?exclude_id=${exclude_vac_id}&limit=3`, {
      method: 'GET'
    }
  );
  const data: Vacancy[] = await res.json();
  return (
    <div className="space-y-8">
      {data.map((vacancy) => {
        return <VacancyCard key={vacancy.id} {...vacancy} />;
      })}
    </div>
  );
}
