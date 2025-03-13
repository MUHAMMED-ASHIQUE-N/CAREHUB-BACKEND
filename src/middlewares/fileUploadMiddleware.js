const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

// Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage location and filename
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir); // Files are saved to the uploads folder
  },
  filename: function (_req, file, cb) {
    // Generate a unique file name: timestamp + original name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
