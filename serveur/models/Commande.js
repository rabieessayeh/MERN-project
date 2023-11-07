const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    articles: [
      
          [
            {
              nom: { type: String },
              quantite: { type: Number, default: 1 }
            }
          ] 
      
    ],
    totale: { type: Number, required: true},
    adress: { type: String, required: true },
    email: { type: String, required: true },
    status: { type:Boolean, default:false  }
  }
);

module.exports = mongoose.model("Commande", CommandeSchema);
