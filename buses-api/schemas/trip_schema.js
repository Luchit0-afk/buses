var mongoose = require('mongoose');
var Passenger = require('./passenger_schema.js').schema;
var City = require('./city_schema.js').schema;

var Schema = mongoose.Schema;

var trip = new Schema({
    departure_city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        es_schema: City,
    },
    arrival_city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        es_schema: City,
    },
    cant_passengers_total: {
        type: Number,
        default: 0,
    },
    departure_time: {
        type: Date,
        default: null,
    },
    arrival_time: {
        type: Date,
        default: null,
    },
    passengers: [{
        type: Schema.Types.ObjectId,
        ref: 'Passenger',
        es_schema: Passenger,
    }]
});   

module.exports = mongoose.model('Trip', trip);