var passport = require('passport');
const jwt = require("jsonwebtoken")
var User = require('./../../schemas/user_schema.js');
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("./../../config/authenticate.js")

module.exports.register = async function (req, res) {
    try {
        const { username, password } = req.body;
        User.register(
            new User({ username }),
            password,
            (err, user) => {
                if (err) {
                    res.status(500).json({ success: false, err });
                } else {
                    const token = getToken({ _id: user._id })
                    const refreshToken = getRefreshToken({ _id: user._id })
                    user.refreshToken.push({ refreshToken })
                    user.save((err, user) => {
                        if (err) {
                            res.status(500).json({ success: false, err });
                        } else {
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                            res.status(200).json({ success: true, token });
                        }
                    })
                }
            }
        )
    } catch (err) {
        console.log(err);
        res.status(401).json({ success: false, err });
    }
}

module.exports.login = async function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log('passport error exception');
            res.status(401).json({ success: false, err });
            return;
        }
        else {
            const token = getToken({ _id: user._id })
            const refreshToken = getRefreshToken({ _id: user._id })
            User.findById(user._id, function (err, user) {
                if (err) {
                    res.status(401).json({ success: false, err: err });
                }
                else {
                    if (user) {
                        user.refreshToken.push({ refreshToken })
                        user.save((err, user) => {
                            if (err) {
                                res.status(500).json({ success: false, err });
                            } else {
                                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                                res.status(200).json({ success: true, token });
                            }
                        })
                    }
                    else {
                        //Esto salta cuando el usuario y la contraseña no coincide con ningun usuario guardado
                        res.status(401).json({ success: false, msg: "The user can't be finded" });
                    }
                }

            })
        }
    })(req, res);
}

module.exports.refreshToken = async function (req, res, next) {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id
            User.findOne({ _id: userId }).then(
                user => {
                    if (user) {
                        // Find the refresh token against the user record in database
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        )

                        if (tokenIndex === -1) {
                            res.status(401).json({ success: true, msg: "Unauthorized" });
                        } else {
                            const token = getToken({ _id: userId })
                            // If the refresh token exists, then create new one and replace it.
                            const newRefreshToken = getRefreshToken({ _id: userId })
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                            user.save((err, user) => {
                                if (err) {
                                    res.status(500).json({ success: true, err });
                                } else {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                    res.status(200).json({ success: true, token });
                                }
                            })
                        }
                    } else {
                        res.status(401).json({ success: true, msg: "Unauthorized" });
                    }
                },
                err => next(err)
            )
        } catch (err) {
            res.status(401).json({ success: true, err });
        }
    } else {
        res.status(401).json({ success: true, msg: "Unauthorized" });
    }
}

//Ver si logout anda

module.exports.logout = async function (req, res, next) {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
    User.findById(req.user._id).then(
        user => {
            const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
            )

            if (tokenIndex !== -1) {
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            }

            user.save((err, user) => {
                if (err) {
                    res.status(500).json({ success: true, err });
                } else {
                    res.clearCookie("refreshToken", COOKIE_OPTIONS)
                    res.status(200).json({ success: true });
                }
            })
        },
        err => next(err)
    )
}