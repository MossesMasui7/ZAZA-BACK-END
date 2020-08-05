const base64Img = require("base64-img");
const uniqid = require("uniqid");
const isBase64 = require("is-base64");

function uploadImage(string, ruta) {
  let base64;
  if (!string) {
    string = "noimage.jpg";
  }
  if (string.length > 23) {
    base64 = string.substr(23);
  } else {
    base64 = string;
  }
  let imgId = uniqid();

  if (isBase64(base64)) {
    let imagen = base64Img.imgSync(string, `./uploads/${ruta}/`, imgId);
    imagen = imagen.split("\\", -1);
    imagen = imagen[2];
    return imagen;
  } else {
    return "noimage.jpg";
  }
}

module.exports = uploadImage;
