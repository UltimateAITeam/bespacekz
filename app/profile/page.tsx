'use client';
import React, {ReactNode, useEffect, useState} from 'react';
import HeadTag from "@/components/brenda_components/HeadTag";
import {
    Avatar, Box,
    Grid,
    GridItem,
    SimpleGrid,
    Spinner,
    Stack,
    Tag,
    Textarea,
    Tooltip,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import NewHeader from "@/components/brenda_components/NewHeader";
import {Prisma} from "@prisma/client";
import BlockComponent from "@/components/BlockComponent";
import ProfileMultiModal from "@/components/modals/ProfileMultiModal";

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
        about: true,
    }
}>


function Page() {
    const [data, setData] = React.useState<FreelancerProfileType & UserInfoType>();
    const [formType, setFormType] = React.useState<string>('');
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [loading, setLoading] = useState(false);

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


    function openModal(content: string) {
        setFormType(content);
        onOpen();
    }


    return (
        <div className="min-h-screen bg-[#f0f5ff] flex flex-col">

            {/* ============== Head Tag =============== */}
            <HeadTag title="Profile - Bespace"/>

            {/* Header */}
            <NewHeader />
            {loading
                && <Box className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Spinner
                        thickness={"5px"}
                        color="cyan.500"
                        size='xl'
                    />
                </Box>
            }
            <ProfileMultiModal form={formType} isOpen={isOpen} setLoading={(data: boolean) => {setLoading(data)}} onClose={onClose} setData={(data: any) => {setData(data)}} />

            <main>
                <section className={'container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 md:px-5 px-3 sm:flex sm:justify-center'}>
                    <Stack spacing={4} className={'lg:w-3/5 sm:w-4/5 w-full'}>
                        <h1 className={"text-3xl mb-5 font-bold"}>Просмотр аккаунта</h1>
                        {/* BLOCK TAG */}
                        <BlockComponent title={"Личные данные"} isEditable={true} editForm={"edit-info"} openModal={openModal} isAddable={false}>
                            <div className={"flex w-full md:flex-row flex-col"}>
                                <Stack direction={"column"}>
                                    <Avatar size={"2xl"} className={"m-auto md:m-none"} src={data.image!} />
                                    <button className={"text-blue-500"}>Изменить</button>
                                </Stack>
                                <Grid
                                    templateColumns={"repeat(2, 1fr)"}
                                    templateRows={"repeat(2, 1fr)"}
                                    className={"xl:ml-40 md:ml-20"}
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
                        <BlockComponent editForm={"edit-education"} addForm={"add-education"} openModal={openModal} title={"Образование"} isEditable={true} isAddable={true}>
                            <VStack gap={4}>
                                {educations.length > 0 && educations.map(
                                    (education) => (
                                        <Stack mb={4} key={education.id} direction={"row"} className={"w-full justify-between"}>
                                            <SimpleGrid
                                                columns={4}
                                                gap={{xl: 20, sm: 5}}
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
                                                <div>
                                                    <p className={"font-bold"}>Год выпуска</p>
                                                    <p>{education.graduationYear}</p>
                                                </div>
                                            </SimpleGrid>
                                        </Stack>
                                    )
                                )}
                            </VStack>
                        </BlockComponent>
                        {/* BLOCK TAG */}
                        <BlockComponent editForm={"edit-experience"} addForm={"add-experience"} openModal={openModal} title={"Стаж работы"} isAddable={true} isEditable={true}>
                            <VStack>
                                {experiences && experiences.map(
                                    (exp) => (
                                        <Stack mb={4} key={exp.id} direction={"row"} className={"w-full justify-between"}>
                                            <SimpleGrid
                                                columns={3}
                                                gap={{xl: 20, sm: 5}}
                                                className={"justify-start w-full"}
                                            >
                                                <div>
                                                    <p className={"font-bold"}>Место</p>
                                                    <p>{exp.company}</p>
                                                </div>
                                                <div>
                                                    <p className={"font-bold"}>Занимаемая должность</p>
                                                    <p>{exp.roles.join(',')}</p>
                                                </div>
                                                <div>
                                                    <p className={"font-bold"}>Стаж работы</p>
                                                    <p>{exp.duration + " месяцев"}</p>
                                                </div>
                                            </SimpleGrid>
                                        </Stack>
                                    )
                                )}
                            </VStack>
                        </BlockComponent>
                        {/* BLOCK TAG */}
                        <BlockComponent editForm={"edit-skills"} openModal={openModal} isAddable={false} isEditable={true} title={"Способности"}>
                            <Grid templateColumns="repeat(5, 1fr)" gap={4}>

                                {skills.map(
                                    (skill) => (
                                        <GridItem key={skill.id}>
                                            <Tooltip placement={"top"} className={"h-fit"} label={skill.proficiencyLevel.toUpperCase()}>
                                                <Tag className={"cursor-default h-fit"}>
                                                    {skill.name}
                                                </Tag>
                                            </Tooltip>
                                        </GridItem>
                                    )
                                )}
                            </Grid>
                        </BlockComponent>
                        {/* BLOCK TAG */}
                        <BlockComponent editForm={"edit-about"} openModal={openModal} isAddable={false} isEditable={true} title={"О себе"}>
                            <Textarea value={data.about || ''} isDisabled={true} resize={"vertical"} placeholder={"Напишите что нибудь о себе"} />
                        </BlockComponent>
                    </Stack>
                </section>
            </main>
        </div>
    )
}

export default Page;