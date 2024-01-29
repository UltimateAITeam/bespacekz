'use client'

import React from 'react'
import {AsideFilter} from '@/components/ui/AsideFilter';
import { AsideFilterItem } from '@/components/ui/AsideFilter/AsideFilterItem';
import { cities } from '@/data/cities';
import { job_types } from '@/data/job_types';
import { VacanciesPriceFilter } from './VacanciesPriceFilter';
import { JobCategory } from '@prisma/client'

export const VacanciesFilterContainer = ({categories}: {categories: JobCategory[]}) => {
  return (
    <AsideFilter>
       <AsideFilterItem titleFilter='Категории' optionsFilters={categories.map(c => ({value: c.category_name, label: c.category_name}))} defaultOptionsValue={['Astana']}   />
       <AsideFilterItem titleFilter='Город' optionsFilters={cities.Kazakhstan}  defaultOptionsValue={[]}   isWithSearch />
       <AsideFilterItem titleFilter='Избранные' optionsFilters={[{label:'Отобразить избранное', value: 'favorite'}]}  defaultOptionsValue={[]}   />
       <AsideFilterItem titleFilter='Вид занятости' optionsFilters={job_types}  defaultOptionsValue={[]}   />
       <VacanciesPriceFilter />
    </AsideFilter>
  )
}
