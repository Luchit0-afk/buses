var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var credit_card = new Schema({
    numbers: {
        type: String,
        default: "",
    }, 
    owner_name: {
        type: String,
        default: "",
    },
    expiration_date: {
        type: Date,
        default: null,
    },
    security_code: {
        type: Number,
        default: -1,
    }
});   

module.exports = mongoose.model('CreditCard', credit_card);