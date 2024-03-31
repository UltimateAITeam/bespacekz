// ====================== Sublinks for Find Talent ==========================
const SubLinks1 = [
    {
        id: 1,
        head: "Разместите вакансию и найдите профессионала",
        headers: "Торговая площадка талантов",
        subhead: {
            name: "Торговая площадка талантов",
            des: "Узнайте о работе с талантами или исследуйте ваши конкретные потребности в найме.",
            subheadlink: { name: "Наймите на торговой площадке талантов", link: "/candidates" }
        },
                
        sublink: [
            { id: 1, linktext: "Разработка и IT", link: "/cat/dev-it" },
            { id: 2, linktext: "Административная поддержка и обслуживание клиентов", link: "/cat/admin-customer-support" },
            { id: 3, linktext: "Инженерия и архитектура", link: "/cat/engineering-architecture" },
            { id: 4, linktext: "Дизайн и креатив", link: "/cat/design-creative" },
            { id: 5, linktext: "Финансы и бухгалтерский учет", link: "/cat/finance-accounting" },
            { id: 7, linktext: "Продажи и маркетинг", link: "/cat/sales-marketing" },
            { id: 8, linktext: "HR и обучение", link: "/cat/hr-training" },
            { id: 9, linktext: "Письмо и переводы", link: "/cat/writing-translation" },
            { id: 10, linktext: "Юридические услуги", link: "/cat/legal" },
            { id: 6, linktext: "Наймите фрилансеров", link: "/hire" },
        ]
    },

    {
        id: 2,
        head: "Просмотрите и приобретите проекты",
        headers: "Каталог талантов",
        subhead: {
            name: "Каталог проектов",
            des: "Просмотрите и приобретите проекты с четким описанием и ценой.",
            subheadlink: { name: "Просмотр каталога проектов", link: "/works"}
        },

        sublink: [
            { 
                id: 1,
                linktext: "Дизайн логотипов", 
                link: "/services/logo-design", 
                img: "/images/logo-design.png" 
            },
            { 
                id: 2,
                linktext: "Статьи и блоги",
                link: "/services/articles-blog-posts", 
                img: "/images/blog.png" 
            },
            { 
                id: 3,
                linktext: "Wordpress",
                link: "/services/wordpress", 
                img: "/images/wordpress.png" 
            },
            { 
                id: 4,
                linktext: "Маркетинг в социальных сетях", 
                link: "/services/social-media-management", 
                img: "/images/social-marketing.png" 
            },
            { 
                id: 5,
                linktext: "Видеомонтаж",
                link: "/services/video-editing",
                img: "/images/video-editing.png" 
            },
            { 
                id: 6,
                linktext: "SEO",
                link: "/services/seo",
                img: "/images/seo.png" 
            },
        ]
    },
    {
        id: 3,
        head: "Позвольте нам найти вам подходящего специалиста",
        headers: "Поиск талантов",
        subhead: {
            name: "Поиск талантов",
            des: "Узнайте, как наши рекрутеры находят вам опытных разработчиков, дизайнеров и маркетологов.",
            subheadlink: { name: "Обратитесь к поиску талантов", link: "/staffing" }
        },
                
        sublink: [
            { id: 1, linktext: "Разработка и IT", link: "/staffing/development" },
            { id: 2, linktext: "Дизайн и креатив", link: "/staffing/design-creative" },
            { id: 3, linktext: "Маркетинг", link: "/staffing/marketing" },
        ]
    },
];


// ====================== Sublinks for Find Jobs ==========================
const SubLinks2 = [
    {
        id: 1,
        name: "Вакансии на сегодня",
        des: "Найдите работу своей мечты и развивайте свою карьеру",
        link: "/vacancies"
    },

    {
        id: 2,
        name: "Все вакансии по вашему профилю",
        des: "Исследуйте вакансии в вашей области.",
        link: "/jobs/all-jobs"
    }
];

// ====================== Sublinks for Why Brenda ==========================
const SubLinks3 = [
    {
        id: 1,
        name: "Success Stories",
        des: "Discovare how terms work strategically and grow together",
        link: "/success-stories"
    },
    { 
        id: 2,
        name: "How to hire",
        des: "Learn about the different ways to get work done",
        link: "/how-to-hire"
    },
    { 
        id: 3,
        name: "Reviews",
        des: "See what it's like to collaborate on upwork",
        link: "/reviews"
    },
    { 
        id: 4,
        name: "How to find work", 
        des: "Learn about how to grow your independent career",
        link: "/how-to-find-work"
    }
];

export {SubLinks1, SubLinks2, SubLinks3};