const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware")
const router = express.Router();
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin" });
});
router.get(
  "/pharmacy",
  verifyToken,
  authorizeRole("admin", "pharmacy"),
  (req, res) => {
    res.json({ message: "welcome pharmacy" });
  }
);
router.get(
  "/patient",
  verifyToken,
  authorizeRole("admin", "pharmacy", "patient"),
  (req, res) => {
    res.json({ message: "welcome patient" });
  }
);
router.get(
  "/doctor",
  verifyToken,
  authorizeRole("admin", "pharmacy", "patient","doctor"),
  (req, res) => {
    res.json({ message: "welcome doctor" });
  }
);

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("- password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {  authRoutes: router };
