const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    adress: req.body.adress,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({message:"Compte Créer"});
  } catch (err) {
    res.status(500).json({message:"Ce compte deja existe"});
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );

        const prenom = user.prenom;
        const id = user._id; 
        const isAdmin = user.isAdmin;

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
  
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password;
        
       if(!user || (originalPassword != inputPassword)){
           res.status(401).json({message:"Erreur d'email ou password"});
       } else{
        res.status(201).json({id, prenom, isAdmin});
       }     

    }catch(err){
        res.status(500).json(err); 
    }

});

module.exports = router;
