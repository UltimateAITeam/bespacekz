export interface IStaffingCategory {
  id: number;
  slug: string;
  title: string;
  description: string;
  roles: string[];
}

export const staffingCategories: IStaffingCategory[] = [
  {
    id: 1,
    slug: "development",
    title: "Разработка и IT",
    description:
      "Подберём разработчиков, тестировщиков и DevOps-инженеров под ваш стек и сроки проекта.",
    roles: [
      "Frontend / Backend разработчики",
      "Мобильные разработчики",
      "QA-инженеры",
      "DevOps и системные администраторы",
    ],
  },
  {
    id: 2,
    slug: "design-creative",
    title: "Дизайн и креатив",
    description:
      "Найдём дизайнеров, которые сделают ваш продукт или бренд заметным и удобным.",
    roles: [
      "UI/UX дизайнеры",
      "Графические дизайнеры",
      "Моушн-дизайнеры",
      "Бренд-дизайнеры",
    ],
  },
  {
    id: 3,
    slug: "marketing",
    title: "Маркетинг",
    description:
      "Подберём маркетологов, которые помогут привлечь и удержать клиентов.",
    roles: [
      "Специалисты по таргетированной рекламе",
      "SMM-менеджеры",
      "SEO-специалисты",
      "Контент-маркетологи",
    ],
  },
];

export function getStaffingCategoryBySlug(slug: string) {
  return staffingCategories.find((category) => category.slug === slug);
}
