import { CandidateCard } from '@/components/candidates/CandidateCard';
import CurrencyIcon from '@/components/icons/CurrencyIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecommendedVacancies } from '@/components/vacancies/RecommendedVacancies';
import { RespondToVacancy } from '@/components/vacancies/VacanciesActions/RespondToVacancy';
import { VacancyCardSkeleton } from '@/components/vacancies/VacancyCard';
import { JOB_TYPES_MAP } from '@/data/job_types';
import { prisma } from '@/libs/prisma';
import { thousandSeparator } from '@/libs/utils';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { Suspense } from 'react';
import { CiClock2 } from 'react-icons/ci';
import { IoIosSearch } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

interface AboutVacancyPageProps {
    params: {
      id: string;
    };
  }

export default async function AboutVacancyPage({params}: AboutVacancyPageProps) {
  const vacancy = await prisma.vacancy.findUniqueOrThrow({
    where:{
        id: params.id
    },
    select:{
        city: true,
        jobTitle: {
            select:{
                name: true
            }
        },
        aboutVacancy: true,
        priceFrom: true,
        priceTo: true,
        clientProfile:{
            select:{
                companyInfo: true,
                user:{
                    select:{
                        name: true,
                        last_name: true,
                    }
                }
            }
        },
        pricingType: true,
        currency:true,
        applicants:{
            select:{
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
            }
        }
    }
  })

  return (
    <div className="font-roboto pb-28">
      <h1 className="text-[38px] leading-tight font-medium">{vacancy.jobTitle.name}</h1>
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
                      <p className="font-medium shrink-0">{vacancy.clientProfile.companyInfo}</p>
                    </li>
                    <li className="whitespace-normal flex flex-col">
                      <div className="mr-1">ФИО:</div> <p className="font-medium shrink-0">{`${vacancy.clientProfile.user.name} ${vacancy.clientProfile.user.last_name}`}</p>
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
                    {thousandSeparator(vacancy.priceFrom)} - {thousandSeparator(vacancy.priceTo)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-7">{vacancy.aboutVacancy}</CardContent>
          </Card>
        </div>
      </div>
      <h2 className='mt-16 mb-11 font-medium text-3xl'>Откликнувшиеся кандидаты</h2>
        <div className="space-y-8">
            {vacancy.applicants.map((applicant)=>
            <CandidateCard key={applicant.id} {...applicant} />
            )}
        </div>
    </div>
  );
}
