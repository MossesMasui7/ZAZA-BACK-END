const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PublicidadSchema = new Schema({
    idNegocio: {
        type: Schema.Types.ObjectId,
        required: [true, 'La id del negocio es obligatoria']
    },
    slider: {
        type: Array
    },
    imagenUno: {
        type: String
    },
    imagenDos: {
        type: String
    },
    imagenTres: {
        type: String
    },
    imagenCuatro: {
        type: String
    }
});

const host = 'http://localhost';
const port = 3000;

PublicidadSchema.methods.imgUrl = function imgUrl(filenameUno, filenameDos, filenameTres, filenameCuatro) {
    this.imagenUno = `${host}:${port}/public/${filenameUno}`
    this.imagenDos = `${host}:${port}/public/${filenameDos}`
    this.imagenTres = `${host}:${port}/public/${filenameTres}}`
    this.imagenCuatro = `${host}:${port}/public/${filenameCuatro}`
}

module.exports = mongoose.model("Publicidad", PublicidadSchema);