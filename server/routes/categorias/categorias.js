const express = require("express");
const _ = require("underscore");
const categoriaProducto = require("../../models/categoriaProducto");
const productos = require("../../models/producto");
const app = express();

//RUTA PARA OBTENER LOS DATOS DE LOS NEGOCIOS QUE SE VAN A MOSTRAR EN PANTALLA
app.get("/obtener", (req, res) => {
  categoriaProducto.find((err, resp) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        cont: err,
      });
    }
    return res.status(200).json({
      ok: true,
      cont: resp,
    });
  });
});

app.get("/obtener/:categoria", (req, res) => {
  let categoria = req.params.categoria;
  categoriaProducto.find({ nombre: categoria }, (err, resp) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        cont: err,
      });
    }
    return res.status(200).json({
      ok: true,
      cont: resp[0],
    });
  });
});

app.get("/obtener/productos/:categoria", (req, res) => {
  let categoria = req.params.categoria;
  productos.find({ categoria: categoria }, (err, resp) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        cont: err,
      });
    }
    return res.status(200).json({
      ok: true,
      cont: resp,
    });
  });
});

module.exports = app;
