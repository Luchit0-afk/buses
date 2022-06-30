const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

//Intentar eliminar este schema y pasarlo directamente con otro tipo
const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new Schema({
    authStrategy: {
        type: String,
        default: "local",
    },
    refreshToken: {
        type: [Session],
    },
})

//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User)