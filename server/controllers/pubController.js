const Publicidad = require('../models/publicidad');

//Funcion agregar publicidad 
async function addPub(req, res) {
    try {
        const {
            idNegocio,
            slider,
            imagenUno,
            imagenDos,
            imagenTres,
            imagenCuatro
        } = req.body;

        const publicidad = Publicidad({
            idNegocio,
            slider,
            imagenUno,
            imagenDos,
            imagenTres,
            imagenCuatro
        });

        if (req.file) {
            const { filenameUno, filenameDos, filenameTres, filenameCuatro } = req.file;
            publicidad.imgUrl(filenameUno, filenameDos, filenameTres, filenameCuatro);
        }

        const pubSaved = await publicidad.save();

        return res.status(200).send(pubSaved);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
};

//Funcion para pedir publicidad 
async function getPub(req, res) {
    const publicidad = Publicidad.find().lean().exec();
    return res.status(200).send(publicidad);

};

module.exports = {
    addPub,
    getPub
}