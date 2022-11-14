import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
