import Image from "next/image";
import { useMemo } from "react";
import { cn } from "@/libs/utils";
import { PaginationButton } from "./ui/PaginationButton";

/** Создается массив с элементами от start до end*/
const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = "DOTS";

interface PaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  siblingCount?: number;
  setPage: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalCount,
  siblingCount = 1,
  setPage,
  itemsPerPage,
}: PaginationProps) => {
  const paginationRange = useMemo<(string | number)[]>(() => {
    /** общее количество страниц */
    const totalPageCount = Math.ceil(totalCount / itemsPerPage);

    /** Количество видимых навигационных кнопок  */
    const totalPageNumbersButtons = siblingCount + 5;

    // VARIANT 1
    if (totalPageCount <= totalPageNumbersButtons) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // VARIANT 2
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount]; // 1 2 3 4 5 ... 100
    }

    // VARIANT 3
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange]; // 1 ... 96 97 98 99 100
    }

    // VARIANT 4
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]; // 1 ... 9 10 11 ... 100
    }

    return [];
  }, [totalCount, itemsPerPage, siblingCount, currentPage]);

  /** Случаи когда пагинация не нужна */
  if (!totalCount || totalPages === 1 || currentPage === 0) return <></>;

  const onNext = () => {
    setPage(currentPage + 1);
  };

  const onPrev = () => {
    setPage(currentPage - 1);
  };

  return (
    <div className="flex flex-row gap-[8px] py-[16px] w-full items-center justify-center">
      <PaginationButton
        onClick={onPrev}
        disabled={currentPage === 1}
        className={cn(currentPage === 1 && "cursor-auto")}
      >
        <Image
          src="/images/ChevronLeft.svg"
          alt="previous"
          width={16}
          height={16}
        />
      </PaginationButton>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS || typeof pageNumber === "string") {
          return (
            <PaginationButton
              key={i + pageNumber}
              className="cursor-default pointer-events-none"
            >
              &#8230;
            </PaginationButton>
          );
        }

        // Render our Page Pills
        return (
          <PaginationButton
            onClick={() => setPage(pageNumber)}
            key={i + pageNumber}
            className={cn(
              currentPage === pageNumber ? "bg-[#3575E2] !text-white" : "",
            )}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}
      <PaginationButton
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={cn(currentPage === totalPages && "cursor-auto")}
      >
        <Image
          src="/images/ChevronRight.svg"
          alt="next"
          width={16}
          height={16}
        />
      </PaginationButton>
    </div>
  );
};
