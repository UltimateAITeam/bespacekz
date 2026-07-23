"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface IFaqItem {
  id: number;
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: IFaqItem[] }) {
  const [openId, setOpenId] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white shadow-card overflow-hidden">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-cardBg"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="font-semibold text-zinc-700 text-lg">
                {item.question}
              </span>
              <FaChevronDown
                className={`shrink-0 text-zinc-500 transition ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 -mt-2 text-zinc-500 font-medium leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
