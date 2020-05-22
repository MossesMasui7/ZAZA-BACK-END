"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function enviar(id,email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
 auth: {
        user: 'omar.wst13@gmail.com',
        pass: 'omar1360'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"ZAZA" <noReplay@zaza.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Restablecer contraseña ZAZA", // Subject line
    text: `http://localhost:3000/api/usuario/reset/vistas/${id}`, // plain text body
    html: `<b><a href="http://localhost:3000/api/usuario/reset/vistas/${id}">Click Aqui</a></b>` // html body
  });


}

module.exports = enviar