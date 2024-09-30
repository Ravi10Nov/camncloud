const express = require('express');

const router = express.Router();

const submitScore = require('../controller/submitScore');

router.post('/submit_score',submitScore);

module.exports = router;