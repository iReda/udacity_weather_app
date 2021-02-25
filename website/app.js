/* Global Variables */

// Create a new date instance dynamically with JS
const today = new Date()
const dd = String(today.getDate()).padStart(2, "0")
const mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
const yyyy = today.getFullYear()
const newDate = dd + "-" + mm + "-" + yyyy
console.log(newDate)
//example api call: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const apiKey = "&appid=ed3e2d253edbd6715e20c0167ef4dc97&units=imperial"
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="
const country = "us"

// Event listener to add function to existing HTML DOM element (the button with generate id)
document.getElementById("generate").addEventListener("click", performAction)

/* Function called by event listener */
function performAction(event) {
  const zipcode = document.getElementById("zip").value
  getWeatherData(baseURL, zipcode, apiKey)
    .then(function (data) {
      data["feelings"] = document.getElementById("feelings").value
      //add Data to post request
      postData("/all", data)
    })
    .then(updateUI)
}

/* Function to GET Web API Data*/
async function getWeatherData(baseURL, zipcode, apiKey) {
  const response = await fetch(baseURL + zipcode + "," + country + apiKey)
  try {
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log("error getting data from weather API", error)
  }
}

/* Function to POST data */
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  })

  try {
    const newData = await response.json()
    return newData
  } catch (error) {
    console.log("error getting the response when posting data: ", error)
  }
}

/* function to update UI */
async function updateUI() {
  const allResponse = await fetch("/all")
  try {
    const allData = await allResponse.json()
    document.getElementById("date").innerHTML = "Date: " + newDate
    document.getElementById("temp").innerHTML =
      "Temperature : " + allData.main.temp
    document.getElementById("content").innerHTML = document.getElementById(
      "feelings"
    ).value
  } catch (error) {
    console.log("Error updating the UI: ", error)
  }
}
