import {Badge, Button, Card, CardBody} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock2, CiCalendar } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { LuDot } from "react-icons/lu";






export default function VacancyCard() {
    return (
        <Card className="flex md:!flex-row !p-6 !gap-6 max-w-full">
            <div className='shrink-0'>
                <Image src="/images/Avatar.png" alt="Avatar" width={80} height={80} />
            </div>
            <div className='flex-1'>
                <div className="flex w-full">
                    <div>
                        <h2 className="text-[30px] font-medium font-roboto text-mainText">
                            Специалист по видеомонтажу
                        </h2>
                        <div className="flex items-center">
                            <p className="text-base font-roboto text-mainText font-medium">
                                <span className="font-normal">Компания:</span> ИП Чипина Александра
                            </p>
                            <Badge className="ml-3 !text-[#7D5AE2] !bg-[#7D5AE2]/10 !normal-case	!px-[6px]">
                                Новый пост
                            </Badge>
                        </div>
                    </div>
                    <div className='ml-auto'>
                        <Button leftIcon={<FaRegStar />} colorScheme="yellow" variant="outline" >
                        В Избранное
                        </Button>
                        <Button colorScheme="messenger" variant="outline" className='ml-3'>
                            Подробнее
                        </Button>
                    </div>
                </div>
                <div className='flex items-center gap-6 mt-2 [&>div]:flex [&>div]:gap-2 [&>div]:items-center [&_span]:text-primary-10'>
                    <div><IoLocationOutline /><span>Астана</span></div>
                    <LuDot />
                    <div><CiClock2 /><span>Полный график</span></div>
                    <LuDot />
                    <div><IoIosSearch /><span>Сотрудник</span></div>
                    <LuDot />
                    <div><span>₸ 250-500k</span></div>
                    <LuDot />
                    <div><CiCalendar/><span>2 дня назад</span></div>
                </div>
                <div className='flex mt-3'>
                    <span>Кто нужен:</span>
                </div>
            </div>
        </Card>
    );
}
