/* jshint esversion: 8 */
//agrupa todos los archivos-rutas
const express = require("express");
const app = express();

app.use("/usuario", require("./usuario/registro"));
app.use(require('./usuario/login'));
app.use("/producto",require('./producto/producto'))

module.exports = app;