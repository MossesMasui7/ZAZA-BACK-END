/* jshint esversion: 8 */

//PUERTO
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//conexion a la db
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb+srv://zaza1:OM945kWYtSdBNQCY@cluster0-21svm.mongodb.net/test?retryWrites=true&w=majority";

} else {
  urlDB = "mongodb://localhost:27017/ZAZA";
  }

process.env.URLDB = urlDB;

//firma de JWT
process.env.SEED = process.env.SEED || "firma-super-secreta";

//EXPIRE TIME JWT
process.env.CAD_TOKEN = process.env.CAD_TOKEN || "3h";