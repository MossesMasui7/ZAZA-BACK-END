const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/:ruta/:img", (req, res) => {
  let noImage;
  let ruta = req.params.ruta;
  let img = req.params.img;
  let rutaImagen = path.resolve(__dirname, `../../uploads/${ruta}/${img}`);
  switch (ruta) {
    case "users":
      noImage = path.resolve(__dirname, "../../assets/noimage.jpg");
      break;
    case "producto":
      noImage = path.resolve(__dirname, "../../assets/noimage.jpg");
      break;
    case "publicidad":
      noImage = path.resolve(__dirname, "../../assets/noimage.jpg");
      break;
  }

  if (fs.existsSync(rutaImagen)) {
    return res.sendFile(rutaImagen);
  } else {
    return res.sendFile(noImage);
  }
});

module.exports = app;
