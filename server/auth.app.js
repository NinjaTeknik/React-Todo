const express = require('express')
const authapp = express()

// Using express.json() to read req.body
authapp.use(express.json())
const dynamoose = require("dynamoose")
dynamoose.aws.sdk.config.update({"region": "eu-north-1"});
const morgan = require("morgan")
authapp.use(morgan('dev'))

app.get('/todos', (req, res) => {
  try {
    
  } catch (err) {
    console.error(error)
  }
})

// Import Routes
authapp.use(require("./routes"))

module.exports = authapp;