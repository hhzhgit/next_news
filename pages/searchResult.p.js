import React from "react";
import NewsCard from "../components/newsCard";
import dbConnectMid from "../middlewares/dbconnect";
import logger from "../middlewares/logger";
import newsController from "./api/news/newsController";
import pageController from "./PageContoller";
export default function SearchResult({ searchResult }) {
  return (
    <div>
      <NewsCard news={searchResult} />
    </div>
  );
}
export const getServerSideProps = pageController.propsGenerator(null, {
  url: (ctx) => `api/search/?description=${ctx.query.description}`,
  propsKey: "searchResult",
  method: "GET",
  mids: [dbConnectMid, logger, newsController.searchNews()],
});
