const express = require('express');
const tourController = require('controller/controller.js');

const router = express.Router();

router.route('/scores')
    .get(tourController.getScores)
    .post(tourController.setScore);

router.route()

module.exports = router;