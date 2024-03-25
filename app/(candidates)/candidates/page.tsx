import { CandidatesAside } from "@/components/candidates/CandidatesAside";
import { CandidatesList } from "@/components/candidates/CandidatesList";
import { SearchBar } from "@/components/ui/SearchBar";
import { ICandidatesSearchParams } from "@/types/candidates.types";
import "./style.css";

export const dynamic = "force-dynamic";

export default function CandidatesPage({
  searchParams,
}: {
  searchParams?: ICandidatesSearchParams;
}) {
  return (
    <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
      <h1 className="font-medium text-[38px] !leading-tight text-[var(--Primary-10)] font-roboto">
        Информационные технологии
      </h1>
      <p className="font-medium text-2xl text-[var(--Primary-text)]">
        Объявления кандидатов
      </p>
      <SearchBar />

      <section className="flex gap-8 !mt-16">
        <div className="w-[300px]">
          <CandidatesAside />
        </div>
        <div className="flex-1">
          <CandidatesList />
        </div>
      </section>
    </div>
  );
}
