import { VacanciesAside } from "@/components/vacancies/VacanciesAside";
import { VacanciesList } from "@/components/vacancies/VacanciesList";
import { IVacanciesSearchParams } from "@/types/vacancies.types";
import "./style.css";
import { SearchBar } from "@/components/ui/SearchBar";

export const dynamic = "force-dynamic";

export default function VacanciesPage({
  searchParams,
}: {
  searchParams?: IVacanciesSearchParams;
}) {
  return (
    <div className="container mx-auto mt-3 space-y-3 px-3 py-3 font-roboto sm:px-7 md:px-5">
      <h1 className="font-roboto text-[38px] font-medium !leading-tight text-[var(--Primary-10)]">
        Информационные технологии
      </h1>
      <p className="text-2xl font-medium text-[var(--Primary-text)]">
        Объявления о работе
      </p>
      <SearchBar />

      <section className="!mt-16 flex gap-8">
        {/* ================= Filter Side ======================== */}

        <div className="w-[300px]">
          <VacanciesAside />
        </div>

        {/* ================= Vacancies Card Side ======================== */}

        <div className="flex-1">
          <VacanciesList />
        </div>
      </section>
    </div>
  );
}
