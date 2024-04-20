import { CandidateCard } from "@/components/candidates/CandidateCard";
import CurrencyIcon from "@/components/icons/CurrencyIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendedVacancies } from "@/components/vacancies/RecommendedVacancies";
import { RespondToVacancy } from "@/components/vacancies/VacanciesActions/RespondToVacancy";
import { VacancyCardSkeleton } from "@/components/vacancies/VacancyCard";
import { JOB_TYPES_MAP } from "@/data/job_types";
import { prisma } from "@/libs/prisma";
import { thousandSeparator } from "@/libs/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";
import { CiClock2 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import parse from "html-react-parser";
import { Button, Flex } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";

interface AboutVacancyPageProps {
  params: {
    id: string;
  };
}

export default async function AboutVacancyPage({
  params,
}: AboutVacancyPageProps) {
  const vacancy = await prisma.vacancy.findUniqueOrThrow({
    where: {
      id: params.id,
    },
    select: {
      chosenCandidate: {
        select: {
          id: true,
        },
      },
      id: true,
      city: true,
      jobTitle: {
        select: {
          name: true,
        },
      },
      aboutVacancy: true,
      priceFrom: true,
      priceTo: true,
      clientProfile: {
        select: {
          companyInfo: true,
          user: {
            select: {
              name: true,
              last_name: true,
            },
          },
        },
      },
      pricingType: true,
      currency: true,
      _count: {
        select: {
          applicants: true,
        },
      },
      applicants: {
        select: {
          user: {
            select: {
              image: true,
              about: true,
              name: true,
              last_name: true,
              location: true,
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
      },
    },
  });

  return (
    <div className="font-roboto pb-28">
      <h1 className="text-[38px] leading-tight font-medium">
        {vacancy.jobTitle.name}
      </h1>
      <div className="mt-10 flex gap-9">
        <div className="w-1/4 shrink-0">
          <Card className="p-5 font-roboto">
            <CardHeader className="p-0">
              <CardTitle className="font-medium">Личные данные</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-3">
              <div className="flex items-start">
                <Image
                  src="/images/Avatar.png"
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="object-cover aspect-square"
                />
                <div className="ml-10">
                  <ul>
                    <li className="whitespace-normal flex flex-col">
                      <div className="mr-1">Компания:</div>
                      <p className="font-medium shrink-0">
                        {vacancy.clientProfile.companyInfo}
                      </p>
                    </li>
                    <li className="whitespace-normal flex flex-col">
                      <div className="mr-1">ФИО:</div>{" "}
                      <p className="font-medium shrink-0">{`${vacancy.clientProfile.user.name} ${vacancy.clientProfile.user.last_name}`}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-7 grid grid-cols-2 [&>div]:flex [&>div]:gap-2 [&>div]:items-center gap-y-3">
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
        </div>
        <div>
          <Card>
            <CardContent className="p-7">
              <div>{parse(vacancy.aboutVacancy)}</div>
            </CardContent>
          </Card>
        </div>
      </div>
      {vacancy.applicants && vacancy.applicants.length > 0 ? (
        <>
          <Flex className="mt-16 mb-11 items-center gap-4">
            <h2 className="font-medium text-3xl">
              Откликнувшиеся кандидаты ({vacancy._count.applicants})
            </h2>
            <Button
              isLoading={false}
              isDisabled={false}
              // onClick={() => {}}
              leftIcon={<BsStars />}
              colorScheme="pink"
              size="md"
            >
              AI подбор кандидатов
            </Button>
          </Flex>
          <div className="space-y-8">
            {vacancy.applicants.map((applicant) => (
              <CandidateCard
                key={applicant.id}
                {...applicant}
                isApplicable={true}
                vacancyId={vacancy.id}
                isChosen={applicant.id === vacancy.chosenCandidate?.id}
                chosenCandidateId={vacancy.chosenCandidate?.id}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 className="mt-16 font-medium text-3xl">
          К сожалению никто еще не откликунлся
        </h2>
      )}
    </div>
  );
}
