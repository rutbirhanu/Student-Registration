const express = require("express")
const studentRoute= require("./route/studentRoute")
const connectDB = require("./config/dbConfig")
const cors= require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/student",studentRoute )

const port = 2000

connectDB()
app.listen(port, () => {
    console.log("server started")
})
