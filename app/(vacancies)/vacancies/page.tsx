import {VacanciesAside} from '@/components/vacancies/VacanciesAside';
import {VacanciesList} from '@/components/vacancies/VacanciesList';
import {IVacanciesSearchParams} from '@/types/vacancies.types';
import './style.css';
import {VacanciesSearchBar} from '@/components/vacancies/VacanciesSearchBar';

export const dynamic = 'force-dynamic'

export default function VacanciesPage({searchParams}: {searchParams?: IVacanciesSearchParams}) {
  return (
    <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
      <h1 className="font-medium text-[38px] !leading-tight text-[var(--Primary-10)] font-roboto">
        Информационные технологии
      </h1>
      <p className="font-medium text-2xl text-[var(--Primary-text)]">Объявления о работе</p>
      <VacanciesSearchBar />

      <section className="flex gap-8 !mt-16">
        {/* ================= Filter Side ======================== */}

        <div className="w-[300px]">
  
            <VacanciesAside  />
 
        </div>

        {/* ================= Vacancies Card Side ======================== */}

        <div className="flex-1">
          <VacanciesList  />
        </div>
      </section>
    </div>
  );
}
