const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const { apiRouter } = require("./routes/index.js");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();

//midlewares
app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req,res) => {
  res.send('<h1>hello</h1>')
})

//routes
app.use("/api", apiRouter);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/api/doctor/getDoctor/uploads",
  express.static(path.join(__dirname, "uploads"))
);

//start server
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => console.log(`surver is running on ${PORT}`));
