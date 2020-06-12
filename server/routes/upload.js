const express = require('express');
const app = express();
const upload = require('../libs/multer');
const { addPub, getPub } = require('../controllers/pubController');

app.post('/publicidad', upload.single('image'), addPub);
app.get('/publicidad', getPub);

module.exports = app;