require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// Version
const version = "v1";

// Import router
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const taskRouter = require("./routes/task");

// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes middleware
app.use(`/api/${version}`, authRouter);
app.use(`/api/${version}`, todoRouter);
app.use(`/api/${version}`, taskRouter);

module.exports = app;
