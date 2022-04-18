import dbConnectMid from "../../../middlewares/dbconnect";
import logger from "../../../middlewares/logger";
import { baseController } from "../baseController";
import newsController from "./newsController";
import newsAuth from "./auth";
import { uploadInitializer } from "../../../middlewares/multer";
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
  .use(dbConnectMid, logger)
  .delete(...newsAuth.ifMadeBySameUser, newsController.deleteNews)
  .put(
    upload.single("newImage"),
    ...newsAuth.ifMadeBySameUser,
    newsController.validateNewsMPForm,
    newsController.updateANews
  )
  .get(newsController.sendANews);
