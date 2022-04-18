import userController from "./userController";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import dbConnectMid from "../../../middlewares/dbconnect";
import auth, { SUPER_ADMIN_ROLE } from "../../../middlewares/routeAccess";
export default baseController
  .router()
  .use(dbConnectMid)
  .use(logger)
  .get(...auth(SUPER_ADMIN_ROLE), userController.sendAllUsers);
