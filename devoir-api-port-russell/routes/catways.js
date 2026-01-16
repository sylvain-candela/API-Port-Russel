const express =require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catways');
const private = require('../middlewares/private');
const bulkCtrl = require('../controllers/bulk');

router.get('/', private.checkJWT, catwayCtrl.getAllCatways);
router.get('/:id', private.checkJWT, catwayCtrl.getOneCatway);



router.post('/', catwayCtrl.add);
router.post('/bulk/:type', bulkCtrl.bulkData);

router.put('/:id', catwayCtrl.modifyCatway);

router.delete('/bulk/:type', bulkCtrl.bulkDelete);
router.delete('/:id', private.checkJWT,catwayCtrl.deleteCatway);


module.exports = router



