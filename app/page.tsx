"use client";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import HeadTag from "@/components/brenda_components/HeadTag";
import Navbar from "@/components/brenda_components/Navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import JobSuccessCard from "@/components/brenda_components/JobSuccessCard";
import Category from "@/components/brenda_components/Category";
import ClintCat from "@/components/brenda_components/ClintCat";
import { FaAtlassian, FaMedal, FaRobot, FaSearch, FaStar, FaUber } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";
import { BsFillTrophyFill, BsWordpress } from "react-icons/bs";
import { ImCheckmark, ImGoogle } from "react-icons/im";
import Footer from "@/components/brenda_components/Footer";
import { SiAdobe, SiUdacity } from "react-icons/si";
import ThreeTierPricing from "@/components/home_page/Pricing";
// import VacancyList from "@/components/brenda_components/VacancyList";
import { VacanciesList } from "@/components/vacancies/VacanciesList";
import StatsWithIcons from "@/components/home_page/Stats";

export default function HomePage() {
  const session = useSession();
  return (
    <div className="min-h-screen flex flex-col">
      {/* ============== Head Tag =============== */}
      <HeadTag title="Bespace - The World's Work Marketplace" />

      {/* ================= Header ================= */}
      {/* className="header-bg" */}
      <header>
        {/* ============== Navbar ============ */}
        <Navbar />

        {/* ============= Head Container =============== */}
        <div className="container mx-auto py-3 md:px-5 sm:px-7 px-3">
          {/* ============ First part [banner section] ============  */}
          <section className="mt-7 flex items-center justify-between">
            {/* ========= Right ======== */}
            <div className="flex flex-col space-y-5">
              <motion.h1
                className="xl:text-7xl lg:text-6xl text-4xl font-bold text-[#0C4A6E]"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
              >
                Доверься Искусственному Интеллекту
                {/* Соединяя Таланты <br /> с AI! */}
              </motion.h1>
              <motion.h6
                className="text-zinc-500 xl:text-3xl lg:text-xl text-lg font-semibold"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                Открой новые возможности в поиске работы и талантов.{" "}
                {/* <br className="lg:block md:hidden block" />
                Здесь и сейчас – место для ведущих экспертов. */}
              </motion.h6>

              <motion.button
                className={
                  "w-52 p-2 rounded-xl bg-primary-6 text-white lg:text-sm xl:text-lg font-semibold"
                }
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <Link href={"/signup"} className={"!text-white"}>
                  Приступить к работе
                </Link>
              </motion.button>
            </div>

            {/* ========= Left ======== */}
            <div className="relative">
              <Link href="/jobs/todays-jobs">
                <div className="absolute lg:flex hidden flex-col items-center z-[9] bg-[#F3FFFC] shadow-2xl py-2 px-3 rounded-xl cursor-pointer left-[-3rem] top-0 transition hover:scale-105">
                  <span className="text-[11px] font-semibold text-zinc-700 mb-1">
                    {/* Today&apos;s Job */}
                    Вакансии дня
                  </span>
                  <Image
                    src="/images/bag.png"
                    height={30}
                    width={40}
                    alt="bag-image"
                  />
                </div>
              </Link>

              <div className="mr-10 mt-5 md:block hidden">
                <Image
                  src="/home/hero.png"
                  height={410}
                  width={635}
                  alt="header-img"
                />
              </div>

              {/* ========== job success card Component ================= */}
              <JobSuccessCard />
            </div>
          </section>
        </div>
      </header>

      {/* ================= Main ==================== */}
      <main className="bg-mainBg">
        {/* ======================== Talent Category ========================= */}
        <section className="container mx-auto mt-3 md:mt-7 py-3 md:px-5 sm:px-7 px-3">
          <h2 className="text-[#0C4A6E] lg:text-4xl text-3xl font-bold mb-3">
            Просмотр талантов по категориям
          </h2>

          <span className="text-zinc-600 font-semibold lg:text-lg text-md">
            Ищете работу?
            <Link href="/vacancies">
              {/* cyan-700 */}
              <span className="ml-2 text-primary-6 cursor-pointer hover:underline">
                Просмотреть вакансии
              </span>
            </Link>
          </span>

          <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 2xl:gap-x-8 gap-x-10 xl:gap-y-7 sm:gap-y-4 gap-y-3 lg:mt-10 mt-7 md:px-0 sm:px-7">
            {/* ========== Компонент категории ========= */}
            <Category />
          </div>
        </section>

        {/* ========================== Busines section ============================= */}
        <section className="container mx-auto lg:mt-5 mt-1 py-3 md:px-5 sm:px-7">
          <div className="grid lg:grid-cols-3 grid-cols-1">
            <div className="md:bg-[#E4FDF7] bg-none col-span-2 lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl sm:px-7 px-5 pt-10 pb-14 relative">
              <motion.h2
                className="text-zinc-700 font-semibold 2xl:text-6xl lg:text-5xl text-4xl"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Почему компании <br />
                выбирают Bespace
              </motion.h2>

              <motion.div
                className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                  <FaRobot />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                    AI помощник
                  </h3>
                  <span className="text-zinc-500 font-semibold xl:text-md">
                  Наши ИИ помощники предлагают автоматический анализ профилей, <br/> 
                  мгновенное написание описаний вакансий и точный подбор кандидатов, <br/> упрощая процесс найма.
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                  <FaSearch />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                    Поиск вакансии и не только
                  </h3>
                  <span className="text-zinc-500 font-semibold text-md">
                    Проводите собеседования с потенциальными кандидатами, договаривайтесь
                    <br className="md:block hidden" />
                    о ставках и оплачивайте только одобренную работу.
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                  <FaMedal />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                      Самый быстрый поиск <br/> фрилансеров по Казахстану
                  </h3>
                  <span className="text-zinc-500 font-semibold text-md">
                    Сосредоточьтесь на своей работе, зная, что мы заботимся о защите 
                    <br className="md:block hidden" />
                    ваших данных и конфиденциальности. Мы поддерживаем вас круглосуточно,
                    <br className="md:block hidden" />
                    обращайтесь за помощью в любое время.
                  </span>
                </div>
              </motion.div>

              <div className="absolute lg:right-[-1rem] right-0 bottom-3 md:block hidden">
                <Image
                  src="/images/man-preg.png"
                  width={250}
                  height={400}
                  alt="man-image"
                />
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#99F6E4] to-[#A5F3FC] lg:rounded-r-xl lg:rounded-bl-none md:rounded-b-xl md:rounded-none sm:rounded-xl rounded-none px-7 pt-10 pb-15 py-10">
              
              <motion.h2
                className="text-zinc-700 font-semibold 2xl:text-5xl xl:text-4xl text-3xl"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Ваша глобальная площадка <br />
                для трудоустройства
              </motion.h2>

              {/* <motion.div
                className="flex items-start space-x-7 mt-10"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="2xl:text-4xl xl:text-3xl text-2xl text-zinc-700 mt-1">
                  <FaStar />
                </span>

                <div className="flex flex-col md:space-y-3 space-y-2">
                  <h3 className="font-semibold 2xl:text-4xl xl:text-3xl text-2xl text-zinc-700">
                    4.9/5
                  </h3>
                  <span className="2xl:text-xl lg:text-md text-zinc-500">
                    Clients rate professionals on Bespace
                  </span>
                </div>
              </motion.div> */}

              {/* <motion.div
                className="flex items-start space-x-7 xl:mt-10 md:mt-7 mt-5"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="2xl:text-4xl xl:text-3xl text-2xl text-zinc-700 mt-1">
                  <BsFillTrophyFill />
                </span>

                <div className="flex flex-col md:space-y-3 space-y-2">
                  <h3 className="font-semibold 2xl:text-4xl xl:text-3xl text-2xl text-zinc-700">
                    Award winner
                  </h3>
                  <span className="2xl:text-xl lg:text-md text-zinc-500">
                    G2’s 2021 Best Software Awards
                  </span>
                </div>
              </motion.div> */}
            </div>
          </div>
        </section>

        {/* =================== Pricing Section ===================== */}
        <section className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3">
          <ThreeTierPricing />
        </section>

        <section className="container mx-auto lg:my-7 my-3 py-3 md:px-5 sm:px-7 px-3 space-y-3">
          <h2 className="text-[#0C4A6E] lg:text-4xl text-3xl font-bold mb-7">
            Вакансии дня на платформе
          </h2>
          {/* <VacancyList /> */}
          <VacanciesList />
        </section>
      </main>

      {/* ==================== Footer ====================== */}
      <Footer />
    </div>
  );
}
