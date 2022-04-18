import Head from "next/head";
import { withRouter } from "next/router";
import React, { Component } from "react";
import NewsCard from "../../components/newsCard";
import Spinner from "../../components/spinner";
import newsController from "../api/news/newsController";
import logger from "../../middlewares/logger";
import dbConnectMid from "../../middlewares/dbconnect";
import pageController from "../PageContoller";
import { countOfNewsPerPage } from "../../miscellaneous/constants";
import Pagination from "../../components/pagination";
import generalStates from "../../miscellaneous/context";
class NewsByCategory extends Component {
  render() {
    const category = this.props.router.query.category;
    return (
      <>
        <Head>
          <title>{category} NEWS</title>
          <meta name="description" content={`${category} NEWS`} />
        </Head>
        {this.props.router.isFallback ? (
          <Spinner />
        ) : this.props.error ? (
          <div>{this.props.error}</div>
        ) : (
          <>
            <NewsCard news={this.props.news} />
            <Pagination
              navigateTo={(pageNumber) =>
                `/category/${category}?limit=${countOfNewsPerPage}&skip=${
                  (pageNumber - 1) * countOfNewsPerPage
                }`
              }
              totalItemsCount={this.props.countOfNews.count}
            />
          </>
        )}
      </>
    );
  }
}
NewsByCategory.contextType = generalStates;
export default withRouter(NewsByCategory);
export const getServerSideProps = pageController.propsGenerator(
  null,
  {
    method: "GET",
    propsKey: "countOfNews",
    url: (ctx) => `/?category=${ctx.params.category}`,
    mids: [dbConnectMid, logger, newsController.sendNumOfNews],
  },
  {
    method: "GET",
    propsKey: "news",
    url: (ctx) => {
      const { limit = countOfNewsPerPage, skip = 0 } = ctx.query
        ? ctx.query
        : {};
      return `/?category=${ctx.params.category}&limit=${limit}&skip=${skip}`;
    },
    mids: [dbConnectMid, logger, newsController.sendAllNews],
  }
);
