import { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userid: String,
    title: String,
    descrition: String,
    dueDate: Date,
    status: String,
  },
  {
    timestamps: true,
  }
);
const TaskModel = model("task", taskSchema);
export default TaskModel;
