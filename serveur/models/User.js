const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    adress: { type: String, required: true,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  }
);

module.exports = mongoose.model("User", UserSchema);
