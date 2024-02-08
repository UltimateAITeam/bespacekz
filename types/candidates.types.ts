import { Prisma } from '@prisma/client';

export enum CandidatesQueryEnum {
    category = 'category',
    cities = 'cities',
    page = 'page',
  }
  
  export interface ICandidatesSearchParams extends Record<CandidatesQueryEnum, string | number[]> {}

  export type ICandidate = Prisma.FreelancerProfileGetPayload<{
    include: {
      user: true,
      Education: true,
      Experience: true,
      Languages: true,
      Portfolio: true,
      Pricing: true,
      jobTitle: true,
    };
  }>;
  