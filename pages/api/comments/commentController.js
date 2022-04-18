import { commentSchema } from "../../../validations/comment";
import crud from "../../../db/crud";
import Comment from "../../../db/models/Comment";
import Controller from "../baseController";
import fakeComments from "../../../faker/comments.json";
import auth, {
  ADMIN_ROLE,
  SUPER_ADMIN_ROLE,
} from "../../../middlewares/routeAccess";
import _ from "lodash";
export default new (class CommentController extends Controller {
  async insertAComment(req, res, next) {
    res
      .status(200)
      .json(
        await crud.create(
          Comment,
          _.omit(req.body, "readByAdmin", "allowPublish")
        )
      );
  }
  async validateComment(req, res, next) {
    await commentSchema.validate(req.body);
    next();
  }
  async sendAllCommnets(req, res, next) {
    let query =
      req?.user?.role === ADMIN_ROLE || req?.user?.role === SUPER_ADMIN_ROLE
        ? req.query
        : { ...req.query, allowPublish: true };
    let result = await crud.find(Comment, query, req.dbFields, req.dbFilters);
    res.status(200).json(auth().resImmuner(result, null, "password"));
  }
  async seedFakeComments(req, res, next) {
    const result = fakeComments.map(
      async (comment) => await crud.create(Comment, comment)
    );
    Promise.allSettled(result).then((data) => res.status(200).json(data));
  }
  async unSeedFakeComments(req, res, next) {
    const result = fakeComments.map(
      async (comment) => await crud.deleteOne(Comment, comment._id)
    );
    Promise.allSettled(result).then((data) => res.status(200).json(data));
  }
  async updateComment(req, res, next) {
    const updatedComment = await crud.updateOne(
      Comment,
      { _id: req.query.commentId },
      req.body
    );
    res
      .status(updatedComment ? 200 : 404)
      .json(updatedComment ? updatedComment : { msg: "Record Not Found" });
  }
  async deleteAcomment(req, res, next) {
    const deletedComment = await crud.deleteOne(Comment, req.query.commentId);
    res.status(200).json(deletedComment);
  }
  async sendCountOfComments(req, res, next) {
    const comments = await crud.find(
      Comment,
      req.query,
      req.dbFields,
      req.dbFilters
    );
    let countOfUnreadComments = 0;
    let countOfReadComments = 0;
    let countOfPublishedComments = 0;
    comments.forEach((comment) => {
      comment.allowPublish && countOfPublishedComments++;
      !comment.readByAdmin && countOfUnreadComments++;
      comment.readByAdmin && countOfReadComments++;
    });
    res.status(200).json({
      count: comments.length,
      countOfUnreadComments,
      countOfPublishedComments,
      countOfReadComments,
    });
  }
  async sendAComment(req, res, next) {
    const comment = await crud.findOne(
      Comment,
      { _id: req.query.commentId },
      req.dbFields,
      req.dbFilters
    );
    res.status(200).json(auth().resImmuner(comment, "password"));
  }
})();
