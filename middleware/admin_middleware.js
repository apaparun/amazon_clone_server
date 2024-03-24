const jwt = require("jsonwebtoken");
const User = require("../models/user");
const admin = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "No auth token , Access denied." });

    const isveriifed = jwt.verify(token, "passwordKey");
    if (!isveriifed)
      return req
        .status(401)
        .json({ message: "Token verification failed.Access denied." });
    const user = await User.findById(isVerified.id);
    if (user.type == "user" || user.type == "seller") {
      return res.status(401).json({ message: "You are not admin!" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
module.exports = admin;
