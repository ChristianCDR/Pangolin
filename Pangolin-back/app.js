const express = require('express');
const mongoose= require('mongoose');
const helmet= require('helmet');
require('dotenv').config();
const app = express();
const routeUser= require('./routes/users');
 
//connexion db
const connect= process.env.connexion;
mongoose.connect(connect, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connexion à MongoDB réussie!'))
.catch(()=>console.log('Connexion à MongoDB échouée!'));   
  
//en-tetes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Helmet colmate des failles de sécurité connues
app.use(helmet());

//remplace Body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  

app.use('/auth', routeUser);

module.exports=app;