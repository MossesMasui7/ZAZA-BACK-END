const express = require('express');
const _ = require('underscore');
const Categoria = require('../../models/categoria');
const app = express();


//RUTA PARA OBTENER LOS DATOS DE LAS CATEGORIAS QUE SE VAN A MOSTRAR EN PANTALLA
app.route('/obtenerCategorias').get(function (req, res) {
    Categoria.find(function (err, categoria){
    if(err){
      console.log(err);
    }
    else {
      res.json(categoria);
    }
  });
});



//RUTA PARA REGISTRAR UNA NUEVA CATEGORIA
app.post('/registrarCategoria',(req,res) =>{

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
    });  
    categoria.save((err, categoriaDB) =>{
        if (err) {
           return res.status(400).json({
                ok:false,
                err
            });
            
        }
        return res.status(200).json({
            ok: true,
            categoriaDB
        });
    });

});


//RUTA PARA ACTUALIZAR LOS DATOS DE UNA CATEGORIA
app.put('/actualizarTienda/:id',(req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Categoria.findByIdAndUpdate(id, body,{new:true, runValidators: true, context: 'query'},(err, categoriaDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            categoriaDB
        });
    });
});

module.exports = app;