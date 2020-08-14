const express = require("express");
const _ = require("underscore");
const Producto = require("../../models/producto");
var base64Img = require("base64-img");
const uniqid = require("uniqid");
const path = require("path");
const app = express();

app.put("/actualizarProducto/:id", (req, res) => {
  let id = req.params.id;
  let imgId = uniqid();
  let body = _.pick(req.body, ["descripcion", "img"]);
  Producto.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, productoDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      return res.status(200).json({
        ok: true,
        productoDB,
      });
    }
  );
});

module.exports = app;
