const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const {v4: uuidv4} = require("uuid")

exports.registerUser = async function(newUserInfo) {

    // First, check is there's already a user registered with this username
    var existingUser
    try {
        // DynamoDB scan and returns the result
        existingUser = await User.scan({username: {eq: newUserInfo.username}}).exec()
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
    // If there already is a User, throw an Error
    if(existingUser.count > 0) {
        throw new Error("EXISTING_USER_ERROR")
    } 

    // User doesn't already exist, so let's register them
    var newUser 
    try {
        const uuid = uuidv4()
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(newUserInfo.password, salt)
        newUser = await User.create({
            "id": uuid,
            "username": newUserInfo.username,
            "password": hashedPass
        })
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

    // TODO loginUser(newUser) -> return JWT w/ newUser

    return newUser
}

exports.loginUser = async function(userInfo) {
    
    // First, Check if the User even exists
    var existingUser
    try {
        existingUser = await User.scan({username: {eq: userInfo.username}}).exec()
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
    // If User doesn't exist, throw an error
    if(existingUser.count == 0) {
        throw new Error("INVALID_LOGIN_CREDENTIALS")
    }

    // Check if the supplied password matches the bcrypt hashed password saved in the User record
    var validPass
    try {
        validPass = await bcrypt.compare(userInfo.password, existingUser[0].password)
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

    // If validPass is false, throw an error
    if(!validPass) {
        throw new Error("INVALID_LOGIN_CREDENTIALS")
    }
    
    return {"message": "Login Successful"}
}