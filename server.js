// Setup empty JS object to act as endpoint for all routes
let projectData = {}

// Require Express to run server and routes
const express = require("express")

// Start up an instance of app
const app = express()
/* Middleware*/
//require body-parser
const bodyParser = require("body-parser")

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//require Cors for cross origin allowance
const cors = require("cors")

//use cors
app.use(cors())
// Initialize the main project folder
app.use(express.static("website"))

// Setup Server
const portNumber = 5500
function listening() {
  console.log("Server is live")
  console.log(`Listening on localhost port ${portNumber}`)
}
//start server
app.listen(portNumber, listening)

// Initialize all route with a callback function
function sendObject(request, response) {
  response.send(projectData)
}

// Callback function to complete GET '/all'
app.get("/all", sendObject)

// Post Route
app.post("/all", saveData)

function saveData(request, response) {
  projectData = request.body
  response.send(projectData)
}
