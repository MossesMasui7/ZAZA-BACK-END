const express = require("express");
const _ = require("underscore");
const Usuario = require("../../models/usuario");
const bodyParser = require("body-parser");
const Negocio = require("../../models/negocio");
const Producto = require("../../models/producto");
const app = express();

app.put("/actualizar/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, [
    "nombre",
    "apellidos",
    "contraseña",
    "telefono",
    "img",
  ]);

  Usuario.findByIdAndUpdate(
    id,
    body,
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
        msg: `Usuario actualizado correctamente`,
        cont: usrDB,
      });
    }
  );
});

app.put("/carrito/:idUsuario", (req, res) => {
  let id = req.params.idUsuario;
  let body = req.body;
  Usuario.findByIdAndUpdate(
    id,
    {
      $push: {
        carrito: {
          cantidad: body.cantidad,
          precio: body.precio,
          negocio: body.negocio,
          producto: body.producto,
        },
      },
    },
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
        msg: `Usuario actualizado correctamente`,
        cont: usrDB,
      });
    }
  );
});

app.put("/registrar/historial/:idUsuario", (req, res) => {
  let id = req.params.idUsuario;
  let body = req.body;
  Usuario.findByIdAndUpdate(
    id,
    {
      $push: {
        historialCompras: {
          precio: body.precio,
          producto: body.producto,
        },
      },
    },
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
        msg: `Usuario actualizado correctamente`,
        cont: usrDB,
      });
    }
  );
});

app.get("/actualizarUsuario/:idUsuario", (req, res) => {
  let id = req.params.idUsuario;
  Usuario.findById(id, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    Negocio.populate(usuarioDB, { path: "carrito.negocio" }, function (
      err,
      usuarioDB
    ) {
      Producto.populate(usuarioDB, { path: "carrito.producto" }, function (
        err,
        usuarioDB
      ) {
        return res.status(200).json({
          ok: true,
          resp: usuarioDB,
          // token
        });
      });
    });
  });
});

app.put("/eliminarCarrito/:idUsuario", (req, res) => {
  let id = req.params.idUsuario;
  let body = req.body;
  Usuario.findByIdAndUpdate(
    id,
    { $pull: { carrito: { _id: body.idCarrito } } },
    { new: true, runValidators: true, context: "query" },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Negocio.populate(usuarioDB, { path: "carrito.negocio" }, function (
        err,
        usuarioDB
      ) {
        Producto.populate(usuarioDB, { path: "carrito.producto" }, function (
          err,
          usuarioDB
        ) {
          return res.status(200).json({
            ok: true,
            cont: usuarioDB,
            // token
          });
        });
      });
    }
  );
});

module.exports = app;
