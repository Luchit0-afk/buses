var express = require('express');
var router = express.Router();
var _user = require('./user.js');
const { verifyUser } = require("./../../config/authenticate.js")


router.post('/register', _user.register);
router.post('/login', _user.login);
router.post('/refreshToken', _user.refreshToken);
router.get('/logout', verifyUser, _user.logout);


module.exports = router;