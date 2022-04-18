import mongoose from "mongoose";
import timeStamp from "mongoose-timestamp";
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  author: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});
newsSchema.plugin(timeStamp);
export default mongoose.models.News || mongoose.model("News", newsSchema);
