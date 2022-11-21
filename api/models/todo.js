const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      trim: true,
      required: [true, "Todo must be required"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const todo = mongoose.model("Todo", todoSchema);
module.exports = todo;
