const express = require("express");
const _ = require("underscore");
///const { verificatoken } = require('../../middlewares/autenticacion');
const Producto = require("../../models/producto");


const usuario = require("../../models/usuario");
=======
const negocio = require("../../models/negocio");
const upload = require("../../../scripts/uploadImage/upload");


const app = express();

app.post("/registrar", (req, res) => {
  let body = req.body;

  let producto = new Producto({
    cdb: body.cdb,
    nombre: body.nombre,
    descripcion: body.descripcion,
    img: body.img,
  });

  producto.img = upload(producto.img, "producto");

  producto.save((err, pDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.status(200).json({
      ok: true,
      pDB,
    });
  });
});
app.get("/obtener/:cdb", (req, res) => {
  let cdb = req.params.cdb;

  Producto.find(
    { $or: [{ cdb: cdb }, { descripcion: { $regex: ".*" + cdb + ".*" } }] },
    {}
  )
    .populate("tiendas.negocio")
    .exec((err, CDBDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      return res.status(200).json({
        ok: true,
        resp: CDBDB,
      });
    });
});


app.get("/producto/obtenerComentarios/:id", (req, res) => {
    let id = req.params.id;
    Producto.find({ '_id': id }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        return res.status(200).json({
            ok: true,
            proDB
        });
    });
});

//Verificar que codigo de barras  no este en uso
//new RegExp(username, 'i')

app.get("/verificar/cdb/:cdb", (req, res) => {
  let cdb = req.params.cdb;
  let disponible = true;
  Producto.find({ cdb: cdb }, { cdb: 1 }).exec((err, CDBDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if (CDBDB.length > 0) {
      disponible = false;
    }
    return res.status(200).json({
      disponible,
    });
  });
});

app.put("/add/negocio/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Producto.findByIdAndUpdate(
    id,
    {
      $push: {
        tiendas: {
          precio: body.precio,
          negocio: body.negocio,
          oferta: body.oferta,
          inventario: body.inventario,
        },
      },
    },
    { new: true, runValidators: true, context: "query" },
    (err, proDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      return res.status(200).json({
        ok: true,
        msg: `Usuario actualizado correctamente`,
        cont: proDB,
      });
    }
  );
});


app.put("/producto/agregarComentario/:id", (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Producto.findByIdAndUpdate(
        id, {
            $push: {
                comentarios: {
                    _idUsuario: body._idUsuario,
                    username: body.username,
                    texto: body.texto,
                    fecha: body.fecha,
                },
            },
        }, { new: true, runValidators: true, context: "query" },
        (err, proDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            return res.status(200).json({
                ok: true,
                msg: `Comentario Agregado Exitosamente`,
                cont: proDB,
            });
        }
    );
});



app.get("/comparar/:idUsuario/:idNegocio", (req, res) => {
    let id = req.params.idUsuario;
    let idNegocio = req.params.idNegocio
    let resultado = []
    usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        Producto.populate(usuarioDB, { path: "carrito.producto" }, function(
            err,
            usuarioDB
        ) {

            usuarioDB['carrito'].forEach(carrito => {

                carrito['producto']['tiendas'].forEach(element => {
                    if (element['negocio'] == idNegocio) {
                        let inf = {
                            "Precio": element['precio'],
                            "Tienda": element['negocio'],
                            "Producto": carrito['producto']['_id']
                        }
                        resultado.push(inf)
                    }


                });




            });


            return res.status(200).json({
                ok: true,
                resp: resultado
            })
        });

    });
});

module.exports = app;

//PRODUCTOS
//5efea43aaff0d01808c73d08
//5efea4e2aff0d01808c73d09

//USUARIOS
//5ec96b36fcbbe72b60ba9da4
//5eed144dc5ed952320c7a35d

