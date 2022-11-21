const User = require("../models/user");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { SALT_PASSWORD, COOKIEE_SIGNIN_TOKEN } = process.env;

const hashPwd = (password) => {
  var hmac = crypto.createHmac("sha256", SALT_PASSWORD);
  return hmac.update(password).digest("hex");
};

exports.signup = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract all data
    const { name, email, password } = req.body;

    // all fields are requied**
    if (!(name && email && password))
      return res.status(404).json({ error: "All field are requied" });

    // Check user is already resgister or not
    const user = await User.findOne({ email });
    if (user) return res.status(403).json({ error: "User already exist" });

    const data = {
      name,
      email,
      password: hashPwd(password),
    };
    const newUser = await User.create(data);

    if (!newUser)
      return res.status(500).json({ error: "Something went wrong" });

    return res.status(201).json({
      message: `Hello ${name} Account created successfully.`,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

exports.signin = async (req, res) => {
  try {
    // Field error handeler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    // User can also login with email and username
    const user = await User.findOne({ email });

    // Check user exist or not and Password check
    if (!(user && user.password === hashPwd(password)))
      return res
        .status(401)
        .json({ error: "Email and password are not match" });

    const { _id, name, role } = user;

    const token = jwt.sign(
      {
        _id,
      },
      COOKIEE_SIGNIN_TOKEN,
      { expiresIn: "24h" }
    );

    res.cookie("sign_in_user", token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    // Check how many time user is longing out app
    await User.findByIdAndUpdate(
      _id,
      { $inc: { loginCount: 1 } },
      { new: true }
    );

    const data = { _id, name, email, role };
    return res.status(200).json({ token, data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: `Something went worng ${error}` });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("sign_in_user");
    return res.status(200).json({ success: "Signout successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};
