require('../../config/db_connection.js');
const City = require('../../schemas/city_schema');
const cities = require("./cities.json")

const initScript = async () => {
    try {
        for(let city of cities) {
            await City.create({
                name: city.city,
                state: city.state,
                country: city.country,
            });
        }
        console.log('Press any key to exit');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
    } catch (err) {
        console.error(err);
    }
}

initScript();
