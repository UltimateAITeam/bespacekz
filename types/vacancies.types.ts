import { Prisma } from '@prisma/client';

export enum VacanciesQueryEnum {
  category = 'category',
  cities = 'cities',
  job_types = 'job_types',
  page = 'page',
  favorite = 'favorite'
}

export interface IVacanciesSearchParams extends Record<VacanciesQueryEnum, string | number[]> {}

export type IVacancy = Prisma.VacancyGetPayload<{
  include: {
    jobTitle: true;
    clientProfile: true
    favoritedBy:{
      select: {
        user:{
          select:{
            id: true
          }
        }
      }
    }
  };
}>;
