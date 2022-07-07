const jwt = require('jwt-simple');
const User = require('./../../schemas/user_schema.js');
const secret = process.env.JWT_SECRET;

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

module.exports.login = async function (req, res) {
    res.status(200).json({ token: tokenForUser(req.user) });
}

module.exports.register = async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).json({ msg: 'Email and password must be provided' });
    }
    else {
        User.findOne({ email: email }, function (err, existingUser) {
            if (err) {
                return next(err);
            }

            if (existingUser) {
                return res.status(422).json({ msg: 'Email is already in use...' });
            }

            const user = new User({
                email: email,
                password: password
            });

            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.status(200).json({ token: tokenForUser(user) });
            });
        });
    }
}

module.exports.validate = async function (req, res) {
    res.status(200).json({ user: req.user.email });
}