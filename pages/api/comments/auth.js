import Comment from "../../../db/models/Comment";
import { Auth } from "../../../middlewares/routeAccess";

export default new (class CommentAuth extends Auth {
  ifMadebySameUser = [
    this.identify,
    this.authCompareID(Comment, "query.commentId", (doc, user) => {
      switch (user.role) {
        case this.ADMIN_ROLE:
          return true;
        case this.USER_ROLE:
          return doc.user == user._id;
        default:
          return false;
      }
    }),
  ];
})();
