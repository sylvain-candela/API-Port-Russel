var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users')
const private = require('../middlewares/private');

router.put('/add', userCtrl.add);
router.post('/authenticate', userCtrl.authenticate);


router.get('/:id', private.checkJWT, userCtrl.getById);
router.patch('/:id', private.checkJWT, userCtrl.update);
router.delete('/:id', private.checkJWT, userCtrl.delete);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



module.exports = router;
