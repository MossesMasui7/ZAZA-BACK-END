const express = require("express");
const _ = require("underscore");
const Negocio = require("../../models/negocio");
const app = express();

//RUTA PARA OBTENER LOS DATOS DE LOS NEGOCIOS QUE SE VAN A MOSTRAR EN PANTALLA
app.route("/obtenerNegocios").get(function (req, res) {
  Negocio.find(function (err, negocio) {
    if (err) {
      console.log(err);
    } else {
      res.json(negocio);
    }
  });
});

//RUTA PARA REGISTRAR UNA NUEVA TIENDA O NEGOCIO
app.post("/registrarNegocio", (req, res) => {
  let body = req.body;

  let negocio = new Negocio({
    nombre: body.nombre,
    direccion: body.direccion,
    categorias: body.categorias,
    imagenes: body.imagenes,
    estado: body.estado,
    cordenadas: {
      longitude: body.longitude,
      latitude: body.latitude,
    },
  });
  negocio.save((err, negocioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.status(200).json({
      ok: true,
      negocioDB,
    });
  });
});

//RUTA PARA ACTUALIZAR LOS DATOS DE UNA TIENDA
app.put("/actualizarTienda/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "direccion", "categorias", "estado"]);

  Negocio.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, negocioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      return res.status(200).json({
        ok: true,
        negocioDB,
      });
    }
  );
});

//Mustra los negocios mas cercanos a la ubicacion actual
app.get("/obtener/negocios/cercanos/:la/:lo", (req, res) => {
  let la = req.params.la;
  let lo = req.params.lo;
  Negocio.find({}, (err, resp) => {
    for (let index = 0; index < resp.length; index++) {
      return res.json({
        ok: true,
        resp: resp[4]["cordenadas"],
      });
    }
    getKilometros(21.4290857, -102.5727873, la, lo);
    return res.json({
      ok: true,
    });
  });
});

function rad(x) {
  return (x * Math.PI) / 180;
}

var getKilometros = function (latN, lonN, latU, lonU) {
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(latN - latU);
  var dLong = rad(lonN - lonU);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(latU)) *
      Math.cos(rad(latN)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(3);
  //return d.toFixed(3); //Retorna tres decimales
};
function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

module.exports = app;
