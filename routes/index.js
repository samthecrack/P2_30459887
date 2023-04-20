var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let name = 'Samuel Perez'


  res.render('index', {
    title: 'CURRICULUM VITAE',
    name: name,
  });
});

module.exports = router;
