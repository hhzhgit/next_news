import { baseController } from "../baseController";
import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import commentController from "./commentController";
import auth from "../../../middlewares/routeAccess";
export default baseController
  .router()
  .use(dbConnectMid, logger)
  .post(commentController.validateComment, commentController.insertAComment)
  .get(auth().identify, commentController.sendAllCommnets);
