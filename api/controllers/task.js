const { validationResult } = require("express-validator");
const Todo = require("../models/todo");
const Task = require("../models/task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract data
    const { task } = req.body;

    // Get user and todo from middleware
    const user = req.profile;
    const todo = req.todo;

    //this data will send to the database
    const data = {
      task,
      todo: todo._id,
      user: user._id,
    };
    const newTask = await Task.create(data);
    if (!newTask)
      return res.status(500).json({ error: "Something went wrong" });

    // Task id will store inside the user model
    await Todo.findByIdAndUpdate(
      todo._id,
      {
        $push: { tasks: newTask._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      newTask,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract data
    const { task } = req.body;

    const updateTask = await Task.findByIdAndUpdate(
      req.task._id,
      { task },
      { new: true }
    );

    if (!updateTask)
      return res.status(500).json({ error: "Something went wrong" });

    return res.status(201).json({
      success: true,
      task: updateTask,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Get Task
exports.getTask = (req, res) => {
  const task = req.task;
  return res.status(201).json({
    success: true,
    task,
  });
};

// Get all tasks Todo-wise
exports.getTasksInsideTodo = async (req, res) => {
  try {
    const { sort, q } = req.query;
    // Task will send todo-wise
    const search = q ? { task: new RegExp(q, "i") } : {};
    const tasks = await Task.find(search)
      .where({ todo: req.todo._id })
      .sort({ createdAt: sort })
      .populate("todo", "todo")
      .populate("user", "name email");
    return res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// remove Task
exports.removeTask = async (req, res) => {
  try {
    const task = req.task;
    // Profile update || remove todoID from profile
    await Todo.findByIdAndUpdate(task.todo._id, {
      $pull: { tasks: task._id },
    });

    await Task.findByIdAndRemove(task._id);
    return res
      .status(200)
      .json({ success: true, message: `Task removed successfully` });
  } catch (error) {
    return res.status(500).json({ error: `Something went wrong` });
  }
  //
};

// Admin route???????-----------
