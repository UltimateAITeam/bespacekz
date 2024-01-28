export type VacanciesQueryParams =  'category' | 'cities' | 'page' 

export interface IVacanciesSearchParams extends  Record<VacanciesQueryParams, string | string[]> {}