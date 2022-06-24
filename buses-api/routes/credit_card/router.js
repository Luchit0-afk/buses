var express = require('express');
var router = express.Router();
var credit_card = require('./credit_card.js');

router.get('/new', credit_card.newCreditCard);
router.get('/getAll', credit_card.getAllCreditsCard);

module.exports = router;