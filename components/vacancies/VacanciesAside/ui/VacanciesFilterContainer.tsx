"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AsideFilter } from "@/components/ui/AsideFilter";
import { AsideFilterItem } from "@/components/ui/AsideFilter/AsideFilterItem";
import { cities } from "@/data/cities";
import { job_types } from "@/data/job_types";
import { VacanciesPriceFilter } from "./VacanciesPriceFilter";
import { JobCategory } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VacanciesQueryEnum } from "@/types/vacancies.types";
import { useSession } from "next-auth/react";

export const VacanciesFilterContainer = ({
  categories,
}: {
  categories: JobCategory[];
}) => {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { defaultCategories, defaultCities, defaultJobTypes } = useMemo(() => {
    return {
      defaultCategories: searchParams.getAll(VacanciesQueryEnum.category),
      defaultCities: searchParams.getAll(VacanciesQueryEnum.cities),
      defaultJobTypes: searchParams.getAll(VacanciesQueryEnum.job_types),
    };
  }, [searchParams]);

  const handleChangeFilter = (
    optionName: VacanciesQueryEnum,
    value: (string | number)[],
  ) => {
    const params = new URLSearchParams(searchParams);

    params.delete(optionName); // Удаляем старые
    params.delete("page"); // сбрасываем пагинацию
    value.forEach((v) => params.append(optionName, v.toString())); // задаем новые фильтры

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
          handleChangeFilter(VacanciesQueryEnum.category, v)
        }
      />
      <AsideFilterItem
        titleFilter="Город"
        optionsFilters={cities.Kazakhstan}
        defaultOptionsValue={defaultCities}
        isWithSearch
        onChangeValue={(v) => handleChangeFilter(VacanciesQueryEnum.cities, v)}
      />
      {status === "authenticated" && (
        <AsideFilterItem
          titleFilter="Избранные"
          optionsFilters={[{ label: "Отобразить избранное", value: "true" }]}
          onChangeValue={(v) =>
            handleChangeFilter(VacanciesQueryEnum.favorite, v)
          }
          defaultOptionsValue={[]}
        />
      )}
      <AsideFilterItem
        titleFilter="Вид занятости"
        optionsFilters={job_types}
        defaultOptionsValue={defaultJobTypes}
        onChangeValue={(v) =>
          handleChangeFilter(VacanciesQueryEnum.job_types, v)
        }
      />
      <VacanciesPriceFilter />
    </AsideFilter>
  );
};
