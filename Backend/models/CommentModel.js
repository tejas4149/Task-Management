import mongoose, { model } from "mongoose";

const commentSchema = new Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const CommentModel = model("comment", commentSchema);
export default CommentModel;
