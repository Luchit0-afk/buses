var Trip = require('./../../schemas/trip_schema.js');

module.exports.newTrip = async function (req, res) {
    try {
        console.log(req.body);
        const { departure_city, arrival_city, cant_passengers_total } = req.body;
        const trip = await Trip.create({
            departure_city,
            arrival_city,
            cant_passengers_total,
        })
        res.status(200).json({ success: true, trip });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, error: error });
    }
};