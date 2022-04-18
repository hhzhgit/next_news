import { baseController } from "../baseController";
import auth, { SUPER_ADMIN_ROLE } from "../../../middlewares/routeAccess";
import seedController from "./seedController";
import logger from "../../../middlewares/logger";
import dbConnetMid from "../../../middlewares/dbconnect";
export default baseController
  .router()
  .use(dbConnetMid, logger)
  .post(...auth(SUPER_ADMIN_ROLE), seedController.seedFake)
  .delete(...auth(SUPER_ADMIN_ROLE), seedController.deleteFakes);
