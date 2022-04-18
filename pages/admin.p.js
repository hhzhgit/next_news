import React from "react";
import AddNews from "../components/admin/addNews";
import AdminNav from "../components/admin/adminNav";
import pageController from "./PageContoller";
import dbConnectMid from "../middlewares/dbconnect";
import logger from "../middlewares/logger";
import newsController from "./api/news/newsController";
import Head from "next/head";
import EditNews from "../components/admin/editNews/editNews";
export default function Admin({ categories }) {
  return (
    <>
      <Head>
        <title>admin dashboard</title>
        <meta name="descrtiption" content="admin dashboard" />
      </Head>
      <div className="container-fluid">
          <AddNews categories={categories} />
          <EditNews />
      </div>
    </>
  );
}
Admin.customLayout = (page) => {
  return (
    <>
      <AdminNav />
      {page}
    </>
  );
};
export const getStaticProps = pageController.propsGenerator(
  60,
  {
    url: "api/news/categories",
    method: "GET",
    propsKey: "categories",
    mids: [dbConnectMid, logger, newsController.sendNewsCats],
  },
  { userAccess: ["admin", "super admin"], redirect: "/category/sports" }
);
