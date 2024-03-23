import { SearchBar } from "@/components/ui/SearchBar";

export const dynamic = "force-dynamic";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto mt-3 space-y-3 px-3 py-3 font-roboto sm:px-7 md:px-5">
      <h1 className="font-roboto text-[38px] font-medium !leading-tight text-[var(--Primary-10)]">
        Помощь
      </h1>
      {/* <p className="font-medium text-2xl text-[var(--Primary-text)]">Объявления кандидатов</p> */}
      {/* <SearchBar /> */}

      <section className="!mt-16 flex gap-8">
        {/* <div className="w-[300px]">
            <CandidatesAside  />
        </div>
        <div className="flex-1">
          <CandidatesList  />
        </div> */}
      </section>
    </div>
  );
}
