const bcrypt = require("bcrypt");
const Doctor = require("../Models/doctorModel");
const dotenv = require("dotenv").config();
const {upload} = require('../middlewares/fileUploadMiddleware')

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
const image = req.file ? "uploads/" + req.file.filename : "";


    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const doctor = await Doctor.create({
     name,
     email,
     speciality,
     degree,
     experience,
     about,
     fees,
     password: hashedPassword,
     image, // Save the uploaded image path in the doctor record
   });


    res.status(201).json({ message: "Doctor Added Successfully", doctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};


const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password"); // Exclude password
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};


const getDoctorById = async (req, res) => {
    try{
        const doctor = await Doctor.findById(req.params.id)
        res.json(doctor)

    }catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
    }

}

const updateDoctor = async (req, res) => {
  try{
    const updateDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!updateDoctor){
      return res.status(404).json({message: "Doctor not found"})
    }
    res.json(updateDoctor)
  } catch (err) {
    res.status(400).json({ error: err.message || "Doctor not found" });
  }
}

const deleteDoctor = async (req, res) => {
  try{
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if(!doctor){
      return res.status(404).json({message: "Doctor not found"})
    }
    res.json({message: "Doctor deleted successfully"})
  } catch (err) {
    res.status(400).json({ error: err.message || "Doctor not found" });
  }
}

module.exports = { addDoctor, getDoctors, updateDoctor, getDoctorById,deleteDoctor };