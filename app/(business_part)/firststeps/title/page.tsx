"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useTitleStore from "@/store/titleFormStateStore";
import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

function Page() {
  const { title, updateTitle } = useTitleStore();
  const [jobCategoryRequired, setJobCategoryRequired] = React.useState(false);
  const [categories, setCategories] = useState<
    { id: number; category_name: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/job_categories")
      .then((res) => res.json())
      .then((data: any) => {
        setCategories(data);
      });
  }, []);

  const handleTitleChange = (value: string) => {
    setJobCategoryRequired((v) => false);
    updateTitle(value.split("_")[0] || "");
  };

  const handleCreateTitle = (value: string) => {
    updateTitle(value);
    setJobCategoryRequired((v) => true);
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
            ✨Теперь добавьте вашу специальность, чтобы рассказать миру, чем вы
            занимаетесь.{" "}
          </span>
          <span className={"text-lg text-gray-600 lg:text-xl 2xl:font-bold"}>
            Это первое, что видят клиенты, поэтому учтите это. Выделитесь,
            описав свой опыт своими словами.
          </span>

          <JobTitleAutoSuggest
            className={"mt-4 w-1/2"}
            onCreateOption={handleCreateTitle}
            title={title}
            setTitle={handleTitleChange}
          />
        </form>
      </div>
    </motion.div>
  );
}

export default Page;
