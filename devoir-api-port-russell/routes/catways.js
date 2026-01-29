const express = require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catways');
const private = require('../middlewares/private');
const bulkCtrl = require('../controllers/bulk');

router.get('/', private.checkJWT, catwayCtrl.getAllCatways);
router.get('/catways-add', private.checkJWT, (req, res) => {
    res.render('catways-add');
});
router.get('/catways-edit/:id', private.checkJWT, catwayCtrl.renderEditForm);
router.post('/catways-add', catwayCtrl.add);
router.post('/bulk/:type', bulkCtrl.bulkData);
router.get('/:id', private.checkJWT, catwayCtrl.getOneCatway);
router.put('/:id', catwayCtrl.modifyCatway);

router.delete('/:id', private.checkJWT, catwayCtrl.deleteCatway);

router.delete('/bulk/:type', bulkCtrl.bulkDelete);

module.exports = router;