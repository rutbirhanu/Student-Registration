const mongoose = require("mongoose")

const studentModel = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    course:String
})

module.exports= mongoose.model("StudentModel", studentModel)