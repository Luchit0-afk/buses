const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb://127.0.0.1:27017/buses',
);

mongoose.connection
  .once("open", function() {
    console.log("[MongoDB] Connection succesfull");
  })
  .on("error", function(error) {
    console.log("[MongoDB] Connection error...", error);
  });
