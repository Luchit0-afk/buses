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
        console.log(user);
        if( !!user ){
            res.status(200).json({ success: true, user });
        }
        else{
            res.status(200).json({ success: false });
        }
    })(req, res);
}