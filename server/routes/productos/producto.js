const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../../middlewares/autenticacion');
const Producto = require('../../models/producto');
const app = express();



app.post('/producto', (req, res) => {
    let body = req.body;

    let producto = new Producto({
        marca: body.marca,
        modelo: body.modelo,
        nombre: body.nombre,
        cdb: body.cdb,
        precio: body.precio,
        ubicacion: body.ubicacion,
        descripcion:body.descripcion,
        alias: body.alias,
        estatus:body.estatus
    });
    producto.save((err, pDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            pDB
        });
    });
});
     
module.exports = app;