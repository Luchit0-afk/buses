var passport = require('passport');
var User = require('./../../schemas/user_schema.js');

module.exports.register = async function (req, res) {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            username,
            email,
            password,
        });        
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, error: error });
    }
}

module.exports.login = async function (req, res) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
          console.log('passport error exception');
          res.status(401).json({ success: false, err });
          return;
        }
        const msg = user.msg;
        user.msg = undefined;
        if( !!user ){
            res.status(200).json({ success: true, msg, user });
        }
        else{
            res.status(200).json({ success: false, msg: "Something went wrong when try to login. Please try again." });
        }
    })(req, res);
}