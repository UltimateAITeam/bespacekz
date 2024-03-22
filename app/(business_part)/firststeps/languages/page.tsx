"use client";
import React from "react";
import { motion } from "framer-motion";
import useLanguagesStore, { Language } from "@/store/languagesFormStore";
import { IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { ProficiencyLevel } from "@prisma/client";

function Page() {
  const { removeLanguage, updateLanguage, languages, addLanguage } =
    useLanguagesStore();

  const handleUpdateLanguage = (index: number, field: string, value: any) => {
    updateLanguage(index, { [field]: value });
  };

  const handleAddLanguage = () => {
    const newLanguage = {
      id: languages.length + 1,
      name: "",
      proficiencyLevel: ProficiencyLevel.A1,
    };
    addLanguage(newLanguage);
  };

  const handleRemoveLanguage = (index: number) => {
    removeLanguage(index);
  };
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
          className={"-mt-4 flex w-full flex-col md:w-1/3"}
          onSubmit={onSubmit}
        >
          {languages.map((language: Language, index: number) => (
            <div
              key={index}
              className={
                "relative mt-4 rounded-2xl border-2 border-gray-200 p-6 font-medium shadow-sm"
              }
            >
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor={`specialization-${index}`}>Language:</label>
                <IconButton
                  aria-label="Delete language"
                  icon={<MdDelete />}
                  onClick={() => handleRemoveLanguage(index)}
                  variant="ghost"
                />
              </div>
              <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
                <input
                  type="text"
                  value={language.name}
                  className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                  onChange={(e) =>
                    handleUpdateLanguage(index, "name", e.target.value)
                  }
                  required
                />
              </div>
              <label htmlFor={`specialization-${index}`}>Your level:</label>
              <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
                <select
                  value={language.proficiencyLevel}
                  className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                  onChange={(e) =>
                    handleUpdateLanguage(
                      index,
                      "proficiencyLevel",
                      e.target.value,
                    )
                  }
                  required
                >
                  {Object.keys(ProficiencyLevel).map((key: string) => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLanguage}
            className="mt-4 w-full flex-grow rounded-xl border-2 bg-[#4fa9bd] bg-transparent px-4 py-2 text-zinc-700 hover:bg-[#397b8a] hover:text-white focus:outline-none focus:ring-0 xl:w-full"
          >
            Add language
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Page;
