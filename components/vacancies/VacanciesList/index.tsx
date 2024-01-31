'use client';

import { Pagination } from '@/components/ui/Pagination';
import { IVacancy } from '@/types/vacancies.types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import VacancyCard from '../VacancyCard';

const ITEMS_PER_PAGE = 6;

export const VacanciesList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const [data, setData] = useState<IVacancy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const setActivePage = useCallback((pageId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageId.toString());
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams]);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam && +pageParam <= totalPages) {
      setPage(+pageParam)
    } else {
      setPage(1)
    }
  }, [searchParams, totalPages]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const filtersParams = new URLSearchParams(searchParams);
        const pageParam = filtersParams.get('page') 
        filtersParams.delete('page')

        const res = await fetch(`/api/vacancies?${filtersParams}&page=${pageParam || 1}&limit=${ITEMS_PER_PAGE}`, {
          method: 'GET',
        });

        if (res.status == 200) {
          const data = await res.json();

          setData(data.data);
          setTotalItems(data.count);
          setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
        }
      } catch (error) {
        console.log('@error fetch vacancies', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchParams]);

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
      {!isLoading && (
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalPages={totalPages}
          currentPage={page}
          setPage={setActivePage}
          totalCount={totalItems}
        />
      )}
    </div>
  );
};
