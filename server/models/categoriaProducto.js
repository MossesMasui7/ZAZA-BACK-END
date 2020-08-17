const mongoose = require("mongoose");
const uniquevalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let categoriaProductoSchema = new Schema(
  { url: String, text: String, id: Number },
  { collection: "categoriaProductos" }
);

categoriaProductoSchema.plugin(uniquevalidator, {
  message: "{PATH} Debe ser unico y diferente",
});

module.exports = mongoose.model("categoriaProducto", categoriaProductoSchema);
