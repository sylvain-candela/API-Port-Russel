var express = require('express');
var router = express.Router();

const service = require('../services/users');

const private = require('../middlewares/private');

router.put('/add', service.add);
router.post('/authenticate', service.authenticate);
console.log("Contenu du service :", service);

router.get('/:id', private.checkJWT, service.getById);
router.patch('/:id', private.checkJWT, service.update);
router.delete('/:id', private.checkJWT, service.delete);



module.exports = router;
