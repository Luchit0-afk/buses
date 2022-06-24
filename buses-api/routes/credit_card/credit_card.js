var CreditCard = require('./../../schemas/credit_card_schema.js');
var Passenger = require('./../../schemas/passenger_schema.js');
var Trip = require('./../../schemas/trip_schema.js');

module.exports.newCreditCard = async function (req, res) {
  try{
    const credit_card_object = await CreditCard.create({ 
        numbers: "1111-0000-2222-0000",
        owner_name: "Luciano Palacio",
        expiration_date: Date.now(),
        security_code: 1234,
    });
    const credit_card_find = await CreditCard.findOne({ owner_name: "Sofia Urquiza" })
    const passenger_luciano = await Passenger.create({
        name: "Luciano Palacio",
        age: 21,
        credit_card: credit_card_object._id,
    })
    const passenger_sofia = await Passenger.create({
        name: "Sofia Urquiza",
        age: 21,
        credit_card: credit_card_find._id,
    })
    const trip = await Trip.create({
        departure_city: "Rio Cuarto",
        arrival_city: "Cordoba",
        cant_passengers_total: 30,
        passengers: [passenger_luciano._id, passenger_sofia._id],
    })
    console.log(trip);
    res.status(200).json({});
  } catch(error) {
    console.log(error);
    res.status(401).json({success: false, error: error});
  }
};

module.exports.getAllCreditsCard = async function (req, res) {
  try{
    const creditsCards = await CreditCard.find({});
    res.status(200).json({ creditsCards });
  } catch(error) {
    console.log(error);
    res.status(401).json({success: false, error: error});
  }
}