import Link from "next/link";
import { FaEnvelope, FaQuestionCircle, FaRegLifeRing } from "react-icons/fa";
import { FaqAccordion, IFaqItem } from "@/components/help/FaqAccordion";

export const metadata = {
  title: "Помощь - Bespace",
  description:
    "Ответы на частые вопросы о работе с платформой Bespace: регистрация, оплата, поиск специалистов и вакансий.",
};

const clientFaq: IFaqItem[] = [
  {
    id: 1,
    question: "Как найти специалиста для проекта?",
    answer:
      "Создайте вакансию в разделе «Мои вакансии» или воспользуйтесь поиском на странице «Поиск талантов». Наш ИИ-помощник поможет составить точное описание задачи и подобрать подходящих кандидатов.",
  },
  {
    id: 2,
    question: "Как оплачивается работа специалиста?",
    answer:
      "Вы оплачиваете только одобренную работу после согласования условий с кандидатом. Все ставки и сроки обсуждаются напрямую в переписке до начала сотрудничества.",
  },
  {
    id: 3,
    question: "Чем отличаются тарифы доступа к базе резюме?",
    answer:
      "Тарифы отличаются количеством открытых контактов, частотой поднятия вакансии в поиске и дополнительным выделением среди других объявлений. Подробности — на странице тарифов в личном кабинете.",
  },
];

const freelancerFaq: IFaqItem[] = [
  {
    id: 4,
    question: "Как начать откликаться на вакансии?",
    answer:
      "Зарегистрируйтесь как специалист, заполните профиль (опыт, образование, портфолио) и переходите в раздел «Вакансии», чтобы откликаться на подходящие предложения.",
  },
  {
    id: 5,
    question: "Нужно ли платить за отклики на вакансии?",
    answer:
      "Нет, отклики на вакансии для специалистов полностью бесплатны.",
  },
  {
    id: 6,
    question: "Как повысить шансы получить работу?",
    answer:
      "Заполните профиль максимально подробно: добавьте портфолио, опыт работы и навыки. Профили с полной информацией получают больше откликов от клиентов.",
  },
];

const accountFaq: IFaqItem[] = [
  {
    id: 7,
    question: "Как изменить роль профиля (клиент/специалист)?",
    answer:
      "Роль указывается при регистрации. Если нужно изменить тип аккаунта, напишите в поддержку — мы поможем настроить профиль правильно.",
  },
  {
    id: 8,
    question: "Я забыл пароль. Что делать?",
    answer:
      "На странице входа нажмите «Восстановить пароль» и следуйте инструкциям, отправленным на вашу почту.",
  },
];

const faqSections = [
  { title: "Для клиентов", items: clientFaq },
  { title: "Для специалистов", items: freelancerFaq },
  { title: "Аккаунт и доступ", items: accountFaq },
];

export default function HelpPage() {
  return (
    <div className="font-roboto">
      {/* ================= Hero ================= */}
      <section className="header-bg">
        <div className="container mx-auto py-16 md:px-5 sm:px-7 px-3 text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur shadow-sm text-primary-6 text-2xl mb-5">
            <FaQuestionCircle />
          </span>
          <h1 className="font-bold text-4xl lg:text-5xl !leading-tight text-mainText mb-4">
            Чем мы можем помочь?
          </h1>
          <p className="text-lg text-zinc-600 font-medium max-w-2xl mx-auto">
            Ответы на самые частые вопросы о работе с Bespace. Не нашли ответ?
            Напишите нам — мы всегда рады помочь.
          </p>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-mainText lg:text-3xl text-2xl font-bold mb-5">
                {section.title}
              </h2>
              <FaqAccordion items={section.items} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= Contact CTA ================= */}
      <section className="bg-mainBg py-16">
        <div className="container mx-auto md:px-5 sm:px-7 px-3">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-card flex flex-col items-start space-y-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-6 text-white text-xl">
                <FaEnvelope />
              </span>
              <h3 className="text-zinc-700 font-semibold text-xl">
                Написать в поддержку
              </h3>
              <p className="text-zinc-500 font-medium text-sm">
                Ответим на ваш вопрос по электронной почте в течение рабочего
                дня.
              </p>
              <a
                href="mailto:support@bespace.kz"
                className="text-primary-6 font-semibold hover:underline"
              >
                support@bespace.kz
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-card flex flex-col items-start space-y-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-6 text-white text-xl">
                <FaRegLifeRing />
              </span>
              <h3 className="text-zinc-700 font-semibold text-xl">
                Узнать больше о платформе
              </h3>
              <p className="text-zinc-500 font-medium text-sm">
                Хотите узнать, как Bespace помогает компаниям и специалистам?
              </p>
              <Link
                href="/about"
                className="text-primary-6 font-semibold hover:underline"
              >
                О нас →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
