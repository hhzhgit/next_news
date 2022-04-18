import React, { useState } from "react";
import Spinner from "../../components/spinner";
import Head from "next/head";
import Image from "next/image";
import PageContoller from "../PageContoller";
import dbConnectMid from "../../middlewares/dbconnect";
import logger from "../../middlewares/logger";
import newsController from "../api/news/newsController";
import commentController from "../api/comments/commentController";
import timeDiff from "../../miscellaneous/timeDef";
import usePostComment from "./hook";
import { isJsonLike } from "../../miscellaneous/functions";
import StrToElement from "../../components/strToElement";
export default function NewsByID({ news, error, comments }) {
  const { comment, setComment, handleCommentSubmit, loading, router } =
    usePostComment();
  return (
    <>
      {router.isFallback ? (
        <Spinner />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Head>
            <title>{news.title}</title>
            <meta name="description" content={news.title} />
          </Head>
          <h3 className="text-center">
            {news.title}|{news.category}
          </h3>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 d-flex flex-column">
              <small>
                written by:{news.author.map((writer) => writer.name)}
              </small>
              <small>
                date:
                <time>{timeDiff(news.createdAt)} ago</time>
              </small>
              {news.imageUrl && (
                <Image
                  className="rounded-lg"
                  alt={news.title}
                  src={news.imageUrl}
                  width={320}
                  height={480}
                  placeholder="blur"
                  blurDataURL={news.imageUrl}
                />
              )}
            </div>
            <div className="col-12 px-4">
              {isJsonLike(news.description) ? (
                <StrToElement
                  uniqueKey={news._id}
                  str={news.description}
                  className="p-2"
                />
              ) : (
                <p className="text-right">{news.description}</p>
              )}
            </div>
          </div>
          <section>
            <form
              onSubmit={handleCommentSubmit}
              className="row flex-column align-items-center"
            >
              <label
                htmlFor="commentField"
                className="text-capitalize font-weight-bold text-center"
              >
                add comment
              </label>
              <textarea
                className="col-12 col-sm-6"
                id="commentField"
                cols="30"
                rows="10"
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
                placeholder="put your comment here"
              />
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  send
                </button>
                <button
                  type="reset"
                  className="btn btn-danger"
                  onClick={() => setComment("")}
                >
                  clear
                </button>
              </div>
            </form>
            <div className="row flex-column align-content-center">
              <ul style={{ listStyleType: "none" }} className="col-12 col-sm-6">
                {comments.map((comment) => (
                  <li key={comment._id} className="card">
                    <div className="card-header bg-info text-white d-flex justify-content-between">
                      <small className="order-2">
                        Name:{comment?.user?.name || "unknown"}{" "}
                      </small>
                      <small className="order-1">
                        <time>{timeDiff(comment.createdAt)} ago</time>
                      </small>
                    </div>
                    <p className="card-body text-right">
                      {comment.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export const getStaticPaths = PageContoller.generateStaticPaths(true, []);
export const getStaticProps = PageContoller.propsGenerator(
  60,
  {
    method: "GET",
    url: (context) =>
      `/?newsId=${context.params.newsId}&populate={"path":"author","select":"name"}`,
    propsKey: "news",
    mids: [dbConnectMid, logger, newsController.sendANews],
  },
  {
    method: "GET",
    url: (ctx) =>
      `/?news=${ctx.params.newsId}&populate={"path":"user","select":"name email"}&sort={"createdAt":"-1"}`,
    propsKey: "comments",
    mids: [dbConnectMid, logger, commentController.sendAllCommnets],
  }
);
