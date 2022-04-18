import React, { useEffect, useState } from "react";
import RcPagination from "react-js-pagination";
import { useRouter } from "next/router";
import { countOfNewsPerPage } from "../miscellaneous/constants";
import styles from "../styles/pagination.module.css";
export default function Pagination({
  navigateTo,
  totalItemsCount,
  pageRangeDisplayed,
}) {
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    if (router.query.skip) {
      const pageNum = router.query.skip / countOfNewsPerPage + 1;
      setActivePage(pageNum);
    }
  }, []);

  const router = useRouter();
  return (
    <div className={styles.pagination}>
      <RcPagination
        activePage={activePage}
        onChange={(pageNum) => {
          setActivePage(pageNum);
          router.push(navigateTo(pageNum));
        }}
        totalItemsCount={totalItemsCount}
        itemsCountPerPage={countOfNewsPerPage}
        itemClass="page-item"
        innerClass={`pagination px-0 py-2 justify-content-center ${
          typeof window !== "undefined" &&
          window.innerWidth < 400 &&
          "pagination-sm"
        } `}
        linkClass="page-link shadow-none"
        pageRangeDisplayed={
          pageRangeDisplayed ||
          (typeof window !== "undefined"
            ? window.innerWidth < 400
              ? 3
              : 5
            : 5)
        }
      />
    </div>
  );
}
