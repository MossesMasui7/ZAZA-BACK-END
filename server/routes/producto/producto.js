const express = require("express");
const _ = require("underscore");
///const { verificatoken } = require('../../middlewares/autenticacion');
const Producto = require("../../models/producto");
const Negocio = require("../../models/negocio");
const usuario = require("../../models/usuario");
const upload = require("../../../scripts/uploadImage/upload");
const pdf = require("html-pdf");
const path = require("path");
const uniqid = require("uniqid");
const fs = require("fs");

const app = express();

app.post("/registrar", (req, res) => {
  let body = req.body;
  let img = upload(body.img, "producto");

  let producto = new Producto({
    cdb: body.cdb,
    descripcion: body.descripcion,
    contenido: body.contenido,
    tipoContenido: body.tipoContenido,
    categoria: body.categoria,
    img: img,
  });

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

app.get("/comparar/:idUsuario/:idNegocio", (req, res) => {
  let id = req.params.idUsuario;
  let idNegocio = req.params.idNegocio;
  let resultado = [];

  usuario.findById(id, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    Producto.populate(usuarioDB, { path: "carrito.producto" }, function (
      err,
      usuarioDB
    ) {
      usuarioDB["carrito"].forEach((element) => {
        element["producto"]["tiendas"].forEach((ele) => {
          if (ele["negocio"] == idNegocio) {
            resultado.push({
              Producto: element["producto"]["_id"],

              Precio: ele["precio"],
            });
          } else {
            resultado.push({
              Producto: element["producto"]["_id"],

              Precio: "--",
            });
          }
        });
      });

      for (let i = 0; i < resultado.length; i++) {
        for (let index = 0; index < resultado.length; index++) {
          if (resultado[i]["Producto"] == resultado[index]["Producto"]) {
            if (resultado[index]["Precio"] == "--") {
              resultado.splice(index, 1);
            } else if (resultado[i]["Precio"] == "--") {
              resultado.splice(i, 1);
            }
          }
        }
      }

      return res.status(200).json({
        ok: true,
        resp: resultado,
      });
    });
  });
});

app.post("/generar/pdf/listaCompras", (req, res) => {
  let body = req.body;
  let nombre = uniqid();
  let nombreUsuario = body.usuario;
  let datos = "";
  let reqDatos = body.datos;
  console.log(reqDatos);
  reqDatos.forEach((element) => {
    console.log(element);
    datos =
      datos +
      `<tr><td>${element["descripcion"]}</td><td>$${element["precio"]}.00</td></tr>`;
  });
  let contenido = `<!doctype html>
  <html>
     <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
              h1 {
                  color: green;
                  text-align:center;
              }
              table {
                position:relative;
                left:50%;
                transform:translate(-50%,-50%);
              }
          </style>
      </head>
      <body>
          <h1>Lista de compras de ${nombreUsuario}</h1>
          <table border>
              <tr>
          <th>Producto</th>
          <th>Precio</th>
          </tr>
          ${datos}

          </table>
         
      </body>
  </html>`;
  pdf.create(contenido).toFile(`./uploads/pdf/pdf.pdf`, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
  return res.status(200).json({
    ok: true,
    id: nombre,
  });
});

app.get("/obtener/pdf/listaCompras/:id", (req, res) => {
  let id = req.params.id;

  if (
    fs.existsSync(path.resolve(__dirname, `../../../uploads/pdf/${id}.pdf`))
  ) {
    return res.sendFile(
      path.resolve(__dirname, `../../../uploads/pdf/${id}.pdf`)
    );
  } else {
    return res.sendFile(
      path.resolve(__dirname, `../../../uploads/pdf/pdf.pdf`)
    );
  }
});

module.exports = app;
