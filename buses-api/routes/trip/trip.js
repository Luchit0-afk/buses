var Trip = require('./../../schemas/trip_schema.js');

module.exports.newTrip = async function (req, res) {
    try {
        const { departure_city, arrival_city, cant_passengers_total, departure_time, arrival_time } = req.body;
        const trip = await Trip.create({
            departure_city,
            arrival_city,
            departure_time,
            arrival_time,
            cant_passengers_total,
            cant_passengers_available: cant_passengers_total,
        })
        res.status(200).json({ success: true, trip });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, error: error });
    }
};

module.exports.findTrips = async function (req, res) {
    try {
        const { departure_city, arrival_city } = req.body;
        const trips = await Trip.find({
            departure_city,
            arrival_city,
        })
        res.status(200).json({ success: true, trips });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, error: error });
    }
};