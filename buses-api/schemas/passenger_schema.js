var mongoose = require('mongoose');
var CreditCard = require('./credit_card_schema.js').schema;

var Schema = mongoose.Schema;

var passenger = new Schema({
    name: {
        type: String,
        default: "",
    }, 
    age: {
        type: Number,
        default: -1,
    },
    credit_card: {
        type: Schema.Types.ObjectId,
        ref: 'CreditCard',
        es_schema: CreditCard,
    }
});   

module.exports = mongoose.model('Passenger', passenger);