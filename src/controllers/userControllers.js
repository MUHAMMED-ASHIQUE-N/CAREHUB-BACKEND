const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const dotenv = require("dotenv").config();
const Doctor = require("../Models/doctorModel");

const register = async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      email,
      phoneNumber,
      password,
      RememberMe,
      role,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      secondName,
      email,
      phoneNumber,
      password: hashedPassword,
      RememberMe,
      role,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch)
        return res.status(400).json({ message: "Invalid  password" });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user,
      });
    }

    if (!user)
      if (
        process.env.ADMIN_EMAIL === email &&
        process.env.ADMIN_PASSWORD === password
      ) {
              const adminToken = jwt.sign(
                { role: "admin" },
                process.env.JWT_SECRET
              );

        res.status(200).json({
          message: "Login successful",
          adminToken,
          user: { role: "admin" },
        });
      } else if (process.env.PHARMACY_EMAIL === email && process.env.PHARMACY_PASSWORD === password) {
        const phamacyToken = jwt.sign({role: "pharmacy"}, process.env.JWT_SECRET);
        res.status(200).json({
          message: "Login successful",
          phamacyToken,
          user: { role: "pharmacy" },
        })

      } else {
        return res.status(404).json({ message: "Invalid email or password" });
      }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

module.exports = { register, login };
