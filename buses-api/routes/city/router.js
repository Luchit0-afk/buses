var express = require('express');
var router = express.Router();
var _city = require('./city.js');

router.get('/getAll', _city.getAllCities);

module.exports = router;