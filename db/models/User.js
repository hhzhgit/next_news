import mongoose from "mongoose";
import timeStamp from "mongoose-timestamp";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalWebsite: String,
  country: [String],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});
userSchema.plugin(timeStamp);
export default mongoose.models.User || mongoose.model("User", userSchema);
