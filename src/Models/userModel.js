const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    RememberMe: { type: String },
    role:{ type: String, required: true, enum: ["admin", "doctor", "pharmacy", "patient" ] }
  },
  { collation: { locale: 'en', strength: 2 } },

);

module.exports = mongoose.model("User", UserSchema);
