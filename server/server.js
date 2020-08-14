/* jshint esversion: 8 */
require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
//habilita CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse formato a application/json
app.use(bodyParser.json({ limit: "10mb", extended: true }));
//archivo agrupador de indices
app.use("/api", require("./routes/index"));
//conector a la db

mongoose.connect(
  "mongodb+srv://zaza1:OM945kWYtSdBNQCY@cluster0-21svm.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, resp) => {
    if (err) throw err;

    console.log("Base de datos ONLINE");
  }
);
//puerto que escucha
app.listen(process.env.PORT);
console.log("Escuchando por el Puerto <3 " + process.env.PORT);
