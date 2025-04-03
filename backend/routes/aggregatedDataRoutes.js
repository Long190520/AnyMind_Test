const express = require('express');
const aggregatedDataController = require('../controller/aggregatedDataController');

const router = express.Router();

router.post('/', aggregatedDataController.fetchAggregatedData);
router.get('/', aggregatedDataController.getAggregatedData);

module.exports = router;
