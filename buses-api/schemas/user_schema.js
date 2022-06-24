var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    }
});   

module.exports = mongoose.model('User', user);