import mongoose from "mongoose";
import timeStamp from "mongoose-timestamp";
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  news: { type: mongoose.Types.ObjectId, ref: "News" },
  description: { type: String, required: true },
  allowPublish: { type: Boolean, required: true, default: false },
  readByAdmin: { type: Boolean, default: false },
});
CommentSchema.plugin(timeStamp);
export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
