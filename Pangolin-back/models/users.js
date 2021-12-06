const mongoose=require ('mongoose');
const mongooseUniqueValidator=require('mongoose-unique-validator');

const userSchema= mongoose.Schema({
  age: {type: Number, required: true},
  famille: {type: String, required: true},
  race: {type: String, required: true},
  nourriture: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password:{type: String, required: true}
}); 
//S'assurer de l'unicité des adresses mails
userSchema.plugin(mongooseUniqueValidator);
module.exports= mongoose.model('utilisateurs', userSchema);
