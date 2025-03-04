 const bcrypt = require("bcrypt"); 
  const jwt = require("jsonwebtoken");
  const User = require("../Models/userModel");
  const dotenv = require("dotenv").config();


const register = async (req, res) => {
  try {
    const { firstName, secondName, email, phoneNumber, password, RememberMe, role } =
      req.body;

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
      role
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

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

   res.status(200).json({
     message: "Login successful",
     token,
     user: {
       id: user._id,
       role: user.role,
       firstName: user.firstName,
       email: user.email,
     },
   });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

module.exports = { register, login };