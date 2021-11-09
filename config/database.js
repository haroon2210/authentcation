const mongoose = require("mongoose");

// OFFICE
// const MONGO_URI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// HOME
const MONGO_URI = "mongodb://127.0.0.1:27017/authentication?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
};
