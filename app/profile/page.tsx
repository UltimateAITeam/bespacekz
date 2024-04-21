"use client";
import React, { useEffect, useState } from "react";
import HeadTag from "@/components/brenda_components/HeadTag";
import {
  Avatar,
  Box,
  Button,
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
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NewHeader from "@/components/brenda_components/NewHeader";
import { Prisma, Role } from "@prisma/client";
import BlockComponent from "@/components/BlockComponent";
// import ProfileMultiModal from "@/components/modals/ProfileMultiModal";
import { LuPencilLine } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { formatDate } from "@/libs/utils";
import dynamic from "next/dynamic";
// import RichTextEditor from "@/components/RichText";
import parse from "html-react-parser";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { thousandSeparator } from "@/libs/utils";
import { BsStars } from "react-icons/bs";
import { updateUserImage } from "./actions";
import { useChat } from "ai/react";
import { MemoizedReactMarkdown } from "@/components/ui/markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const RichTextEditor = dynamic(() => import("@/components/RichText"), {
  ssr: false,
});

const ProfileMultiModal = dynamic(
  () => import("@/components/modals/ProfileMultiModal"),
  {
    ssr: false,
  }
);

const toBase64 = (file: File) =>
  new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result!);
    reader.onerror = reject;
  });

type FreelancerProfileType = Prisma.FreelancerProfileGetPayload<{
  include: {
    Languages: true;
    Education: true;
    Experience: true;
    Skills: true;
    Pricing: true;
    Portfolio: true;
    jobTitle: true;
    mailIndex: true;
    address: true;
    sphereOfWork: true;
    companyDescription: true;
    Vacancy: true;
  };
}>;

type UserInfoType = Prisma.UserGetPayload<{
  select: {
    name: true;
    last_name: true;
    phone: true;
    email: true;
    image: true;
    location: true;
    about: true;
  };
}>;

function Page() {
  const [formType, setFormType] = React.useState<string>("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const [image, setImage] = useState("");

  const [data, setData] = React.useState<
    FreelancerProfileType & UserInfoType
  >();
  const [selectedMode, setSelectedMode] = useState<string>("profileAnalysis");
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit: handleSubmitChat,
    isLoading: isChatLoading,
  } = useChat({
    body: {
      selectedMode
    }
  });

  // {initialInput: "As an HR expert, anaylze and assess the profile of the candidate below: " + '\n' + JSON.stringify(data),}

  // || localStorage.getItem("userRole")
  // const role = session.data?.user.role || localStorage.getItem("userRole");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole =
      typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    setRole(session.data?.user.role || storedRole);
    if (session.status !== "authenticated" || !role) {
      return;
    }
    setLoading(true);

    (async () => {
      let resp: Response;
      if (role === Role.FREELANCER)
        resp = await fetch("/api/get_freelancer_profile");
      else resp = await fetch("/api/get_client_profile");
      const dta = await resp.json();
      setData(dta);
      setInput(JSON.stringify(dta));

      if (dta.image) {
        setImage(dta.image);
      }
      setLoading(false);
    })();
  }, [session.status, role, session.data?.user.role]);

  const educations = data?.Education || [];
  const languages = data?.Languages || [];
  const experiences = data?.Experience || [];
  const vacancies = data?.Vacancy || [];
  const skills = data?.Skills || [];

  if (!data || loading || !role)
    return (
      <Box className="fixed top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50">
        <Spinner thickness={"5px"} color="cyan.500" size="xl" />
      </Box>
    );

  function openModal(content: string) {
    setFormType(content);
    onOpen();
  }

  return (
    <div className="min-h-screen bg-[#f0f5ff] flex flex-col">
      {/* ============== Head Tag =============== */}
      <HeadTag title="Profile - Bespace" />

      {/* Header */}
      <NewHeader />
      {loading ||
        (session.status === "loading" && (
          <Box className="absolute top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50">
            <Spinner thickness={"5px"} color="cyan.500" size="xl" />
          </Box>
        ))}
      <ProfileMultiModal
        role={role}
        form={formType}
        data={data}
        isOpen={isOpen}
        setLoading={(data: boolean) => {
          setLoading(data);
        }}
        onClose={onClose}
        setData={(data: any) => {
          setData(data);
        }}
      />

      <main>
        <section
          className={
            "container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 md:px-5 px-3 sm:flex sm:justify-center"
          }
        >
          <div
            className={
              "grid grid-cols-[1fr_335px] items-start gap-6 lg:w-5/6 sm:w-4/5 w-full"
            }
          >
            <Flex className="col-start-1 items-center gap-4">
              <h2 className="text-[#01001E] text-[30px] leading-tight font-medium">
                Просмотр аккаунта
              </h2>

              {!(loading || session.status === "loading") && data && role === Role.FREELANCER && (
                <form onSubmit={handleSubmitChat}>
                <Button
                  type="submit"
                  isLoading={isChatLoading}
                  isDisabled={isChatLoading}
                  leftIcon={<BsStars />}
                  colorScheme="pink"
                  size="md"
                >
                  AI анализ профиля
                </Button>
                </form>
              )}
            </Flex>

            {data.jobTitle && (
              <HStack>
                <h1 className={"text-3xl mb-5 font-medium"}>
                  {data.jobTitle.name}
                </h1>
                <LuPencilLine
                  onClick={() => openModal("edit-jobTitle")}
                  className={"-mt-4 cursor-pointer w-7 h-7"}
                />
              </HStack>
            )}

            {/* BLOCK TAG */}
            <div className="col-start-1">
              <BlockComponent
                title={"Основные сведения"}
                isEditable={true}
                editForm={"edit-info"}
                openModal={openModal}
                isAddable={false}
              >
                <div className={"flex w-full md:flex-row flex-col"}>
                  <Stack direction={"column"}>
                    <Avatar
                      size={"2xl"}
                      className={"m-auto md:m-none"}
                      src={image}
                    />
                    <label
                      htmlFor="avatar"
                      className={"text-blue-500 w-fit mx-auto"}
                    >
                      Изменить
                    </label>
                    <input
                      type="file"
                      hidden
                      id="avatar"
                      accept="image/png, image/jpeg"
                      onChange={async (event) => {
                        const file = event?.target?.files?.item(0);

                        if (file) {
                          const base64 = await toBase64(file);

                          setImage(base64.toString());

                          await updateUserImage(data.email, base64.toString());
                        }
                      }}
                    />
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
            </div>

            {role === Role.FREELANCER && (
              <>
                <div className="col-start-2 row-span-10">
                  <BlockComponent
                    editForm={"edit-languages"}
                    openModal={openModal}
                    isAddable={false}
                    isEditable={true}
                    title={"Языки"}
                  >
                    <ul className="mt-0 space-y-4">
                      {languages.map((lang) => {
                        return (
                          <li
                            key={lang.id}
                            className="flex justify-between items-center w-1/2"
                          >
                            <span className="text-xl font-medium ">
                              {lang.name}
                            </span>{" "}
                            <span>{lang.proficiencyLevel}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </BlockComponent>

                  {messages.slice(-1).map(
                    (message) =>
                      message.role == "assistant" && (
                        <Box
                          key={message.id + "box"}
                          className={`p-5 mt-6 bg-gradient-to-tr ${message.role == "assistant" ? "from-[#E0F7FA] to-[#E0F2F1]" : "from-[#FDE2E4] to-[#FAE1DD]"} rounded-lg shadow-md`}
                        >
                          <Text className="text-sm font-semibold pt-2">
                            {message.role == "assistant"
                              ? "AI HR:"
                              : "Пользователь:"}
                          </Text>
                          
                          <MemoizedReactMarkdown
                            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-sm font-normal"
                            remarkPlugins={[remarkGfm, remarkMath]}
                            components={{
                              p({ children }) {
                                return (
                                  <p className="mb-2 last:mb-0">{children}</p>
                                );
                              },
                            }}
                          >
                            {message.content}
                          </MemoizedReactMarkdown>
                        </Box>
                      )
                  )}
                </div>

                <div className="col-start-1">
                  <BlockComponent
                    editForm={"edit-education"}
                    addForm={"add-education"}
                    openModal={openModal}
                    title={"Образование"}
                    isEditable={true}
                    isAddable={true}
                  >
                    <VStack gap={4}>
                      {educations.length > 0 &&
                        educations.map((education) => (
                          <Stack
                            mb={4}
                            key={education.id}
                            direction={"row"}
                            className={"w-full justify-between"}
                          >
                            <SimpleGrid
                              columns={4}
                              gap={{ xl: 10, sm: 5 }}
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
                                <p>
                                  {formatDate(new Date(education.from))} -{" "}
                                  {formatDate(new Date(education.to))}
                                </p>
                              </div>
                            </SimpleGrid>
                          </Stack>
                        ))}
                    </VStack>
                  </BlockComponent>
                </div>
                {/* BLOCK TAG */}
                <div className="col-start-1">
                  <BlockComponent
                    editForm={"edit-experience"}
                    addForm={"add-experience"}
                    openModal={openModal}
                    title={"Опыт работы"}
                    isAddable={true}
                    isEditable={true}
                  >
                    <VStack>
                      {experiences &&
                        experiences.map((exp) => (
                          <Stack
                            mb={4}
                            key={exp.id}
                            direction={"row"}
                            className={"w-full justify-between"}
                          >
                            <SimpleGrid
                              columns={4}
                              gap={{ xl: 10, sm: 5 }}
                              className={"justify-start w-full"}
                            >
                              <div>
                                <p className={"font-bold"}>Место</p>
                                <p>{exp.company}</p>
                              </div>

                              <div>
                                <p className={"font-bold"}>Должность</p>
                                <p>{exp.jobTitle}</p>
                              </div>
                              <div>
                                <p className={"font-bold"}>Навыки</p>
                                <p>{exp.skills.join(", ")}</p>
                              </div>
                              <div>
                                <p className={"font-bold"}>Период работы</p>
                                <p>
                                  {formatDate(new Date(exp.from))} -{" "}
                                  {!exp.stillWorking && exp.to
                                    ? formatDate(new Date(exp.to))
                                    : "По сей день"}
                                </p>
                              </div>
                              {/*<div>*/}
                              {/*    <p className={"font-bold"}>Стаж работы</p>*/}
                              {/*    <p>{exp.duration + " месяцев"}</p>*/}
                              {/*</div>*/}
                            </SimpleGrid>
                          </Stack>
                        ))}
                    </VStack>
                  </BlockComponent>
                </div>
                {/* BLOCK TAG */}
                <div className="col-start-1">
                  <BlockComponent
                    editForm={""}
                    openModal={openModal}
                    isAddable={false}
                    // fix editing skills and add adding new skills
                    isEditable={false}
                    title={"Способности "}
                  >
                    <Wrap>
                      {skills.length > 0 &&
                        skills.map((skill: any) => (
                          <WrapItem key={skill}>
                            <Tag className={"cursor-default h-fit"}>
                              {skill}
                            </Tag>
                          </WrapItem>
                        ))}
                    </Wrap>
                  </BlockComponent>
                </div>

                <div className="col-start-1">
                  <BlockComponent
                    editForm={""}
                    openModal={openModal}
                    isAddable={false}
                    // fix editing skills and add adding new skills
                    isEditable={false}
                    title={"Вид поиска работы "}
                  >
                    {data.Pricing.map((pricing) => (
                      <div
                        key={pricing.id}
                        className="text-xl py-1 px-2 font-medium text-primary-text"
                      >
                        {pricing.pricingType[0] === "EMPLOYEE"
                          ? "Ищу работу на постоянной основе"
                          : "Фрилансер"}
                      </div>
                    ))}
                  </BlockComponent>
                </div>

                {/* BLOCK TAG */}
                <div className="col-start-1">
                  <BlockComponent
                    editForm={"edit-about"}
                    openModal={openModal}
                    isAddable={false}
                    isEditable={true}
                    title={"О себе"}
                  >
                    {/* <RichTextEditor
                    data={data.about || ""}
                    onChange={(e) => {}}
                    disable={true}
                  ></RichTextEditor> */}
                    <div>{parse(data.about || "")}</div>
                  </BlockComponent>
                </div>
              </>
            )}
            {/*CLIENT PART*/}
            {role === Role.CLIENT && (
              <>
                <div className="col-start-1">
                  <BlockComponent
                    editForm={"edit-company-info"}
                    openModal={openModal}
                    isAddable={false}
                    isEditable={true}
                    title={"Данные Компании"}
                  >
                    <Stack
                      mb={4}
                      direction={"row"}
                      className={"w-full justify-between"}
                    >
                      <SimpleGrid
                        columns={3}
                        gap={{ xl: 20, sm: 5 }}
                        className={"justify-start w-full"}
                      >
                        <div>
                          <p className={"font-bold"}>Почтовый индекс</p>
                          <p>{data.mailIndex || "Индекс не установлен"}</p>
                        </div>
                        <div>
                          <p className={"font-bold"}>Адрес</p>
                          <p>{data.address || "Адресс не установлен"}</p>
                        </div>
                        <div>
                          <p className={"font-bold"}>Сфера деятельности</p>
                          <p>{data.sphereOfWork || "Не установлено"}</p>
                        </div>
                      </SimpleGrid>
                    </Stack>
                  </BlockComponent>
                </div>

                <div className="col-start-1">
                  <BlockComponent
                    isAddable={true}
                    editForm={"edit-vacancy"}
                    isEditable={true}
                    openModal={openModal}
                    addForm={"add-vacancy"}
                    title={"Ваши вакансии"}
                  >
                    <SimpleGrid
                      spacing={4}
                      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                    >
                      {vacancies &&
                        vacancies.length > 0 &&
                        vacancies.map((vacancy: any) => (
                          <Card
                            key={vacancy.id}
                            className={"hover:shadow-md transition-shadow"}
                          >
                            <CardHeader>
                              <Flex>
                                <VStack
                                  align={"start"}
                                  flex="1"
                                  gap={"4"}
                                  className={"cursor-pointer"}
                                >
                                  <Heading
                                    size="md"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {vacancy.jobTitle.name}
                                  </Heading>
                                  <Text className="text-xs">
                                    <span className="font-semibold">
                                      Дата публикации:{" "}
                                    </span>
                                    {format(
                                      new Date(vacancy.createdAt),
                                      "PPP",
                                      { locale: ru }
                                    )}
                                  </Text>
                                  <Text className="text-sm">
                                    {thousandSeparator(vacancy.priceFrom)} -{" "}
                                    {thousandSeparator(vacancy.priceTo)}{" "}
                                    {vacancy.currency}
                                  </Text>
                                </VStack>
                              </Flex>
                            </CardHeader>
                          </Card>
                        ))}
                    </SimpleGrid>
                  </BlockComponent>
                </div>

                <div className="col-start-1">
                  <BlockComponent
                    editForm={"edit-company-description"}
                    openModal={openModal}
                    isAddable={false}
                    isEditable={true}
                    title={"Описание компании"}
                  >
                    <RichTextEditor
                      data={data.companyDescription || ""}
                      onChange={(e) => {}}
                      disable={true}
                    ></RichTextEditor>
                  </BlockComponent>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
