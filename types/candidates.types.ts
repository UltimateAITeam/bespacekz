import { Prisma } from "@prisma/client";

export enum CandidatesQueryEnum {
  category = "category",
  cities = "cities",
  page = "page",
}

export interface ICandidatesSearchParams
  extends Record<CandidatesQueryEnum, string | number[]> {}

export type ICandidate = Prisma.FreelancerProfileGetPayload<{
  select: {
    user: {
      select: {
        image: true;
        about: true;
        name: true;
        last_name: true;
        location: true;
        email: true;
      };
    };
    Education: true;
    Experience: true;
    Languages: true;
    Pricing: true;
    Portfolio: true;
    jobTitle: true;
    Skills: true;
    id: true;
  };
}>;
