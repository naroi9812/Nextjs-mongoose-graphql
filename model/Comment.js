import mongoose, { Schema } from "mongoose";
// Comment model

const commentSchema = new Schema({
  body: {
    type: String,
    required: [true, "Comment can not be empty"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
