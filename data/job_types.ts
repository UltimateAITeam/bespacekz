import {PricingType} from '@prisma/client';

export const job_types: readonly {value: PricingType; label: string}[] = [
  {
    value: PricingType.EMPLOYEE,
    label: 'Сотрудник',
  },
  {
    value: PricingType.FREELANCE,
    label: 'Фрилансер',
  },
];
