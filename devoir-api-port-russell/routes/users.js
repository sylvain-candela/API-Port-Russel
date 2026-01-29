const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const private = require('../middlewares/private');
const bulkCtrl = require('../controllers/bulk');


router.get('/', private.checkJWT, userCtrl.getAllUsers);
router.get('/users-signup', (req, res) => {
    res.render('users-signup'); 
});
router.get('/users-edit/:id', private.checkJWT, userCtrl.renderEditForm);

router.get('/dashboard', private.checkJWT, userCtrl.getDashboard);
router.get('/logout', userCtrl.logout);

router.post('/users-signup', userCtrl.signup);
router.post('/users-login', userCtrl.login);
router.post('/authenticate', userCtrl.authenticate);

router.put('/add', userCtrl.add);
router.put('/:id', userCtrl.update);


router.delete('/bulk/:type', private.checkJWT, bulkCtrl.bulkDelete);
router.post('/bulk/:type', private.checkJWT, bulkCtrl.bulkData);

router.get('/:id', private.checkJWT, userCtrl.getById);
router.patch('/:id', private.checkJWT, userCtrl.update);
router.delete('/:id', private.checkJWT, userCtrl.delete);

module.exports = router;
