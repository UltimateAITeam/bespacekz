'use client';
import React, {useEffect, useState} from 'react';
import HeadTag from "@/components/brenda_components/HeadTag";
import {
    Avatar,
    Box,
    Card,
    CardHeader,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    SimpleGrid,
    Spinner,
    Stack,
    Tag,
    Text,
    Textarea,
    Tooltip,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import NewHeader from "@/components/brenda_components/NewHeader";
import {Prisma, Role} from "@prisma/client";
import BlockComponent from "@/components/BlockComponent";
import ProfileMultiModal from "@/components/modals/ProfileMultiModal";
import {LuPencilLine} from "react-icons/lu";
import {useSession} from "next-auth/react";
import {formatDate} from "@/libs/utils";

type FreelancerProfileType = Prisma.FreelancerProfileGetPayload<{
    include: {
        Languages: true,
        Education: true,
        Experience: true,
        Skills: true,
        Pricing: true,
        Portfolio: true,
        jobTitle: true,
        mailIndex: true,
        address: true,
        sphereOfWork: true,
        companyDescription: true,
        Vacancy: true,
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
    const [formType, setFormType] = React.useState<string>('');
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const [data, setData] = React.useState<FreelancerProfileType & UserInfoType>();
    // || localStorage.getItem("userRole")
    // const role = session.data?.user.role || localStorage.getItem("userRole");
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = typeof window !== 'undefined' ? localStorage.getItem("userRole") : null;
        setRole(session.data?.user.role || storedRole);
        if (session.status !== "authenticated" || !role) {
            return;
        }
        setLoading(true);


        (async () => {
            console.log("FETCH", role)
            let resp: Response;
            if (role === Role.FREELANCER) resp = await fetch("/api/get_freelancer_profile");
            else resp = await fetch("/api/get_client_profile");
            const dta = await resp.json();
            setData(dta);

            console.log("DATA:", dta);
            setLoading(false)
        })();
    }, [session.status, role, session.data?.user.role])

    const educations = data?.Education || []
    const languages = data?.Languages || []
    const experiences = data?.Experience || []
    const vacancies = data?.Vacancy || []

    if (!data || loading || !role) return <Box
        className="fixed top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50">
        <Spinner
            thickness={"5px"}
            color="cyan.500"
            size='xl'
        />
    </Box>


    function openModal(content: string) {
        setFormType(content);
        onOpen();
    }


    return (
        <div className="min-h-screen bg-[#f0f5ff] flex flex-col">

            {/* ============== Head Tag =============== */}
            <HeadTag title="Profile - Bespace"/>

            {/* Header */}
            <NewHeader/>
            {loading || session.status === "loading"
                && <Box
                    className="absolute top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50">
                    <Spinner
                        thickness={"5px"}
                        color="cyan.500"
                        size='xl'
                    />
                </Box>
            }
            <ProfileMultiModal role={role} form={formType} data={data} isOpen={isOpen}
                               setLoading={(data: boolean) => {
                                   setLoading(data)
                               }} onClose={onClose} setData={(data: any) => {
                setData(data)
            }}/>

            <main>
                <section
                    className={'container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 md:px-5 px-3 sm:flex sm:justify-center'}>
                    <Stack spacing={4} className={'lg:w-3/5 sm:w-4/5 w-full'}>
                        {data.jobTitle
                            && <HStack>
                                <h1 className={"text-3xl mb-5 font-bold"}>{data.jobTitle}</h1>
                                <LuPencilLine onClick={() => openModal("edit-jobTitle")}
                                              className={"-mt-4 cursor-pointer w-7 h-7"}/>
                            </HStack>
                        }

                        {/* BLOCK TAG */}
                        <BlockComponent title={"Личные данные"} isEditable={true} editForm={"edit-info"}
                                        openModal={openModal} isAddable={false}>
                            <div className={"flex w-full md:flex-row flex-col"}>
                                <Stack direction={"column"}>
                                    <Avatar size={"2xl"} className={"m-auto md:m-none"} src={data.image!}/>
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
                                        <p>{data.email || "Не указана"}</p>
                                    </GridItem>
                                    <GridItem>
                                        <p className={"font-bold"}>Страна, Город</p>
                                        <p>{data.location || "Не указано"}</p>
                                    </GridItem>
                                    <GridItem>
                                        <p className={"font-bold"}>Номер телефона</p>
                                        <p>{data.phone || "Не указано"}</p>
                                    </GridItem>
                                </Grid>
                            </div>
                        </BlockComponent>
                        {role === Role.FREELANCER
                            && <>
                                <BlockComponent editForm={"edit-education"} addForm={"add-education"}
                                                openModal={openModal}
                                                title={"Образование"} isEditable={true} isAddable={true}>
                                    <VStack gap={4}>
                                        {educations.length > 0 && educations.map(
                                            (education) => (
                                                <Stack mb={4} key={education.id} direction={"row"}
                                                       className={"w-full justify-between"}>
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
                                                            <p className={"font-bold"}>Период обучения</p>
                                                            <p>{formatDate(new Date(education.from))} - {formatDate(new Date(education.to))}</p>
                                                        </div>
                                                    </SimpleGrid>
                                                </Stack>
                                            )
                                        )}
                                    </VStack>
                                </BlockComponent>
                                {/* BLOCK TAG */}
                                <BlockComponent editForm={"edit-experience"} addForm={"add-experience"}
                                                openModal={openModal}
                                                title={"Стаж работы"} isAddable={true} isEditable={true}>
                                    <VStack>
                                        {experiences && experiences.map(
                                            (exp) => (
                                                <Stack mb={4} key={exp.id} direction={"row"}
                                                       className={"w-full justify-between"}>
                                                    <SimpleGrid
                                                        columns={3}
                                                        gap={{xl: 20, sm: 5}}
                                                        className={"justify-start w-full"}
                                                    >
                                                        <div>
                                                            <p className={"font-bold"}>Должность</p>
                                                            <p>{exp.jobTitle} в {exp.company}</p>
                                                        </div>
                                                        <div>
                                                            <p className={"font-bold"}>Используемые навыки</p>
                                                            <p>{exp.skills.join(', ')}</p>
                                                        </div>
                                                        <div>
                                                            <p className={"font-bold"}>Период работы</p>
                                                            <p>{formatDate(new Date(exp.from))} - {!exp.stillWorking && exp.to ? formatDate(new Date(exp.to)) : "По сей день"}</p>
                                                        </div>
                                                        {/*<div>*/}
                                                        {/*    <p className={"font-bold"}>Стаж работы</p>*/}
                                                        {/*    <p>{exp.duration + " месяцев"}</p>*/}
                                                        {/*</div>*/}
                                                    </SimpleGrid>
                                                </Stack>
                                            )
                                        )}
                                    </VStack>
                                </BlockComponent>
                                {/* BLOCK TAG */}
                                <BlockComponent editForm={"edit-languages"} openModal={openModal} isAddable={false}
                                                isEditable={true} title={"Языки"}>
                                    <Grid templateColumns="repeat(5, 1fr)" gap={4}>

                                        {languages.map(
                                            (lang: any) => (
                                                <GridItem key={lang.id}>
                                                    <Tooltip placement={"top"} className={"h-fit"}
                                                             label={lang.proficiencyLevel}>
                                                        <Tag className={"cursor-default h-fit"}>
                                                            {lang.name}
                                                        </Tag>
                                                    </Tooltip>
                                                </GridItem>
                                            )
                                        )}
                                    </Grid>
                                </BlockComponent>
                                {/* BLOCK TAG */}
                                <BlockComponent editForm={"edit-about"} openModal={openModal} isAddable={false}
                                                isEditable={true} title={"О себе"}>
                                    <Textarea value={data.about || ''} isDisabled={true} resize={"vertical"}
                                              placeholder={"Напишите что нибудь о себе"}/>
                                </BlockComponent>
                            </>}
                        {/*CLIENT PART*/}
                        {role === Role.CLIENT
                            && <>
                                <BlockComponent editForm={"edit-company-info"} openModal={openModal} isAddable={false}
                                                isEditable={true} title={"Данные Компании"}>
                                    <Stack mb={4} direction={"row"}
                                           className={"w-full justify-between"}>
                                        <SimpleGrid
                                            columns={3}
                                            gap={{xl: 20, sm: 5}}
                                            className={"justify-start w-full"}
                                        >
                                            <div>
                                                <p className={"font-bold"}>Почтовый индекс</p>
                                                <p>{data.mailIndex || 'Индекс не установлен'}</p>
                                            </div>
                                            <div>
                                                <p className={"font-bold"}>Адрес</p>
                                                <p>{data.address || 'Адресс не установлен'}</p>
                                            </div>
                                            <div>
                                                <p className={"font-bold"}>Сфера деятельности</p>
                                                <p>{data.sphereOfWork || "Не установлено"}</p>
                                            </div>
                                        </SimpleGrid>
                                    </Stack>
                                </BlockComponent>

                                <BlockComponent isAddable={true} editForm={"edit-vacancy"} isEditable={true}
                                                openModal={openModal} addForm={"add-vacancy"} title={"Ваши вакансии"}
                                >
                                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                                        {vacancies && vacancies.length > 0 && vacancies.map((vacancy: any) => (
                                            <Card
                                                key={vacancy.id}
                                                className={"hover:shadow-md transition-shadow"}
                                            >
                                                <CardHeader>
                                                    <Flex>
                                                        <VStack
                                                            align={"start"} flex="1" gap={'4'}
                                                            className={'cursor-pointer'}
                                                        >
                                                            <Heading size="md"
                                                                     style={{textTransform: "capitalize"}}>{vacancy.title}</Heading>
                                                            <Text>{vacancy.specialization}</Text>
                                                            <Text>{vacancy.priceFrom} - {vacancy.priceTo} {vacancy.currency}</Text>
                                                        </VStack>
                                                    </Flex>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </SimpleGrid>
                                </BlockComponent>

                                <BlockComponent editForm={"edit-company-description"} openModal={openModal}
                                                isAddable={false}
                                                isEditable={true} title={"Описание компании"}>
                                    <Textarea value={data.companyDescription || ''} isDisabled={true}
                                              resize={"vertical"}
                                              placeholder={"Напишите что нибудь о своей компании"}/>
                                </BlockComponent>
                            </>
                        }
                    </Stack>
                </section>
            </main>
        </div>
    )
}

export default Page;