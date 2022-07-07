var express = require('express');
const passport = require('passport');
var router = express.Router();
var _auth = require('./auth.js');

const requireAuth = passport.authenticate('jwt', {
    session: false
});
const requireSignIn = passport.authenticate('local', {
    session: false
});

router.get('/validate', requireAuth, _auth.validate);
router.post('/login', requireSignIn, _auth.login);
router.post('/register', _auth.register);

module.exports = router;
