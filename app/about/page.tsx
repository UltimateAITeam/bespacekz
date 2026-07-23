import Image from "next/image";
import Link from "next/link";
import { FaBolt, FaHandshake, FaRobot, FaShieldAlt } from "react-icons/fa";
import StatsWithIcons from "@/components/home_page/Stats";

export const metadata = {
  title: "О нас - Bespace",
  description:
    "Bespace — платформа, соединяющая специалистов и клиентов в Казахстане с помощью искусственного интеллекта.",
};

const values = [
  {
    id: 1,
    icon: FaRobot,
    title: "ИИ в основе платформы",
    description:
      "Автоматический анализ профилей, генерация описаний вакансий и точный подбор кандидатов — всё за секунды.",
  },
  {
    id: 2,
    icon: FaBolt,
    title: "Скорость",
    description:
      "Самый быстрый способ найти фрилансера или работу по всему Казахстану без лишних посредников.",
  },
  {
    id: 3,
    icon: FaShieldAlt,
    title: "Надёжность",
    description:
      "Защита данных, безопасные сделки и оплата только за подтверждённую и одобренную работу.",
  },
  {
    id: 4,
    icon: FaHandshake,
    title: "Честные условия",
    description:
      "Прозрачные тарифы и условия для клиентов и специалистов — без скрытых платежей.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="font-roboto">
      {/* ================= Hero ================= */}
      <section className="header-bg">
        <div className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col space-y-5">
              <span className="w-fit rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-sm font-semibold text-primary-6 shadow-sm">
                О компании
              </span>
              <h1 className="font-bold text-4xl lg:text-5xl !leading-tight text-mainText">
                Соединяем таланты с возможностями с помощью ИИ
              </h1>
              <p className="text-lg text-zinc-600 font-medium max-w-lg">
                Bespace — платформа для поиска работы и специалистов в
                Казахстане. Мы используем искусственный интеллект, чтобы
                находить лучшее совпадение между клиентами и профессионалами
                быстрее и проще, чем где-либо ещё.
              </p>
              <div className="flex flex-wrap gap-4 !mt-8">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-primary-6 px-7 py-3 text-white font-semibold shadow-soft transition hover:bg-primary-6/90 hover:scale-105"
                >
                  Присоединиться
                </Link>
                <Link
                  href="/vacancies"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/60 px-7 py-3 text-zinc-700 font-semibold transition hover:bg-white hover:scale-105"
                >
                  Смотреть вакансии
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block h-80">
              <Image
                src="/bespace/works-team.png"
                alt="Команда Bespace"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= Mission ================= */}
      <section className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-72 rounded-xl overflow-hidden bg-cardBg order-2 lg:order-1">
            <Image
              src="/bespace/tell-us.jpeg"
              alt="Наша миссия"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-4 order-1 lg:order-2">
            <h2 className="text-mainText lg:text-4xl text-3xl font-bold">
              Наша миссия
            </h2>
            <p className="text-zinc-600 font-medium text-lg">
              Мы верим, что найти работу мечты или идеального специалиста не
              должно занимать недели. Bespace создан, чтобы сократить этот
              путь до нескольких кликов — с помощью умных алгоритмов,
              прозрачных условий и заботы о безопасности каждой стороны.
            </p>
            <p className="text-zinc-600 font-medium text-lg">
              Сегодня к нам присоединяются тысячи специалистов и компаний по
              всему Казахстану, и мы продолжаем расти вместе с ними.
            </p>
          </div>
        </div>
      </section>

      {/* ================= Values ================= */}
      <section className="bg-mainBg py-16">
        <div className="container mx-auto md:px-5 sm:px-7 px-3">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-mainText lg:text-4xl text-3xl font-bold mb-3">
              Почему выбирают Bespace
            </h2>
            <p className="text-zinc-500 font-semibold lg:text-lg">
              Принципы, на которых строится наша платформа
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.id}
                  className="bg-white rounded-xl p-6 shadow-card transition hover:shadow-soft hover:-translate-y-1"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-6 text-white text-xl mb-4">
                    <Icon />
                  </span>
                  <h3 className="text-zinc-700 font-semibold text-xl mb-2">
                    {value.title}
                  </h3>
                  <p className="text-zinc-500 font-medium text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Stats ================= */}
      <section className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
        <StatsWithIcons />
      </section>

      {/* ================= CTA ================= */}
      <section className="container mx-auto pb-20 md:px-5 sm:px-7 px-3">
        <div className="bg-gradient-to-b from-[#99F6E4] to-[#A5F3FC] rounded-xl px-8 py-14 text-center">
          <h2 className="text-zinc-700 font-semibold text-3xl lg:text-4xl mb-4">
            Готовы начать?
          </h2>
          <p className="text-zinc-700 font-medium text-lg mb-8">
            Присоединяйтесь к Bespace уже сегодня — это бесплатно.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-800 px-8 py-3 text-white font-semibold shadow-soft transition hover:bg-zinc-900 hover:scale-105"
          >
            Начать бесплатно
          </Link>
        </div>
      </section>
    </div>
  );
}
