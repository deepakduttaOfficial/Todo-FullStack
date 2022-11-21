const Todo = require("../models/todo");

exports.getTodoById = async (req, res, next, id) => {
  try {
    const todo = await Todo.findById(id).populate("user", "name email");
    // .populate("tasks", "name");
    if (!todo) return res.status(400).json({ error: "Todo not found" });

    req.todo = todo;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Todo not found" });
  }
};

exports.isTodoCreatedByUser = async (req, res, next) => {
  try {
    const { user } = req.todo;
    const { _id } = req.profile;
    const isEqual = user.equals(_id);
    if (!isEqual) {
      return res.status(400).json({
        error: "You cann't touch this Todo",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};
