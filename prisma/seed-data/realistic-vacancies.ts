import { CurrencyType, PricingType } from "@prisma/client";

/**
 * Job categories reused/created for the realistic dataset. Category names stay in
 * English because they are the existing taxonomy behind the vacancies filter and
 * are shared with vacancies created by real users.
 */
export const CATEGORY_IT = "IT & Software";
export const CATEGORY_DATA = "Data Science";
export const CATEGORY_PRODUCT = "Product Management";
export const CATEGORY_DESIGN = "Design";
export const CATEGORY_MARKETING = "Marketing";
export const CATEGORY_LOGISTICS = "Logistics";

export interface EmployerSeed {
  slug: string;
  email: string;
  contactName: string;
  contactLastName: string;
  phone: string;
  companyInfo: string;
  sphereOfWork: string;
  companyDescription: string;
  address: string;
  mailIndex: string;
  contactUrl: string;
  location: string;
}

export const employers: EmployerSeed[] = [
  {
    slug: "alatau",
    email: "hr@alatau-digital.kz",
    contactName: "Айгерим",
    contactLastName: "Сатпаева",
    phone: "+7 727 355 12 40",
    companyInfo: "ТОО «Алатау Диджитал»",
    sphereOfWork: "Заказная разработка ПО и IT-аутсорсинг",
    companyDescription:
      "Продуктовая студия полного цикла из Алматы. С 2016 года разрабатываем веб- и мобильные сервисы для банков, ритейла и государственных заказчиков Казахстана. В команде 120 инженеров, работаем по гибридному графику.",
    address: "г. Алматы, пр. Аль-Фараби, 77/7, БЦ «Есентай Тауэр»",
    mailIndex: "050040",
    contactUrl: "https://alatau-digital.kz",
    location: "Almaty",
  },
  {
    slug: "tumar",
    email: "hr@tumar-fintech.kz",
    contactName: "Дамир",
    contactLastName: "Оспанов",
    phone: "+7 727 311 88 05",
    companyInfo: "ТОО «Тумар Финтех»",
    sphereOfWork: "Финтех, платёжные сервисы",
    companyDescription:
      "Разрабатываем платёжную платформу и сервисы эквайринга для казахстанского рынка. Обрабатываем более 4 млн транзакций в месяц, входим в реестр платёжных организаций Национального Банка РК.",
    address: "г. Алматы, ул. Назарбаева, 223, БЦ «Форум»",
    mailIndex: "050013",
    contactUrl: "https://tumar-fintech.kz",
    location: "Almaty",
  },
  {
    slug: "astanasoft",
    email: "jobs@astanasoftlab.kz",
    contactName: "Мадина",
    contactLastName: "Ержанова",
    phone: "+7 717 249 63 21",
    companyInfo: "ТОО «Астана Софт Лаб»",
    sphereOfWork: "Enterprise-разработка и системная интеграция",
    companyDescription:
      "Резидент Astana Hub. Внедряем и сопровождаем корпоративные системы для квазигосударственного сектора: документооборот, порталы услуг, интеграционные шины.",
    address: "г. Астана, пр. Мәңгілік Ел, 55/22, Astana Hub",
    mailIndex: "010000",
    contactUrl: "https://astanasoftlab.kz",
    location: "Astana",
  },
  {
    slug: "saryarqa",
    email: "hr@saryarqa-market.kz",
    contactName: "Ержан",
    contactLastName: "Кабылов",
    phone: "+7 721 244 17 90",
    companyInfo: "ТОО «Сарыарқа Маркет»",
    sphereOfWork: "E-commerce, онлайн-маркетплейс",
    companyDescription:
      "Региональный маркетплейс товаров повседневного спроса. Более 3 000 продавцов и собственная сеть пунктов выдачи в Карагандинской, Павлодарской и Акмолинской областях.",
    address: "г. Караганда, пр. Бухар Жырау, 49",
    mailIndex: "100000",
    contactUrl: "https://saryarqa-market.kz",
    location: "Karaganda",
  },
  {
    slug: "bayterek",
    email: "career@bayterek-telecom.kz",
    contactName: "Асель",
    contactLastName: "Нурланова",
    phone: "+7 717 270 45 33",
    companyInfo: "ТОО «Байтерек Телеком»",
    sphereOfWork: "Телекоммуникации и связь",
    companyDescription:
      "Оператор связи и дата-центров. Строим оптические сети и предоставляем услуги colocation и облачной инфраструктуры для корпоративных клиентов в Астане и северных регионах.",
    address: "г. Астана, ул. Достык, 18",
    mailIndex: "010000",
    contactUrl: "https://bayterek-telecom.kz",
    location: "Astana",
  },
  {
    slug: "iceberg",
    email: "hr@iceberg-logistics.kz",
    contactName: "Тимур",
    contactLastName: "Абдрахманов",
    phone: "+7 727 390 22 18",
    companyInfo: "ТОО «Айсберг Логистика»",
    sphereOfWork: "Транспортная логистика и складские решения",
    companyDescription:
      "Оператор ответственного хранения и мультимодальных перевозок. Управляем складским комплексом класса A площадью 42 000 м² и собственным автопарком.",
    address: "г. Алматы, ул. Рыскулова, 103",
    mailIndex: "050050",
    contactUrl: "https://iceberg-logistics.kz",
    location: "Almaty",
  },
  {
    slug: "zhetysu",
    email: "hr@zhetysu-agrotech.kz",
    contactName: "Нурлан",
    contactLastName: "Бекмуратов",
    phone: "+7 728 232 09 74",
    companyInfo: "ТОО «Жетісу Агротех»",
    sphereOfWork: "Агротехнологии и промышленный IoT",
    companyDescription:
      "Разрабатываем системы точного земледелия: датчики влажности почвы, телеметрия техники, спутниковый мониторинг посевов. Наши решения используют более 200 хозяйств Жетісу и Алматинской области.",
    address: "г. Талдыкорган, ул. Абылай хана, 217",
    mailIndex: "040000",
    contactUrl: "https://zhetysu-agrotech.kz",
    location: "Taldykorgan",
  },
  {
    slug: "korkem",
    email: "hello@korkem-design.kz",
    contactName: "Динара",
    contactLastName: "Алимова",
    phone: "+7 725 253 61 08",
    companyInfo: "Студия «Көркем Дизайн»",
    sphereOfWork: "Брендинг и дизайн-агентство",
    companyDescription:
      "Независимая дизайн-студия из Шымкента. Занимаемся брендингом, digital-продуктами и моушн-графикой для казахстанских и центральноазиатских брендов.",
    address: "г. Шымкент, пр. Тауке хана, 41",
    mailIndex: "160000",
    contactUrl: "https://korkem-design.kz",
    location: "Shymkent",
  },
];

export interface VacancySeed {
  employer: string;
  title: string;
  category: string;
  city: string;
  country: string;
  pricingType: PricingType;
  currency: CurrencyType;
  priceFrom: number;
  priceTo: number;
  isClear: boolean;
  /** Rendered on the card as "Требуемый опыт работы: {experience} лет", so keep it a bare number. */
  experience: string;
  requiredSkills: string[];
  aboutVacancy: string;
  /** Days before "now" the vacancy was posted, used to stagger the feed ordering. */
  postedDaysAgo: number;
}

export const vacancies: VacancySeed[] = [
  {
    employer: "alatau",
    title: "Ведущий Frontend-разработчик (React)",
    category: CATEGORY_IT,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 1_200_000,
    priceTo: 1_800_000,
    isClear: true,
    experience: "5",
    requiredSkills: ["React", "TypeScript", "Next.js", "GraphQL"],
    postedDaysAgo: 1,
    aboutVacancy:
      "<p>Мы ищем ведущего frontend-разработчика в команду, которая развивает интернет-банк для одного из крупнейших розничных банков Казахстана. Продуктом ежедневно пользуются более 800 тысяч клиентов.</p><h3>Обязанности</h3><ul><li>Развивать клиентскую часть интернет-банка на React и Next.js</li><li>Проектировать архитектуру фронтенда и выносить переиспользуемые компоненты в общую дизайн-систему</li><li>Проводить code review и выстраивать инженерные стандарты внутри команды из 6 разработчиков</li><li>Работать в связке с продуктовыми аналитиками и дизайнерами над новыми фичами</li><li>Следить за производительностью: Core Web Vitals, размер бандла, серверный рендеринг</li></ul><h3>Требования</h3><ul><li>От 5 лет коммерческой разработки на JavaScript и не менее 3 лет с React</li><li>Уверенное владение TypeScript, понимание строгой типизации в больших кодовых базах</li><li>Опыт работы с Next.js (SSR, ISR, App Router) и GraphQL</li><li>Практика написания unit- и e2e-тестов (Jest, Playwright)</li><li>Опыт наставничества или технического лидерства в команде</li></ul><h3>Условия</h3><ul><li>Гибридный формат: 3 дня в офисе в БЦ «Есентай Тауэр», 2 дня удалённо</li><li>Годовой бонус по результатам работы и пересмотр вознаграждения раз в год</li><li>Медицинская страховка с первого месяца, включая стоматологию</li><li>Оплата профильных конференций и англоязычных курсов</li></ul>",
  },
  {
    employer: "alatau",
    title: "Backend-разработчик (Node.js)",
    category: CATEGORY_IT,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 800_000,
    priceTo: 1_250_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
    postedDaysAgo: 3,
    aboutVacancy:
      "<p>Команда интеграционных сервисов ищет backend-разработчика. Вы будете отвечать за сервисы, через которые проходят обмены данными между CRM заказчика, платёжным шлюзом и складскими системами.</p><h3>Обязанности</h3><ul><li>Разрабатывать и поддерживать микросервисы на Node.js и TypeScript</li><li>Проектировать схемы данных в PostgreSQL, писать и оптимизировать запросы</li><li>Интегрироваться с внешними REST- и SOAP-сервисами, разбирать их особенности и ограничения</li><li>Покрывать код тестами и участвовать в code review</li><li>Настраивать сборку и деплой сервисов в Docker</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта backend-разработки на Node.js</li><li>Хорошее знание TypeScript, Express или NestJS</li><li>Уверенная работа с реляционными базами данных и понимание индексов и транзакций</li><li>Опыт работы с очередями сообщений (RabbitMQ, Kafka) будет плюсом</li><li>Понимание принципов REST, идемпотентности и версионирования API</li></ul><h3>Условия</h3><ul><li>Гибкое начало рабочего дня с 9:00 до 11:00</li><li>Медицинская страховка и компенсация спортзала</li><li>Внутренние технические митапы каждые две недели</li></ul>",
  },
  {
    employer: "alatau",
    title: "Инженер по автоматизации тестирования (QA Automation)",
    category: CATEGORY_IT,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 600_000,
    priceTo: 950_000,
    isClear: true,
    experience: "2",
    requiredSkills: ["TypeScript", "Python", "Docker"],
    postedDaysAgo: 5,
    aboutVacancy:
      "<p>Ищем инженера по автоматизации тестирования, который поможет сократить время регрессионного прогона и повысить стабильность релизов на нескольких продуктовых командах.</p><h3>Обязанности</h3><ul><li>Разрабатывать и поддерживать автотесты интерфейса на Playwright</li><li>Писать API-тесты и нагрузочные сценарии</li><li>Встраивать автотесты в CI и следить за стабильностью прогонов</li><li>Анализировать падения, заводить и сопровождать баг-репорты</li><li>Участвовать в приёмке требований и оценке тестируемости фич</li></ul><h3>Требования</h3><ul><li>От 2 лет опыта в автоматизации тестирования веб-приложений</li><li>Знание TypeScript или Python на уровне уверенного написания тестового кода</li><li>Понимание HTTP, работы с REST API и инструментов вроде Postman</li><li>Базовые навыки работы с Docker и Git</li><li>Умение писать понятную тестовую документацию</li></ul><h3>Условия</h3><ul><li>Возможность вырасти в роль QA Lead в течение полутора лет</li><li>Гибридный график и оплачиваемое обучение</li><li>Медицинская страховка после испытательного срока</li></ul>",
  },
  {
    employer: "tumar",
    title: "Backend-разработчик Java (финтех)",
    category: CATEGORY_IT,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 1_300_000,
    priceTo: 2_000_000,
    isClear: true,
    experience: "4",
    requiredSkills: ["Java", "PostgreSQL", "Redis", "Docker"],
    postedDaysAgo: 2,
    aboutVacancy:
      "<p>В команду процессинга платёжной платформы требуется backend-разработчик на Java. Наши сервисы обрабатывают более 4 млн транзакций в месяц, поэтому цена ошибки высокая, а требования к надёжности серьёзные.</p><h3>Обязанности</h3><ul><li>Разрабатывать сервисы процессинга платежей на Java 17 и Spring Boot</li><li>Обеспечивать отказоустойчивость и идемпотентность финансовых операций</li><li>Оптимизировать производительность под нагрузкой, работать с Redis и кэшированием</li><li>Участвовать в интеграциях с банками-эквайерами и международными платёжными системами</li><li>Поддерживать соответствие требованиям PCI DSS</li></ul><h3>Требования</h3><ul><li>От 4 лет коммерческой разработки на Java</li><li>Глубокое знание Spring Framework, JPA/Hibernate</li><li>Опыт проектирования и эксплуатации высоконагруженных сервисов</li><li>Уверенная работа с PostgreSQL, понимание уровней изоляции транзакций</li><li>Опыт в финтехе или банковской сфере будет существенным преимуществом</li></ul><h3>Условия</h3><ul><li>Официальное трудоустройство, зарплата до вычета налогов</li><li>Квартальные премии, привязанные к показателям платформы</li><li>Расширенная медицинская страховка для сотрудника и одного члена семьи</li><li>Современный офис в центре Алматы, парковка</li></ul>",
  },
  {
    employer: "tumar",
    title: "Инженер по информационной безопасности",
    category: CATEGORY_IT,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 1_000_000,
    priceTo: 1_500_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["Bash", "Docker", "AWS", "Python"],
    postedDaysAgo: 7,
    aboutVacancy:
      "<p>Мы расширяем команду информационной безопасности и ищем инженера, который будет отвечать за защиту платёжной инфраструктуры и подготовку к ежегодному аудиту PCI DSS.</p><h3>Обязанности</h3><ul><li>Проводить анализ защищённости сервисов и инфраструктуры, выявлять уязвимости</li><li>Настраивать и сопровождать средства защиты: WAF, SIEM, системы контроля доступа</li><li>Участвовать в реагировании на инциденты и расследованиях</li><li>Внедрять практики безопасной разработки (SAST, DAST, проверка зависимостей)</li><li>Готовить документацию и сопровождать внешние аудиты</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта в информационной безопасности</li><li>Понимание сетевых протоколов, TLS, механизмов аутентификации и авторизации</li><li>Опыт работы с Linux, навыки скриптования на Bash или Python</li><li>Знакомство с требованиями PCI DSS или ISO 27001</li><li>Наличие профильных сертификатов будет плюсом</li></ul><h3>Условия</h3><ul><li>Бюджет на сертификацию и профильное обучение</li><li>Гибридный формат работы</li><li>Расширенная медицинская страховка</li></ul>",
  },
  {
    employer: "tumar",
    title: "Продуктовый аналитик",
    category: CATEGORY_PRODUCT,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 700_000,
    priceTo: 1_100_000,
    isClear: true,
    experience: "2",
    requiredSkills: ["Python", "PostgreSQL", "SQL"],
    postedDaysAgo: 9,
    aboutVacancy:
      "<p>Ищем продуктового аналитика, который будет помогать командам принимать решения на основе данных, а не интуиции. Вы будете работать с продуктовой воронкой платёжного приложения и метриками удержания.</p><h3>Обязанности</h3><ul><li>Считать и поддерживать продуктовые метрики, строить дашборды</li><li>Проектировать и анализировать A/B-эксперименты, оценивать статистическую значимость</li><li>Проводить исследования пользовательского поведения и когортный анализ</li><li>Формулировать гипотезы роста вместе с продуктовыми менеджерами</li><li>Развивать систему продуктовой аналитики и качество событийных данных</li></ul><h3>Требования</h3><ul><li>От 2 лет работы продуктовым или бизнес-аналитиком</li><li>Уверенный SQL: оконные функции, CTE, оптимизация запросов</li><li>Python для анализа данных: pandas, numpy</li><li>Понимание базовой статистики и методологии A/B-тестирования</li><li>Опыт работы с BI-инструментами (Tableau, Metabase, Superset)</li></ul><h3>Условия</h3><ul><li>Прямое влияние на продуктовые решения и доступ ко всем данным</li><li>Гибкий график и гибридный формат</li><li>Медицинская страховка</li></ul>",
  },
  {
    employer: "astanasoft",
    title: "DevOps-инженер (Kubernetes)",
    category: CATEGORY_IT,
    city: "Astana",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 1_100_000,
    priceTo: 1_700_000,
    isClear: true,
    experience: "4",
    requiredSkills: ["Docker", "AWS", "Bash", "Go"],
    postedDaysAgo: 4,
    aboutVacancy:
      "<p>Мы переводим корпоративные системы наших заказчиков с виртуальных машин на Kubernetes и ищем DevOps-инженера, который возглавит эту миграцию с технической стороны.</p><h3>Обязанности</h3><ul><li>Проектировать и поддерживать кластеры Kubernetes в закрытом контуре</li><li>Развивать CI/CD-пайплайны в GitLab CI, внедрять GitOps-подход (ArgoCD)</li><li>Описывать инфраструктуру кодом с помощью Terraform и Ansible</li><li>Настраивать мониторинг и алертинг: Prometheus, Grafana, Loki</li><li>Участвовать в разборе инцидентов и повышать доступность сервисов</li></ul><h3>Требования</h3><ul><li>От 4 лет опыта в DevOps или системном администрировании Linux</li><li>Практический опыт эксплуатации Kubernetes в продакшене</li><li>Уверенное владение Docker, Helm, Terraform</li><li>Скриптование на Bash, желательно знание Go или Python</li><li>Опыт работы с закрытыми контурами и требованиями к защите информации будет плюсом</li></ul><h3>Условия</h3><ul><li>Офис в Astana Hub, налоговые льготы резидента</li><li>Гибкий график, возможность частично работать удалённо</li><li>Оплата сертификаций CKA/CKAD</li></ul>",
  },
  {
    employer: "astanasoft",
    title: "Разработчик .NET / C#",
    category: CATEGORY_IT,
    city: "Astana",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 900_000,
    priceTo: 1_400_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["C#", "MySQL", "Azure", "Docker"],
    postedDaysAgo: 8,
    aboutVacancy:
      "<p>Требуется разработчик .NET в команду, которая развивает систему электронного документооборота для квазигосударственного сектора. Система охватывает более 15 тысяч пользователей.</p><h3>Обязанности</h3><ul><li>Разрабатывать серверную часть на .NET 8 и ASP.NET Core</li><li>Развивать существующие модули документооборота и электронной подписи</li><li>Проектировать и оптимизировать работу с базой данных</li><li>Участвовать в интеграциях с внешними государственными сервисами</li><li>Готовить техническую документацию по разработанным модулям</li></ul><h3>Требования</h3><ul><li>От 3 лет коммерческой разработки на C#</li><li>Знание ASP.NET Core, Entity Framework Core</li><li>Опыт работы с реляционными СУБД и написания сложных запросов</li><li>Понимание принципов SOLID и паттернов проектирования</li><li>Опыт работы с ЭЦП и криптографическими библиотеками будет преимуществом</li></ul><h3>Условия</h3><ul><li>Стабильные долгосрочные проекты и прогнозируемая нагрузка</li><li>Обучение за счёт компании</li><li>Медицинская страховка после испытательного срока</li></ul>",
  },
  {
    employer: "astanasoft",
    title: "Системный аналитик",
    category: CATEGORY_IT,
    city: "Astana",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 750_000,
    priceTo: 1_150_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["SQL", "BPMN", "UML", "REST API"],
    postedDaysAgo: 11,
    aboutVacancy:
      "<p>Ищем системного аналитика, который станет связующим звеном между заказчиком и командой разработки на проектах системной интеграции.</p><h3>Обязанности</h3><ul><li>Собирать и формализовать требования заказчика, проводить интервью</li><li>Описывать бизнес-процессы в нотации BPMN и проектировать процессы «как должно быть»</li><li>Готовить технические задания, спецификации интеграций и описания API</li><li>Согласовывать решения с архитектором и командой разработки</li><li>Сопровождать приёмочное тестирование и обучение пользователей</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта системным или бизнес-аналитиком в IT</li><li>Умение писать структурированные технические задания</li><li>Знание нотаций BPMN, UML и опыт работы в Confluence и Jira</li><li>Понимание принципов интеграции систем: REST, SOAP, форматы обмена</li><li>Уверенный SQL для самостоятельной проверки данных</li></ul><h3>Условия</h3><ul><li>Офис в Astana Hub, гибридный формат</li><li>Прямое участие в крупных республиканских проектах</li><li>Медицинская страховка</li></ul>",
  },
  {
    employer: "saryarqa",
    title: "Frontend-разработчик (Vue.js)",
    category: CATEGORY_IT,
    city: "Karaganda",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 600_000,
    priceTo: 900_000,
    isClear: true,
    experience: "2",
    requiredSkills: ["JavaScript", "TypeScript", "Vue.js"],
    postedDaysAgo: 6,
    aboutVacancy:
      "<p>Наш маркетплейс растёт, и мы ищем frontend-разработчика в команду витрины. Вы будете работать над страницами каталога и оформления заказа, которые напрямую влияют на конверсию.</p><h3>Обязанности</h3><ul><li>Развивать витрину маркетплейса на Vue 3 и Nuxt</li><li>Верстать адаптивные интерфейсы по макетам Figma</li><li>Оптимизировать скорость загрузки страниц каталога</li><li>Участвовать в A/B-экспериментах вместе с продуктовой командой</li><li>Поддерживать и расширять внутреннюю библиотеку компонентов</li></ul><h3>Требования</h3><ul><li>От 2 лет коммерческого опыта во frontend-разработке</li><li>Уверенное знание JavaScript, опыт с Vue 3 и Composition API</li><li>Хорошая адаптивная вёрстка, понимание кроссбраузерности</li><li>Базовое знание TypeScript</li><li>Опыт работы с e-commerce проектами будет плюсом</li></ul><h3>Условия</h3><ul><li>Офис в центре Караганды, возможен удалённый формат для кандидатов из других городов</li><li>Скидки на товары маркетплейса</li><li>Пересмотр зарплаты каждые полгода</li></ul>",
  },
  {
    employer: "saryarqa",
    title: "Менеджер маркетплейса (Product Owner)",
    category: CATEGORY_PRODUCT,
    city: "Karaganda",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 700_000,
    priceTo: 1_050_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["SQL", "Jira", "Agile"],
    postedDaysAgo: 12,
    aboutVacancy:
      "<p>Ищем Product Owner, который возьмёт на себя направление личного кабинета продавца. Сейчас на площадке более 3 000 продавцов, и удобство их инструментов — один из наших ключевых приоритетов.</p><h3>Обязанности</h3><ul><li>Отвечать за продуктовую стратегию и роадмап личного кабинета продавца</li><li>Формировать и приоритизировать бэклог, писать пользовательские истории</li><li>Проводить интервью с продавцами и выявлять их болевые точки</li><li>Ставить задачи команде разработки и принимать результат</li><li>Отслеживать продуктовые метрики: активация продавцов, время публикации товара, отток</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта в роли продукт-менеджера или Product Owner</li><li>Опыт работы в e-commerce или маркетплейсе</li><li>Умение работать с данными и самостоятельно строить SQL-запросы</li><li>Практика работы по Scrum или Kanban</li><li>Сильные коммуникативные навыки и умение защищать решения</li></ul><h3>Условия</h3><ul><li>Широкая зона ответственности и самостоятельность в принятии решений</li><li>Годовой бонус по результатам направления</li><li>Гибридный график</li></ul>",
  },
  {
    employer: "saryarqa",
    title: "Специалист по контекстной рекламе",
    category: CATEGORY_MARKETING,
    city: "Karaganda",
    country: "Kazakhstan",
    pricingType: PricingType.FREELANCE,
    currency: CurrencyType.KZT,
    priceFrom: 250_000,
    priceTo: 450_000,
    isClear: false,
    experience: "2",
    requiredSkills: ["Google Ads", "Яндекс.Директ", "Google Analytics"],
    postedDaysAgo: 14,
    aboutVacancy:
      "<p>Ищем специалиста по контекстной рекламе на проектную загрузку. Задача — снизить стоимость привлечения заказа и масштабировать закупку трафика на категории с наибольшей маржинальностью.</p><h3>Обязанности</h3><ul><li>Настраивать и вести кампании в Google Ads и Яндекс.Директ</li><li>Собирать и чистить семантическое ядро, готовить объявления</li><li>Работать с фидами товаров и динамическими объявлениями</li><li>Анализировать эффективность в разрезе категорий и корректировать ставки</li><li>Готовить еженедельные отчёты по расходу бюджета и ROMI</li></ul><h3>Требования</h3><ul><li>От 2 лет опыта ведения контекстной рекламы, желательно в e-commerce</li><li>Понимание сквозной аналитики и настройки целей</li><li>Опыт работы с бюджетами от 2 млн тенге в месяц</li><li>Умение обосновывать решения цифрами</li></ul><h3>Условия</h3><ul><li>Удалённая работа, оплата по договору ГПХ</li><li>Загрузка около 20 часов в неделю</li><li>Возможность перейти в штат при хороших результатах</li></ul>",
  },
  {
    employer: "bayterek",
    title: "Инженер по сетям связи",
    category: CATEGORY_IT,
    city: "Astana",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 700_000,
    priceTo: 1_100_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["Cisco", "BGP", "Linux", "MPLS"],
    postedDaysAgo: 10,
    aboutVacancy:
      "<p>В связи с расширением магистральной сети приглашаем сетевого инженера. Вы будете отвечать за работоспособность транспортной сети и подключение корпоративных клиентов.</p><h3>Обязанности</h3><ul><li>Настраивать и обслуживать маршрутизаторы и коммутаторы уровня оператора связи</li><li>Работать с протоколами динамической маршрутизации BGP и OSPF</li><li>Организовывать каналы связи для корпоративных клиентов, настраивать MPLS L2/L3 VPN</li><li>Диагностировать и устранять аварии, участвовать в дежурствах</li><li>Вести исполнительную документацию по сети</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта работы с сетевым оборудованием оператора связи</li><li>Уверенное знание стека TCP/IP, BGP, OSPF, VLAN</li><li>Опыт администрирования Linux</li><li>Сертификация CCNA или выше будет преимуществом</li><li>Готовность к выездам на узлы связи</li></ul><h3>Условия</h3><ul><li>Официальное трудоустройство, доплата за дежурства</li><li>Служебный транспорт для выездов</li><li>Медицинская страховка и оплата профильных сертификаций</li></ul>",
  },
  {
    employer: "bayterek",
    title: "Инженер данных (Data Engineer)",
    category: CATEGORY_DATA,
    city: "Astana",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 1_200_000,
    priceTo: 1_800_000,
    isClear: true,
    experience: "4",
    requiredSkills: ["Python", "PostgreSQL", "AWS", "SQL"],
    postedDaysAgo: 13,
    aboutVacancy:
      "<p>Мы строим корпоративное хранилище данных с нуля и ищем инженера данных, который спроектирует его архитектуру и наладит регулярную загрузку из биллинга, CRM и систем мониторинга сети.</p><h3>Обязанности</h3><ul><li>Проектировать модель данных хранилища и витрины для бизнес-подразделений</li><li>Разрабатывать и поддерживать ETL/ELT-пайплайны на Airflow</li><li>Настраивать загрузку данных из биллинговых и сетевых систем</li><li>Обеспечивать качество данных: тесты, мониторинг, документация</li><li>Помогать аналитикам с доступом к данным и оптимизацией запросов</li></ul><h3>Требования</h3><ul><li>От 4 лет опыта работы с данными в роли Data Engineer или ETL-разработчика</li><li>Отличное знание SQL и опыт проектирования хранилищ (Kimball, Data Vault)</li><li>Уверенный Python, опыт работы с Airflow</li><li>Опыт с колоночными СУБД (ClickHouse, Greenplum) будет плюсом</li><li>Понимание принципов работы облачных сервисов хранения и обработки данных</li></ul><h3>Условия</h3><ul><li>Возможность выстроить платформу данных с нуля и влиять на архитектурные решения</li><li>Гибридный график</li><li>Расширенная медицинская страховка</li></ul>",
  },
  {
    employer: "iceberg",
    title: "Программист 1С",
    category: CATEGORY_IT,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 650_000,
    priceTo: 1_000_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["1С:Предприятие", "SQL", "1С:WMS"],
    postedDaysAgo: 15,
    aboutVacancy:
      "<p>Требуется программист 1С для развития учётных систем логистической компании. Основной фокус — складской учёт и интеграция 1С с системой управления складом.</p><h3>Обязанности</h3><ul><li>Дорабатывать конфигурации 1С:УТ и 1С:Бухгалтерия под задачи бизнеса</li><li>Развивать интеграцию 1С с WMS и системой управления транспортом</li><li>Разрабатывать отчёты и обработки по запросам подразделений</li><li>Оптимизировать производительность тяжёлых запросов и регламентных заданий</li><li>Консультировать пользователей и сопровождать обновления конфигураций</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта разработки на платформе 1С:Предприятие 8.3</li><li>Знание языка запросов 1С и системы компоновки данных</li><li>Опыт работы с обменами данными: COM, HTTP-сервисы, планы обмена</li><li>Понимание складского и бухгалтерского учёта</li><li>Опыт работы с 1С:WMS будет существенным преимуществом</li></ul><h3>Условия</h3><ul><li>График 5/2 с 9:00 до 18:00, офис рядом со складским комплексом</li><li>Корпоративный транспорт от станции метро</li><li>Оплата обучения и сертификации 1С</li></ul>",
  },
  {
    employer: "iceberg",
    title: "Аналитик цепочек поставок",
    category: CATEGORY_LOGISTICS,
    city: "Almaty",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 550_000,
    priceTo: 850_000,
    isClear: true,
    experience: "2",
    requiredSkills: ["Excel", "SQL", "Power BI"],
    postedDaysAgo: 17,
    aboutVacancy:
      "<p>Приглашаем аналитика в отдел операционной эффективности. Вы будете искать узкие места в цепочке поставок и предлагать решения, которые снижают себестоимость доставки.</p><h3>Обязанности</h3><ul><li>Анализировать показатели складских и транспортных операций</li><li>Строить и поддерживать отчётность по загрузке склада, оборачиваемости и срокам доставки</li><li>Считать себестоимость логистических операций по направлениям</li><li>Готовить обоснования для оптимизации маршрутов и складских процессов</li><li>Участвовать в проектах автоматизации вместе с IT-отделом</li></ul><h3>Требования</h3><ul><li>От 2 лет опыта аналитиком в логистике, ритейле или производстве</li><li>Продвинутый Excel: сводные таблицы, Power Query</li><li>Знание SQL на уровне самостоятельной выгрузки данных</li><li>Опыт работы с Power BI или аналогичным BI-инструментом</li><li>Внимательность к деталям и умение доводить выводы до конкретных предложений</li></ul><h3>Условия</h3><ul><li>Официальное трудоустройство, график 5/2</li><li>Квартальные премии за достижение показателей эффективности</li><li>Обеды на территории склада за счёт компании</li></ul>",
  },
  {
    employer: "zhetysu",
    title: "Разработчик встраиваемых систем (IoT)",
    category: CATEGORY_IT,
    city: "Taldykorgan",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 800_000,
    priceTo: 1_300_000,
    isClear: true,
    experience: "3",
    requiredSkills: ["C", "C++", "Python"],
    postedDaysAgo: 16,
    aboutVacancy:
      "<p>Мы производим собственные датчики для точного земледелия и ищем инженера-разработчика встраиваемых систем. Ваш код будет работать в поле, при температурах от −35 до +45 градусов и нестабильной связи.</p><h3>Обязанности</h3><ul><li>Разрабатывать прошивки для микроконтроллеров STM32 и ESP32</li><li>Реализовывать протоколы передачи данных по LoRaWAN и NB-IoT</li><li>Оптимизировать энергопотребление устройств с автономным питанием</li><li>Участвовать в отладке аппаратной части совместно со схемотехниками</li><li>Проводить полевые испытания и дорабатывать решения по их результатам</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта разработки встраиваемого ПО</li><li>Уверенное знание C, желательно C++</li><li>Опыт работы с STM32 или ESP32, знание периферии: SPI, I2C, UART</li><li>Понимание работы RTOS (FreeRTOS или аналог)</li><li>Умение читать принципиальные схемы и работать с осциллографом</li></ul><h3>Условия</h3><ul><li>Собственная лаборатория и оборудование</li><li>Компенсация переезда в Талдыкорган для иногородних кандидатов</li><li>Служебный транспорт для полевых выездов</li></ul>",
  },
  {
    employer: "zhetysu",
    title: "Мобильный разработчик Flutter",
    category: CATEGORY_IT,
    city: "Taldykorgan",
    country: "Kazakhstan",
    pricingType: PricingType.FREELANCE,
    currency: CurrencyType.KZT,
    priceFrom: 900_000,
    priceTo: 1_400_000,
    isClear: false,
    experience: "3",
    requiredSkills: ["Dart", "Firebase", "REST API"],
    postedDaysAgo: 18,
    aboutVacancy:
      "<p>Ищем Flutter-разработчика на проект длительностью около шести месяцев с возможностью продления. Задача — вывести в релиз мобильное приложение для агрономов, которое работает с данными наших полевых датчиков.</p><h3>Обязанности</h3><ul><li>Разрабатывать кроссплатформенное приложение на Flutter для iOS и Android</li><li>Реализовать офлайн-режим и синхронизацию данных при появлении связи</li><li>Интегрировать приложение с нашим REST API и картографическими сервисами</li><li>Работать с геолокацией и отображением спутниковых снимков полей</li><li>Подготовить сборки и опубликовать приложение в App Store и Google Play</li></ul><h3>Требования</h3><ul><li>От 3 лет опыта мобильной разработки, из них не менее 2 лет на Flutter</li><li>Уверенное знание Dart и одного из подходов к управлению состоянием (Bloc, Riverpod)</li><li>Опыт реализации офлайн-first приложений с локальным хранилищем</li><li>Опыт публикации приложений в обоих магазинах</li><li>Готовность выехать в хозяйство на один-два дня для наблюдения за работой пользователей</li></ul><h3>Условия</h3><ul><li>Полностью удалённая работа, оплата по договору ГПХ</li><li>Оплата помесячно по закрытым этапам</li><li>Возможность продолжить сотрудничество на следующих продуктах</li></ul>",
  },
  {
    employer: "korkem",
    title: "UI/UX-дизайнер",
    category: CATEGORY_DESIGN,
    city: "Shymkent",
    country: "Kazakhstan",
    pricingType: PricingType.EMPLOYEE,
    currency: CurrencyType.KZT,
    priceFrom: 500_000,
    priceTo: 850_000,
    isClear: false,
    experience: "2",
    requiredSkills: ["Figma", "UX Research", "Prototyping"],
    postedDaysAgo: 19,
    aboutVacancy:
      "<p>Наша студия ищет UI/UX-дизайнера в команду digital-продуктов. Мы делаем мобильные приложения и веб-сервисы для клиентов из Казахстана и Узбекистана, и нам важен дизайнер, который умеет обосновывать решения, а не только красиво рисовать.</p><h3>Обязанности</h3><ul><li>Проектировать интерфейсы мобильных приложений и веб-сервисов</li><li>Строить пользовательские сценарии, wireframes и интерактивные прототипы</li><li>Разрабатывать и поддерживать дизайн-системы проектов</li><li>Участвовать в пользовательских интервью и юзабилити-тестировании</li><li>Передавать макеты в разработку и сопровождать реализацию</li></ul><h3>Требования</h3><ul><li>От 2 лет опыта в продуктовом дизайне и портфолио с реализованными проектами</li><li>Уверенное владение Figma, включая auto layout и компоненты</li><li>Понимание принципов iOS Human Interface Guidelines и Material Design</li><li>Умение объяснять и защищать дизайн-решения перед клиентом</li><li>Базовое понимание возможностей и ограничений фронтенд-разработки</li></ul><h3>Условия</h3><ul><li>Студийный офис в центре Шымкента, творческая атмосфера</li><li>Гибкое начало рабочего дня</li><li>Оплата профильных курсов и подписок на дизайн-инструменты</li></ul>",
  },
  {
    employer: "korkem",
    title: "Motion-дизайнер",
    category: CATEGORY_DESIGN,
    city: "Shymkent",
    country: "Kazakhstan",
    pricingType: PricingType.FREELANCE,
    currency: CurrencyType.KZT,
    priceFrom: 400_000,
    priceTo: 700_000,
    isClear: false,
    experience: "2",
    requiredSkills: ["After Effects", "Cinema 4D", "Motion Design"],
    postedDaysAgo: 20,
    aboutVacancy:
      "<p>Ищем motion-дизайнера на постоянную проектную загрузку. Работа над рекламными роликами, анимацией логотипов и оформлением социальных сетей для брендов из ритейла и food-сегмента.</p><h3>Обязанности</h3><ul><li>Создавать анимационные ролики длительностью от 15 до 60 секунд</li><li>Анимировать логотипы и элементы фирменного стиля</li><li>Готовить адаптации роликов под разные площадки и форматы</li><li>Работать со звуком и подбирать музыкальное сопровождение</li><li>Участвовать в разработке раскадровок вместе с арт-директором</li></ul><h3>Требования</h3><ul><li>От 2 лет опыта в моушн-дизайне и шоурил с коммерческими работами</li><li>Уверенное владение After Effects, знание Cinema 4D или Blender</li><li>Понимание принципов анимации и композиции</li><li>Умение работать по брифу и соблюдать сроки</li><li>Навыки видеомонтажа в Premiere Pro будут плюсом</li></ul><h3>Условия</h3><ul><li>Удалённый формат, оплата по договору ГПХ за проект</li><li>Стабильный поток задач: от трёх роликов в месяц</li><li>Возможность добавлять работы в личное портфолио</li></ul>",
  },
];
