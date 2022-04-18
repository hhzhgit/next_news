import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import userController from "./userController";
export default baseController
  .router()
  .use(dbConnectMid)
  .use(logger)
  .post(userController.userLogginHandler);
