export interface IServiceItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
}

// ============ Каталог проектов / услуг (используется на /services) ============
export const servicesData: IServiceItem[] = [
  {
    id: 1,
    slug: "logo-design",
    title: "Дизайн логотипов",
    description:
      "Уникальный и запоминающийся логотип для вашего бренда от профессиональных дизайнеров.",
    image: "/images/logo-design.png",
  },
  {
    id: 2,
    slug: "articles-blog-posts",
    title: "Статьи и блоги",
    description:
      "Качественные тексты, статьи и посты для блога, которые привлекают и удерживают читателей.",
    image: "/images/blog.png",
  },
  {
    id: 3,
    slug: "wordpress",
    title: "Wordpress",
    description:
      "Разработка и настройка сайтов на Wordpress: от лендингов до интернет-магазинов.",
    image: "/images/wordpress.png",
  },
  {
    id: 4,
    slug: "social-media-management",
    title: "Маркетинг в социальных сетях",
    description:
      "Ведение и продвижение аккаунтов в социальных сетях, рост подписчиков и вовлеченности.",
    image: "/images/social-marketing.png",
  },
  {
    id: 5,
    slug: "video-editing",
    title: "Видеомонтаж",
    description:
      "Профессиональный монтаж видео для роликов, рекламы и социальных сетей.",
    image: "/images/video-editing.png",
  },
  {
    id: 6,
    slug: "seo",
    title: "SEO",
    description:
      "Поисковая оптимизация сайта для повышения позиций в поисковых системах.",
    image: "/images/seo.png",
  },
];

export const getServiceBySlug = (slug: string) =>
  servicesData.find((service) => service.slug === slug);
