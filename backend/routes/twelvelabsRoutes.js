const express = require('express');
const { createIndexController } = require('../controllers/twelvelabsController');
const router = express.Router();

router.post('/create-index', createIndexController);

module.exports = router;