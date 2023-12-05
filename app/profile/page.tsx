'use client';
import React, {ReactNode, useEffect} from 'react';
import HeadTag from "@/components/brenda_components/HeadTag";
import {Avatar, Grid, GridItem, HStack, Stack, Tag, Textarea, Tooltip, useDisclosure} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import NewHeader from "@/components/brenda_components/NewHeader";
import Spinner from "@/components/Spinner";
import {Prisma} from "@prisma/client";
import BlockComponent from "@/components/BlockComponent";
import ProfileMultiModal from "@/components/modals/ProfileMultiModal";
import ProfilePersonalInfoModal from "@/components/modals/ProfilePersonalInfoModal";
import ProfileEditEducationModal from "@/components/modals/ProfileEditEducationModal";
import ProfileEditExperienceModal from "@/components/modals/ProfileEditExperienceModal";
import ProfileAddExperienceModal from "@/components/modals/ProfileAddExperienceModal";
import ProfileAddEducationModal from "@/components/modals/ProfileAddEducationModal";
import ProfileEditSkillsModal from "@/components/modals/ProfileEditSkillsModal";
import ProfileAddSkillsModal from "@/components/modals/ProfileAddSkillsModal";
import ProfileEditAboutModal from "@/components/modals/ProfileEditAboutModal";

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
    const [modal, setModal] = React.useState<ReactNode>(null);
    const {isOpen, onClose, onOpen} = useDisclosure();


    useEffect(() => {
        (async () => {
            const savedData = localStorage.getItem('profile_data');
            if (typeof window !== undefined && savedData !== null) {
                setData(JSON.parse(savedData));
            } else {
                const resp = await fetch("/api/get_freelancer_profile?userId=1");
                const dta = await resp.json();
                localStorage.setItem("profile_data", JSON.stringify(dta));
                setData(dta);
            }
        })();
    }, [])

    const educations = data?.Education || []
    const skills = data?.Skill || []
    const experiences = data?.Experience || []

    if (!data) return <Spinner width="w-20" height="w-20" />


    function openModal(content: React.ReactNode) {
        setModal(content);
        onOpen();
    }


    return (
        <div className="min-h-screen bg-[#f0f5ff] flex flex-col">

            {/* ============== Head Tag =============== */}
            <HeadTag title="Profile - Bespace"/>

            {/* Header */}
            <NewHeader />

            <ProfileMultiModal modal={modal} isOpen={isOpen} onClose={onClose} />

            <main>
                <section className={'container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 md:px-5 px-3 sm:flex sm:justify-center'}>
                    <Stack spacing={4} className={'lg:w-3/5 sm:w-4/5 w-full'}>
                        <h1 className={"text-3xl mb-5 font-bold"}>Просмотр аккаунта</h1>
                        {/* BLOCK TAG */}
                        <BlockComponent title={"Личные данные"} isEditable={true} openModal={openModal} editModal={<ProfilePersonalInfoModal />} isAddable={false}>
                            <div className={"flex w-full md:flex-row flex-col"}>
                                <Stack direction={"column"}>
                                    <Avatar size={"2xl"} className={"m-auto md:m-none"} src={data.image!} />
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
                        </BlockComponent>
                        {/* BLOCK TAG */}
                        <BlockComponent openModal={openModal} editModal={<ProfileEditEducationModal />} addModal={<ProfileAddEducationModal />} title={"Образование"} isEditable={true} isAddable={true}>
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
                        </BlockComponent>
                        {/* BLOCK TAG */}
                        <BlockComponent openModal={openModal} editModal={<ProfileEditExperienceModal />} addModal={<ProfileAddExperienceModal />} title={"Стаж работы"} isAddable={true} isEditable={true}>
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
                        </BlockComponent>
                        {/* BLOCK TAG */}
                        <BlockComponent openModal={openModal} editModal={<ProfileEditSkillsModal />} addModal={<ProfileAddSkillsModal />} isAddable={false} isEditable={true} title={"Способности"}>
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
                        </BlockComponent>
                        {/* BLOCK TAG */}
                        <BlockComponent openModal={openModal} editModal={<ProfileEditAboutModal />} isAddable={false} isEditable={true} title={"О себе"}>
                            <Textarea isDisabled={true} resize={"vertical"} placeholder={"Напишите что нибудь о себе"} />
                        </BlockComponent>
                    </Stack>
                </section>
            </main>
        </div>
    )
}

export default Page;