import { Badge, Button, ButtonGroup, Card } from '@chakra-ui/react';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiCalendar, CiClock2 } from 'react-icons/ci';
import { FaPlus, FaRegStar } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { LuDot } from 'react-icons/lu';

type Vacancy = Prisma.VacancyGetPayload<{}>;
interface IPropsVacancy extends Vacancy {}
export default function VacancyCard(props: IPropsVacancy) {
    const {aboutVacancy, city, createdAt, currency, priceFrom, priceTo, title, experience, specialization, id} = props;
    const router = useRouter();
    return (
        <Card className="flex md:!flex-row !p-6 !gap-6 max-w-full border border-[rgba(20,20,20,0.1)">
            <div className="shrink-0">
                <Image src="/images/Avatar.png" alt="Avatar" width={80} height={80} />
            </div>
            <div className="flex-1">
                <div className="flex w-full">
                    <div>
                        <h2 className="text-[30px] font-medium font-roboto text-mainText">{title}</h2>
                        <div className="flex items-center">
                            <p className="text-base font-roboto text-primary-text font-medium">
                                <span className="font-normal">Компания:</span> ИП Чипина Александра
                            </p>
                            <Badge className="ml-3 !text-[#7D5AE2] !bg-[#7D5AE2]/10 !normal-case	!px-[6px] !font-roboto !font-medium">
                                Новый пост
                            </Badge>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Button leftIcon={<FaRegStar />} colorScheme="yellow" variant="outline">
                            В Избранное
                        </Button>
                        <Button colorScheme="messenger" variant="outline" className="ml-3" onClick={() => router.push(`/vacancies/${id}`)}>
                            Подробнее
                        </Button>
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
                        <span>Сотрудник</span>
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
                <div className="flex mt-3 text-primary-10">
                    <span className="font-roboto mr-1">Кто нужен:</span>
                    <ButtonGroup variant="solid" colorScheme="linkedin" size="xs" spacing="2">
                        {specialization.split(', ').map((s) => {
                            return (
                                <Button key={s}>
                                    <span className="!leading-none text-sm">{s}</span>
                                </Button>
                            );
                        })}
                        <Button leftIcon={<FaPlus />}>
                            <span className="!leading-none text-sm">3</span>
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="mt-3 text-primary-10 font-roboto">
                    <p>
                        Требуемый опыт работы: <span>{experience} лет</span>
                    </p>
                </div>
                <div className="mt-3 text-primary-10 font-roboto line-clamp-2">
                    <p>{aboutVacancy}</p>
                </div>
            </div>
        </Card>
    );
}
