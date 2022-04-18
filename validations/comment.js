import { boolean, date, object, string } from "yup";
import { isValidObjectId } from "mongoose";
export const commentSchema = object({
  user: string().test(
    "user-is-objectId",
    "user id is not a mongodb object id",
    (id) => (id ? isValidObjectId(id) : true)
  ),
  news: string()
    .required()
    .test("news-is-objectId", "news id is not a mongodb object id", (id) =>
      id ? isValidObjectId(id) : true
    ),
  description: string().required(),
  allowPublish: boolean(),
  readByAdmin: boolean(),
  createdAt: date(),
  updatedAt: date(),
});
