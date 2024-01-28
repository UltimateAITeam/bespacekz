import {AsideFilter} from '@/components/ui/AsideFilter';
import { AsideFilterItem } from '@/components/ui/AsideFilter/AsideFilterItem';
import { cities } from '@/data/cities';
import { job_types } from '@/data/job_types';
import { VacanciesPriceFilter } from './ui/VacanciesPriceFilter';

async function getExistCategories() {
  const result = await fetch(`${process.env.API_URL}/api/job_categories/exist`, {
    method: 'GET',
  });
  return result.json();
}

export const VacanciesAside = async () => {
  const categories = await getExistCategories();
  return (
    <div>
      <AsideFilter>
       <AsideFilterItem titleFilter='Категории' optionsFilters={categories} defaultOptionsValue={[]}   />
       <AsideFilterItem titleFilter='Город' optionsFilters={cities.Kazakhstan.map(({value}) => value)}  defaultOptionsValue={[]}   isWithSearch />
       <AsideFilterItem titleFilter='Избранные' optionsFilters={['Отобразить избранное']}  defaultOptionsValue={[]}   />
       <AsideFilterItem titleFilter='Вид занятости' optionsFilters={job_types.map(({value}) => value)}  defaultOptionsValue={[]}   />
       <VacanciesPriceFilter />
      </AsideFilter>
    </div>
  );
};
