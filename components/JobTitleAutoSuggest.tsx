"use client";
import React, { useEffect } from "react";
import { GroupedOption, Options } from "@/data/job_titles";
import CreatableSelect from "react-select/creatable";
import { Prisma } from "@prisma/client";

type JobCategories = Prisma.JobCategoryGetPayload<{
  include: {
    JobTitles: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

function JobTitleAutoSuggest({
  title,
  setTitle,
  className,
  onCreateOption,
}: {
  className?: string;
  title: string;
  setTitle: (val: string) => void;
  onCreateOption?: (val: string) => void;
}) {
  const [options, setOptions] = React.useState<GroupedOption[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/job_titles")
      .then((res) => res.json())
      .then((data: JobCategories[]) => {
        const options: GroupedOption[] = data.map((category) => {
          return {
            label: category.category_name,
            options: category.JobTitles.map((title) => {
              return {
                value: title.name + "_" + category.id,
                label: title.name,
              };
            }),
          };
        });
        setOptions((v) => options);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <CreatableSelect<Options, false, GroupedOption>
      isDisabled={isLoading}
      isLoading={isLoading}
      options={options}
      placeholder={"Начните вводить название специальности"}
      className={className}
      onChange={(val) => {
        if (!val) return;
        setTitle(val.value);
      }}
      onCreateOption={onCreateOption}
      value={{ value: title, label: title }}
    />
  );
}

export default JobTitleAutoSuggest;
