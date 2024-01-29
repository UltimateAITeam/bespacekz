'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import VacancyCard from '../VacancyCard';
import GridLoader from 'react-spinners/GridLoader';
import {IVacancy} from '@/types/vacancies.types';

const ITEMS_PER_PAGE = 10;

export const VacanciesList = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<IVacancy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      /* if (totalItems == 0) {
        const resTotalVacancy = await fetch(`/api/get_vacancies_by_params?page=0&limit=0`);
        if (resTotalVacancy.status !== 200) console.log('Error get total vacancies');
        const resp_json_total = await resTotalVacancy.json();
        setTotalItems(resp_json_total.count);
      } */

      const res = await fetch(`/api/vacancies?page=${page}&limit=${ITEMS_PER_PAGE}`);

      if (res.status !== 200) return;

      const resp_json = await res.json();
      setData(resp_json.data);
      setTotalItems(resp_json.count);
      console.log('resp_json.data', resp_json.data);
      setIsLoading(false);
    })();
  }, [page]);

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <GridLoader color="#36d7b7" className="mx-auto" />
        </div>
      ) : (
        data.map((vacancy) => {
          return <VacancyCard key={vacancy.id} {...vacancy} />;
        })
      )}
    </div>
  );
};
