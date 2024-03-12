'use client';

import {ICandidate} from '@/types/candidates.types';
import {Badge, Button, ButtonGroup} from '@chakra-ui/react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useMemo} from 'react';
import {CiCalendar, CiClock2} from 'react-icons/ci';
import {IoIosCheckmarkCircleOutline} from 'react-icons/io';
import {AiOutlineBank} from 'react-icons/ai';
import {FaRegStar} from 'react-icons/fa';
import {IoIosSearch} from 'react-icons/io';
import {IoLocationOutline} from 'react-icons/io5';
import {LuDot} from 'react-icons/lu';
import {Skeleton} from '../ui/skeleton';
import { format } from 'date-fns';

interface ICandidateCardProps extends ICandidate {}

export function CandidateCard(props: ICandidateCardProps) {
  const {user, jobTitle, Skills, Experience} = props;
  const router = useRouter();

  return (
    <div className="flex md:flex-row p-6 gap-6 border rounded-[8px] shadow-sm hover:shadow-md transition-shadow !border-[rgba(20,20,20,0.1)] max-w-[960px]">
      <div className="shrink-0">
        {/* "/images/Avatar.png" */}
        <Image src={user.image ? user.image as string : "/images/Avatar.png"} alt="Avatar" width={80} height={80} />
      </div>
      <div className="flex-1">
        <div className="flex w-full">
          <div>
            <p className="text-lg !leading-normal text-primary-text">{`${user.last_name} ${user.name}`}</p>
            <div className="flex items-center">

              {jobTitle && <h3 className="text-2xl font-medium !leading-normal text-primary-text">{jobTitle.name}</h3>}
              <Badge className="ml-3 !text-[#7D5AE2] !bg-[#7D5AE2]/10 !normal-case	!px-[6px] !font-roboto !font-medium">
                Новый пост
              </Badge>
            </div>
          </div>
          <div className="ml-auto">
            <Button colorScheme="messenger" variant="outline" className="ml-3" onClick={() => null}>
              Написать
            </Button>
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
            <span>213 выполненных работ</span>
          </div>
          <LuDot />
          <div>
            <AiOutlineBank />
            <span>3 года опыта работы</span>
          </div>
        </div>
        <div className="flex mt-3 text-primary-10">
          <ButtonGroup variant="solid" colorScheme="linkedin" size="xs" spacing="2">
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
        <div className="flex gap-4">
          {Experience.map((job, idx) => {
            return (
              <div key={job.id} className='py-1 px-3 rounded-md ring-1 ring-black/15 hover:bg-[#7D5AE2]/10'>
                <p className='text-sm font-medium text-primary-text'>{job.company}</p>
                <p className='text-xs text-black/70'>{format(job.from, "MM.yyyy")} - {job.to ? format(job.to, "MM.yyyy") : 'текущее время'}</p>
                <p className='text-sm text-black/80 font-medium'>{job.jobTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const CandidateCardSkeleton = ({count = 1}: {count: number}) => {
  const array = useMemo(() => Array.from({length: count}, (v, i) => i), [count]);
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
