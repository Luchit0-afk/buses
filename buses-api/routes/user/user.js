var User = require('./../../schemas/user_schema.js');

module.exports.register = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await Trip.create({
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
    try {
        //TODO:
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, error: error });
    }
}