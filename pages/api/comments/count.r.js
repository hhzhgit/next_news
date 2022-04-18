import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import commentController from "./commentController";
export default baseController
  .router()
  .use(dbConnectMid, logger)
  .get(commentController.sendCountOfComments);
