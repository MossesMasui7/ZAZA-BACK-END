/* jshint esversion: 8 */

//PUERTO
process.env.PORT = process.env.PORT || 3000;

//firma de JWT
process.env.SEED = process.env.SEED || "firma-super-secreta";

//EXPIRE TIME JWT
process.env.CAD_TOKEN = process.env.CAD_TOKEN || "3h";
