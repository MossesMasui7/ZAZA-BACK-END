const express = require("express");
const _ = require("underscore");

const Publicidad = require("../../models/publicidad");
const negocio = require("../../models/negocio");
const upload = require("../../../scripts/uploadImage/upload");
const app = express();

app.get("/obtener", (req, res) => {});
app.post("/registrar/:idnegocio", (req, res) => {
  let idNegocio = req.params.idnegocio;
  let imgs = [];
  let body = req.body;

  imgs[0] = upload(body.uno, "publicidad");
  imgs[1] = upload(body.dos, "publicidad");
  imgs[2] = upload(body.tres, "publicidad");
  let publicidad = new Publicidad({
    negocio: idNegocio,
    imgs: imgs,
  });
  publicidad.save((err, resp) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: err,
      });
    }
    return res.status(200).json({
      ok: true,
      resp: resp,
    });
  });
});

module.exports = app;
