const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");

const connectDB = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
        dbName: "DEV-ARENA",
    };

    try {
        await mongoose.connect(uri, options);
        console.log("SUCCESSFULLY CONNECTED TO DB!");
    } catch (error) {
        console.log("CONNECTION FAILED TO DB!");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
