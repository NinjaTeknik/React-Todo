const router = require("express").Router()
const authController = require("../controllers/Auth.controller")

router.post('/register', authController.register)

module.exports = router;