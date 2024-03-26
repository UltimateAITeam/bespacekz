import { JobCategory } from '@prisma/client';
import { CandidatesFilterContainer } from './ui/CandidatesFilterContainer';


async function getExistCandidatesCategories<T>(): Promise<T> {
  const result = await fetch(`${process.env.API_URL}/api/get_candidates/categories`, {
    method: 'GET',
  });
  const data = await result.json() as T
  return data;
}

export const CandidatesAside = async () => {
  const categories = await getExistCandidatesCategories<JobCategory[]>();

  return (
    <div>
      <CandidatesFilterContainer categories={categories} />
    </div>
  );
};
