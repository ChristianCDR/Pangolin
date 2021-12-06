const bcrypt= require('bcrypt');
const cryptojs = require("crypto-js");
const jwt= require('jsonwebtoken');
const userModel= require('../models/users');
require('dotenv').config();


exports.signup=(req, res)=>{
  const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_KEY).toString(cryptojs.enc.Base64);
  bcrypt.hash(req.body.password, 10)
  .then(hashedPassword=>{
    const newUser= new userModel({
      age:req.body.age,
      famille:req.body.famille,
      race:req.body.race,
      nourriture:req.body.nourriture,
      email: hashedEmail,
      password: hashedPassword
    });
    newUser.save()
    .then(()=>res.status(201).json({message:'Nouvel utilisateur crée!'})) 
    .catch(error=> {res.status(501).json({messagefromUserSaving: error})});

  })
  .catch(error=>{res.status(500).json({messagefromHashCatch: error})})
}

exports.login=(req,res)=>{
  const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_KEY).toString(cryptojs.enc.Base64);
  userModel.findOne({email: hashedEmail})//Chercher le mail dans la db
  .then(theUser=>{
    if(!theUser){
      return res.status(401).json({message: 'Utilisateur non trouvé!'});
    }
    //Comparaison du mot de passe de la db avec celui fourni par le user
    bcrypt.compare(req.body.password, theUser.password)
    .then(validPassword=>{
      if(!validPassword){
        return res.status(401).json({message: 'Mot de passe incorrect!'});
      }//Création du token d'authentification
      res.status(200).json({
        userId: theUser._id,
        token: jwt.sign(
          {userId: theUser._id},
          process.env.TOKEN_SECRET_KEY,
          {expiresIn:'24h'}
          )
      });
    })
    .catch(error=>{res.status(500).json({error})});
  })
  .catch(error=>{res.status(500).json({error})}); 
}