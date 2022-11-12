const mongoose = require("mongoose");

const connect = mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => console.log("mongodb is connected"));

connection.on("error", (err) => console.log("error: ", err));

module.exports = mongoose;
