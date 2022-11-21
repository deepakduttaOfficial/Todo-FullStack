const mongoose = require("mongoose");
const { Schema } = mongoose;
// const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name must be required"],
    },

    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      unique: [true, "Email must be unique"],
      required: [true, "User email is required"],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Passowrd must be required"],
    },

    role: {
      type: String,
      default: "user",
    },

    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],

    token: {
      type: String,
    },

    loginCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
