import multer from "multer";
import fs from "fs";
import { extname } from "path";
export const uploadInitializer = ({
  destination = "./public",
  mimetypes = null,
} = {}) =>
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(
          null,
          fs.existsSync(destination)
            ? destination
            : fs.mkdirSync(destination) || destination
        );
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e3);
        file.originalname
          ? cb(null, uniqueSuffix + extname(file.originalname))
          : cb(new Error("invalid file name", ""));
      },
    }),
    fileFilter: async (req, file, cb) => {
      if (!mimetypes) return cb(null, true);
      mimetypes.find((mimetype) => file.mimetype === mimetype)
        ? cb(null, true)
        : cb(new Error("فرمت فایل صحیح نیست", false));
    },
  });

export const multerMid = () => ({
  nextIfNotEmpty:
    (isSingle = false) =>
    (req, res, next) => {
      switch (isSingle) {
        case true:
          if (!req.file) {
            throw new Error("فایل مورد نظر ضمیمه نشده است");
          }
          break;
        default:
          if (!(req.files.length > 0)) {
            throw new Error("فایل های مورد نظر ضمیمه نشده اند");
          }
      }
      next();
    },
});
