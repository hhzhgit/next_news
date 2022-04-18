import { baseController } from "../baseController";
import newsController from "./newsController";
import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
// import nextConnect from "next-connect";
export default baseController
  .router()
  .use(dbConnectMid, logger)
  .get(newsController.sendNewsCats);
