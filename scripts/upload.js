const express = require('express');
const fileupload = require('express-fileupload');
const { verificatoken } = require('../middlewares/autenticar');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();

const Usuario = require('../models/usuario');
const Libro = require('../models/libro');

app.use(fileupload());

// En RUTA va a donde queremos guardar el archvo y en id va el id del archivo
app.put('/upload/:ruta/:id',[verificatoken], (req, res)=> {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    //PATH sirve para la extension del archivo
    let nombre = uniqid() + path.extname(archivo.name);
    //Valida que el archivo exista o que se envia y si entra al if es por que no lo ha enviado
    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        })

    }
    //Se valida que la extension de la imagen que suba el usuario sea igual a alguna de las que se encuentra dentro del array
let validExtensions = ['image/png','image/jpg','image/gif','image/jpeg'];
if(!validExtensions.includes(archivo.mimetype)){
    return res.status(400).json({
        ok: false,
        err: {
        message: 'Solo las extenciones .png, .jpg, .gif, .jpeg son validas'
        }
    })
}

       // Esta funcion sube el archivo, pero aun no se almacena donde debe de ir
       archivo.mv(`uploads/${ruta}/${nombre}`,(err) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
    });
    //este switch guarda el archivo subido a la base de datos dependiendo de la ruta, es decir actualiza la coleccion(tabla)
switch(ruta) {
    case 'libro':
        imagenLibro(id, res, nombre);
        break
    case 'usuario':
        imagenUsuario(id, res, nombre);
        break
        default: 
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Ruta no valida'
            }
        });
        break
}
})
// Es la funcion para subir o guardar imagenes y lleva 3 parametros, el id, la respuesta del servidor y el nombre de la imagen
// Si llegaase a ocurrir un error la funcion borrar archivo elimina el archivo subido para que no este ocupando espacio
function imagenUsuario(id, res, nombreImagen){
    Usuario.findById(id, (err, usr ) => {
        if(err){
            borrarArchivo(nombreImagen, 'usuario')
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!usr){
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'

                }
            });
        };
        usr.img = nombreImagen;
        usr.save((err, usrDB) => {
            if(err){
                borrarArchivo(nombreImagen, 'usuario')
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                usrDB
            })

        })

});


};
function imagenLibro(id, res, nombreImagen){
    Libro.findById(id, (err, lbr ) => {
        if(err){
            borrarArchivo(nombreImagen, 'libro')
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!lbr){
            borrarArchivo(nombreImagen, 'libro')
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'

                }
            });
        };
        lbr.img = nombreImagen;
        lbr.save((err, lbrDB) => {
            if(err){
                borrarArchivo(nombreImagen, 'libro')
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                lbrDB
            })

        })

});


}
function borrarArchivo(nombreImagen, ruta){
    let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);
    if (fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg)
    }
    console.log('imagen borrada con exito')
}

module.exports = app;