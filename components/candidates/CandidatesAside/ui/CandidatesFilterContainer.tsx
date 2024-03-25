"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AsideFilter } from "@/components/ui/AsideFilter";
import { AsideFilterItem } from "@/components/ui/AsideFilter/AsideFilterItem";
import { cities } from "@/data/cities";
import { job_types } from "@/data/job_types";
import { JobCategory } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CandidatesQueryEnum } from "@/types/candidates.types";

export const CandidatesFilterContainer = ({
  categories,
}: {
  categories: JobCategory[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { defaultCategories, defaultCities } = useMemo(() => {
    return {
      defaultCategories: searchParams.getAll(CandidatesQueryEnum.category),
      defaultCities: searchParams.getAll(CandidatesQueryEnum.cities),
    };
  }, [searchParams]);

  const handleChangeFilter = (
    optionName: CandidatesQueryEnum,
    value?: (string | number)[],
  ) => {
    const params = new URLSearchParams(searchParams);
    console.log("@handleChangeFilter", optionName, value);

    if (value) {
      params.delete("page"); // сбрасываем пагинацию
      params.delete(optionName); // Удаляем старые
      value.forEach((v) => params.append(optionName, v.toString())); // задаем новые фильтры
    } else {
      params.delete(optionName);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AsideFilter allOpenIndex>
      <AsideFilterItem
        titleFilter="Категории"
        optionsFilters={categories.map((c) => ({
          value: c.category_name,
          label: c.category_name,
        }))}
        defaultOptionsValue={defaultCategories}
        onChangeValue={(v) =>
          handleChangeFilter(CandidatesQueryEnum.category, v)
        }
      />
      <AsideFilterItem
        titleFilter="Город"
        optionsFilters={cities.Kazakhstan}
        defaultOptionsValue={defaultCities}
        isWithSearch
        onChangeValue={(v) => handleChangeFilter(CandidatesQueryEnum.cities, v)}
      />
      {/* <AsideFilterItem titleFilter='Избранные' optionsFilters={[{label:'Отобразить избранное', value: 'favorite'}]}  defaultOptionsValue={[]}   /> */}
      {/* <AsideFilterItem titleFilter='Вид занятости' optionsFilters={job_types}  defaultOptionsValue={defaultJobTypes} onChangeValue={v => handleChangeFilter(CandidatesQueryEnum.job_types ,v)}  /> */}
    </AsideFilter>
  );
};
