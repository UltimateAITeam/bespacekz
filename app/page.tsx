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
import { FaAtlassian, FaStar, FaUber } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";
import { BsFillTrophyFill, BsWordpress } from "react-icons/bs";
import { ImCheckmark, ImGoogle } from "react-icons/im";
import Footer from "@/components/brenda_components/Footer";
import { SiAdobe, SiUdacity } from "react-icons/si";
import ThreeTierPricing from "@/components/home_page/Pricing";
import VacancyList from "@/components/brenda_components/VacancyList";
import { VacanciesList } from "@/components/vacancies/VacanciesList";
import StatsWithIcons from "@/components/home_page/Stats";

export default function HomePage() {
  const session = useSession();
  return (
    <div className="flex min-h-screen flex-col">
      {/* ============== Head Tag =============== */}
      <HeadTag title="Bespace - The World's Work Marketplace" />

      {/* ================= Header ================= */}
      {/* className="header-bg" */}
      <header>
        {/* ============== Navbar ============ */}
        <Navbar />

        {/* ============= Head Container =============== */}
        <div className="container mx-auto px-3 py-3 sm:px-7 md:px-5">
          {/* ============ First part [banner section] ============  */}
          <section className="mt-7 flex items-center justify-between">
            {/* ========= Right ======== */}
            <div className="flex flex-col space-y-5">
              <motion.h1
                className="text-4xl font-bold text-[#0C4A6E] lg:text-6xl xl:text-7xl"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
              >
                Начни свой <br /> успех вместе <br /> с нами
                {/* Соединяя Таланты <br /> с AI! */}
              </motion.h1>
              <motion.h6
                className="text-lg font-semibold text-zinc-500 lg:text-xl xl:text-3xl"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                Мы тебе поможем быстро найти твоего клиента.{" "}
                {/* <br className="lg:block md:hidden block" />
                Здесь и сейчас – место для ведущих экспертов. */}
              </motion.h6>

              <motion.button
                className={
                  "w-52 rounded-xl bg-[#0c4a6e] p-2 font-semibold text-white lg:text-sm xl:text-lg"
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
                <div className="absolute left-[-3rem] top-0 z-[9] hidden cursor-pointer flex-col items-center rounded-xl bg-[#F3FFFC] px-3 py-2 shadow-2xl transition hover:scale-105 lg:flex">
                  <span className="mb-1 text-[11px] font-semibold text-zinc-700">
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

              <div className="mr-10 mt-5 hidden md:block">
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
        {/* ================= Trusted Company Section ================ */}
        <section className="container mx-auto mt-3 space-y-3 px-3 py-3 sm:px-7 md:px-5">
          <h3 className="text-xl font-semibold text-zinc-500 lg:text-2xl">
            Нам доверяют
          </h3>
          <motion.div
            className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-7 md:space-y-0"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex space-x-3 sm:space-x-6 xl:space-x-7 2xl:space-x-10">
              <span>
                <Image
                  src="/images/paypal.png"
                  height={30}
                  width={90}
                  alt="paypal-img"
                />
              </span>
              {/* <span>
                <Image
                  src="/images/adobe.png"
                  height={30}
                  width={90}
                  alt="adobe-img"
                />
              </span> */}
              <span>
                <Image
                  src="/images/oracle.png"
                  height={30}
                  width={90}
                  alt="oracle-img"
                />
              </span>
              <span>
                <Image
                  src="/images/google.png"
                  height={30}
                  width={90}
                  alt="google-img"
                />
              </span>
            </div>
            <div className="flex space-x-4 sm:space-x-6 xl:space-x-7 2xl:space-x-10">
              <span>
                <Image
                  src="/images/microsoft.png"
                  height={30}
                  width={110}
                  alt="microsoft-img"
                />
              </span>
              <span>
                <Image
                  src="/images/airnob.png"
                  height={30}
                  width={90}
                  alt="airbnb-img"
                />
              </span>
              <span>
                <Image
                  src="/images/netflix.png"
                  height={30}
                  width={90}
                  alt="netflix-img"
                />
              </span>
            </div>
          </motion.div>
        </section>

        {/* ======================== Stats section ========================= */}
        <section className="container mx-auto mt-3 px-3 py-3 sm:px-7 md:mt-7 md:px-5">
          <StatsWithIcons />
        </section>

        {/* ======================== Talent Category ========================= */}
        <section className="container mx-auto mt-3 px-3 py-3 sm:px-7 md:mt-7 md:px-5">
          <h2 className="mb-3 text-3xl font-bold text-[#0C4A6E] lg:text-4xl">
            Просмотр талантов по категориям
          </h2>

          <span className="text-md font-semibold text-zinc-600 lg:text-lg">
            Ищете работу?
            <Link href="/vacancies">
              {/* cyan-700 */}
              <span className="ml-2 cursor-pointer text-primary-6 hover:underline">
                Просмотреть вакансии
              </span>
            </Link>
          </span>

          <div className="2xl:gap-x-18 mt-7 grid grid-cols-1 gap-x-10 gap-y-3 sm:gap-y-4 sm:px-7 md:grid-cols-2 md:px-0 lg:mt-10 xl:grid-cols-4 xl:gap-y-7">
            {/* ========== Компонент категории ========= */}
            <Category />
          </div>
        </section>

        {/* ====================== Find Talent Section =================== */}
        <section className="container mx-auto mt-3 space-y-3 px-0 py-3 sm:px-7 md:px-5 lg:mt-5">
          <div className="w-full rounded-none bg-[url('/images/grilswork.png')] bg-top px-5 py-8 sm:rounded-xl xl:px-14">
            <motion.h2
              className="text-xl font-semibold text-white lg:text-3xl"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Для клиентов
            </motion.h2>

            <motion.h3
              className="my-3 mt-20 text-4xl font-semibold leading-tight text-white lg:mt-28 lg:text-6xl 2xl:font-bold"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Подбор талантов <br />
              Под ваш запрос
            </motion.h3>

            <motion.p
              className="text-md font-semibold text-white lg:text-xl"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Работайте с крупнейшей сетью независимых <br />
              специалистов и реализуйте свои проекты — от быстрых <br />
              задач до крупных трансформаций. <br />
            </motion.p>

            <motion.div
              className="mt-10 grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-3 md:gap-y-0 xl:gap-x-7 2xl:gap-x-10"
              initial={{ y: "100", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* ========= для клиента ========== */}
              <ClintCat />
            </motion.div>
          </div>
        </section>

        {/* ========================== Busines section ============================= */}
        <section className="container mx-auto mt-1 py-3 sm:px-7 md:px-5 lg:mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="relative col-span-2 rounded-t-xl bg-none px-5 pb-14 pt-10 sm:px-7 md:bg-[#E4FDF7] lg:rounded-l-xl lg:rounded-tr-none">
              <motion.h2
                className="text-4xl font-semibold text-zinc-700 lg:text-5xl 2xl:text-6xl"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Почему компании <br />
                выбирают Bespace
              </motion.h2>

              <motion.div
                className="ml-0 mt-7 flex items-start space-x-5 md:ml-3"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="text-md mt-1 flex rounded-full bg-zinc-700 px-1 py-1 text-white xl:text-xl">
                  <FaStar />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-semibold text-zinc-700 xl:text-3xl">
                    Гарантия качества
                  </h3>
                  <span className="xl:text-md font-semibold text-zinc-500">
                    Ознакомьтесь с образцами работ профессионалов, отзывами
                    клиентов <br className="hidden md:block" />и подтверждением
                    личности.
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="ml-0 mt-7 flex items-start space-x-5 md:ml-3"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="text-md mt-1 flex rounded-full bg-zinc-700 px-1 py-1 text-white xl:text-xl">
                  <IoLogoUsd />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-semibold text-zinc-700 xl:text-3xl">
                    Оплата только после найма
                  </h3>
                  <span className="text-md font-semibold text-zinc-500">
                    Interview potential fits for your job, negotiate{" "}
                    <br className="hidden md:block" />
                    rates, and only pay for work you approve.
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="ml-0 mt-7 flex items-start space-x-5 md:ml-3"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="text-md mt-1 flex rounded-full bg-zinc-700 px-1 py-1 text-white xl:text-xl">
                  <ImCheckmark />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-semibold text-zinc-700 xl:text-3xl">
                    Надежность и безопасность
                  </h3>
                  <span className="text-md font-semibold text-zinc-500">
                    Focus on your work knowing we help protect{" "}
                    <br className="hidden md:block" />
                    your data and privacy. We’re here with 24/7{" "}
                    <br className="hidden md:block" />
                    support if you need it.
                  </span>
                </div>
              </motion.div>

              <div className="absolute bottom-3 right-0 hidden md:block lg:right-[-1rem]">
                <Image
                  src="/images/man-preg.png"
                  width={250}
                  height={400}
                  alt="man-image"
                />
              </div>
            </div>

            <div className="pb-15 rounded-none bg-gradient-to-b from-[#99F6E4] to-[#A5F3FC] px-7 py-10 pt-10 sm:rounded-xl md:rounded-none md:rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none">
              <motion.h2
                className="text-3xl font-semibold text-zinc-700 xl:text-4xl 2xl:text-5xl"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                мы являемся <br />
                глобальной площадкой для трудоустройства
              </motion.h2>

              <motion.div
                className="mt-10 flex items-start space-x-7"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="mt-1 text-2xl text-zinc-700 xl:text-3xl 2xl:text-4xl">
                  <FaStar />
                </span>

                <div className="flex flex-col space-y-2 md:space-y-3">
                  <h3 className="text-2xl font-semibold text-zinc-700 xl:text-3xl 2xl:text-4xl">
                    4.9/5
                  </h3>
                  <span className="lg:text-md text-zinc-500 2xl:text-xl">
                    Clients rate professionals on Bespace
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="mt-5 flex items-start space-x-7 md:mt-7 xl:mt-10"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="mt-1 text-2xl text-zinc-700 xl:text-3xl 2xl:text-4xl">
                  <BsFillTrophyFill />
                </span>

                <div className="flex flex-col space-y-2 md:space-y-3">
                  <h3 className="text-2xl font-semibold text-zinc-700 xl:text-3xl 2xl:text-4xl">
                    Award winner
                  </h3>
                  <span className="lg:text-md text-zinc-500 2xl:text-xl">
                    G2’s 2021 Best Software Awards
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =================== Pricing Section ===================== */}
        <section className="container mx-auto mt-3 space-y-3 px-3 py-3 sm:px-7 md:px-5">
          <ThreeTierPricing />
        </section>

        {/* ====================== oppertunity section ==============================  */}
        <section className="container mx-auto mt-3 space-y-3 px-0 py-3 sm:px-7 md:mt-5 md:px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
            <Image
              src="/images/manworking.png"
              width={1200}
              height={1200}
              alt="manworking-image"
              className="flex flex-grow rounded-none sm:rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            />

            <div className="col-span-1 rounded-none bg-gradient-to-b from-[#A5F3FC] to-[#7DD3FC] px-5 py-5 sm:rounded-b-xl md:rounded-r-xl md:rounded-bl-none lg:py-7 xl:px-10 2xl:col-span-2">
              <motion.h5
                className="text-xl font-semibold text-zinc-700 lg:text-2xl"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                For Talent
              </motion.h5>
              <motion.h3
                className="mb-1 mt-5 text-4xl font-semibold text-zinc-700 lg:mb-3 lg:mt-7 lg:text-5xl"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Find great work
              </motion.h3>
              <motion.p
                className="font-semibold text-zinc-500"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Meet clients you’re excited to work with and take{" "}
                <br className="hidden lg:block" />
                your career or business to new heights.
              </motion.p>

              <motion.div
                className="mt-4 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-zinc-500 py-3 lg:mt-14 lg:grid-cols-3 lg:gap-y-0 lg:py-5 xl:gap-x-10 2xl:gap-x-14"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="text-md font-semibold text-zinc-700 xl:text-lg 2xl:text-xl">
                  Find opportunities for every stage of your freelance career
                </span>
                <span className="text-md font-semibold text-zinc-700 xl:text-lg 2xl:text-xl">
                  Control when, where, and how you work
                </span>
                <span className="text-md font-semibold text-zinc-700 xl:text-lg 2xl:text-xl">
                  Explore different ways to earn
                </span>
              </motion.div>

              <motion.button
                className="mt-3 rounded-full bg-zinc-700 px-5 py-2 font-semibold text-white transition hover:bg-zinc-600 lg:mt-7 xl:mt-16"
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Find Oppartunities
              </motion.button>
            </div>
          </div>
        </section>

        {/* =========================== Trusted Section ========================== */}
        <section className="container mx-auto mt-3 space-y-3 px-3 py-3 sm:px-7 md:px-5">
          <div className="mt-5 md:mt-10">
            <h2 className="text-3xl font-bold leading-tight text-[#374151] lg:text-4xl xl:text-5xl">
              Trusted by leading <br className="hidden md:block" />
              brands and startups
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-x-7 gap-y-5 md:grid-cols-2 md:gap-y-0 xl:gap-x-14">
              <motion.div
                className="flex flex-col rounded-xl bg-[#115E59] px-7 py-5"
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-semibold text-white sm:text-5xl">
                    <FaUber />
                  </span>
                  <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                    Ubber
                  </h3>
                </div>

                <span className="mt-5 text-xl font-semibold text-white xl:text-2xl">
                  “Brenda enables us to differentiate ourselves from our
                  competitors and produce content at a higher caliber.”
                </span>
                <span className="mt-2 text-gray-300">
                  Josh Machiz, Chief Digital Officer
                </span>

                <div className="mt-7 xl:mt-14">
                  <span className="font-semibold text-white">Results</span>

                  <div className="mt-2 flex flex-col border-t border-white sm:flex-row sm:space-x-10 xl:space-x-20">
                    <div className="mt-3">
                      <h5 className="text-xl font-semibold text-white">
                        Emmy winning
                      </h5>
                      <span className="text-sm text-white">
                        Facebook watch program
                      </span>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-xl font-semibold text-white">
                        Millions
                      </h5>
                      <span className="text-sm text-white">
                        of impressions generated per client per IPO
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="rounded-l-xl bg-[url('/images/cling.png')] bg-cover bg-right"></div>

                <div className="flex flex-col items-center space-y-5 rounded-r-xl bg-gray-800 px-5 py-3">
                  <h2 className="mt-3 text-2xl font-semibold text-white xl:mt-5">
                    And many more..
                  </h2>

                  <span className="text-3xl text-white xl:text-4xl">
                    <SiAdobe />
                  </span>
                  <span className="text-3xl text-white xl:text-4xl">
                    <SiUdacity />
                  </span>
                  <span className="text-3xl text-white xl:text-4xl">
                    <FaAtlassian />
                  </span>
                  <span className="text-3xl text-white xl:text-4xl">
                    <ImGoogle />
                  </span>
                  <span className="text-3xl text-white xl:text-4xl">
                    <BsWordpress />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="container mx-auto my-3 space-y-3 px-3 py-3 sm:px-7 md:px-5 lg:my-7">
          <h2 className="mb-7 text-3xl font-bold text-[#0C4A6E] lg:text-4xl">
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
