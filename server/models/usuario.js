const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  
  },
  username:{
    type:String,
    unique:[true,'Nombre de usuario esta en uso'],
    required:true
    },
  email: {
    type: String,
    required: [true, "Favor ingresar un correo electronico valido"],
    unique:true

  },
  contraseña: {
    type: String,
    required: [true, "Favor ingresar su contaseña"]
  },
  img: {
    type: String,
    default:'noImage.jpeg'
  },
  telefono:{
    type:String,
    required:[true,"Favor ingresar su telefono"]
  },
  premium:{
    type:Boolean,
    default:false
  },
  puntos:{
    type:Number,
    default:0
  },
  insignias:{
    type:Array,
    default:null
  },
  emailConfirmado:{
    type:Boolean,
    default:false
  },
  estatus: {
    type: Boolean,
    default: true
  }
});

UsuarioSchema.plugin(uniquevalidator, {
  message: "{PATH} ya esta en uso por favor registre uno diferente"
});

module.exports = mongoose.model("Usuario", UsuarioSchema);