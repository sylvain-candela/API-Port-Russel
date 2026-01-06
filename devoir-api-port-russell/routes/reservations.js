const express =require('express');
const router = express.Router();
const reservationCtrl = require('../controllers/reservations');
const private = require('../middlewares/private');
const bulkCtrl = require('../controllers/bulk');

router.get('/', private.checkJWT, reservationCtrl.getAllReservations);
router.get('/:id', private.checkJWT, reservationCtrl.getByReservation);

router.post('/', reservationCtrl.add);
router.post('/bulk/:type', bulkCtrl.bulkData);

router.put('/:id', reservationCtrl.modifyReservation);

router.delete('/:id', private.checkJWT,reservationCtrl.deleteReservation);
router.delete('/bulk/:type', bulkCtrl.bulkDelete);


module.exports = router
