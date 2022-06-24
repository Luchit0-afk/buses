var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var city = new Schema({
    name: {
        type: String,
        default: "",
    }, 
    state: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
});   

module.exports = mongoose.model('City', city);