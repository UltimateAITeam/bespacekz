import Link from "next/link";
import { FaSearch, FaUserCheck, FaHandshake } from "react-icons/fa";
import { staffingCategories } from "@/libs/staffing-data";
import { StaffingRequestForm } from "@/components/staffing/StaffingRequestForm";

export const metadata = {
  title: "Поиск талантов - Bespace",
  description:
    "Оставьте заявку, и наши рекрутеры подберут вам опытных разработчиков, дизайнеров и маркетологов.",
};

const steps = [
  {
    id: 1,
    icon: FaSearch,
    title: "Оставляете заявку",
    description: "Расскажите, какой специалист вам нужен и на каких условиях.",
  },
  {
    id: 2,
    icon: FaUserCheck,
    title: "Подбираем кандидатов",
    description:
      "Наши рекрутеры находят и проверяют подходящих специалистов из базы Bespace.",
  },
  {
    id: 3,
    icon: FaHandshake,
    title: "Знакомим и согласовываем",
    description:
      "Вы общаетесь с кандидатами напрямую и выбираете того, кто подходит лучше всего.",
  },
];

export default function StaffingPage() {
  return (
    <div className="font-roboto">
      {/* ================= Hero ================= */}
      <section className="header-bg">
        <div className="container mx-auto py-16 md:px-5 sm:px-7 px-3 text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur shadow-sm text-primary-6 text-2xl mb-5">
            <FaSearch />
          </span>
          <h1 className="font-bold text-4xl lg:text-5xl !leading-tight text-mainText mb-4">
            Позвольте нам найти вам подходящего специалиста
          </h1>
          <p className="text-lg text-zinc-600 font-medium max-w-2xl mx-auto">
            Узнайте, как наши рекрутеры находят вам опытных разработчиков,
            дизайнеров и маркетологов — оставьте заявку, и мы подберём
            кандидатов под ваш проект.
          </p>
        </div>
      </section>

      {/* ================= Steps ================= */}
      <section className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-white rounded-xl p-6 shadow-card transition hover:shadow-soft hover:-translate-y-1"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-6 text-white text-xl mb-4">
                  <Icon />
                </span>
                <h3 className="text-zinc-700 font-semibold text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-500 font-medium text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= Categories ================= */}
      <section className="bg-mainBg py-16">
        <div className="container mx-auto md:px-5 sm:px-7 px-3">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-mainText lg:text-4xl text-3xl font-bold mb-3">
              Направления подбора
            </h2>
            <p className="text-zinc-500 font-semibold lg:text-lg">
              Выберите направление, чтобы подготовить заявку под ваши задачи
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {staffingCategories.map((category) => (
              <Link href={`/staffing/${category.slug}`} key={category.id}>
                <div className="bg-white rounded-xl p-6 shadow-card h-full transition hover:shadow-soft hover:-translate-y-1 cursor-pointer">
                  <h3 className="text-zinc-700 font-semibold text-xl mb-2">
                    {category.title}
                  </h3>
                  <p className="text-zinc-500 font-medium text-sm mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-1">
                    {category.roles.map((role) => (
                      <li
                        key={role}
                        className="text-zinc-500 text-sm font-medium before:content-['•'] before:mr-2 before:text-primary-6"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Request form ================= */}
      <section className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-mainText lg:text-3xl text-2xl font-bold mb-3">
              Оставить заявку на подбор
            </h2>
            <p className="text-zinc-500 font-semibold">
              Ответим в течение рабочего дня и предложим первых кандидатов
            </p>
          </div>
          <StaffingRequestForm />
        </div>
      </section>
    </div>
  );
}
