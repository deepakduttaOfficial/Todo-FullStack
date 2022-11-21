const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    task: {
      type: String,
      trim: true,
      required: [true, "task must be required"],
    },

    todo: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const task = mongoose.model("Task", taskSchema);
module.exports = task;
