var express = require('express');
var router = express.Router();
const private = require('../middlewares/private');
const userCtrl = require('../controllers/users');


const userRoute = require('./users');


/* GET home page. */
router.get('/', function(req, res){
  res.render('index', {
    title: 'Accueil'
  })
});

router.get('/dashboard', private.checkJWT, userCtrl.getDashboard);

module.exports = router;
