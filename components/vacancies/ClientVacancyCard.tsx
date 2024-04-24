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
import parse from "html-react-parser";
import { thousandSeparator } from "@/libs/utils";

const vacancyStatuses = {
  ACTIVE: "Активна",
  ARCHIVED: "В архиве",
  IN_PROGRESS: "Выполняется",
  COMPLETE: "Выполнена",
};

interface IPropsVacancy extends IVacancy {}
export default function ClientVacancyCard(props: IPropsVacancy) {
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
    status: vacancyStatus,
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobTypeComputed = useMemo(
    () => JOB_TYPES_MAP[pricingType],
    [pricingType],
  );
  const { mutate } = useSWRConfig();

  const filtersParams = new URLSearchParams(searchParams);
  const pageParam = filtersParams.get("page");
  filtersParams.delete("page");

  const isFavorite =
    status === "authenticated" &&
    favoritedBy?.map((v) => v.user.id).includes(data.user.id);

  return (
    <div className="flex md:!flex-row !p-6 !gap-6 max-w-full border rounded-[8px] shadow-sm hover:shadow-md transition-shadow !border-[rgba(20,20,20,0.1)]">
      <div className="shrink-0">
        <Image src="/images/Avatar.png" alt="Avatar" width={80} height={80} />
      </div>
      <div className="flex-1">
        <div className="flex w-full">
          <div>
            <h2 className="text-[30px] font-medium font-roboto text-mainText">
              {jobTitle.name}
            </h2>
            <div className="flex items-center">
              <p className="text-base font-roboto text-primary-text font-medium">
                <span className="font-normal">Компания:</span>{" "}
                {clientProfile?.companyInfo}
              </p>
              <Badge className="ml-3 !text-[#7D5AE2] !bg-[#7D5AE2]/10 !normal-case	!px-[6px] !font-roboto !font-medium">
                {vacancyStatuses[vacancyStatus]}
              </Badge>
            </div>
          </div>
          <div className="ml-auto">
            <Link href={`/vacancies/my/${id}`}>
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
        <div className="flex items-center mt-2 gap-5 [&>div]:flex [&>div]:gap-2 [&>div]:items-center [&_span]:text-primary-10 [&_span]:font-roboto">
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
              ₸ {thousandSeparator(priceFrom)} - {thousandSeparator(priceTo)}{" "}
              {currency}
            </span>
          </div>
          <LuDot />
          <div>
            <CiCalendar />
            <span>2 дня назад</span>
          </div>
        </div>
        <div className="flex mt-3 text-primary-10">
          <span className="font-roboto mr-1">Кто нужен:</span>
          <ButtonGroup
            variant="solid"
            colorScheme="linkedin"
            size="xs"
            spacing="2"
          >
            {requiredSkills.map((s) => {
              return (
                <Button key={s}>
                  <span className="!leading-none text-sm">{s}</span>
                </Button>
              );
            })}
            {/* <Button leftIcon={<FaPlus />}>
                            <span className="!leading-none text-sm">3</span>
                        </Button> */}
          </ButtonGroup>
        </div>
        <div className="mt-3 text-primary-10 font-roboto">
          <p>
            Требуемый опыт работы: <span>{experience} лет</span>
          </p>
        </div>
        <div className="mt-3 text-primary-10 font-roboto line-clamp-2">
          {parse(aboutVacancy)}
        </div>
      </div>
    </div>
  );
}
