var express = require('express');
const db = require('../database');
var router = express.Router();
const request = require ('request');
const axios = require ('axios');
const IP = require ('ip');
const address = IP.address();
const ipString = address.toString();
const querystring = require('querystring')
let country;
ipgeo = ipString;
const nodemailer = require('nodemailer');
const { name } = require('ejs');
const app = express();

// Definir la clave secreta de Google reCAPTCHA






request(`http://ip-api.com/json/${ipgeo}`, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const data = JSON.parse(body);
    country = data.country;
  }
})



/* GET home page. */
router.get('/', function(req, res, next) {
  let name = 'Samuel Perez'
  res.render('index', {
    title: 'Formulario de contacto',
    name: name,
  });
});
 


let comment



let date = new Date();
let fecha = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let cell = req.body.cell;
  comment = req.body.comment;
  let Datetime = fecha;
  let ip = ipString;
  let region = country;
  
 
  console.log({name, email, cell, comment, Datetime, ip, region})

  db.insert(name, email, cell, comment, Datetime, ip, region);

  res.redirect('/');
});

let comment2 = String(comment)


router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});



const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
      user: 'test009@arodu.dev',
      pass: 'eMail.test009'
  }
});

const mailOptions = {
  from: 'test009@arodu.dev',
  to: 'samueljpb@gmail.com',
  subject: 'Task 3: Third Party Connection ',
  text:`${ipString}, ${fecha}, ${country}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
  } else {
      console.log('Correo electrónico enviado: ' + info.response);
  }
}); 





module.exports = router; 