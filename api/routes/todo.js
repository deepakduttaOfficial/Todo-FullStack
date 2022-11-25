const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createTodo,
  updateTodo,
  getTodos,
  getTodo,
  removeTodo,
} = require("../controllers/todo");

// Middleware
const {
  getProfileById,
  isSignin,
  isAuthenticate,
} = require("../middleware/auth");

const { getTodoById, isTodoCreatedByUser } = require("../middleware/todo");
router.param("profileId", getProfileById);
router.param("todoId", getTodoById);

//---------------------//

/*****************************************/
/* 
   expect-
   body: todo
   header: Bearer token
   url: profileId
*/
router.post(
  "/todo/create/:profileId",
  isSignin(),
  isAuthenticate,
  body("todo", "Todo is required").notEmpty(),
  body("todo", "Todo must be at least 2 chars long").isLength({
    min: 2,
  }),
  createTodo
);

// Update Todo
/* 
   expect-
   body: todo
   header: Bearer token
   url: profileId, todoId
*/
router.put(
  "/todo/update/:profileId/:todoId",
  isSignin(),
  isAuthenticate,
  isTodoCreatedByUser,
  body("todo", "todo is required").notEmpty(),
  body("todo", "todo must be at least 2 chars long").isLength({
    min: 2,
  }),
  updateTodo
);

// // Get single Todo
/* 
   expect-
   header: Bearer token
   url: profileId, todoId
*/
router.get(
  "/todo/get/:profileId/:todoId",
  isSignin(),
  isAuthenticate,
  isTodoCreatedByUser,
  getTodo
);

// Get all Todo
/* 
   expect-
   header: Bearer token
*/
router.get("/todos/get", isSignin(), getTodos);

// remove Todo
/* 
   expect-
   header: Bearer token
   url: profileId, todoId
*/
router.delete(
  "/todo/remove/:profileId/:todoId",
  isSignin(),
  isAuthenticate,
  isTodoCreatedByUser,
  removeTodo
);

/*****************************************/

module.exports = router;
