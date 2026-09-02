"use client";

import { FormEvent, useState } from "react";

const STAFFING_EMAIL = "staffing@bespace.kz";

export const StaffingRequestForm = ({
  defaultCategory,
}: {
  defaultCategory?: string;
}) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const contact = formData.get("contact")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    const subject = `Заявка на подбор специалиста${category ? `: ${category}` : ""}`;
    const body = [
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      category ? `Направление: ${category}` : null,
      "",
      "Описание задачи:",
      description,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${STAFFING_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-card text-center space-y-3">
        <h3 className="text-zinc-700 font-semibold text-xl">
          Заявка сформирована
        </h3>
        <p className="text-zinc-500 font-medium text-sm">
          Мы открыли ваш почтовый клиент с подготовленным письмом. Если он не
          открылся, напишите нам напрямую на{" "}
          <a
            href={`mailto:${STAFFING_EMAIL}`}
            className="text-primary-6 font-semibold hover:underline"
          >
            {STAFFING_EMAIL}
          </a>
          .
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-primary-6 font-semibold hover:underline text-sm"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-8 shadow-card space-y-4"
    >
      <div>
        <label className="block text-sm font-semibold text-zinc-700 mb-1">
          Ваше имя
        </label>
        <input
          name="name"
          required
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-700 focus:border-primary-6"
          placeholder="Иван Иванов"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-700 mb-1">
          Email или телефон
        </label>
        <input
          name="contact"
          required
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-700 focus:border-primary-6"
          placeholder="you@company.kz"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-700 mb-1">
          Направление
        </label>
        <input
          name="category"
          defaultValue={defaultCategory}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-700 focus:border-primary-6"
          placeholder="Разработка, дизайн, маркетинг..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-700 mb-1">
          Опишите задачу
        </label>
        <textarea
          name="description"
          rows={4}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-700 focus:border-primary-6"
          placeholder="Кого нужно найти, сроки, бюджет..."
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center rounded-xl bg-primary-6 px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-primary-6/90 hover:scale-[1.02]"
      >
        Оставить заявку
      </button>
    </form>
  );
};
