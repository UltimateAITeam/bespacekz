export enum CandidatesQueryEnum {
    category = 'category',
    cities = 'cities',
    page = 'page',
  }
  
  export interface ICandidatesSearchParams extends Record<CandidatesQueryEnum, string | number[]> {}