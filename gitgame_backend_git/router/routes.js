const express = require('express');
const tourController = require('controller/controller.js');

const router = express.Router();

router.route('/scores')
    .get(tourController.getScores)
    .post(tourController.setScore);

router.route('/leaderboard')
    .get(tourController.getScoresSorted);

router.route('/games')
    .get(tourController.getGameByDifficulty);

module.exports = router;