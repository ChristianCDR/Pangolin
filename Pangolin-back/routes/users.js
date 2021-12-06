const express= require('express');
const route= express.Router();
const ctrlUser= require('../controllers/users');

route.post('/inscription', ctrlUser.signup);
route.post('/connexion', ctrlUser.login);

module.exports=route;