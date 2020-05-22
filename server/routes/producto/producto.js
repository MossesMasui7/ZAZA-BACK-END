const express = require('express');
const _ = require('underscore');
const { verificatoken } = require('../../middlewares/autenticacion');
const Producto = require('../../models/producto');
const app = express();



app.post('/registrar', (req, res) => {
    let body = req.body;

    let producto = new Producto({
        marca: body.marca,
        modelo: body.modelo,
        nombre: body.nombre,
        cdb: body.cdb,
        precio: body.precio,
        ubicacion: body.ubicacion,
        descripcion:body.descripcion,
        alias: body.alias
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

app.get('/obtener/:cdb',(req,res) => {
        let cdb = req.params.cdb
    Producto.find({cdb:cdb},(err,Prodb)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                cont:err
            })
        }
        return res.status(200).json({
            ok:true,
            resp:Prodb
        })
    })

});
     
module.exports = app;