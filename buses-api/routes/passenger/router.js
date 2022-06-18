var express = require('express');
var router = express.Router();
var _passenger = require('./passenger.js');

router.post('/new', _passenger.newPassanger);

module.exports = router;