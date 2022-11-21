const Task = require("../models/task");

exports.getTaskById = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id)
      .populate("user", "name email")
      .populate("todo", "todo user");
    if (!task) return res.status(400).json({ error: "Task not found" });

    req.task = task;
    next();
  } catch (error) {
    return res.status(400).json({ error: `Task not found ${error}` });
  }
};

exports.isTaskCreatedByUser = async (req, res, next) => {
  try {
    const { user } = req.task;
    const { _id } = req.profile;
    const isEqual = user.equals(_id);
    if (!isEqual) {
      return res.status(400).json({
        error: "You cann't touch this Task",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};
