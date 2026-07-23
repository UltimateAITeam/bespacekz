"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/brenda_components/Navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import JobSuccessCard from "@/components/brenda_components/JobSuccessCard";
import Category from "@/components/brenda_components/Category";
import ClintCat from "@/components/brenda_components/ClintCat";
import { FaMedal, FaRobot, FaSearch } from "react-icons/fa";
import Footer from "@/components/brenda_components/Footer";
import ThreeTierPricing from "@/components/home_page/Pricing";
import { VacanciesList } from "@/components/vacancies/VacanciesList";
import StatsWithIcons from "@/components/home_page/Stats";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= Header ================= */}
      <header className="header-bg">
        {/* ============== Navbar ============ */}
        <Navbar />

        {/* ============= Head Container =============== */}
        <div className="container mx-auto py-3 md:px-5 sm:px-7 px-3">
          {/* ============ First part [banner section] ============  */}
          <section className="mt-7 lg:mt-10 flex items-center justify-between">
            {/* ========= Right ======== */}
            <div className="flex flex-col space-y-5 max-w-2xl">
              <motion.h1
                className="xl:text-7xl lg:text-6xl text-4xl font-bold text-mainText leading-tight break-keep"
                initial={{ y: "40px", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
              >
                Доверься Искусственному Интеллекту
              </motion.h1>

              <motion.p
                className="text-zinc-500 xl:text-2xl lg:text-xl text-lg font-semibold"
                initial={{ y: "40px", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                Открой новые возможности в поиске работы и талантов.
              </motion.p>

              <motion.div
                initial={{ y: "40px", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-wrap items-center gap-4 !mt-8"
              >
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-primary-6 px-8 py-3 text-white lg:text-sm xl:text-lg font-semibold shadow-soft transition hover:bg-primary-6/90 hover:scale-105"
                >
                  Приступить к работе
                </Link>
                <Link
                  href="/vacancies"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/60 px-8 py-3 text-zinc-700 lg:text-sm xl:text-lg font-semibold transition hover:bg-white hover:scale-105"
                >
                  Смотреть вакансии
                </Link>
              </motion.div>
            </div>

            {/* ========= Left ======== */}
            <div className="relative">
              <Link href="/vacancies">
                <div className="absolute lg:flex hidden flex-col items-center z-[9] bg-[#F3FFFC] shadow-2xl py-2 px-3 rounded-xl cursor-pointer left-[-3rem] top-0 transition hover:scale-105">
                  <span className="text-[11px] font-semibold text-zinc-700 mb-1">
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
                  priority
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
        {/* ======================== Trust stats ========================= */}
        <section className="container mx-auto py-3 md:px-5 sm:px-7 px-3">
          <StatsWithIcons />
        </section>

        {/* ======================== Talent Category ========================= */}
        <section className="container mx-auto mt-3 md:mt-7 py-3 md:px-5 sm:px-7 px-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-mainText lg:text-4xl text-3xl font-bold mb-3">
              Просмотр талантов по категориям
            </h2>

            <span className="text-zinc-600 font-semibold lg:text-lg text-md">
              Ищете работу?
              <Link href="/vacancies">
                <span className="ml-2 text-primary-6 cursor-pointer hover:underline">
                  Просмотреть вакансии
                </span>
              </Link>
            </span>
          </div>

          <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 2xl:gap-x-8 gap-x-10 xl:gap-y-7 sm:gap-y-4 gap-y-3 lg:mt-10 mt-7 md:px-0 sm:px-7">
            {/* ========== Компонент категории ========= */}
            <Category />
          </div>
        </section>

        {/* ======================== How it works ========================= */}
        <section className="container mx-auto lg:mt-16 mt-10 py-3 md:px-5 sm:px-7 px-3">
          <h2 className="text-mainText lg:text-4xl text-3xl font-bold mb-3">
            Как это работает
          </h2>
          <p className="text-zinc-500 font-semibold lg:text-lg text-md mb-10">
            Три простых шага, чтобы найти нужного специалиста или проект.
          </p>

          <div className="grid xl:grid-cols-3 grid-cols-1 gap-6">
            <ClintCat />
          </div>
        </section>

        {/* ========================== Busines section ============================= */}
        <section className="container mx-auto lg:mt-16 mt-10 py-3 md:px-5 sm:px-7">
          <div className="grid lg:grid-cols-3 grid-cols-1 shadow-soft rounded-xl overflow-hidden">
            <div className="md:bg-[#E4FDF7] bg-none col-span-2 lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl sm:px-7 px-5 pt-10 pb-14 relative">
              <motion.h2
                className="text-zinc-700 font-semibold 2xl:text-6xl lg:text-5xl text-4xl"
                initial={{ y: "60px", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Почему компании <br />
                выбирают Bespace
              </motion.h2>

              <motion.div
                className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                initial={{ y: "40px", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                  <FaRobot />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                    AI помощник
                  </h3>
                  <span className="text-zinc-500 font-semibold xl:text-md">
                    Наши ИИ помощники предлагают автоматический анализ профилей,{" "}
                    <br className="md:block hidden" />
                    мгновенное написание описаний вакансий и точный подбор кандидатов,{" "}
                    <br className="md:block hidden" />
                    упрощая процесс найма.
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex md:ml-3 ml-0 space-x-5 items-start mt-7"
                initial={{ y: "40px", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
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
                initial={{ y: "40px", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="flex rounded-full py-1 px-1 bg-zinc-700 text-white xl:text-xl text-md mt-1">
                  <FaMedal />
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="text-zinc-700 font-semibold xl:text-3xl text-2xl">
                    Самый быстрый поиск <br /> фрилансеров по Казахстану
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

            <div className="bg-gradient-to-b from-[#99F6E4] to-[#A5F3FC] lg:rounded-r-xl lg:rounded-bl-none md:rounded-b-xl md:rounded-none sm:rounded-xl rounded-none px-7 py-10 flex flex-col justify-center">
              <motion.h2
                className="text-zinc-700 font-semibold 2xl:text-5xl xl:text-4xl text-3xl"
                initial={{ y: "40px", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Ваша глобальная площадка <br />
                для трудоустройства
              </motion.h2>

              <Link
                href="/signup"
                className="mt-8 inline-flex w-fit items-center justify-center rounded-xl bg-zinc-800 px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-zinc-900 hover:scale-105"
              >
                Начать бесплатно
              </Link>
            </div>
          </div>
        </section>

        {/* =================== Pricing Section ===================== */}
        <section className="container mx-auto lg:mt-16 mt-10 py-3 md:px-5 sm:px-7 px-3 space-y-3">
          <ThreeTierPricing />
        </section>

        <section className="container mx-auto lg:my-16 my-10 py-3 md:px-5 sm:px-7 px-3 space-y-3">
          <h2 className="text-mainText lg:text-4xl text-3xl font-bold mb-7">
            Вакансии дня на платформе
          </h2>
          <VacanciesList />
        </section>
      </main>

      {/* ==================== Footer ====================== */}
      <Footer />
    </div>
  );
}
