const authService = require('../services/Auth.service')

// Register New User
exports.register = async function(req, res) {
    // fine for proof-of-concept, terrible in practice
    const newUserInput = req.body

    var newUser
    try {
        newUser = await authService.registerUser(newUserInput)
    } catch (err) {
        console.log(err)
        if(err.message == "EXISTING_USER_ERROR") {
            return res.status("422").json({"message":"User already exists"})
        }
        throw new Error(err)
    }

    res.json(newUser)
}

exports.login = async function(req, res) {
    const userInput = req.body

    var existingUser
    try {
        existingUser = await authService.loginUser(userInput)
    } catch (err) {
        console.log(err)
        if(err.message == "INVALID_LOGIN_CREDENTIALS") {
            return res.status("401").json({"message":"Invalid username or password"})
        }
        throw new Error(err)
    }

    res.json(existingUser)
}