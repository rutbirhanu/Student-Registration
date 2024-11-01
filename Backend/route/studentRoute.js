const express = require("express")
const { GetAllStudents, Registration } = require("../controller/studentController")

const router = express.Router()

router.route("/get-students").get(GetAllStudents)
router.route("/registration").post(Registration)

module.exports = router