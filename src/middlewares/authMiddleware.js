const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
if (authHeader && authHeader.startsWith("Bearer")) {
  token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "no token" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(404).json({ message: "token is not valid" });
  }
}
};

module.exports = verifyToken;
