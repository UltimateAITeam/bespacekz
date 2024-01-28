"use client"

import { Vacancy } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import VacancyCard from '../VacancyCard';

export const VacanciesList =  () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

  // const [page, setPage] = useState<number>(1);
  // const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      /* if (totalItems == 0) {
        const resTotalVacancy = await fetch(`/api/get_vacancies_by_params?page=0&limit=0`);
        if (resTotalVacancy.status !== 200) console.log('Error get total vacancies');
        const resp_json_total = await resTotalVacancy.json();
        setTotalItems(resp_json_total.count);
      } */

      console.log('@fetch vacancies', `/api/vacancies?${searchParams.toString()}`);
    //   const res = await fetch(
    //     `/api/vacancies?${citiesSearchParams}&${categoriesSearchParams}&page=${page}&limit=${ITEMS_PER_PAGE}`
    //   );

    //   if (res.status !== 200) return;

    //   const resp_json = await res.json();
    //   setData(resp_json.data);
    //   setTotalItems(resp_json.count)
    //   console.log('resp_json.data', resp_json.data);
    setLoading(false);
    })();
  }, [searchParams]);




  return (
    <div className="space-y-8">
      {data.map((vacancy) => {
        return <VacancyCard key={vacancy.id} {...vacancy} />;
      })}
    </div>
  );
};
