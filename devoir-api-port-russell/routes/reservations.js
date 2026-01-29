const express = require('express');
const router = express.Router();
const reservationCtrl = require('../controllers/reservations');
const private = require('../middlewares/private');
const bulkCtrl = require('../controllers/bulk');

router.get('/reservations-add', private.checkJWT, (req, res) => {
    res.render('reservations-add');
});

router.get('/reservations-edit/:id', private.checkJWT, reservationCtrl.renderEditForm);

router.get('/', private.checkJWT, reservationCtrl.getAllReservations);

router.get('/:id', private.checkJWT, reservationCtrl.getByReservation);

router.post('/reservations-add', reservationCtrl.add);

router.post('/bulk/:type', bulkCtrl.bulkData);

router.put('/:id', reservationCtrl.modifyReservation);

router.delete('/bulk/:type', bulkCtrl.bulkDelete);

router.delete('/:id', private.checkJWT, reservationCtrl.deleteReservation);

module.exports = router;