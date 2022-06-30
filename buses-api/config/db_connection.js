const mongoose = require("mongoose");
const url = process.env.MONGO_DB_CONNECTION_STRING

mongoose.Promise = global.Promise;

mongoose.connect(
    url,
);

mongoose.connection
  .once("open", function() {
    console.log("[MongoDB] Connection succesfull");
  })
  .on("error", function(error) {
    console.log("[MongoDB] Connection error...", error);
  });
