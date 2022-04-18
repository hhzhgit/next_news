import { number } from "yup";
import { array } from "yup";
import { string } from "yup";
import { object } from "yup";

export const userSchema = object({
  name: string().required().min(1),
  age: number().optional().min(5).max(200),
  email: string().required().email(),
  password: string().required().min(5),
  personalWebsite: string().optional().url(),
  country: array(string()).optional(),
});
