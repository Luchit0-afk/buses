var express = require('express');
var router = express.Router();
var _user = require('./user.js');

router.post('/register', _user.register);
router.post('/login', _user.login);

module.exports = router;