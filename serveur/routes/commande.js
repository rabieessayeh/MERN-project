const Commande = require("../models/Commande");
const User = require("../models/User");
const ObjectId = require('mongodb').ObjectID;
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {

   const user = await User.findOne(
     {
       _id: ObjectId( req.body.userId) 
    }
);
 
   const newCommande = new Commande(
    {
      
     userId : user._id.toString(),
     articles: req.body.articles,
     totale : req.body.totale,
     adress: user.adress, 
     email : user.email
    }
   );
   try {
     const savedCommande = await newCommande.save(); 
     res.status(200).json(savedCommande);
   } catch (err) {
     res.status(500).json(err);
   }
});


//UPDATE
router.post("/update", async (req, res) => {
  try {
    const updatedCommande = await Commande.findByIdAndUpdate(
      {_id : req.body._id},
      {
        $set: {status:true}
      },
      { new: true }
    );
    res.status(200).json(updatedCommande);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.post("/delete", async (req, res) => {
  try {
    await Commande.findByIdAndDelete(req.body._id);
    res.status(200);
  } catch (err) {
    res.status(500);
  }
});


router.get("/", async (req, res) => {
  try {
    const Commandes = await Commande.find();
    res.status(200).json(Commandes);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;
