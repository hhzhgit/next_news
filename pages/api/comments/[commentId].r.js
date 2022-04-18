import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import commentController from "./commentController";
import commentAuth from "./auth";
import auth from "../../../middlewares/routeAccess";
export default baseController
  .router()
  .use(dbConnectMid, logger)
  .get(...auth("admin"), commentController.sendAComment)
  .put(
    ...commentAuth.ifMadebySameUser,
    commentController.validateComment,
    commentController.updateComment
  )
  .delete(...commentAuth.ifMadebySameUser, commentController.deleteAcomment);
