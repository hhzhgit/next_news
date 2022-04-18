import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import newsController from "./newsController";
import { multerMid, uploadInitializer } from "../../../middlewares/multer";
import auth, { ADMIN_ROLE } from "../../../middlewares/routeAccess";
const upload = uploadInitializer({
  destination: "./public/images",
  mimetypes: ["image/jpeg", "image/jpg"],
});
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default baseController
  .router()
  .post(
    upload.single("image"),
    dbConnectMid,
    logger,
    newsController.validateNewsMPForm,
    ...auth(ADMIN_ROLE),
    newsController.insertNews
  )
  .use(dbConnectMid, logger)
  .get(newsController.sendAllNews);
