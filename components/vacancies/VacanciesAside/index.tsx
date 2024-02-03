import { JobCategory } from '@prisma/client';
import { VacanciesFilterContainer } from './ui/VacanciesFilterContainer';

async function getExistCategories<T>(): Promise<T> {
  const result = await fetch(`${process.env.API_URL}/api/job_categories`, {
    method: 'GET',
  });
  return result.json() as T;
}

export const VacanciesAside = async () => {
  const categories = await getExistCategories<JobCategory[]>();
  return (
    <div>
      <VacanciesFilterContainer categories={categories}  />
    </div>
  );
};
