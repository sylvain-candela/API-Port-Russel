var express = require('express');
var router = express.Router();
const private = require('../middlewares/private');


const userRoute = require('./users');


/* GET home page. */
router.get('/', function(req, res){
  res.render('index', {
    title: 'Accueil'
  })
});

router.get('/dashboard', private.checkJWT, function(req, res) {
  res.render('dashboard', {
    title: 'Tableau de bord'
  });
});

module.exports = router;
