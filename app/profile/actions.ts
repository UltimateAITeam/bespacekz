"use server";

import { prisma } from "@/libs/prisma";
import { Pricing, PricingType, Prisma } from "@prisma/client";

export async function updateUserImage(email: string, image: string) {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      image,
    },
  });
}

export async function updatePricing(
  profile: string,
  projectRate: number,
  hourlyRate: number,
  employeeRate: number,
  pricingType: PricingType[],
) {
  const pricing = {} as any;
  if (
    (projectRate > 0 || hourlyRate > 0) &&
    pricingType.includes("FREELANCE")
  ) {
    pricing.pricingType = [PricingType.FREELANCE];
    pricing.hourlyRate = hourlyRate;
    pricing.projectRate = projectRate;
  }

  if (employeeRate > 0 && pricingType.includes("EMPLOYEE")) {
    pricing.pricingType = [
      ...(pricing.pricingType ?? []),
      PricingType.EMPLOYEE,
    ];
    pricing.employeeRate = employeeRate;
  }

  await prisma.pricing.deleteMany({
    where: {
      freelancerProfile: {
        userEmail: profile,
      },
    },
  });

  await prisma.freelancerProfile.update({
    where: {
      userEmail: profile,
    },
    data: {
      Pricing: {
        create: pricing,
      },
    },
  });
}
