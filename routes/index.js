var express = require('express');
const db = require('../database');
var router = express.Router();

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
  let date = new Date(); // @todo falta formatear la fecha
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // @todo falta formatear la ip

  db.insert(name, email, cell, comment, date, ip);

  console.log({name, email, cell, comment, date, ip})

  res.redirect('/');
});

router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});

module.exports = router;