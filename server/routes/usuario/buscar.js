const express = require("express");
const _ = require("underscore");
const Usuario = require("../../models/usuario");
const app = express();

app.get("/buscar/:usuario", (req, res) => {
  let usuario = req.params.usuario;
  Usuario.find({ username: usuario }, (err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.status(200).json({
      ok: true,
      cont: usrDB,
    });
  });
});
module.exports = app;
