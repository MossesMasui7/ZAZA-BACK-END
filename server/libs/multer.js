const multer = require('multer');

//Configuracion de multer 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
});
const upload = multer({ storage: storage });

module.exports = upload;