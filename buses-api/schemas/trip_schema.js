var mongoose = require('mongoose');
var Passenger = require('./passenger_schema.js').schema;

var Schema = mongoose.Schema;

var trip = new Schema({
    departure_city: {
        type: String,
        default: "",
    }, 
    arrival_city: {
        type: String,
        default: "",
    },
    cant_passengers_total: {
        type: Number,
        default: 0,
    },
    passengers: [{
        type: Schema.Types.ObjectId,
        ref: 'Passenger',
        es_schema: Passenger,
    }]
});   

module.exports = mongoose.model('Trip', trip);