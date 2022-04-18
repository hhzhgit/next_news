import { date } from "yup";
import { string } from "yup";
import { object, array } from "yup";
import { isValidObjectId } from "mongoose";
export const newsSchema = object({
  title: string().required().min(1),
  description: string().required().min(1),
  category: string().required(),
  createdAt: date(),
  updatedAt: date(),
  comments: array(),
  author: array(
    string().test("is-object-id", "author invalid object id", (value) =>
      isValidObjectId(value)
    )
  ).required(),
});
