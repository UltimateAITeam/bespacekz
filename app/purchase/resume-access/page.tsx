import Link from "next/link";
import { FaEnvelope, FaWhatsapp, FaDatabase } from "react-icons/fa";
import { SALES_EMAIL, WHATSAPP_NUMBER } from "@/libs/constants";
import {
  SUBSCRIPTION_PLANS,
  formatKzt,
  isSubscriptionPlanId,
} from "@/libs/subscription-plans";

export const metadata = {
  title: "Доступ к базе резюме - Bespace",
  description:
    "Оставьте заявку на доступ к базе резюме Bespace — напишите нам в WhatsApp или на почту, и мы подключим подходящий тариф.",
};

export default function ResumeAccessPage({
  searchParams,
}: {
  searchParams: { plan?: string; reason?: string };
}) {
  const plan = isSubscriptionPlanId(searchParams.plan)
    ? SUBSCRIPTION_PLANS[searchParams.plan]
    : null;
  const paymentUnavailable = searchParams.reason === "payment";

  const subject = `Заявка на доступ к базе резюме${
    plan ? `: тариф «${plan.name}»` : ""
  }`;
  const message = [
    "Здравствуйте! Хочу оформить доступ к базе резюме Bespace.",
    plan ? `Интересующий тариф: ${plan.name} (${formatKzt(plan.amount)} ₸/месяц).` : null,
    "",
    "Компания:",
    "Контактное лицо:",
    "Телефон:",
  ]
    .filter(Boolean)
    .join("\n");

  const mailtoUrl = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(message)}`;
  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <div className="font-roboto">
      {/* ================= Hero ================= */}
      <section className="header-bg">
        <div className="container mx-auto py-16 md:px-5 sm:px-7 px-3 text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/70 backdrop-blur shadow-sm text-primary-6 text-2xl mb-5">
            <FaDatabase />
          </span>
          <h1 className="font-bold text-4xl lg:text-5xl !leading-tight text-mainText mb-4">
            Доступ к базе резюме
          </h1>
          <p className="text-lg text-zinc-600 font-medium max-w-2xl mx-auto">
            Оставьте заявку удобным способом — мы подберём подходящий тариф,
            расскажем об условиях и откроем доступ к базе кандидатов.
          </p>
        </div>
      </section>

      {/* ================= Content ================= */}
      <section className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
        <div className="max-w-2xl mx-auto space-y-6">
          {paymentUnavailable && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-800 text-sm font-medium">
              Онлайн-оплата временно недоступна. Напишите нам — мы оформим доступ
              вручную и ответим в течение рабочего дня.
            </div>
          )}

          {plan && (
            <div className="bg-white rounded-xl p-6 shadow-card flex items-center justify-between">
              <div>
                <p className="text-zinc-500 font-medium text-sm mb-1">
                  Выбранный тариф
                </p>
                <p className="text-zinc-700 font-semibold text-xl">
                  {plan.name}
                </p>
              </div>
              <p className="text-zinc-700 font-bold text-2xl">
                {formatKzt(plan.amount)}{" "}
                <span className="font-normal text-base text-zinc-500">
                  ₸/месяц
                </span>
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-8 shadow-card flex flex-col items-start space-y-3 transition hover:shadow-soft hover:-translate-y-1"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white text-xl">
                  <FaWhatsapp />
                </span>
                <h3 className="text-zinc-700 font-semibold text-xl">
                  Написать в WhatsApp
                </h3>
                <p className="text-zinc-500 font-medium text-sm">
                  Быстрый ответ в мессенджере — поможем выбрать тариф и оформить
                  доступ.
                </p>
                <span className="text-primary-6 font-semibold">
                  Открыть WhatsApp →
                </span>
              </a>
            )}

            <a
              href={mailtoUrl}
              className="bg-white rounded-xl p-8 shadow-card flex flex-col items-start space-y-3 transition hover:shadow-soft hover:-translate-y-1"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-6 text-white text-xl">
                <FaEnvelope />
              </span>
              <h3 className="text-zinc-700 font-semibold text-xl">
                Написать на почту
              </h3>
              <p className="text-zinc-500 font-medium text-sm">
                Отправим счёт и подробные условия по электронной почте.
              </p>
              <span className="text-primary-6 font-semibold break-all">
                {SALES_EMAIL}
              </span>
            </a>
          </div>

          <p className="text-center text-zinc-500 font-medium text-sm">
            Хотите сравнить тарифы?{" "}
            <Link
              href="/#pricing"
              className="text-primary-6 font-semibold hover:underline"
            >
              Посмотреть тарифы
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
