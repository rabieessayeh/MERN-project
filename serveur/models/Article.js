const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    prix: { type: Number, required: true },
    
  }
);

module.exports = mongoose.model("Article", ProductSchema);
