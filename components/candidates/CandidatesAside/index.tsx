import { JobCategory } from '@prisma/client';


async function getExistCategories<T>(): Promise<T> {
  const result = await fetch(`${process.env.API_URL}/api/job_categories`, {
    method: 'GET',
  });
  return result.json() as T;
}

export const CandidatesAside = async () => {
  const categories = await getExistCategories<JobCategory[]>();
  return (
    <div>
    </div>
  );
};
