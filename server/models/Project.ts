import { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema({
  name: String,
  adminId: { type: Schema.Types.ObjectId, ref: "User" },
  taskStates: [{ type: Schema.Types.ObjectId, ref: "State" }],
  contributors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  userReq: [{ type: Schema.Types.ObjectId, ref: "User" }],
  inviteReq: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
