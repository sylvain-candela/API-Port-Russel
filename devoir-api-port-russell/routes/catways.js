const express =require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catways');
const private = require('../middlewares/private');

router.get('/', private.checkJWT, catwayCtrl.getAllCatways);
router.post('/', catwayCtrl.add);
router.get('/:id', private.checkJWT, catwayCtrl.getOneCatway);
router.put('/:id', catwayCtrl.modifyCatway);
router.delete('/:id', private.checkJWT,catwayCtrl.deleteCatway);


module.exports = router



