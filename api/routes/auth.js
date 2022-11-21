const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  signup,
  signin,
  logout,
  adminGetAllUser,
} = require("../controllers/auth");
// Middleware
const {
  getProfileById,
  isSignin,
  isAuthenticate,
  isAdmin,
} = require("../middleware/auth");
router.param("profileId", getProfileById);

/*****************************************/
/* 
   expect-
   body: name, email, password
*/
router.post(
  "/signup",
  body("name", "Name is required").notEmpty(),
  body("email", "Enter valid email").isEmail().normalizeEmail().notEmpty(),
  body("password", "password must be at least 3 chars long").isLength({
    min: 3,
  }),
  signup
);

/* 
   expect-
   body: email, password
*/
router.post(
  "/signin",
  body("email", "Enter your Email").notEmpty(),
  body("password", "Enter your password").notEmpty(),
  signin
);

router.get("/logout", isSignin, logout);
/*****************************************/

module.exports = router;
