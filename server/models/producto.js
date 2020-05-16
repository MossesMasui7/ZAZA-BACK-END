const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let productoSchema = new Schema({

    marca: {
        type: String,
        required: [true, 'ingresa la marca']
    },
    modelo: {
        type: String,
        required: [true, ' ingresa el modelo']
    },
    nombre: {
        type: String,
        required: [true, ' ingresa el nombre']
    },
    cdb: {
        type: String,
        required: [true, ' ingresa el codigo de barra']
    },
    precio: {
        type: String,
        required: [true, ' ingresa el precio']
    },
    ubicacion: {
        type: String,
        required: [true, ' ingresa la ubicacion']
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor ingresa la descripcion']
    },
    alias: {
        type: String,
        required: [true, 'Por favor ingresa el alias']
    }
    
    

});

productoSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Producto', productoSchema);