const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db.js");
const User = require("./Models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
connectDB();

//midlewares
app.use(express.json());
app.use(cors());

app.post("/api/user/Register", async (req, res) => {
  try {
    const { firstName, secondName, email, phoneNumber, password, RememberMe } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      secondName,
      email,
      phoneNumber,
      password: hashedPassword,
      RememberMe,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(`/api/login`, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid email or password" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)return res.status(400).json({ message: "invalid email or password " });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

      res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error(err);

    res.status(400).json({ message: "invalid email or password" });
  } 
});

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => console.log(`surver is running on ${PORT}`));
