// Implement some middleware
const { expressjwt } = require("express-jwt");
const { COOKIEE_SIGNIN_TOKEN } = process.env;
const User = require("../models/user");

exports.getProfileById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });
    user.password = undefined;
    user.loginCount = undefined;
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "User not found" });
  }
};

exports.isSignin = () => {
  return [
    expressjwt({
      secret: COOKIEE_SIGNIN_TOKEN,
      algorithms: ["HS256"],
    }),
    function (err, req, res, next) {
      return res
        .status(err.status)
        .json({ error: "Login your account to countinue..." });
    },
  ];
};

exports.isAuthenticate = async (req, res, next) => {
  try {
    const { _id } = req.profile;
    if (_id != req.auth._id)
      return res.status(401).json({ error: "You are not authencated" });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: `You're not authenticated ${error}` });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req?.adminProfile?.role !== "admin")
      return res.status(400).json({ error: "You are not Admin" });
    next();
  } catch (error) {
    return res.status(401).json({ error: "You're not Admin" });
  }
};
