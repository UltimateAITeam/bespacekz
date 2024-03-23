"use client";
import React from "react";
import { motion } from "framer-motion";
import useLinksStore from "@/store/aboutFormStore";
import { IconButton, Textarea } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import useAboutStore from "@/store/aboutFormStore";
import dynamic from "next/dynamic";

// import RichText from "@/components/RichText";

function Page() {
  const RichText = dynamic(() => import("@/components/RichText"), {
    ssr: false,
  });
  const { about, updateAbout } = useAboutStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className={"m-auto flex flex-col items-center justify-center"}>
        <form
          className={"-mt-4 flex w-full flex-col md:w-3/4"}
          onSubmit={onSubmit}
        >
          <span
            className={
              "font-zinc-950 text-3xl font-semibold lg:text-4xl 2xl:font-bold"
            }
          >
            📝Великолепно! Сейчас напишите информация о себе чтобы дать знать
            клиенту кто вы.
          </span>
          <span className={"text-lg text-gray-600 lg:text-xl 2xl:font-bold"}>
            Ваши навыки показывают клиентам, что вы можете предложить, и
            помогают нам выбирать, какие вакансии вам рекомендовать.
          </span>
          <span
            className={
              "mb-2 mt-4 text-lg text-gray-600 lg:text-xl 2xl:font-bold"
            }
          >
            Все зависит от вас, дерзайте!
          </span>

          <RichText data={about} onChange={(e) => updateAbout(e)}></RichText>
        </form>
      </div>
    </motion.div>
  );
}

export default Page;
