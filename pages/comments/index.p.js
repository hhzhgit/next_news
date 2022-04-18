import React from "react";
import dbConnectMid from "../../middlewares/dbconnect";
import logger from "../../middlewares/logger";
import auth from "../../middlewares/routeAccess";
import commentController from "../api/comments/commentController";
import PageContoller from "../PageContoller";
import styles from "../../styles/commnets.module.css";
import Pagination from "../../components/pagination";
import { countOfCommnetsPP } from "../../miscellaneous/constants";
import useComment from "./hook";
import AdminNav from "../../components/admin/adminNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Table, Thead, Tbody, Td, Th, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
export default function Comments({ comments, countOfComments, error }) {
  const { commentRequest } = useComment();
  return (
    <div className={styles.commnetsDiv}>
      {error ? (
        <div>{error}</div>
      ) : (
        <Table
          key={"test"}
          className={`table table-striped  ${styles.commentsTable}`}
        >
          <Thead>
            <Tr className="table-secondary">
              <Th>comment</Th>
              <Th>readStatus</Th>
              <Th>publish status</Th>
              <Th>publish</Th>
              <Th>date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comments.map((comment, i) => (
              <Tr key={comment._id}>
                <Td
                  onClick={commentRequest.update(comment, {
                    readByAdmin: true,
                    reload: true,
                  })}
                >
                  <div className={`btn ${styles.description}`}>
                    {comment?.description}
                  </div>
                </Td>
                <Td className={styles.readByAdminStatus}>
                  {comment?.readByAdmin ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}
                </Td>
                <Td className={styles.publishStatus}>
                  {comment?.allowPublish ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}
                </Td>
                <Td>
                  <div
                    className={`d-flex flex-column flex-md-row ${styles.buttonsSection}`}
                  >
                    <button
                      className="btn btn-success"
                      onClick={commentRequest.update(comment, {
                        allowPublish: true,
                        reload: true,
                      })}
                    >
                      publish
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={commentRequest.update(comment, {
                        allowPublish: false,
                        reload: true,
                      })}
                    >
                      unPublish
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => commentRequest.getAComment(comment._id)}
                    >
                      select
                    </button>
                  </div>
                </Td>
                <Td>{comment?.createdAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <div className="m-5">
        <textarea
          name="description"
          id=""
          className="form-control-plaintext border-info p-3"
          value={commentRequest.comment.description}
          onChange={(e) => commentRequest.onDescriptionChange(e)}
        />
        <div className="text-center my-2">
          <button
            className="btn btn-dark mx-1"
            onClick={commentRequest.onEditsubmit.bind(commentRequest)}
          >
            edit
          </button>
          <button onClick={commentRequest.onUnselect} className="btn btn-info">unSelect</button>
        </div>
      </div>
      <Pagination
        totalItemsCount={countOfComments.count}
        navigateTo={(pageNum) =>
          `comments?limit=${countOfCommnetsPP}&skip=${
            (pageNum - 1) * countOfCommnetsPP
          }`
        }
      />
    </div>
  );
}
Comments.customLayout = (page) => {
  return (
    <>
      <AdminNav />
      {page}
    </>
  );
};
export const getServerSideProps = PageContoller.propsGenerator(
  null,
  {
    url: (ctx) => {
      const { limit = countOfCommnetsPP, skip = 0 } = ctx.query;
      return `api/comments?limit=${limit}&skip=${skip}&sort={"createdAt":"-1"}`;
    },
    method: "GET",
    propsKey: "comments",
    mids: [
      dbConnectMid,
      logger,
      auth().identify,
      commentController.sendAllCommnets,
    ],
  },
  {
    url: "api/commnets/count",
    method: "GET",
    propsKey: "countOfComments",
    mids: [dbConnectMid, logger, commentController.sendCountOfComments],
  },
  { userAccess: ["admin", "super admin"], redirect: "/" }
);
