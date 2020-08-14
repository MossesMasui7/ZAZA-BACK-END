const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../../models/usuario");
const resetpass = require('../../../scripts/resetpass')
const app = express();
var path = require('path')
var idUser

app.post("/reset/", (req, res) => {

    let contra = req.body.contra
    let contra2 = req.body.contra2

    if (contra === contra2) {
        Usuario.findByIdAndUpdate(
            idUser, { contrasena: bcrypt.hashSync(contra, 10) }, { new: true, runValidators: true, context: "query" },
            (err, usrDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                return res.send("<h1>Restablecimiento Exitoso</h1>")
            }
        );
    }
    if (contra !== contra2) {
        return res.status(400).json({
            ok: false,
            msg: "Contraseñas no coinciden"
        })
    }




});
app.get("/reset/vistas/:id", (req, res) => {
    let id = req.params.id
    idUser = id
    res.sendFile(path.join(__dirname + '/reset.html'))
})

app.get("/resetpass/:email", (req, res) => {
    let email = req.params.email;
    Usuario.find({ email: email }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                resp: err
            })

        } else {
            resetpass(usrDB[0]._id, email)
            return res.status(200).json({
                ok: true,
                usrDB
            })
        }

    })
})



module.exports = app;