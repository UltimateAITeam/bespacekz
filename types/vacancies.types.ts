import { Prisma } from '@prisma/client';

export type VacanciesQueryParams =  'category' | 'cities' | 'page' 

export interface IVacanciesSearchParams extends  Record<VacanciesQueryParams, string | string[]> {}

export type IVacancy = Prisma.VacancyGetPayload<{
    include: {
        jobTitle: true
    }
}>;