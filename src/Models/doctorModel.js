const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },

    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: Number, required: true },
    about: { type: String, required: true },
    available: { type: Boolean },
    fees: { type: Number, required: true },
    date: { type: Number },
    slots_booked: { type: Object, default: {} },
    role: {
      type: String,
      required: true,
      enum: ["admin", "doctor", "pharmacy", "patient"],
    },
  },
  { minimize: false },
  { collation: { locale: "en", strength: 2 } }
);  

module.exports = mongoose.model("Doctor", DoctorSchema);
