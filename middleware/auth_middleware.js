const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
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

    req.user = isveriifed.id;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = auth;
