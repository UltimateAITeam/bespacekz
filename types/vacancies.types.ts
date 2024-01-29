import { Prisma } from '@prisma/client';

export enum VacanciesQuery {category = 'category', cities = 'cities', page = 'page' }

export interface IVacanciesSearchParams extends  Record<VacanciesQuery, string | number[]> {}

export type IVacancy = Prisma.VacancyGetPayload<{
    include: {
        jobTitle: true
    }
}>;