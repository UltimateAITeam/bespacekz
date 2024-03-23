"use client";

import Image from "next/image";
import Link from "next/link";
import { SubLinks1, SubLinks2, SubLinks3 } from "./LinkData";
import SearchLink from "./SearchLink";
import { CgProfile } from "react-icons/cg";
import {
  FaCaretDown,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaLongArrowAltRight,
  FaAngleDown,
  FaAngleRight,
} from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { GoChevronRight } from "react-icons/go";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { limitText } from "@/libs/utils";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Center,
  Avatar,
  HStack,
  VStack,
  Box,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiChevronDown,
  FiSettings,
  FiInbox,
  FiLogOut,
  FiBell,
  FiUser,
} from "react-icons/fi";
import VacancyCreateModal from "@/components/modals/VacancyCreateModal";

const Navbar = () => {
  // ============= Router hooks ===================
  const router = useRouter();

  const [dropdownState, setDropdownState] = useState(false);

  // =========== Search List state =================
  const [searchState, setSearchState] = useState("hidden");
  // ========== More Dropdown state ====================
  const [moreDp, setMoreDp] = useState("hidden");
  // ================ Search Input value ====================
  const [inputText, setInputText] = useState("");
  // ====================== [SubLinks1] Show and Hide state ========================
  const [subLinksI, setSublinksI] = useState(false);
  // ====================== [SubLinks2] Show and Hide state ========================
  const [subLinksII, setSublinksII] = useState(false);
  // ====================== [SubLinks3] Show and Hide state ========================
  const [subLinksIII, setSublinksIII] = useState(false);
  // ====================== SubLinks1 - Content 1 Right Bar state ============================
  const [subContntI, setSubContentI] = useState(true);
  // ====================== SubLinks1 - Content 2 Right Bar state ============================
  const [subContntII, setSubContentII] = useState(false);
  // ====================== SubLinks1 - Content 3 Right Bar state ============================
  const [subContntIII, setSubContentIII] = useState(false);

  // ====================== Mobile State ====================================
  // =========== Mobile list show hide state ================
  const [mobilelist, setMobileList] = useState(false);
  // =========== Mobile subList show hide state =============
  const [mobileSubListI, setMobileSubListI] = useState(false);
  const [mobileSubListII, setMobileSubListII] = useState(false);
  const [mobileSubListIII, setMobileSubListIII] = useState(false);
  // ========== Id change state  ==============
  const [se, setSe] = useState<any>(null);

  // =========== onclick to search list show, onclick to search list hide ==============
  const ShowSearchState = () => {
    searchState == "hidden"
      ? setSearchState("block")
      : setSearchState("hidden");
  };

  // ============= Search Form =====================
  const search = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  // ========================= List onclick handle (Dropdown list show [SubLinks1]) ===========================
  const FirstLinkHandle = () => {
    if (subLinksI === false) {
      setSublinksI(true);
      subLinksII === true ? setSublinksII(false) : null;
      subLinksIII === true ? setSublinksIII(false) : null;
    } else {
      setSublinksI(false);
    }
  };

  // ========================= List onclick handle (Dropdown list show [SubLinks2]) ===========================
  const SecondLinkHandle = () => {
    if (subLinksII === false) {
      setSublinksII(true);
      subLinksI === true ? setSublinksI(false) : null;
      subLinksIII === true ? setSublinksIII(false) : null;
    } else {
      setSublinksII(false);
    }
  };

  // ========================= List onclick handle (Dropdown list show [SubLinks3]) ===========================
  const ThirdLinkHandle = () => {
    if (subLinksIII === false) {
      setSublinksIII(true);
      subLinksI === true ? setSublinksI(false) : null;
      subLinksII === true ? setSublinksII(false) : null;
    } else {
      setSublinksIII(false);
    }
  };

  // ====================== Handle a Sublinks Click ===========================
  const SubLinksBtn = (id: number) => {
    if (id == 1) {
      setSubContentI(true);
      subContntII === true ? setSubContentII(false) : null;
      subContntIII === true ? setSubContentIII(false) : null;
    }

    if (id == 2) {
      setSubContentII(true);
      subContntI === true ? setSubContentI(false) : null;
      subContntIII === true ? setSubContentIII(false) : null;
    }

    if (id == 3) {
      setSubContentIII(true);
      subContntI === true ? setSubContentI(false) : null;
      subContntII === true ? setSubContentII(false) : null;
    }
  };

  // ====================== Mobile Handle a SubLinks Click ===========================
  // ========================= List onclick handle (Dropdown list show [SubLinks1]) ===========================
  const FirstLinkHandleMb = () => {
    if (mobileSubListI === false) {
      setMobileSubListI(true);
      mobileSubListII === true ? setMobileSubListII(false) : null;
      mobileSubListIII === true ? setMobileSubListIII(false) : null;
    } else {
      setMobileSubListI(false);
    }
  };

  // ========================= List onclick handle (Dropdown list show [SubLinks2]) ===========================
  const SecondLinkHandleMb = () => {
    if (mobileSubListII === false) {
      setMobileSubListII(true);
      mobileSubListI === true ? setMobileSubListI(false) : null;
      mobileSubListIII === true ? setMobileSubListIII(false) : null;
    } else {
      setMobileSubListII(false);
    }
  };

  // ========================= List onclick handle (Dropdown list show [SubLinks3]) ===========================
  const ThirdLinkHandleMb = () => {
    if (mobileSubListIII === false) {
      setMobileSubListIII(true);
      mobileSubListI === true ? setMobileSubListI(false) : null;
      mobileSubListII === true ? setMobileSubListII(false) : null;
    } else {
      setMobileSubListIII(false);
    }
  };

  // ======================== Mobile Sub show Hide condition [onClick={handleMobileSUb}] ====================
  const handleMobileSub = (id: number) => {
    if (id == 1) {
      if (se == null || se == 2 || se == 3) {
        setSe(1);
      } else {
        setSe(null);
      }
    }

    if (id == 2) {
      if (se == null || se == 1 || se == 3) {
        setSe(2);
      } else {
        setSe(null);
      }
    }

    if (id == 3) {
      if (se == null || se == 1 || se == 2) {
        setSe(3);
      } else {
        setSe(null);
      }
    }
  };

  const session = useSession();

  const {
    isOpen: isOpenVacancyCreateModal,
    onOpen: onOpenVacancyCreateModal,
    onClose: onCloseVacancyCreateModal,
  } = useDisclosure();

  return (
    <div>
      <nav>
        {/* ============================ First Nav Bar ================================ */}
        <div className="container mx-auto hidden items-center justify-between border-b px-3 py-3 lg:flex">
          {/* ==================== Left =========================== */}
          <div className="flex items-center">
            <div>
              <Image
                src="/bespace/bespace-logo-new.svg"
                width={150}
                height={50}
                alt="logo"
                className="cursor-pointer"
                onClick={() => router.push("/")}
              />
            </div>
            <ul className="ml-6 flex space-x-6 xl:ml-11 xl:space-x-9 2xl:ml-14 2xl:space-x-12">
              <li>
                <a
                  className={`flex cursor-pointer items-center text-[1.03rem] font-semibold hover:text-cyan-700 ${
                    subLinksI === true ? "text-cyan-700" : "text-zinc-700"
                  }`}
                  onClick={FirstLinkHandle}
                >
                  Поиск специалистов
                  <FaCaretDown
                    className={`ml-[1px] mt-1 transition xl:ml-1 ${
                      subLinksI === true ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </a>

                {/* ============================ Drop Down List ============================== */}
                {subLinksI && (
                  <div className="bg- absolute left-0 right-0 top-20 z-20 w-full bg-[#F3FFFC] shadow-md">
                    <div className="container mx-auto flex space-x-8 px-3 py-5 xl:space-x-10">
                      <ul className="flex flex-col space-y-1 xl:space-y-2">
                        {SubLinks1.map((curVal) => (
                          <li
                            className={`flex cursor-pointer items-center justify-between space-x-7 rounded-sm px-4 py-4 hover:bg-gradient-to-tr hover:from-[#eeecec] hover:to-[#c3f0f5] ${
                              subContntI === true && curVal.id === 1
                                ? "bg-gradient-to-tr from-[#eeecec] to-[#c3f0f5]"
                                : null
                            } ${
                              subContntII === true && curVal.id === 2
                                ? "bg-gradient-to-tr from-[#eeecec] to-[#c3f0f5]"
                                : null
                            } ${
                              subContntIII === true && curVal.id === 3
                                ? "bg-gradient-to-tr from-[#eeecec] to-[#c3f0f5]"
                                : null
                            }`}
                            onClick={(id) => SubLinksBtn(curVal.id)}
                            key={curVal.id}
                          >
                            <div>
                              <strong className="font-semibold text-zinc-700">
                                {curVal.head}
                              </strong>
                              <span className="block text-sm font-semibold text-zinc-500">
                                {curVal.headers}
                              </span>
                            </div>
                            <span className="text-lg font-semibold text-cyan-700">
                              <GoChevronRight />
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* =================== Sublink content 1 ============== */}
                      {subContntI && (
                        <div className="flex flex-col border-l border-gray-300 xl:flex-row xl:space-x-44 2xl:space-x-64">
                          <div className="ml-10 xl:ml-14">
                            <strong>
                              <span className="text-lg font-semibold text-zinc-700">
                                {SubLinks1[0].subhead.name}
                              </span>
                            </strong>
                            <span className="my-3 block text-sm font-semibold text-zinc-500">
                              {SubLinks1[0].subhead.des}
                            </span>
                            <Link href={SubLinks1[0].subhead.subheadlink.link}>
                              <span className="cursor-pointer text-sm font-semibold text-cyan-700 hover:underline">
                                {SubLinks1[0].subhead.subheadlink.name}
                                <FaLongArrowAltRight className="ml-2 inline text-lg" />
                              </span>
                            </Link>
                          </div>

                          <div className="ml-8 mt-7 xl:ml-0 xl:mt-0">
                            <ul className="grid grid-cols-2 gap-x-10 xl:grid-cols-1 xl:gap-x-0">
                              {SubLinks1[0].sublink.map((curVal) => (
                                <li
                                  key={curVal.id}
                                  className="rounded-sm px-3 py-2 text-zinc-700 hover:bg-[#e1f7fa] hover:text-cyan-800"
                                >
                                  <Link href={curVal.link}>
                                    {curVal.linktext}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* =================== Sublink content 2 ============== */}
                      {subContntII && (
                        <div className="flex flex-col border-l border-gray-300 xl:flex-row xl:space-x-20 2xl:space-x-20">
                          <div className="ml-10 xl:ml-14">
                            <strong>
                              <span className="text-lg font-semibold text-zinc-700">
                                {SubLinks1[1].subhead.name}
                              </span>
                            </strong>
                            <span className="my-3 block text-sm font-semibold text-zinc-500">
                              {SubLinks1[1].subhead.des}
                            </span>
                            <Link href={SubLinks1[1].subhead.subheadlink.link}>
                              <span className="cursor-pointer text-sm font-semibold text-cyan-700 hover:underline">
                                {SubLinks1[1].subhead.subheadlink.name}
                                <FaLongArrowAltRight className="ml-2 inline text-lg" />
                              </span>
                            </Link>
                          </div>

                          <div className="ml-8 mt-7 xl:ml-0 xl:mt-0">
                            <ul className="grid grid-cols-2 gap-x-10 2xl:grid-cols-3">
                              {SubLinks1[1].sublink.map((curVal) => (
                                <li
                                  key={curVal.id}
                                  className="transition-duration my-2 cursor-pointer rounded-md border border-gray-200 bg-transparent transition hover:bg-[#e1f7fa] xl:my-4"
                                >
                                  <Link href={curVal.link}>
                                    <div className="xl:w-50 w-50 flex h-full flex-row items-center justify-center xl:flex-col xl:items-stretch">
                                      {/* <Image
                                      src={curVal.img}
                                      height={90}
                                      width={140}
                                      alt="card-image"
                                      className="xl:rounded-t-md rounded-l-md xl:rounded-b-none"
                                    /> */}
                                      <span className="px-3 py-2 text-center text-zinc-700 xl:px-1">
                                        {curVal.linktext}
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* =================== Sublink content 3 ============== */}
                      {subContntIII && (
                        <div className="flex flex-col border-l border-gray-300 xl:flex-row xl:space-x-24 2xl:space-x-44">
                          <div className="ml-10 xl:ml-14">
                            <strong>
                              <span className="text-lg font-semibold text-zinc-700">
                                {SubLinks1[2].subhead.name}
                              </span>
                            </strong>
                            <span className="my-3 block text-sm font-semibold text-zinc-500">
                              {SubLinks1[2].subhead.des}
                            </span>
                            <Link href={SubLinks1[2].subhead.subheadlink.link}>
                              <span className="cursor-pointer text-sm font-semibold text-cyan-700 hover:underline">
                                {SubLinks1[2].subhead.subheadlink.name}
                                <FaLongArrowAltRight className="ml-2 inline text-lg" />
                              </span>
                            </Link>
                          </div>

                          <div className="ml-8 mt-7 xl:ml-0 xl:mt-0">
                            <ul className="grid grid-cols-1 gap-x-10 xl:gap-x-0">
                              {SubLinks1[2].sublink.map((curVal) => (
                                <li
                                  key={curVal.id}
                                  className="rounded-sm px-3 py-2 text-zinc-700 hover:bg-[#e1f7fa] hover:text-cyan-800"
                                >
                                  <Link href={curVal.link}>
                                    {curVal.linktext}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>

              <li>
                <a
                  className={`flex cursor-pointer items-center text-[1.03rem] font-semibold hover:text-cyan-700 ${
                    subLinksII === true ? "text-cyan-700" : "text-zinc-700"
                  }`}
                  onClick={SecondLinkHandle}
                >
                  Поиск работы
                  <FaCaretDown
                    className={`ml-[1px] mt-1 transition xl:ml-1 ${
                      subLinksII === true ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </a>

                {/* ============================ Drop Down List ============================== */}
                {subLinksII && (
                  <div className="bg- absolute left-0 right-0 top-20 z-20 w-full bg-[#F3FFFC] shadow-md">
                    <ul className="container mx-auto flex space-x-20 px-3 py-5 xl:space-x-28">
                      {SubLinks2.map((curVal) => (
                        <li
                          className="cursor-pointer rounded-sm from-[#eeecec] to-[#c3f0f5] px-2 py-4 hover:bg-gradient-to-tr"
                          key={curVal.id}
                        >
                          <Link href={curVal.link}>
                            <div className="ml-7 flex max-w-[17rem] flex-col space-y-2 2xl:ml-11">
                              <strong className="font-semibold text-zinc-700">
                                {curVal.name}
                              </strong>
                              <span className="text-sm font-semibold text-zinc-500">
                                {curVal.des}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* <li>
              <a
                className={`cursor-pointer flex items-center text-[1.03rem] font-semibold hover:text-cyan-700 ${
                  subLinksIII === true ? "text-cyan-700" : "text-zinc-700"
                }`}
                onClick={ThirdLinkHandle}
              >
                Why Bespace
                <FaCaretDown
                  className={`mt-1 xl:ml-1 ml-[1px] transition ${
                    subLinksIII === true ? "rotate-180" : "rotate-0"
                  }`}
                />
              </a>

              {subLinksIII && (
                <div className="absolute bg- w-full left-0 right-0 top-20 bg-[#F3FFFC] shadow-md z-20">
                  <div className="container mx-auto py-5 px-3">
                    <ul className="inline-grid grid-cols-2 gap-x-20 mb-5">
                      {SubLinks3.map((curVal) => (
                        <li
                          className="pr-5 py-7 cursor-pointer rounded-sm hover:bg-gradient-to-tr from-[#eeecec] to-[#c3f0f5]"
                          key={curVal.id}
                        >
                          <Link href={curVal.link}>
                            <div className="flex flex-col space-y-2 2xl:ml-11 ml-7">
                              <strong className="font-semibold text-zinc-700">
                                {curVal.name}
                              </strong>
                              <span className="font-semibold text-zinc-500 text-sm">
                                {curVal.des}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li> */}

              <li className="text-[1.03rem] font-semibold text-zinc-700 hover:text-cyan-700">
                <Link href="/about">О нас</Link>
              </li>

              <li className="text-[1.03rem] font-semibold text-zinc-700 hover:text-cyan-700">
                <Link href="/help">Помощь</Link>
              </li>
            </ul>
          </div>

          {/* ==================== Right Login =========================== */}
          {session.status == "loading" ? (
            <div className="flex items-center">
              <div className="mr-3 h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
            </div>
          ) : session.data?.user ? (
            <HStack spacing={{ base: "0", md: "6" }}>
              {/* fix this, when logging in as freelancer does not change role in localstorage */}
              {session.data.user.role === "CLIENT" ? (
                <Button
                  onClick={onOpenVacancyCreateModal}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"solid"}
                  colorScheme={"teal"}
                >
                  Создать вакансию
                </Button>
              ) : !session.data.user.role &&
                localStorage.getItem("userRole") == "CLIENT" ? (
                <Button
                  onClick={onOpenVacancyCreateModal}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"solid"}
                  colorScheme={"teal"}
                >
                  Создать вакансию
                </Button>
              ) : (
                <></>
              )}
              <IconButton
                size="lg"
                variant="ghost"
                aria-label="open menu"
                icon={<FiBell />}
              />
              <Menu>
                {/* <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={session.data.user.image ? session.data.user.image :'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton> */}
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={
                        session.data.user.image
                          ? session.data.user.image
                          : "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">
                        {session.data.user.name && session.data.user.last_name
                          ? session.data.user.name +
                            " " +
                            session.data.user.last_name
                          : session.data.user.name
                            ? session.data.user.name
                            : session.data.user.email}
                      </Text>
                      {session.data.user.role ? (
                        <Text
                          fontSize="xs"
                          color="gray.600"
                          className="capitalize"
                        >
                          {session.data.user.role as string}
                        </Text>
                      ) : localStorage.getItem("userRole") ? (
                        <Text
                          fontSize="xs"
                          color="gray.600"
                          className="capitalize"
                        >
                          {localStorage.getItem("userRole")}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  zIndex={9999}
                  alignItems={"center"}
                  className="text-sm"
                >
                  <br />
                  <Center>
                    <Avatar
                      size={"lg"}
                      src={
                        session.data.user.image
                          ? session.data.user.image
                          : "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </Center>
                  <br />
                  {(session.data.user.name || session.data.user.last_name) && (
                    <Center>
                      <p>
                        {session.data.user.name}{" "}
                        {session.data.user.last_name != null &&
                          session.data.user.last_name}
                      </p>
                    </Center>
                  )}

                  {/* <Center className="mt-1 text-xs font-extralight px-4 capitalize">
                {session.data.user.role as string}
              </Center> */}

                  {session.data.user.email && (
                    <Center className="mt-1 px-4 text-xs font-extralight">
                      <p>{session.data.user.email}</p>
                    </Center>
                  )}

                  <br />
                  <MenuDivider />
                  <MenuItem as={Link} href={"/profile"} icon={<CgProfile />}>
                    Профиль
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiInbox />}>
                    {session.data.user.role === "CLIENT"
                      ? "Ваши заказы"
                      : "Активные проекты"}
                  </MenuItem>
                  <MenuItem icon={<FiSettings />}>Настройки профиля</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    icon={<FiLogOut />}
                    onClick={() => signOut({ redirect: false })}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : // <div className={"flex items-center"}>
          //   {/* TODO: ДОДЕЛАТЬ ВСЕ НОБХОДИМЫЕ ОПЦИИ */}
          //   <div className="relative inline-block text-left mr-6">
          //     <div>
          //       <button
          //         onClick={() => setDropdownState(!dropdownState)}
          //         type="button"
          //         className="align-text-bottom inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          //         id="menu-button"
          //         aria-expanded="true"
          //         aria-haspopup="true"
          //       >
          //         <Image
          //           width={25}
          //           height={25}
          //           // session.data.user.image ||
          //           src={"/images/default_logo.png"}
          //           alt={"LOGO"}
          //           className={"rounded-3xl"}
          //         />
          //         {session.data.user.name && (
          //           <p>{limitText(session.data.user.name, 10)}</p>
          //         )}
          //       </button>
          //     </div>

          //     <div
          //       className={`absolute ${
          //         dropdownState ? "block" : "hidden"
          //       } right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          //       role="menu"
          //       aria-orientation="vertical"
          //       aria-labelledby="menu-button"
          //       tabIndex={-1}
          //     >
          //       <div className="py-1" role="none">
          //         <Link
          //           href="#"
          //           className="text-gray-700 block px-4 py-2 text-sm"
          //           role="menuitem"
          //           tabIndex={-1}
          //           id="menu-item-0"
          //         >
          //           {session.data.user.role === "CLIENT"
          //             ? "Ваши заказы"
          //             : "Активные проекты"}
          //         </Link>
          //       </div>
          //       <div className="py-1" role="none">
          //         <button
          //           onClick={() => signOut({ redirect: false })}
          //           className="text-gray-700 block px-4 py-2 text-sm"
          //           role="menuitem"
          //           tabIndex={-1}
          //           id="menu-item-6"
          //         >
          //           Sign out
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          session.status == "unauthenticated" ? (
            <div className="flex items-center">
              <Link
                className="mx-3 text-[1.03rem] font-semibold text-zinc-700 hover:text-cyan-700 xl:mx-7"
                href={"/login"}
              >
                Войти
              </Link>

              <Link
                className="rounded-xl bg-gradient-to-tr from-sky-200 to-cyan-200 px-3 py-2 font-semibold text-gray-800 hover:from-cyan-300 hover:to-sky-200"
                href={"/signup"}
              >
                Регистрация
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* ==================== Second Nav Bar ===================== */}

        {/* <div className="container mx-auto py-3 px-3 hidden lg:block">
        <ul className="flex items-center 2xl:space-x-20 xl:space-x-12 space-x-9">
          {SecondLink.map((curVal) => (
            <li
              className="text-zinc-600 font-semibold hover:text-cyan-700"
              key={curVal.id}
            >
              <Link href={curVal.link}>{curVal.name}</Link>
            </li>
          ))}

          {MoreLink.map((curVal) => (
            <li key={curVal.id} className="relative">
              <button
                className={`font-semibold flex items-center hover:text-cyan-700 ${
                  moreDp === "hidden" ? "text-zinc-600" : "text-cyan-700"
                }`}
                onClick={() =>
                  moreDp === "hidden" ? setMoreDp("") : setMoreDp("hidden")
                }
              >
                {curVal.name}
                <span
                  className={`ml-1 transition ${
                    moreDp === "" ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {curVal.icon}
                </span>
              </button>

              <ul
                className={`${moreDp} absolute font-semibold text-md bg-[#F3FFFC] shadow-lg border rounded-sm text-zinc-700 min-w-[17rem] right-[-1rem] top-7 z-10`}
              >
                {curVal.subLink.map((curSubVal) => (
                  <li
                    key={curSubVal.id}
                    className="px-5 py-3 hover:bg-[#e1f7fa] cursor-pointer hover:text-cyan-700"
                  >
                    <Link href={curSubVal.link}>{curSubVal.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div> */}

        {/* ==================== Mobile Nav Bar Start ====================== */}
        <div className="lg:hidden">
          <div className="block border-b border-gray-200">
            <div className="flex justify-between px-3 py-2 sm:px-5">
              {/* ========= Right ========= */}
              <div className="flex items-center">
                <span
                  className="text-semibold mr-3 cursor-pointer text-2xl text-zinc-600 hover:text-zinc-500"
                  onClick={() =>
                    mobilelist === false
                      ? setMobileList(true)
                      : setMobileList(false)
                  }
                >
                  {mobilelist || <FaBars />}
                  {mobilelist && <HiX />}
                </span>

                <Image
                  // src="/bespace/bespace-logo-new.svg"
                  src="/bespace/bespace-logo-new.svg"
                  width={120}
                  height={45}
                  alt="logo"
                  className="mr-2 cursor-pointer"
                  onClick={() => router.push("/")}
                />
              </div>

              {/* ========= Left ========= */}
              {session.status == "loading" ? (
                <div className="flex items-center">
                  <div className="mr-3 h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
                </div>
              ) : session.data?.user ? (
                <HStack spacing={{ base: "0", md: "6" }}>
                  <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                  />
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          session.data.user.image
                            ? session.data.user.image
                            : "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>

                    <MenuList
                      zIndex={9999}
                      alignItems={"center"}
                      className="text-sm"
                    >
                      {session.data.user.name && (
                        <MenuItem>{session.data.user.name}</MenuItem>
                      )}

                      {session.data.user.email && (
                        <MenuItem className="text-xs font-extralight">
                          {session.data.user.email}
                        </MenuItem>
                      )}
                      <MenuDivider />
                      <MenuItem icon={<FiInbox />}>
                        {session.data.user.role === "CLIENT"
                          ? "Ваши заказы"
                          : "Активные проекты"}
                      </MenuItem>
                      <MenuItem icon={<FiSettings />}>
                        Настройки профиля
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        icon={<FiLogOut />}
                        onClick={() => signOut({ redirect: false })}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              ) : session.status == "unauthenticated" ? (
                <div className="flex items-center">
                  <Link
                    className="mx-3 text-[1.03rem] font-semibold text-zinc-700 hover:text-cyan-700 xl:mx-7"
                    href={"/login"}
                  >
                    Войти
                  </Link>

                  <Link
                    className="rounded-xl bg-gradient-to-tr from-sky-200 to-cyan-200 px-3 py-2 font-semibold text-gray-800 hover:from-cyan-300 hover:to-sky-200"
                    href={"/signup"}
                  >
                    Регистрация
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* ============================= Dropdown Nav ============================ */}
          <div
            className={`linear absolute z-20 flex w-full flex-col space-y-7 bg-[#F3FFFC] px-2 pb-10 pt-2 shadow-md transition duration-100 sm:px-5 lg:hidden  ${
              mobilelist === true ? "translate-x-[0%]" : "translate-x-[-100%]"
            }`}
          >
            {/* ========== Form ========= */}
            <form
              className="relative flex  w-full flex-grow items-center rounded-full border border-gray-300 px-4 py-2 hover:bg-[#F3FFFC] xl:px-6"
              onSubmit={search}
            >
              <FaChevronDown
                className={`${
                  searchState === "block" ? "rotate-180" : "rotate-0"
                } h-3 cursor-pointer text-zinc-700 transition hover:text-zinc-500`}
                onClick={ShowSearchState}
              />
              <input
                type="text"
                className="mx-2 w-40 flex-grow bg-transparent text-zinc-700 focus:outline-none xl:w-full"
                placeholder="search"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onClick={() => setSearchState("block")}
              />

              {inputText === "" ? (
                <FaSearch className="h-3 cursor-pointer text-zinc-700 hover:text-zinc-500 xl:h-5" />
              ) : null}

              {inputText === "" ? null : (
                <HiX
                  className="h-4 cursor-pointer text-zinc-700 hover:text-zinc-500 xl:h-5"
                  onClick={() => setInputText("")}
                />
              )}

              <ul
                className={`absolute ${searchState} left-3 top-10 z-20 w-[94%] rounded-b-lg border border-gray-300 bg-[#F3FFFC] py-1 shadow-lg sm:left-4 md:w-[97%]`}
              >
                {SearchLink.map((curVal) => (
                  <li
                    className="cursor-pointer px-2 py-2 hover:bg-[#eaf6f8] xl:px-3"
                    key={curVal.id}
                  >
                    <Link href="/">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl text-gray-800 xl:text-2xl">
                          {curVal.icon}
                        </span>
                        <div>
                          <span className="text-md block text-gray-800">
                            {curVal.title}
                          </span>
                          <span className="block text-[13px] text-zinc-500 xl:text-sm">
                            {curVal.dec}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </form>

            <ul className="z-10 mx-1 flex flex-col space-y-7 sm:mx-0">
              <li>
                <a
                  className={`flex cursor-pointer items-center justify-between text-[1.03rem] font-semibold hover:text-cyan-700 ${
                    mobileSubListI === true ? "text-cyan-700" : "text-zinc-700"
                  }`}
                  onClick={FirstLinkHandleMb}
                >
                  Find Talent
                  <FaAngleDown
                    className={`transition ${
                      mobileSubListI === true ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </a>

                {/* ==================== Dropdown List =====================  */}
                {mobileSubListI && (
                  <div>
                    <ul className="my-5 ml-2 flex flex-col space-y-5">
                      {SubLinks1.map((curVal) => (
                        <li key={curVal.id}>
                          <a
                            className={`flex cursor-pointer justify-between`}
                            onClick={() => handleMobileSub(curVal.id)}
                          >
                            <span className={`flex flex-col space-y-1`}>
                              <span className="font-semibold text-zinc-700">
                                {curVal.head}
                              </span>
                              <span className="text-sm font-semibold text-zinc-500">
                                {curVal.headers}
                              </span>
                            </span>

                            <FaAngleRight
                              className={`text-semibold text-zinc-700 transition ${
                                se == curVal.id ? "rotate-90" : "rotate-0"
                              }`}
                            />
                          </a>

                          <div
                            className={`mx-1 my-3 flex-col ${
                              curVal.id == se ? "flex" : "hidden"
                            }`}
                          >
                            <span className="mb-1 font-semibold text-zinc-600 ">
                              {curVal.subhead.name}
                            </span>

                            <span className="font-md text-sm text-zinc-500">
                              {curVal.subhead.des}
                              <Link href={curVal.subhead.subheadlink.link}>
                                <span className="ml-1 cursor-pointer font-semibold text-cyan-700 hover:underline">
                                  {curVal.subhead.subheadlink.name}
                                </span>
                              </Link>
                            </span>

                            <ul className="mt-5 flex flex-col space-y-4">
                              {curVal.sublink.map((curSubVal) => {
                                if (curVal.id === 1) {
                                  return (
                                    <li
                                      className="text-md py-1 text-zinc-700"
                                      key={curSubVal.id}
                                    >
                                      <Link href={curSubVal.link}>
                                        {curSubVal.linktext}
                                      </Link>
                                    </li>
                                  );
                                }

                                if (curVal.id === 2) {
                                  return (
                                    <li key={curSubVal.id}>
                                      <Link href={curSubVal.link}>
                                        <div className="flex cursor-pointer items-center space-x-4 rounded-md border hover:bg-[#e1f7fa] hover:shadow-sm">
                                          {/* <Image
                                          src={curSubVal.img}
                                          height={65}
                                          width={100}
                                          alt="catagory-img"
                                        /> */}

                                          <span className="text-zinc-700">
                                            {curSubVal.linktext}
                                          </span>
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                }

                                if (curVal.id === 3) {
                                  return (
                                    <li
                                      className="text-md py-1 text-zinc-700"
                                      key={curSubVal.id}
                                    >
                                      <Link href={curSubVal.link}>
                                        {curSubVal.linktext}
                                      </Link>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              <li>
                <a
                  className={`flex cursor-pointer items-center justify-between text-[1.03rem] font-semibold hover:text-cyan-700 ${
                    mobileSubListII === true ? "text-cyan-700" : "text-zinc-700"
                  }`}
                  onClick={SecondLinkHandleMb}
                >
                  Find Jobs
                  <FaAngleDown
                    className={`transition ${
                      mobileSubListII === true ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </a>

                {/* ================== Dropdown List ==================== */}
                {mobileSubListII && (
                  <ul className="my-5 ml-2 flex flex-col space-y-6">
                    {SubLinks2.map((curVal) => (
                      <li key={curVal.id}>
                        <Link href={curVal.link}>
                          <span className="flex cursor-pointer flex-col">
                            <span className="font-semibold text-zinc-700">
                              {curVal.name}
                            </span>
                            <span className="text-sm text-zinc-500">
                              {curVal.des}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <a
                  className={`flex cursor-pointer items-center justify-between text-[1.03rem] font-semibold hover:text-cyan-700 ${
                    mobileSubListIII === true
                      ? "text-cyan-700"
                      : "text-zinc-700"
                  }`}
                  onClick={ThirdLinkHandleMb}
                >
                  Why Bespace
                  <FaAngleDown
                    className={`transition ${
                      mobileSubListIII === true ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </a>

                {/* =================== Dropdown List =================== */}
                {mobileSubListIII && (
                  <div className="ml-2 space-y-3">
                    <ul className="mt-5 flex flex-col space-y-4">
                      {SubLinks3.map((curVal) => (
                        <li key={curVal.id} className="cursor-pointer">
                          <Link href={curVal.link}>
                            <span className="flex flex-col space-y-1">
                              <span className="text-zinc-600">
                                {curVal.name}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              <li>
                <Link href={"/enterprise"}>
                  <span className="text-[1.03rem] font-semibold text-zinc-700 hover:text-cyan-700">
                    Enterprise
                  </span>
                </Link>
              </li>
            </ul>

            <Link href={"/login"}>
              <button
                className="mx-1 inline-flex text-[1.03rem] font-semibold text-zinc-700 hover:text-cyan-700 sm:mx-0"
                // onClick={() => router.push("/account-security/login")}
              >
                Login
              </button>
            </Link>
          </div>
        </div>
        {/* ==================== Mobile Nav Bar end ====================== */}
      </nav>
      <VacancyCreateModal
        isOpen={isOpenVacancyCreateModal}
        onClose={onCloseVacancyCreateModal}
      />
    </div>
  );
};

export default Navbar;