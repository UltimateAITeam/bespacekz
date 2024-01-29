'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {AsideFilter} from '@/components/ui/AsideFilter';
import { AsideFilterItem } from '@/components/ui/AsideFilter/AsideFilterItem';
import { cities } from '@/data/cities';
import { job_types } from '@/data/job_types';
import { VacanciesPriceFilter } from './VacanciesPriceFilter';
import { JobCategory } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { VacanciesQuery } from '@/types/vacancies.types';

export const VacanciesFilterContainer = ({categories}: {categories: JobCategory[]}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  

  const {defaultCategories, defaultCities} = useMemo(() => {
    return  {
      defaultCategories: searchParams.getAll(VacanciesQuery.category),
      defaultCities: searchParams.getAll(VacanciesQuery.cities)
    }
  }, [searchParams]) 


  const [valueCategories, setValueCategories] = useState<(string | number)[]>([])

  const handleChangeFilter = (optionName: VacanciesQuery, value: (string | number)[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete(optionName)
    value.forEach(v => params.append(optionName, v.toString()))

    console.log('@params', params);

    replace(`${pathname}?${params.toString()}`)
  }


  useEffect(() => {
    console.log('@valueCategories', valueCategories);
  }, [valueCategories])

  

  return (
    <AsideFilter allOpenIndex>
       <AsideFilterItem titleFilter='Категории' optionsFilters={categories.map(c => ({value: c.category_name, label: c.category_name}))} defaultOptionsValue={defaultCategories} onChangeValue={v => handleChangeFilter(VacanciesQuery.category ,v)}  />
       <AsideFilterItem titleFilter='Город' optionsFilters={cities.Kazakhstan}  defaultOptionsValue={defaultCities}  isWithSearch onChangeValue={v => handleChangeFilter(VacanciesQuery.cities ,v)} />
       {/* <AsideFilterItem titleFilter='Избранные' optionsFilters={[{label:'Отобразить избранное', value: 'favorite'}]}  defaultOptionsValue={[]}   />
       <AsideFilterItem titleFilter='Вид занятости' optionsFilters={job_types}  defaultOptionsValue={[]}   /> */}
       <VacanciesPriceFilter />
    </AsideFilter>
  )
}
