"use client";

import { ICandidate } from "@/types/candidates.types";
import { Badge, Button, ButtonGroup } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineBank } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";
import parse from "html-react-parser";
import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import { selectCandidate } from "./actions";

interface ICandidateCardProps extends ICandidate {
  isApplicable?: boolean;
  vacancyId?: string;
  isChosen?: boolean;
  chosenCandidateId?: string;
}

export function CandidateCard(props: ICandidateCardProps) {
  const {
    user,
    jobTitle,
    Skills,
    Experience,
    Portfolio,
    id,
    isApplicable = false,
    vacancyId,
    isChosen = false,
    chosenCandidateId,
  } = props;
  const router = useRouter();

  return (
    <div className="max-w-[1280px] block">
      <div className="flex md:flex-row p-6 gap-6 border rounded-[8px] shadow-sm hover:shadow-md transition-shadow !border-[rgba(20,20,20,0.1)] max-w-[1280px]">
        <div className="shrink-0">
          {/* "/images/Avatar.png" */}
          <Image
            src={user.image || "/images/Avatar.png"}
            alt="Avatar"
            width={80}
            height={80}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex w-full">
            <div>
              <p className="text-lg !leading-normal text-primary-text">{`${user.last_name} ${user.name}`}</p>
              <div className="flex items-center">
                {jobTitle && (
                  <h3 className="text-2xl font-medium !leading-normal text-primary-text">
                    {jobTitle.name}
                  </h3>
                )}
                <Badge className="ml-3 !text-[#7D5AE2] !bg-[#7D5AE2]/10 !normal-case	!px-[6px] !font-roboto !font-medium">
                  Новый пост
                </Badge>
              </div>
            </div>
            <div className="ml-auto flex flex-row space-x-4">
              <Link href={`/candidates/${id}`} className="max-w-[1280px] block">
                <Button
                  colorScheme="gray"
                  variant="outline"
                  className="ml-3"
                  onClick={() => null}
                >
                  Посмотреть профиль
                </Button>
              </Link>
              <Button
                as={Link}
                href={`mailto:${user.email}`}
                colorScheme="messenger"
                variant="outline"
                className="ml-3"
              >
                Ответить
              </Button>
              {isApplicable &&
                (chosenCandidateId ? (
                  chosenCandidateId === id ? (
                    <Button
                      colorScheme="messenger"
                      variant="solid"
                      className="ml-3"
                      isDisabled
                    >
                      Выбран
                    </Button>
                  ) : null
                ) : (
                  <Button
                    colorScheme="messenger"
                    variant="solid"
                    className="ml-3"
                    onClick={() => selectCandidate(vacancyId!, id)}
                  >
                    Выбрать
                  </Button>
                ))}
            </div>
          </div>
          <div className="flex items-center mt-2 gap-5 [&>div]:flex [&>div]:gap-2 [&>div]:items-center [&_span]:text-primary-10 [&_span]:font-roboto">
            {!!user.location && (
              <>
                <div>
                  <IoLocationOutline />
                  <span>{user.location}</span>
                </div>
                <LuDot />
              </>
            )}
            <div>
              <IoIosCheckmarkCircleOutline />
              <span>{Portfolio.length} выполненных работ</span>
            </div>
            <LuDot />
            <div>
              <AiOutlineBank />
              <span>3 года опыта работы</span>
            </div>
          </div>
          <div className="flex mt-3 text-primary-10">
            <ButtonGroup
              variant="solid"
              colorScheme="linkedin"
              size="xs"
              spacing="2"
            >
              {Skills.map((s) => {
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

          <div className="flex gap-4 mt-2 overflow-hidden p-[2px] relative after:absolute after:right-0 after:h-full after:top-0 after:w-[20%] after:bg-gradient-to-l after:from-white [&>div]:shrink-0">
            {Experience.map((job, idx) => {
              return (
                <div
                  key={job.id}
                  className="py-1 px-3 rounded-md ring-1 ring-black/15 bg-[#7D5AE2]/10 flex items-center"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="text-xs text-black/80 ml-2">
                    {format(job.from, "MM.yyyy")} -{" "}
                    {job.to ? format(job.to, "MM.yyyy") : "текущее время"}
                  </p>
                </div>
              );
            })}
            {Experience.map((job, idx) => {
              return (
                <div
                  key={job.id}
                  className="py-1 px-3 rounded-md ring-1 ring-black/15 bg-[#7D5AE2]/10 flex items-center"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="text-xs text-black/80 ml-2">
                    {format(job.from, "MM.yyyy")} -{" "}
                    {job.to ? format(job.to, "MM.yyyy") : "текущее время"}
                  </p>
                </div>
              );
            })}
            {Experience.map((job, idx) => {
              return (
                <div
                  key={job.id}
                  className="py-1 px-3 rounded-md ring-1 ring-black/15 bg-[#7D5AE2]/10 flex items-center"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="text-xs text-black/80 ml-2">
                    {format(job.from, "MM.yyyy")} -{" "}
                    {job.to ? format(job.to, "MM.yyyy") : "текущее время"}
                  </p>
                </div>
              );
            })}
            {Experience.map((job, idx) => {
              return (
                <div
                  key={job.id}
                  className="py-1 px-3 rounded-md ring-1 ring-black/15 bg-[#7D5AE2]/10 flex items-center"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="text-xs text-black/80 ml-2">
                    {format(job.from, "MM.yyyy")} -{" "}
                    {job.to ? format(job.to, "MM.yyyy") : "текущее время"}
                  </p>
                </div>
              );
            })}
          </div>

          {user.about && (
            <div className="mt-3 text-primary-10 font-roboto line-clamp-2">
              {parse(user.about || "")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const CandidateCardSkeleton = ({ count = 1 }: { count: number }) => {
  const array = useMemo(
    () => Array.from({ length: count }, (v, i) => i),
    [count],
  );
  return (
    <div className="space-y-8 w-full">
      {array.map((_, idx) => (
        <div key={idx} className="w-full h-[270px]">
          <Skeleton className="w-full h-[270px]" />
        </div>
      ))}
    </div>
  );
};
