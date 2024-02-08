export class CandidatesService {

    static async getCandidates({filtersParams, pageParam, ITEMS_PER_PAGE}: {filtersParams: URLSearchParams, pageParam: string | number, ITEMS_PER_PAGE: number}) {
        return  await fetch(`/api/get_candidates?${filtersParams}&page=${pageParam || 1}&limit=${ITEMS_PER_PAGE}`, {
            method: 'GET',
          });
    }
}