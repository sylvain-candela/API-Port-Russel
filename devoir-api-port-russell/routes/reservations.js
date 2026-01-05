const express =require('express');
const router = express.Router();
const reservationCtrl = require('../controllers/reservations');
const private = require('../middlewares/private');

router.get('/', private.checkJWT, reservationCtrl.getAllReservations);
router.post('/', reservationCtrl.add);
router.get('/:id', private.checkJWT, reservationCtrl.getByCatway);
router.put('/:id', reservationCtrl.modifyReservation);
router.delete('/:id', private.checkJWT,reservationCtrl.deleteReservation);


module.exports = router
