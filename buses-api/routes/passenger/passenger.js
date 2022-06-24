var Passenger = require('./../../schemas/passenger_schema.js');
var Trip = require('./../../schemas/trip_schema.js');

//TODO: Add pagination
module.exports.newPassanger = async function (req, res) {
    try {
        //TODO: Add a credit card 
        const { tripId, name, age } = req.body;
        const passenger = await Passenger.create({
            trip: tripId,
            name,
            age
        });
        const trip = await Trip.find({ _id: tripId });
        trip.passengers = trip.passengers.push(passenger._id);
        trip.cant_passengers_available = trip.cant_passengers_available - 1;
        trip.save();
        res.status(200).json({ success: true, passenger });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, error: error });
    }
}