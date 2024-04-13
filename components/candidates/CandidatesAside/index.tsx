import { JobCategory } from "@prisma/client";
import { CandidatesFilterContainer } from "./ui/CandidatesFilterContainer";

async function getExistCategories<T>(): Promise<T> {
  const result = await fetch(
    `${process.env.API_URL}/api/get_candidates/categories`,
    {
      method: "GET",
    },
  );
  return result.json() as T;
}

export const CandidatesAside = async () => {
  const categories = await getExistCategories<JobCategory[]>();

  return (
    <div>
      <CandidatesFilterContainer categories={categories} />
    </div>
  );
};
