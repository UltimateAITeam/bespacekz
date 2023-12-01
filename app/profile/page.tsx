'use client';
import React, {useEffect} from 'react';
import HeadTag from "@/components/brenda_components/HeadTag";
import { LuPencilLine } from "react-icons/lu";
import {Avatar, Grid, GridItem, HStack, Stack, Tag, Textarea, Tooltip, Wrap} from "@chakra-ui/react";
import {FiPlusCircle, FiTable} from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import NewHeader from "@/components/brenda_components/NewHeader";
import Spinner from "@/components/Spinner";
import {Prisma} from "@prisma/client";

type FreelancerProfileType = Prisma.FreelancerProfileGetPayload<{
    include: {
        Education: true,
        Experience: true,
        Skill: true,
        Pricing: true,
        Portfolio: true,

    },
}>;

type UserInfoType = Prisma.UserGetPayload<{
    select: {
        name: true,
        last_name: true,
        phone: true,
        email: true,
        image: true,
        location: true,
    }
}>


function Page() {
    const [data, setData] = React.useState<FreelancerProfileType & UserInfoType>();
    useEffect(() => {
        (async () => {
            const resp = await fetch("/api/get_freelancer_profile?userId=1");
            const dta = await resp.json();
            setData(dta);
        })();
    }, [])

    const educations = data?.Education || []
    const skills = data?.Skill || []
    const experiences = data?.Experience || []

    if (!data) return <Spinner width="w-20" height="w-20" />

    return (
        <div className="min-h-screen bg-[#f0f5ff] flex flex-col">

            {/* ============== Head Tag =============== */}
            <HeadTag title="Profile - Bespace"/>

            {/* Header */}
            <NewHeader />

            <main>
                <section className={'container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 px-3 sm:flex sm:justify-center'}>
                    <Stack spacing={4} className={'lg:w-3/5 sm:w-4/5 w-full'}>
                        <h1 className={"text-3xl mb-5 font-bold"}>Просмотр аккаунта</h1>
                        {/* BLOCK TAG */}
                        <div className={'w-full bg-white flex flex-col p-4 pl-6 rounded-xl align-middle'}>
                            <div className={"flex flex-row justify-between w-full pb-8"}>
                                <h1 className={"text-2xl font-bold"}>Личные данные</h1>
                                <LuPencilLine className={"w-7 h-7"} />
                            </div>
                            <div className={"flex w-full md:flex-row flex-col"}>
                                <Stack direction={"column"}>
                                    <Avatar size={"2xl"} className={"m-auto md:m-none"} />
                                    <button className={"text-blue-500"}>Изменить</button>
                                </Stack>
                                <Grid
                                    templateColumns={"repeat(2, 1fr)"}
                                    templateRows={"repeat(2, 1fr)"}
                                    className={"md:ml-40 "}
                                    gap={4}
                                    columnGap={20}
                                >
                                    <GridItem>
                                        <p className={"font-bold"}>Имя Фамилия</p>
                                        <p>{data.name + " " + data.last_name}</p>
                                    </GridItem>
                                    <GridItem>
                                        <p className={"font-bold"}>Электронная почта</p>
                                        <p>{data.email || "No email"}</p>
                                    </GridItem>
                                    <GridItem>
                                        <p className={"font-bold"}>Страна, Город</p>
                                        <p>{data.location || "No location"}</p>
                                    </GridItem>
                                    <GridItem>
                                        <p className={"font-bold"}>Номер телефона</p>
                                        <p>{data.phone || "No phone"}</p>
                                    </GridItem>
                                </Grid>
                            </div>
                        </div>
                        {/* BLOCK TAG */}
                        <div className={'w-full bg-white flex flex-col p-4 pl-6 rounded-xl align-middle'}>
                            <div className={"flex flex-row justify-between w-full pb-8"}>
                                <h1 className={"text-2xl font-bold"}>Образование</h1>
                                <Stack direction={"row"}>
                                    <LuPencilLine className={"w-7 h-7"} />
                                    <FiPlusCircle className={"w-7 h-7"} />
                                </Stack>
                            </div>
                            <div className={"flex w-full md:flex-row flex-col"}>

                                {educations.length > 0 && educations.map(
                                    (education) => (
                                        <Stack key={education.id} direction={"row"} className={"w-full justify-between"}>
                                            <HStack
                                                gap={20}
                                                className={"justify-start w-full"}
                                            >
                                                <div>
                                                    <p className={"font-bold"}>Место</p>
                                                    <p>{education.institution}</p>
                                                </div>
                                                <div>
                                                    <p className={"font-bold"}>Степень</p>
                                                    <p>{education.degree}</p>
                                                </div>
                                                <div>
                                                    <p className={"font-bold"}>Специальность</p>
                                                    <p>{education.specialization}</p>
                                                </div>
                                            </HStack>
                                            <div>
                                                <FiTrash className={"w-8 h-8"} />
                                            </div>
                                        </Stack>
                                    )
                                )}
                            </div>
                        </div>
                        {/* BLOCK TAG */}
                        <div className={'w-full bg-white flex flex-col p-4 pl-6 rounded-xl align-middle'}>
                            <div className={"flex flex-row justify-between w-full pb-8"}>
                                <h1 className={"text-2xl font-bold"}>Стаж работы</h1>
                                <Stack direction={"row"}>
                                    <LuPencilLine className={"w-7 h-7"} />
                                    <FiPlusCircle className={"w-7 h-7"} />
                                </Stack>
                            </div>
                            <div className={"flex w-full md:flex-row flex-col"}>

                                {experiences && experiences.map(
                                    (exp) => (
                                        <Stack key={exp.id} direction={"row"} className={"w-full justify-between"}>
                                            <HStack
                                                gap={20}
                                                className={"justify-start w-full"}
                                            >
                                                <div>
                                                    <p className={"font-bold"}>Место</p>
                                                    <p>{exp.company}</p>
                                                </div>
                                                <div>
                                                    <p className={"font-bold"}>Занимаемая должность</p>
                                                    <p>{exp.roles}</p>
                                                </div>
                                                <div>
                                                    <p className={"font-bold"}>Стаж работы</p>
                                                    <p>{exp.duration + " месяцев"}</p>
                                                </div>
                                            </HStack>
                                            <div>
                                                <FiTrash className={"w-8 h-8"} />
                                            </div>
                                        </Stack>
                                    )
                                )}
                            </div>
                        </div>
                        {/* BLOCK TAG */}
                        <div className={'w-full bg-white flex flex-col p-4 pl-6 rounded-xl align-middle'}>
                            <div className={"flex flex-row justify-between w-full pb-8"}>
                                <h1 className={"text-2xl font-bold"}>Способности</h1>
                                <Stack direction={"row"}>
                                    <LuPencilLine className={"w-7 h-7"} />
                                    <FiPlusCircle className={"w-7 h-7"} />
                                </Stack>
                            </div>
                            <Stack direction={"row"} gap={4}>

                                {skills.map(
                                    (skill) => (
                                        <Tooltip placement={"top"} key={skill.id} label={skill.proficiencyLevel.toUpperCase()}>
                                            <Tag className={"cursor-default"} key={skill.name}>
                                                {skill.name}
                                            </Tag>
                                        </Tooltip>
                                    )
                                )}
                            </Stack>
                        </div>
                        {/* BLOCK TAG */}
                        <div className={'w-full bg-white flex flex-col p-4 pl-6 rounded-xl align-middle'}>
                            <div className={"flex flex-row justify-between w-full pb-8"}>
                                <h1 className={"text-2xl font-bold"}>О себе</h1>
                                <Stack direction={"row"}>
                                    <LuPencilLine className={"w-7 h-7"} />
                                </Stack>
                            </div>
                            <Textarea isDisabled={true} resize={"vertical"} placeholder={"Напишите что нибудь о себе"} />
                        </div>
                    </Stack>
                </section>
            </main>
        </div>
    )
}

export default Page;