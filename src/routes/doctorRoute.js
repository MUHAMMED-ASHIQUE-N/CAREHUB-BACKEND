const express = require("express");
const {addDoctor,getDoctors,getDoctorById,updateDoctor,deleteDoctor} = require("../controllers/doctorController")
const {upload} = require('../middlewares/fileUploadMiddleware');

const router = express.Router();

router.post("/addDoctor/",  upload.single("image"), addDoctor);
router.get("/getDoctor/",getDoctors);
router.get("/:id",getDoctorById);
router.put("/:id",updateDoctor);
router.delete("/:id",deleteDoctor);


module.exports = { doctorRouter: router };