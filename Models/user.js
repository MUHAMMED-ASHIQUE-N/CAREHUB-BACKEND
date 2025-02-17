const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    RememberMe: { type: String, required: true },
  },
  { collation: { locale: 'en', strength: 2 } },

);

module.exports = mongoose.model("User", UserSchema);
