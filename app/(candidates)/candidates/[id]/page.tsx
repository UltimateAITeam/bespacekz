import { KeyValueColumn } from "@/components/ui/KeyValue/KeyValueColumn";
import { CandidatesService } from "@/services/candidates.service";
import { ICandidate } from "@/types/candidates.types";
import { differenceInYears } from "date-fns";
import Image from "next/image";

interface CandidatePageProps {
  params: {
    id: string;
  };
}

async function getCandidateById<T>(id: string) {
  const response = await CandidatesService.getCandidateById({ id });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data candidate ${id}`);
  }
  return response.json() as T;
}

export default async function CandidatePage({ params }: CandidatePageProps) {
  const candidate = await getCandidateById<ICandidate>(params.id);
  return (
    <div className="pb-28 font-roboto text-black">
      <h2 className="text-[30px] font-medium leading-tight text-[#01001E]">
        Просмотр кандидата
      </h2>
      <div className="mt-8 grid grid-cols-[1fr_335px] items-start  gap-6">
        <section className="rounded-lg p-6 ring-1 ring-neutral-4">
          <h3 className="text-2xl font-medium text-black">Личные данные</h3>
          <div className="mt-[42px] flex ">
            <Image
              src={candidate.user.image || "/images/Avatar.png"}
              width={140}
              height={140}
              alt={`photo ${candidate.user.name}`}
              className="h-[140px] w-[140px] rounded-full"
            />
            <div className="ml-[150px] flex max-h-[200px] flex-col flex-wrap justify-between gap-x-16 gap-y-6">
              <KeyValueColumn
                title="Имя Фамилия"
                value={`${candidate.user.name} ${candidate.user.last_name}`}
                className="!gap-1"
              />
              {!!candidate.user.location && (
                <KeyValueColumn
                  title="Страна, город"
                  value={candidate.user.location}
                  className="!gap-1"
                />
              )}
            </div>
          </div>
        </section>
        {candidate.Languages.length > 0 ? (
          <section className="col-start-2 rounded-lg p-6 ring-1 ring-neutral-4">
            <h3 className="text-2xl font-medium text-black">Знание языков</h3>
            <ul className="mt-8 space-y-4">
              {candidate.Languages.map((lang) => {
                return (
                  <li
                    key={lang.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xl font-medium ">{lang.name}</span>{" "}
                    <span>{lang.proficiencyLevel}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <></>
        )}
        {candidate.Education.length > 0 ? (
          <section className="col-start-1 rounded-lg p-6 ring-1 ring-neutral-4">
            <h3 className="text-2xl font-medium text-black">Образование</h3>
            {candidate.Education.map((ed) => (
              <div key={ed.id} className="mt-[42px] flex gap-[128px]">
                <KeyValueColumn title="Место" value={ed.institution} />
                <KeyValueColumn title="Степень" value={ed.degree} />
                <KeyValueColumn
                  title="Специальность"
                  value={ed.specialization}
                />
              </div>
            ))}
          </section>
        ) : (
          <></>
        )}
        {candidate.Experience.length > 0 ? (
          <section className="col-start-1 rounded-lg p-6 ring-1 ring-neutral-4">
            <h3 className="text-2xl font-medium text-black">Опыт работы</h3>
            {candidate.Experience.map((exp) => {
              const expYear = differenceInYears(exp.from, exp.to || Date.now());
              return (
                <div key={exp.id} className="mt-[42px] flex gap-[128px]">
                  <KeyValueColumn title="Место" value={exp.company} />
                  <KeyValueColumn
                    title="Занимаемая должность"
                    value={exp.jobTitle}
                  />
                  <KeyValueColumn
                    title="Стаж работы"
                    value={expYear > 0 ? `${expYear} лет` : "меньше года"}
                  />
                </div>
              );
            })}
          </section>
        ) : (
          <></>
        )}
        {candidate.Skills.length > 0 ? (
          <section className="col-start-1 rounded-lg p-6 ring-1 ring-neutral-4">
            <h3 className="text-2xl font-medium text-black">Способности</h3>
            <div className="mt-[42px] flex items-center gap-2">
              {candidate.Skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-[10px] border border-neutral-4 bg-cardBg px-2 py-1 text-xl"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <></>
        )}
        {candidate.Pricing.length > 0 ? (
          <section className="col-start-1 rounded-lg p-6 ring-1 ring-neutral-4">
            <h3 className="text-2xl font-medium text-black">
              Вид поиска работы
            </h3>
            <div className="mt-[42px] flex items-center gap-2">
              {candidate.Pricing.map((pricing) => (
                <div
                  key={pricing.id}
                  className="px-2 py-1 text-xl font-medium text-primary-text"
                >
                  {pricing.pricingType[0]}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <></>
        )}
        <section className="col-start-1 rounded-lg p-6 ring-1 ring-neutral-4">
          <h3 className="text-2xl font-medium text-black">О себе</h3>
          <p className="mt-[42px]">{candidate.user.about}</p>
        </section>
      </div>
    </div>
  );
}
