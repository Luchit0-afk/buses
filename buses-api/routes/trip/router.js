var express = require('express');
var router = express.Router();
var trip = require('./trip.js');

router.post('/new', trip.newTrip);

module.exports = router;