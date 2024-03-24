"use client";

import { JOB_TYPES_MAP } from "@/data/job_types";
import { IVacancy } from "@/types/vacancies.types";
import { Badge, Button, ButtonGroup, Card } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

interface IPropsVacancy extends IVacancy {}
export default function VacancyCard(props: IPropsVacancy) {
  const { status, data } = useSession();
  const {
    aboutVacancy,
    city,
    createdAt,
    currency,
    priceFrom,
    priceTo,
    jobTitle,
    experience,
    specialization,
    id,
    pricingType,
    requiredSkills,
    clientProfile,
    favoritedBy,
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobTypeComputed = useMemo(
    () => JOB_TYPES_MAP[pricingType],
    [pricingType],
  );
  const { mutate } = useSWRConfig();
  console.log("@clientProfile", clientProfile);

  const filtersParams = new URLSearchParams(searchParams);
  const pageParam = filtersParams.get("page");
  filtersParams.delete("page");

  const isFavorite =
    status === "authenticated" &&
    favoritedBy &&
    favoritedBy.map((v) => v.user.id).includes(data.user.id);

  return (
    <div className="flex max-w-full !gap-6 rounded-[8px] border !border-[rgba(20,20,20,0.1)] !p-6 shadow-sm transition-shadow hover:shadow-md md:!flex-row">
      <div className="shrink-0">
        <Image src="/images/Avatar.png" alt="Avatar" width={80} height={80} />
      </div>
      <div className="flex-1">
        <div className="flex w-full">
          <div>
            <h2 className="text-mainText font-roboto text-[30px] font-medium">
              {jobTitle.name}
            </h2>
            <div className="flex items-center">
              <p className="font-roboto text-base font-medium text-primary-text">
                <span className="font-normal">Компания:</span>{" "}
                {clientProfile?.companyInfo}
              </p>
              <Badge className="ml-3 !bg-[#7D5AE2]/10 !px-[6px] !font-roboto	!font-medium !normal-case !text-[#7D5AE2]">
                Новый пост
              </Badge>
            </div>
          </div>
          <div className="ml-auto">
            {status === "authenticated" && (
              <Button
                leftIcon={<FaRegStar />}
                colorScheme="yellow"
                variant={isFavorite ? "solid" : "outline"}
                onClick={async () => {
                  await fetch("/api/favorite", {
                    method: isFavorite ? "DELETE" : "POST",
                    body: JSON.stringify({
                      job_id: id,
                      user_id: data.user.id,
                    }),
                  });

                  mutate(
                    `/api/get_vacancies?${filtersParams}&page=${pageParam || 1}&limit=${6}`,
                  );
                }}
              >
                {isFavorite ? "Удалить из избранного" : "В Избранное"}
              </Button>
            )}
            <Link href={`/vacancies/${id}`}>
              <Button
                colorScheme="messenger"
                variant="outline"
                className="ml-3"
                // onClick={() => router.push(`/vacancies/${id}`)}
              >
                Подробнее
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-5 [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&_span]:font-roboto [&_span]:text-primary-10">
          <div>
            <IoLocationOutline />
            <span>{city}</span>
          </div>
          <LuDot />
          <div>
            <CiClock2 />
            <span>Полный график</span>
          </div>
          <LuDot />
          <div>
            <IoIosSearch />
            <span>{jobTypeComputed}</span>
          </div>
          <LuDot />
          <div>
            <span>
              ₸ {priceFrom}-{priceTo} {currency}
            </span>
          </div>
          <LuDot />
          <div>
            <CiCalendar />
            <span>2 дня назад</span>
          </div>
        </div>
        <div className="mt-3 flex text-primary-10">
          <span className="mr-1 font-roboto">Кто нужен:</span>
          <ButtonGroup
            variant="solid"
            colorScheme="linkedin"
            size="xs"
            spacing="2"
          >
            {requiredSkills.map((s) => {
              return (
                <Button key={s}>
                  <span className="text-sm !leading-none">{s}</span>
                </Button>
              );
            })}
            {/* <Button leftIcon={<FaPlus />}>
                            <span className="!leading-none text-sm">3</span>
                        </Button> */}
          </ButtonGroup>
        </div>
        <div className="mt-3 font-roboto text-primary-10">
          <p>
            Требуемый опыт работы: <span>{experience} лет</span>
          </p>
        </div>
        <div className="mt-3 line-clamp-2 font-roboto text-primary-10">
          <p>{aboutVacancy}</p>
        </div>
      </div>
    </div>
  );
}

export const VacancyCardSkeleton = ({ count = 1 }: { count: number }) => {
  const array = useMemo(
    () => Array.from({ length: count }, (v, i) => i),
    [count],
  );
  return (
    <div className="w-full space-y-8">
      {array.map((_, idx) => (
        <div key={idx} className="h-[270px] w-full">
          <Skeleton className="h-[270px] w-full" />
        </div>
      ))}
    </div>
  );
};
