const express = require("express");
const User = require("../models/user");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const auth = require("../middleware/auth_middleware");

authRouter.post("/api/signup", async (req, res) => {
  try {
    //get data from client
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedpassword = await bcryptjs.hash(password, 8);
    let user = new User({
      email,
      password: hashedpassword,
      name,
    });
    //post data in db
    user = await user.save();
    //return data to client
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//sign in route
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this emai does not exists!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
//check valid token

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const isveriifed = jwt.verify(token, "passwordKey");
    if (!isveriifed) return res.json(false);

    const user = await User.findById(isveriifed.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get user data

authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);

  res.json({ ...user._doc, token: req.token });
});
module.exports = authRouter;
