const express = require("express");
const {addDoctor,getDoctors,getDoctorById,updateDoctor,deleteDoctor} = require("../controllers/adminController")
const {upload} = require('../middlewares/multer');
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

router.post("/add-Doctor",authAdmin, upload.single("image"), addDoctor);
router.get("/getDoctor/",getDoctors);
router.get("/:id",getDoctorById);
router.put("/:id", upload.single("image"), updateDoctor);
router.delete("/:id",deleteDoctor);


module.exports = { adminRouter: router };