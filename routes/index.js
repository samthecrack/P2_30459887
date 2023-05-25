var express = require('express');
const db = require('../database');
var router = express.Router();
const IP = require ('ip');
const address = IP.address();
const ipString = address.toString();

/* GET home page. */
router.get('/', function(req, res, next) {
  let name = 'Samuel Perez'
  res.render('index', {
    title: 'Formulario de contacto',
    name: name,
  });
});
 
router.post('/', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let cell = req.body.cell;
  let comment = req.body.comment;
  let date = new Date();
  let Datetime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  let ip = ipString;

  db.insert(name, email, cell, comment, Datetime, ip);

  console.log({name, email, cell, comment, Datetime, ip});

  res.redirect('/');
});

router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});

module.exports = router; 