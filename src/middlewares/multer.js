const multer = require("multer");
const fs = require("fs");
const path = require("path");

// const uploadDir = path.join(__dirname, "../uploads");
// console.log("Upload Directory:", uploadDir);


// // Ensure the uploads folder exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// Configure storage location and filename
const storage = multer.diskStorage({
  filename: function (_req, file, cb) {
    // Generate a unique file name: timestamp + original name
    cb(null,file.originalname);
  },
  // destination: function (_req, _file, cb) {
  //   cb(null, uploadDir); // Files are saved to the uploads folder
  // },
});

const upload = multer({ storage });

module.exports = { upload };
