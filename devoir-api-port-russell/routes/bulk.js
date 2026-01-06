const express = require('express');
const router = express.Router();
const bulkCtrl = require('../controllers/bulk');

router.post('/:type', bulkCtrl.bulkData);
router.delete('/:type', bulkCtrl.bulkDelete);

module.exports = router;