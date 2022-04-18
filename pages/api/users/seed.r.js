import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import auth, { SUPER_ADMIN_ROLE } from "../../../middlewares/routeAccess";
import { baseController } from "../baseController";
import userController from "./userController";
export default baseController
  .router()
  .use(dbConnectMid, logger)
  .post(...auth(SUPER_ADMIN_ROLE), userController.seedFakeUsers)
  .delete(...auth(SUPER_ADMIN_ROLE), userController.unSeedFakeUsers);
