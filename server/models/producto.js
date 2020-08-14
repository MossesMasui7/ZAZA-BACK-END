const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

const Negocio = require("./negocio");
let Schema = mongoose.Schema;

let productoSchema = new Schema({
  cdb: {
    type: String,
    required: [true, " ingresa el codigo de barra"],
  },
  tiendas: [
    {
      required: false,
      _id: 0,
      precio: Number,
      oferta: { type: Boolean },
      inventario: Number,
      negocio: {
        type: Schema.Types.ObjectId,
        ref: "Negocio",
      },
    },
  ],
  descripcion: {
    type: String,
    required: [true, "Por favor ingresa la descripcion"],
  },

  img: {
    type: String,
    default: "noImage.jpeg",
  },
  estatus: {
    type: Boolean,
    default: true,
  },
  contenido: {
    type: Number,
  },
  tipoContenido: {
    type: String,
  },

  calificacion: {
    type: Number,
  },
  categoria: {
    type: Array,
  },
});

productoSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente",
});

module.exports = mongoose.model("Producto", productoSchema);
