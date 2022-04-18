import React from "react";
import Link from "next/link";
import timeDiff from "../miscellaneous/timeDef";
import styles from "../styles/newsCard.module.css";
import { isJsonLike } from "../miscellaneous/functions";
import StrToElement from "./strToElement";
import useNewsCardHook from "./newsCardHook";
export default function NewsCard({ news: allNews }) {
  const { handler } = useNewsCardHook();
  return (
    <div className={styles.newsCard}>
      {allNews &&
        allNews.map((news) => (
          <article key={news._id} className="text-right  container-fluid">
            <div className={`row border rounded-lg my-1 ${styles.row}`}>
              {handler.isAdmin() && (
                <small className="d-flex w-100 justify-content-center">
                  <button
                    onClick={handler.onNewsDelete(news)}
                    className={`btn btn-sm btn-danger ${styles.btnRoundedBottom}`}
                  >
                    delete
                  </button>
                </small>
              )}
              <Link href={`/news/${news._id}`} passHref>
                <a className="order-1 px-1 py-1">
                  <h5 className="d-inline">{news.title}</h5>
                </a>
              </Link>
              <Link href={`/category/${news.category}`}>
                <a className="order-2 px-1 py-1">
                  <h5 className="d-inline">|{news.category}</h5>
                </a>
              </Link>
              <small className="order-3 px-2 py-1">
                {timeDiff(news.createdAt, Date.now())} ago
              </small>
              {isJsonLike(news.description) ? (
                <StrToElement
                  str={news.description}
                  className="order-4"
                  uniqueKey={news._id}
                />
              ) : (
                <p className="order-4">{news.description}</p>
              )}
            </div>
          </article>
        ))}
    </div>
  );
}
