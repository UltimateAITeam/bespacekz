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

interface ICandidateCardProps extends ICandidate {}

export function CandidateCard(props: ICandidateCardProps) {
  const { user, jobTitle, Skills, Experience, Portfolio, id } = props;
  const router = useRouter();

  return (
    <Link href={`/candidates/${id}`} className="block max-w-[960px]">
      <div className="flex max-w-[960px] cursor-pointer gap-6 rounded-[8px] border !border-[rgba(20,20,20,0.1)] p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row">
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
                <Badge className="ml-3 !bg-[#7D5AE2]/10 !px-[6px] !font-roboto	!font-medium !normal-case !text-[#7D5AE2]">
                  Новый пост
                </Badge>
              </div>
            </div>
            <div className="ml-auto">
              <Button
                colorScheme="messenger"
                variant="outline"
                className="ml-3"
                onClick={() => null}
              >
                Написать
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-5 [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&_span]:font-roboto [&_span]:text-primary-10">
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
          <div className="mt-3 flex text-primary-10">
            <ButtonGroup
              variant="solid"
              colorScheme="linkedin"
              size="xs"
              spacing="2"
            >
              {Skills.map((s) => {
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
          <div className="relative mt-2 flex gap-4 overflow-hidden p-[2px] after:absolute after:right-0 after:top-0 after:h-full after:w-[20%] after:bg-gradient-to-l after:from-white [&>div]:shrink-0">
            {Experience.map((job, idx) => {
              return (
                <div
                  key={job.id}
                  className="flex items-center rounded-md bg-[#7D5AE2]/10 px-3 py-1 ring-1 ring-black/15"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="ml-2 text-xs text-black/80">
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
                  className="flex items-center rounded-md bg-[#7D5AE2]/10 px-3 py-1 ring-1 ring-black/15"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="ml-2 text-xs text-black/80">
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
                  className="flex items-center rounded-md bg-[#7D5AE2]/10 px-3 py-1 ring-1 ring-black/15"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="ml-2 text-xs text-black/80">
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
                  className="flex items-center rounded-md bg-[#7D5AE2]/10 px-3 py-1 ring-1 ring-black/15"
                >
                  <p className="text-sm font-medium text-primary-text">
                    {job.company}
                  </p>
                  <p className="ml-2 text-xs text-black/80">
                    {format(job.from, "MM.yyyy")} -{" "}
                    {job.to ? format(job.to, "MM.yyyy") : "текущее время"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}

export const CandidateCardSkeleton = ({ count = 1 }: { count: number }) => {
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
