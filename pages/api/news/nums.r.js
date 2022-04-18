import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import newsController from "./newsController";

export default baseController
  .router()
  .use(dbConnectMid, logger)
  .get(newsController.sendNumOfNews);
