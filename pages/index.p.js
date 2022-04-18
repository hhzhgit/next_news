import newsController from "./api/news/newsController";
import logger from "../middlewares/logger";
import dbConnectMid from "../middlewares/dbconnect";
import NewsCard from "../components/newsCard";
import PageContoller from "./PageContoller";
import { countOfNewsPerPage } from "../miscellaneous/constants";
import Pagination from "../components/pagination";
import useHomePage from "./homePageHook";
import Link from "next/link";
export default function Home({ news, countOfNews }) {
  useHomePage();
  return (
    <>
      <div className="row">
        <section className="col-12">
          <Link href="/">
            <a>
              <h2 className="text-right">اخرین اخبار</h2>
            </a>
          </Link>
          <NewsCard news={news} />
          <Pagination
            totalItemsCount={countOfNews.count}
            navigateTo={(pageNum) =>
              `/?limit=${countOfNewsPerPage}&skip=${
                (pageNum - 1) * countOfNewsPerPage
              }`
            }
          />
        </section>
      </div>
    </>
  );
}
export const getServerSideProps = PageContoller.propsGenerator(
  null,
  {
    method: "GET",
    url: "",
    propsKey: "countOfNews",
    mids: [dbConnectMid, logger, newsController.sendNumOfNews],
  },
  {
    method: "GET",
    url: (ctx) => {
      const { limit = countOfNewsPerPage, skip = 0 } = ctx.query
        ? ctx.query
        : {};
      return `api/news/?sort={"createdAt":"-1"}&limit=${limit}&skip=${skip}`;
    },
    propsKey: "news",
    mids: [dbConnectMid, logger, newsController.sendAllNews],
  }
);
