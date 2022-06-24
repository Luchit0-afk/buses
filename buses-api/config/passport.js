var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;
var User = require('./../schemas/user_schema.js');

passport.use(new PassportLocal( function(username, password, done){
    try{
        User.findOne({ username }, function (err, user) {
            if(err){
                console.log(err);
                throw new Error(err);
            }
            if(!user){
                return done(null, { msg: "User could not be found." });      
            }
            if( !!user && user.password !== password ){
                return done(null, { msg: "The password is incorrect." }); 
            }
            done(null, user);
        });
    } catch(err) {
        console.log(err);
        done(err, null);
    }
}))

//Serializacion
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//Deserializacion
passport.deserializeUser(function(id, done){
    try {
        User.findOne({ _id: id}, function (err, user) {
            if(err){
                console.log(err);
                throw new Error(err);
            }
            if(!!user){
                return done(null, user);      
            }
            done(null, { success: false });
        })
    } catch (err) {
        console.log(err);
        done(err, null);
    }
})