const express = require("express");
const { getResponse } = require("../controllers/openaiController");
const router = express.Router();

router.get("/openai", getResponse);

module.exports = router;
