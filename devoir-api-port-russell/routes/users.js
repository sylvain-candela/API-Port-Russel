const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const private = require('../middlewares/private');
const bulkCtrl = require('../controllers/bulk');

router.get('/signup', (req, res) => {
    res.render('signup'); 
});

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/authenticate', userCtrl.authenticate);

router.put('/add', userCtrl.add); 

router.get('/:id', private.checkJWT, userCtrl.getById);
router.patch('/:id', private.checkJWT, userCtrl.update);
router.delete('/:id', private.checkJWT, userCtrl.delete);

router.delete('/bulk/:type', private.checkJWT, bulkCtrl.bulkDelete);
router.post('/bulk/:type', private.checkJWT, bulkCtrl.bulkData);


module.exports = router;
