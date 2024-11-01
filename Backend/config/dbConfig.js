const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION)
        console.log("connected to db")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectDB