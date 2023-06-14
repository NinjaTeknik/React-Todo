const dynamoose = require("dynamoose");

const userSchema = new dynamoose.Schema({
    "id": String,
    "username": String,
    "password": String,
}, {
    "timestamps": true
})

const User = dynamoose.model("User", userSchema)

module.exports = User