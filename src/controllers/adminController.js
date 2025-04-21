const bcrypt = require("bcrypt");
const Doctor = require("../Models/doctorModel");
require("dotenv").config();
const validator = require("validator");
const {v2 : cloundinary} = require("cloudinary")
const path = require("path");
const { upload } = require("../middlewares/multer");
const fs = require("fs");
const addDoctor = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);

    const {
      name,
      email,
      speciality,
      degree,
      experience,
      about,
      fees,
      password,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !password
    ) {
      return res
        .status(400)
        .json({ sucssess: false, message: "Please fill all the fields" });
    }
       const existingDoctor = await Doctor.findOne({ email });
       if (existingDoctor) {
         return res.status(400).json({ message: "Email already exists" });
       }

    if (!validator.isEmail(email)) {
       return res
         .status(400)
         .json({ sucssess: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
       return res
         .status(400)
         .json({ sucssess: false, message: "Please enter valid password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

 

    // upload image to cloundinary
    
    const imageUpload= await cloundinary.uploader.upload(imageFile.path, {resource_type: 'image'})
    const imageUrl = imageUpload.secure_url; 

    const doctor = await Doctor.create({
      name,
      email,
      speciality,
      degree,
      experience,
      about,
      fees,
      password: hashedPassword,
      image:imageUrl, 
      date: Date.now()
    });

    res.status(201).json({ message: "Doctor Added Successfully", doctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Exclude password
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

const updateDoctor = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const doctorId = req.params.id;

    // Find the existing doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // If a new image is uploaded, delete the old one
    let imagePath = doctor.image;
    if (req.file) {
      if (imagePath) {
        const fullPath = path.join(__dirname, "..", imagePath);
        fs.unlink(fullPath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      imagePath = "uploads/" + req.file.filename;
    }

    // Update doctor with new values
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        ...req.body,
        image: imagePath,
      },
      { new: true }
    );

    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message || "Doctor not found" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    const imagePath = doctor.image;
    if (imagePath) {
      const fullPath = path.join(__dirname, "..", imagePath);
      console.log(fullPath, "djks");
      // Adjust the path as necessary
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Error deleting image:", err);
        else console.log("Image deleted successfully:", fullPath);
      });
    }
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfuvb lly" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Doctor not found" });
  }
};

module.exports = {
  addDoctor,
  getDoctors,
  updateDoctor,
  getDoctorById,
  deleteDoctor,
};
