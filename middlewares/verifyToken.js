const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden user" });
    }

    req.user = decode;
    next();
  });
};

module.exports = {
  verifyToken,
};