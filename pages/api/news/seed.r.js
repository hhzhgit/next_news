import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import newsController from "./newsController";
import auth, { SUPER_ADMIN_ROLE } from "../../../middlewares/routeAccess";
export default baseController
  .router()
  .use(dbConnectMid, logger)
  .post(...auth(SUPER_ADMIN_ROLE), newsController.seedFakeNews)
  .delete(...auth(SUPER_ADMIN_ROLE), newsController.deleteFakeNews);
