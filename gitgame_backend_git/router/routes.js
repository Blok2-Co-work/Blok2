const express = require('express');
const tourController = require('./controller/controller.js');

const router = express.Router();

router.route('/scores')
    .get(tourController.getScores)

router.route('/leaderboard')
    .get(tourController.getScoresSorted);

router.route('/games')
    .get(tourController.getGameByDifficulty);

router.route('/scores_all')
    .get(tourController.getScoresAll)
    .post(tourController.setScore);

module.exports = router;