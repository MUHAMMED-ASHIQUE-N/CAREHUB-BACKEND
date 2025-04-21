const jwt = require("jsonwebtoken");

// admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    // Validate token payload
    if ( token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    // Proceed to the next middleware
    next();
  } catch (err) {
    console.log("Error in authAdmin middleware", err);

    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authAdmin;
