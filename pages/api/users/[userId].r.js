import { baseController } from "../baseController";
import logger from "../../../middlewares/logger";
import userController from "./userController";
import dbConnectMid from "../../../middlewares/dbconnect";
import userAuth from "./auth";
export default baseController
  .router()
  .use(dbConnectMid)
  .use(logger)
  .get(...userAuth.ifReqHasLowerRole, userController.returnUser)
  .delete(...userAuth.ifReqHasLowerRole, userController.deleteUser)
  .put(
    ...userAuth.ifSameUser,
    userController.validateUser,
    userController.updateUser
  );
