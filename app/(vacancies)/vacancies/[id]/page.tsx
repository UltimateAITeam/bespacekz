import CurrencyIcon from "@/components/icons/CurrencyIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendedVacancies } from "@/components/vacancies/RecommendedVacancies";
import { RespondToVacancy } from "@/components/vacancies/VacanciesActions/RespondToVacancy";
import { VacancyCardSkeleton } from "@/components/vacancies/VacancyCard";
import { JOB_TYPES_MAP } from "@/data/job_types";
import { thousandSeparator } from "@/libs/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";
import { CiClock2 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
type Vacancy = Prisma.VacancyGetPayload<{
  include: {
    jobTitle: true;
    clientProfile: {
      include: {
        user: true;
      };
    };
  };
}>;

async function getVacancyById<T>(id: string) {
  const response = await fetch(
    `${process.env.API_URL}/api/get_vacancies/${id}/`,
  );
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data vacancies_by_id");
  }
  return response.json() as T;
}
interface AboutVacancyPageProps {
  params: {
    id: string;
  };
}

export default async function AboutVacancyPage({
  params,
}: AboutVacancyPageProps) {
  const vacancy = await getVacancyById<Vacancy>(params.id);
  return (
    <div className="pb-28 font-roboto">
      <h1 className="text-[38px] font-medium leading-tight">
        {vacancy.jobTitle.name}
      </h1>
      <div className="mt-10 flex gap-9">
        <div className="w-1/4 shrink-0">
          <Card className="p-5 font-roboto">
            <CardHeader className="p-0">
              <CardTitle className="font-medium">Личные данные</CardTitle>
            </CardHeader>
            <CardContent className="mt-3 p-0">
              <div className="flex items-start">
                <Image
                  src="/images/Avatar.png"
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="aspect-square object-cover"
                />
                <div className="ml-10">
                  <ul>
                    <li className="flex flex-col whitespace-normal">
                      <div className="mr-1">Компания:</div>
                      <p className="shrink-0 font-medium">
                        {vacancy.clientProfile.companyInfo}
                      </p>
                    </li>
                    <li className="flex flex-col whitespace-normal">
                      <div className="mr-1">ФИО:</div>{" "}
                      <p className="shrink-0 font-medium">{`${vacancy.clientProfile.user.name} ${vacancy.clientProfile.user.last_name}`}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-y-3 [&>div]:flex [&>div]:items-center [&>div]:gap-2">
                <div>
                  <IoLocationOutline className="text-primary-10" />
                  <span>{vacancy.city}</span>
                </div>
                <div>
                  <CiClock2 className="text-primary-10" />
                  <span>Полный график</span>
                </div>
                <div>
                  <IoIosSearch className="text-primary-10" />
                  <span>{JOB_TYPES_MAP[vacancy.pricingType]}</span>
                </div>
                <div>
                  <CurrencyIcon currency={vacancy.currency} />
                  <span>
                    {thousandSeparator(vacancy.priceFrom)} -{" "}
                    {thousandSeparator(vacancy.priceTo)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-end">
            <RespondToVacancy idVacancy={vacancy.id} />
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="p-7">{vacancy.aboutVacancy}</CardContent>
          </Card>
        </div>
      </div>
      <h2 className="mb-11 mt-16 text-3xl font-medium ">
        Вам подойдут эти вакансии
      </h2>
      <Suspense fallback={<VacancyCardSkeleton count={3} />}>
        <RecommendedVacancies
          exclude_vac_id={vacancy.id}
          category_id={vacancy.jobTitle.category_id}
        />
      </Suspense>
    </div>
  );
}
