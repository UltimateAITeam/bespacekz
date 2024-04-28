"use client";
import CreatableSelect from "react-select/creatable";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useTitleStore from "@/store/titleFormStateStore";
import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";
import { skillsList } from "@/data/skills";
import useSkillsStore from "@/store/skillFormStore";

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

  const { setSkills } = useSkillsStore();

  const handleSelectionChange = (name: string, value: string[]) => {
    setSkills(value);
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className={"m-auto flex flex-col justify-center items-center"}>
        <form
          className={"flex flex-col w-full md:w-3/4 -mt-4"}
          onSubmit={onSubmit}
        >
          <span
            className={
              "font-semibold font-zinc-950 2xl:font-bold lg:text-4xl text-3xl"
            }
          >
            По какой специальности вы тут будете работать?{" "}
          </span>
          <span
            className={"text-gray-600 2xl:font-bold lg:text-xl text-lg py-2"}
          >
            Это первое, что видят клиенты, поэтому учтите это. Выделитесь,
            описав свой опыт своими словами.
          </span>

          <JobTitleAutoSuggest
            className={"w-1/2 mt-4"}
            onCreateOption={handleCreateTitle}
            title={title}
            setTitle={handleTitleChange}
          />
          <div className="mt-4 w-1/2">
            <FormLabel>Навыки</FormLabel>
            <CreatableSelect
              isMulti
              options={skillsList}
              isClearable
              placeholder="JavaScript"
              classNames={{
                input: () => "!shadow-none !focus:outline-none !focus:ring-0",
              }}
              onChange={(newValues) => {
                if (!newValues) return;
                handleSelectionChange(
                  "requiredSkills",
                  newValues.map((v) => v.value),
                );
              }}
              required
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Page;
