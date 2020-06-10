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

module.exports = mongoose.model("Publicidad", PublicidadSchema);