import mongoose, { Schema } from "mongoose";
// User model

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please input a valid email"],
  },
  password: {
    // hashed password
    type: String,
    required: [true],
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
