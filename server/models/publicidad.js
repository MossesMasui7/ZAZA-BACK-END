const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

const Negocio = require("./negocio");
const { now, any } = require("underscore");
let Schema = mongoose.Schema;

let publicidadSchema = new Schema({
  negocio: {
    type: Schema.Types.ObjectId,
    ref: "Negocio",
  },
  fecha: {
    type: Date,
    default: now(),
  },
  imgs: {
    type: Array,
    default: null,
  },
});

publicidadSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente",
});

module.exports = mongoose.model("Publicidad", publicidadSchema);
