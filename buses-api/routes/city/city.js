var City = require('./../../schemas/city_schema.js');

//TODO: Add pagination
module.exports.getAllCities = async function (req, res) {
    try{
      const cities = await City.find({});
      res.status(200).json({ success: true, cities });
    } catch(error) {
      console.log(error);
      res.status(401).json({success: false, error: error});
    }
}