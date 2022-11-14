import { Schema, models, model } from "mongoose";

const StateSchema = new Schema({
  name: String,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const State = models.State || model("State", StateSchema);

export default State;
