const mongoose = require("mongoose")
const StudentModel = require("../model/studentModel")


const Registration = async (req, res) => {
    try {
        const { name, email, age, course } = req.body
        const user = await StudentModel.findOne({ email: email })
        if (user) {
            return res.status(400).json("user already exist")
        }
        const student = await StudentModel.create({ name, email, course, age })
        res.status(201).json(student)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const GetAllStudents = async (req, res) => {
    try {
        const list = await StudentModel.find()
        const count = await StudentModel.countDocuments();
        res.status(200).json({count, student:list})
    }
    catch (err) {
        res.status(500).json(err)
        
    }
}

module.exports={Registration, GetAllStudents}