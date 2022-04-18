import User from "../../../db/models/User";
import { Auth } from "../../../middlewares/routeAccess";
export default new (class UserAuth extends Auth {
  ifReqHasLowerRole = [
    this.identify,
    this.authCompareID(User, "query.userId", (doc, user) => {
      switch (user.role) {
        case this.ADMIN_ROLE:
          return doc.role == this.USER_ROLE || doc._id == user._id;
        case this.USER_ROLE:
          return doc._id == user._id;
        default:
          return false;
      }
    }),
  ];
  ifSameUser = [
    this.identify,
    this.authCompareID(User, "query.userId", (doc, user) => doc._id == user._id),
  ];
})();
