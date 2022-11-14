import { Schema, models, model } from "mongoose";

const TaskSchema = new Schema({
  name: String,
  priroty: String,
  description: String,
  assignee: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
