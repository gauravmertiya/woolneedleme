const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("No token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "secret123");
    req.user = verified;
    next();
  } catch {
    res.status(403).json("Invalid token");
  }
};

module.exports = verifyToken;