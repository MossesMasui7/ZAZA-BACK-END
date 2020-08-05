const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
var base64Img = require("base64-img");
const uniqid = require("uniqid");
const fs = require("fs");
const path = require("path");
const Usuario = require("../../models/usuario");
const confirmEmail = require("../../../scripts/email/confirmacion");
const app = express();
app.get("/obtener", (req, res) => {
  Usuario.find().exec((err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.status(200).json({
      ok: true,
      count: usrDB.length,
      msg: `Se encontraron ${usrDB.length} usuarios`,
      cont: usrDB,
    });
  });
});
//manda correo electronico de confirmacion
app.get("/confirmar/:id", (req, res) => {
  let id = req.params.id;
  Usuario.findByIdAndUpdate(
    id,
    { emailConfirmado: true },
    { new: true, runValidators: true, context: "query" },
    (err, usrDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      return res.status(200).json({
        ok: true,
        msg: `Usuario confirmado correctamente`,
        cont: usrDB,
      });
    }
  );
});
//Verificar que username no este en uso
//new RegExp(username, 'i')
app.get("/verificar/username/:username", (req, res) => {
  let username = req.params.username;
  let disponible = true;
  Usuario.find({ username: username }, { username: 1 }).exec((err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if (usrDB.length > 0) {
      disponible = false;
    }
    return res.status(200).json({
      disponible,
    });
  });
});

app.post("/registrar", (req, res) => {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    apellidos: body.apellidos,
    username: body.username,
    email: body.email,
    contrasena: bcrypt.hashSync(body.contrasena, 10),
    img: body.img,
    telefono: body.telefono,
  });

  usuario.save((err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      confirmEmail(usrDB._id, usrDB.email)
        .then((data) => {
          console.log("Mensaje enviado");
        })
        .catch((err) => {
          console.log("Email no existe");
        });
      return res.status(200).json({
        ok: true,
        msg: `Se registro correctamente el usuario ${usuario.nombre}`,
        cont: usrDB,
      });
    }
  });
});

module.exports = app;
