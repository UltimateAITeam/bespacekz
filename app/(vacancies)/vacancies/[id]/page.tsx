import {Prisma} from '@prisma/client';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import {IoLocationOutline} from 'react-icons/io5';
import {CiClock2} from 'react-icons/ci';
import {IoIosSearch} from 'react-icons/io';
import {GrCurrency} from 'react-icons/gr';

type Vacancy = Prisma.VacancyGetPayload<{}>;
interface AboutVacancyPageProps {
    params: {
        id: string;
    };
}

async function getVacancyById<T>(id: string) {
    const response = await fetch(`http://localhost:3000/api/get_vacancy_by_id/${id}`);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data vacancies_by_id');
    }

    return response.json() as T;
}

export default async function AboutVacancyPage({params}: AboutVacancyPageProps) {
    const vacancy = await getVacancyById<Vacancy>(params.id);
    return (
        <div className="font-roboto">
            <h1 className="text-[38px] leading-tight font-medium">{vacancy.title}</h1>
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
                                            <p className="font-medium shrink-0">ИП Чипина Александра</p>
                                        </li>
                                        <li className="whitespace-normal flex flex-col">
                                            <div className="mr-1">ФИО:</div>{' '}
                                            <p className="font-medium shrink-0">Жукупов Арман</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-7 grid grid-cols-2 [&>div]:flex [&>div]:gap-2 [&>div]:items-center">
                                <div>
                                    <IoLocationOutline className="text-primary-10" />
                                    <span>Астана</span>
                                </div>
                                <div>
                                    <CiClock2 className="text-primary-10"/>
                                    <span>Полный график</span>
                                </div>
                                <div>
                                    <IoIosSearch className="text-primary-10"/>
                                    <span>Сотрудник</span>
                                </div>
                                <div>
                                    <span className='w-[1em] h-[1em] text-center align-middle shrink-0'>₸</span>
                                    <span>
                                        {vacancy.priceFrom}-{vacancy.priceTo} {vacancy.currency}
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
        </div>
    );
}
