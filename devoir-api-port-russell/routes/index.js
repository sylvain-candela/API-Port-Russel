var express = require('express');
var router = express.Router();


const userRoute = require('./users');


/* GET home page. */
router.get('/', function(req, res){
  res.render('index', {
    title: 'Accueil'
  })
});


module.exports = router;
