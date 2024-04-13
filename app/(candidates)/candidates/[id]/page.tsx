import { KeyValueColumn } from "@/components/ui/KeyValue/KeyValueColumn";
import { CandidatesService } from "@/services/candidates.service";
import { ICandidate } from "@/types/candidates.types";
import { differenceInYears } from "date-fns";
import Image from "next/image";
import parse from "html-react-parser";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { findClientSubscriptionById } from "@/services/client-subscription";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface CandidatePageProps {
  params: {
    id: string;
  };
}
export default async function CandidatePage({ params }: CandidatePageProps) {
  const candidate = await prisma.freelancerProfile.findUnique({
    where: {
      id: params.id,
      user: {
        role: "FREELANCER",
      },
    },
    select: {
      user: {
        select: {
          image: true,
          about: true,
          name: true,
          last_name: true,
          location: true,
          email: true,
          phone: true,
        },
      },
      Education: true,
      Experience: true,
      Languages: true,
      Pricing: true,
      Portfolio: true,
      jobTitle: true,
      Skills: true,
      id: true,
    },
  });

  if (!candidate) {
    return NextResponse.error();
  }

  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  const client = await prisma.clientProfile.findUnique({
    where: {
      userEmail: session.user.email,
    },
    select: {
      id: true,
    },
  });

  let isClientSubscribed = false;

  if (client) {
    const clientSubscription = await findClientSubscriptionById(client.id);

    if (clientSubscription) {
      isClientSubscribed = true;
    }
  }

  return (
    <div className="font-roboto pb-28 text-black ">
      <h2 className="text-[#01001E] text-[30px] leading-tight font-medium">
        Просмотр кандидата
      </h2>
      <div className="mt-8 grid grid-cols-[1fr_335px] items-start gap-6">
        <section className="ring-1 ring-neutral-4 p-6 rounded-lg">
          <h3 className="text-black text-2xl font-medium">Личные данные</h3>
          <div className="mt-[42px] flex ">
            <Image
              src={candidate.user.image || "/images/Avatar.png"}
              width={140}
              height={140}
              alt={`photo ${candidate.user.name}`}
              className="w-[140px] h-[140px] rounded-full"
            />
            <div className="ml-[150px] flex flex-col max-h-[200px] flex-wrap justify-between gap-y-6 gap-x-16">
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
            {isClientSubscribed && (
              <div className="ml-16 flex flex-col max-h-[200px] flex-wrap justify-between gap-y-6 gap-x-16">
                <KeyValueColumn
                  title="Email"
                  value={candidate.user.email}
                  className="!gap-1"
                />
                {candidate.user.phone && (
                  <KeyValueColumn
                    title="Телефон"
                    value={candidate.user.phone}
                    className="!gap-1"
                  />
                )}
              </div>
            )}
          </div>
        </section>
        {candidate.Languages.length > 0 ? (
          <section className="ring-1 ring-neutral-4 p-6 rounded-lg col-start-2">
            <h3 className="text-black text-2xl font-medium">Знание языков</h3>
            <ul className="mt-8 space-y-4">
              {candidate.Languages.map((lang) => {
                return (
                  <li
                    key={lang.id}
                    className="flex justify-between items-center"
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
          <section className="ring-1 ring-neutral-4 p-6 rounded-lg col-start-1">
            <h3 className="text-black text-2xl font-medium">Образование</h3>
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
          <section className="ring-1 ring-neutral-4 p-6 rounded-lg col-start-1">
            <h3 className="text-black text-2xl font-medium">Опыт работы</h3>
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
          <section className="ring-1 ring-neutral-4 p-6 rounded-lg col-start-1">
            <h3 className="text-black text-2xl font-medium">Способности</h3>
            <div className="mt-[42px] flex gap-2 items-center">
              {candidate.Skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-cardBg border border-neutral-4 text-xl py-1 px-2 rounded-[10px]"
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
          <section className="ring-1 ring-neutral-4 p-6 rounded-lg col-start-1">
            <h3 className="text-black text-2xl font-medium">
              Вид поиска работы
            </h3>
            <div className="mt-[42px] flex gap-2 items-center">
              {candidate.Pricing.map((pricing) => (
                <div
                  key={pricing.id}
                  className="text-xl py-1 px-2 font-medium text-primary-text"
                >
                  {pricing.pricingType[0] === "EMPLOYEE"
                    ? "Ищу работу на постоянной основе"
                    : "Фрилансер"}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <></>
        )}
        <section className="ring-1 ring-neutral-4 p-6 rounded-lg col-start-1">
          <h3 className="text-black text-2xl font-medium">О себе</h3>
          {/* <p className="mt-[42px]">{candidate.user.about}</p> */}
          <div className="mt-4">{parse(candidate.user.about || "")}</div>
        </section>
      </div>
    </div>
  );
}
