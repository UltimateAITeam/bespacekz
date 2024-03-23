export class CandidatesService {
  static async getCandidates({
    filtersParams,
    pageParam,
    ITEMS_PER_PAGE,
  }: {
    filtersParams: URLSearchParams;
    pageParam: string | number;
    ITEMS_PER_PAGE: number;
  }) {
    return fetch(
      `/api/get_candidates?${filtersParams}&page=${pageParam || 1}&limit=${ITEMS_PER_PAGE}`,
      {
        method: "GET",
      },
    );
  }

  static async getCandidateById({ id }: { id: string }) {
    return fetch(`${process.env.API_URL}/api/get_candidates/${id}/`, {
      method: "GET",
    });
  }
}
