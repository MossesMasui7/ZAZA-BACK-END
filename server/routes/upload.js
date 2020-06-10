const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const Publicidad = require('../models/publicidad');

//Configuracion de multer 
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({ storage: storage });


//Subida de fotos 
app.post('/subir', upload.single('picture'), (req, res) => {
    let img = fs.readFileSync(req.file.path);
    let encode_image = img.toString('base64');

    let finalImg = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_image, 'base64')
    };
    db.collection('quotes').insertOne(finalImg, (err, result) => {
        console.log(result)

        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')


    })
});

//Obtener fotos 
app.get('/photo/:id', (req, res) => {
    var filename = req.params.id;

    db.collection('mycollection').find({ '_id': ObjectId(filename) }, (err, result) => {

        if (err) return console.log(err)

        res.contentType('image/jpeg');
        res.send(result.image.buffer)

    })
})

//     let validExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
//     if (!validExtensions.includes(archivo.mimetype)) {
//         return res.status(400).json({
//             ok: false,
//             err: {
//                 message: 'No se admite esta extencion de imagen'
//             }
//         });
//     }

function borrarArchivo(nombreImagen, ruta) {
    let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
    console.log('Imagen borrada con exito');
}