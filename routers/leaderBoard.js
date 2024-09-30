const express = require('express');

const router = express.Router();

const leaderboardData = require('../controller/leaderbordData');

router.get('/leaderboard',leaderboardData);

module.exports = router;