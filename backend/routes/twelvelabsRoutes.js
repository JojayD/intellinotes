const express = require('express');
const { createIndexController, retrieveIndexController } = require('../controllers/twelvelabsController');
const router = express.Router();

router.post('/create-index', createIndexController);
router.get('/retrieve-index', retrieveIndexController);
module.exports = router;