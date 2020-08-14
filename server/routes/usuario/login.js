const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../../models/usuario");
const _ = require("underscore");
const app = express();
const Negocio = require("../../models/negocio");
const Producto = require("../../models/producto");
const dateTime = require("node-datetime");

app.post("/login", (req, res) => {
  let body = req.body;

  Usuario.findOne({ username: body.username }).exec((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "*Usuario y/o Contraseña incorrectos",
        },
      });
    }
    if (!bcrypt.compareSync(body.contrasena, usuarioDB.contrasena)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario y/o *Contraseña incorrectos",
        },
      });
    }

    // //     /*let token = jwt.sign({
    // //     usuario: usuarioDB
    // // */ }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    // // if (usuarioDB['conexion2'] != ) {
    // // suma de puntos por dia
    // let puntos = usuarioDB["puntos"] + 2;
    // //crea la fecha
    // var dt = dateTime.create();
    // // darle formato ala fecha
    // var formatted = dt.format("Y-m-d");
    // var dia1 = formatted + "2020-06-09 24:00:00 ";
    // console.log(dia1);

    // // lo convertimos a milisegundos
    // var ds = dt.getTime();
    // //le sumamos un dia
    // var day = ds + 86400000; //86400000
    // // lo regresamos a su formato original
    // var form = new Date(day);
    // //lo convertimos a formato UTC la funcion que tiene sumado un dia
    // var formUTC = form.toUTCString();
    // let dia = form.getDate();
    // let mes = form.getMonth() + 1;
    // let ano = form.getFullYear();

    // console.log(`${ano}-${mes}-${dia}`);

    // // //es la cuenta regresiva para saber la constancia del usuario
    // const getRemainTime = (deadline) => {
    //   let now = new Date(),
    //     remainTime = (new Date(deadline) - now + 1000) / 1000,
    //     // se le concatena un 0 para que aparezca antes del numero cunado es de una sola cifra
    //     remainSeconds = ("0" + Math.floor(remainTime % 60)).slice(-2),
    //     remainMinutes = ("0" + Math.floor((remainTime / 60) % 60)).slice(-2),
    //     remainHours = ("0" + Math.floor((remainTime / 3600) % 24)).slice(-2),
    //     remainDays = Math.floor(remainTime / (3600 * 24));

    //   return {
    //     remainTime,
    //     remainSeconds,
    //     remainMinutes,
    //     remainHours,
    //     remainDays,
    //   };
    // };

    // const countdown = (deadline) => {
    //   // para limpiar el contador
    //   const timeUpdate = setInterval(() => {
    //     let tiempo = getRemainTime(deadline);

    //     if (tiempo.remainTime <= 1) {
    //       clearInterval(timeUpdate);
    //       console.log("SE termino el tiempo");
    //       // var asistencia1 = usuarioDB['asistencia'] + 1;
    //       // Usuario.findByIdAndUpdate(usuarioDB['_id'], { asistencia: asistencia1, conexion2: formUTC }, { new: true, runValidators: true, context: "query" }, (err, data2) => {
    //       //     if (err) {
    //       //         return res.status(400).json({
    //       //             ok: false,
    //       //             usuario: data2,
    //       //             message: 'Erro'
    //       //                 // token
    //       //         });
    //       //     }
    //       //     console.log('FUNCIONA');
    //       //     return res.status(200).json({
    //       //         ok: true,
    //       //         usuario: data2,
    //       //         message: 'Bienvenido',

    //       //         // token
    //       //     });

    //       // })
    //     }
    //   }, 1000);
    // };

    // countdown(formUTC, "clock");
    // // }

    // //comparacion hasta que pase el dia
    // //usuarioDB['conexion'] asi es como se manda a llamar un atributo de la bd
    // if (formatted != usuarioDB["conexion"]) {
    //   console.log("Se actualizo el dia");
    //   Usuario.findByIdAndUpdate(
    //     usuarioDB["_id"],
    //     { puntos: puntos, conexion: formatted + 1 },
    //     { new: true, runValidators: true, context: "query" },
    //     (err, data) => {
    //       if (err) {
    //         return res.status(400).json({
    //           ok: false,
    //           usuario: data,
    //           message: "Erro",
    //           // token
    //         });
    //       }

    //       return res.status(200).json({
    //         ok: true,
    //         usuario: data,
    //         message: "Bienvenido",

    //         // token
    //       });
    //     }
    //   );
    // } else {
    //   console.log("No actualiza los puntos");

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
          usuario: usuarioDB,
          message: "Bienvenido",

          // token
        });
      });
    });
  });
});

//});
//})

module.exports = app;
