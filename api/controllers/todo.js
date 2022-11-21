const { validationResult } = require("express-validator");
const Todo = require("../models/todo");
const User = require("../models/user");
const Task = require("../models/task");

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract data
    const { todo } = req.body;

    // Check user is already resgister or not
    const user = req.profile;

    const data = {
      todo,
      user: user._id,
    };
    const newTodo = await Todo.create(data);
    if (!newTodo)
      return res.status(500).json({ error: "Something went wrong" });

    await User.findByIdAndUpdate(
      user._id,
      {
        $push: { todos: newTodo._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      newTodo,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract data
    const { todo } = req.body;

    const updateTodo = await Todo.findByIdAndUpdate(
      req.todo._id,
      { todo },
      { new: true }
    );

    if (!updateTodo)
      return res.status(500).json({ error: "Something went wrong" });

    return res.status(201).json({
      success: true,
      todo: updateTodo,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Get Todo
exports.getTodo = (req, res) => {
  const todo = req.todo;
  return res.status(201).json({
    success: true,
    todo,
  });
};

// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.auth._id });
    return res.status(201).json({
      success: true,
      todos,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// remove Todo
exports.removeTodo = async (req, res) => {
  try {
    const todo = req.todo;
    const profile = req.profile;
    // Profile update
    await User.findByIdAndUpdate(profile._id, {
      $pull: { todos: todo._id },
    });

    // If there is any task inside the todo then all task will removed
    await Task.deleteMany({ todo: todo._id });

    await Todo.findByIdAndRemove(todo._id);
    return res
      .status(200)
      .json({ success: true, message: `Todo removed successfully` });
  } catch (error) {
    return res.status(500).json({ error: `Something went wrong${error}` });
  }
  //
};
