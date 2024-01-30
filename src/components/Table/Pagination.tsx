"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  numOfRows: number;
};

export const Pagination = ({ numOfRows }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";

  const rowsPerPage = Number(searchParams.get("numRows") || "5");

  const totalPages = Math.ceil(numOfRows / rowsPerPage);

  const pagination = () => {
    let paginationLinks;

    if (totalPages > 5) {
      let pagArr: number[];
      const pageNum = Number(page);

      if (pageNum === totalPages) pagArr = [pageNum - 2, pageNum - 1, pageNum];
      else if (totalPages - pageNum === 1)
        pagArr = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1];
      else if (pageNum === 1) pagArr = [pageNum, pageNum + 1, pageNum + 2];
      else if (totalPages - pageNum === totalPages - 2)
        pagArr = [pageNum - 1, pageNum, pageNum + 1, pageNum + 2];
      else
        pagArr = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2];

      paginationLinks = pagArr.map((p, index) => (
        <Link
          key={index}
          href={pathname + `?page=${p}`}
          className={
            "py-2 px-2 md:px-4 rounded-md shadow-md " +
            (page === String(p) || (!page && p === 1)
              ? "font-bold bg-sky-800 text-white"
              : "bg-slate-100")
          }
        >
          {p}
        </Link>
      ));
    }

    if (totalPages <= 5) {
      paginationLinks = Array.from({ length: totalPages }).map((_, index) => {
        return (
          <Link
            key={index}
            href={pathname + `?page=${index + 1}`}
            className={
              "py-2 px-2 md:px-4 rounded-md shadow-md " +
              (page === String(index + 1) || (!page && index + 1 === 1)
                ? "font-bold bg-sky-800 text-white"
                : "bg-slate-100")
            }
          >
            {index + 1}
          </Link>
        );
      });
    }

    return paginationLinks;
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <Link
        href={pathname + `?page=${Number(page) - 1}`}
        className={
          "py-2 px-2 md:px-3 bg-slate-100 rounded-md shadow-md " +
          (Number(page) > 1 ? "" : "invisible")
        }
      >
        &lt;
      </Link>
      {pagination()}
      <Link
        href={pathname + `?page=${Number(page) + 1}`}
        className={
          "py-2 px-2 md:px-3 bg-slate-100 rounded-md shadow-md " +
          (Number(page) < totalPages ? "" : "invisible")
        }
      >
        &gt;
      </Link>
    </div>
  );
};