/* jshint esversion: 8 */
//agrupa todos los archivos-rutas
const express = require("express");
const app = express();

app.use("/usuario", require("./usuario/registro"));
app.use("/usuario", require("./usuario/buscar"));
app.use(require("./usuario/login"));
app.use("/usuario", require("./usuario/actualizacion"));
app.use("/producto", require("./producto/producto"));
app.use("/usuario", require("./usuario/resetpass"));
app.use(require("./negocio/negocio"));
app.use(require("./negocio/categoria"));
app.use("/producto", require("./producto/actualizar"));
app.use("/publicidad", require("./publicidad/publicidad"));
app.use("/imagen", require("./imagen"));
module.exports = app;
