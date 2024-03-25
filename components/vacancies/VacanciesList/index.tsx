"use client";

import { Pagination } from "@/components/ui/Pagination";
import { IVacancy } from "@/types/vacancies.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import VacancyCard from "@/components/vacancies/VacancyCard";
import useSWR from "swr";

const ITEMS_PER_PAGE = 6;

export const VacanciesList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filtersParams = new URLSearchParams(searchParams);
  const pageParam = filtersParams.get("page");
  filtersParams.delete("page");

  const { isLoading, data } = useSWR<{ data: IVacancy[]; count: number }>(
    `/api/get_vacancies?${filtersParams}&page=${pageParam || 1}&limit=${ITEMS_PER_PAGE}`,
    (key: string) => fetch(key).then((res) => res.json() as any),
  );

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const setActivePage = useCallback(
    (pageId: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageId.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam && +pageParam <= totalPages) {
      setPage(+pageParam);
    } else {
      setPage(1);
    }
  }, [searchParams, totalPages]);

  useEffect(() => {
    if (data) {
      setTotalItems(data.count);
      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
    }
  }, [data]);

  return (
    <div className="space-y-8 lg:mb-7 mb-3">
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <GridLoader color="#366EF6" className="mx-auto" />
        </div>
      ) : (
        data?.data.map((vacancy) => {
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
