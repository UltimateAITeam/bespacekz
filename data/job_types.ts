import { PricingType } from "@prisma/client";

export const JOB_TYPES_MAP: Record<PricingType, string> = {
  EMPLOYEE: "Сотрудник",
  FREELANCE: "Фрилансер",
};

export const job_types: readonly { value: PricingType; label: string }[] = [
  {
    value: PricingType.EMPLOYEE,
    label: "Сотрудник",
  },
  {
    value: PricingType.FREELANCE,
    label: "Фрилансер",
  },
];
