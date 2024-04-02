"use client";

import { Pagination } from "@/components/ui/Pagination";
import { CandidatesService } from "@/services/candidates.service";
import { ICandidate } from "@/types/candidates.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { CandidateCard } from "../CandidateCard";

const ITEMS_PER_PAGE = 7;

export const CandidatesList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [data, setData] = useState<ICandidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    (async () => {
      try {
        setIsLoading(true);

        const filtersParams = new URLSearchParams(searchParams);
        const pageParam = filtersParams.get("page");
        filtersParams.delete("page");

        const res = await CandidatesService.getCandidates({
          filtersParams,
          pageParam: pageParam || 1,
          ITEMS_PER_PAGE,
        });

        if (res.status == 200) {
          const freelancers = await res.json();

          setData(freelancers.data);

          console.log("@freelancers.data", freelancers.data);
          setTotalItems(freelancers.count);
          setTotalPages(Math.ceil(freelancers.count / ITEMS_PER_PAGE));
        }
      } catch (error) {
        console.log("@error fetch vacancies", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchParams]);

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <GridLoader color="#366EF6" className="mx-auto" />
        </div>
      ) : (
        data?.map((candidate) => {
          return <CandidateCard key={candidate.id} {...candidate} />;
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
// hello
