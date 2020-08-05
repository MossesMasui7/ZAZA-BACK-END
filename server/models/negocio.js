const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");
const { any } = require("underscore");

let Schema = mongoose.Schema;

let NegocioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "Favor de ingresar el nombre de la tienda"],
  },
  direccion: {
    type: String,
    required: [true, "Favor de ingresar la direccion de la tienda"],
  },
  categorias: {
    type: Array,
    required: [true, "Favor de ingresar la(s) categoria(s) de la tienda"],
  },
  calificacion: {
    type: Number,
    default: 0,
  },
  comentarios: {
    type: String,
  },
  imagenes: {
    type: String,
  },
  estado: {
    type: String,
    default: "DISPONIBLE",
  },
  cordenadas: {
    _id: 0,
    type: Object,
  },
});

NegocioSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente",
});

module.exports = mongoose.model("Negocio", NegocioSchema);
