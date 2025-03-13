const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: Number, required: true },
    about: { type: String, required: true },
    fees: { type: Number, required: true },
    password: { type: String, required: true },
  },
  { collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
