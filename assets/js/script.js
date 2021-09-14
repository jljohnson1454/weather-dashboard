// create elements that tie to the cities
var searchBtnEl = document.querySelector("#search");
var austinBtnEl = document.querySelector("#austin");
var chicagoBtnEl = document.querySelector("#austin");
var newyorkBtnEl = document.querySelector("#austin");
var orlandoBtnEl = document.querySelector("#austin");
var sanfranciscoBtnEl = document.querySelector("#austin");
var denverBtnEl = document.querySelector("#austin");
var atlantaBtnEl = document.querySelector("#austin");
var currentTempEl = document.querySelector("#temp");
var currentWindEl = document.querySelector("#wind");
var currentHumidityEl = document.querySelector("#humidity");
var currentuvIndexEl = document.querySelector("#uvindex");

// API URL: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var apiKey = "74e85ca14c0f3844a2a77b651d3c4451"

// Fetch API

var getWeatherAPI = function() {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=74e85ca14c0f3844a2a77b651d3c4451"
}

var searchCity = function() {



}

var currentCity = function() {


}

var forecast = function() {


}

// lat, lon	required	Geographical coordinates (latitude, longitude)

// appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)

// exclude	optional	By using this parameter you can exclude some parts of the 
                        // weather data from the API response. It should be a comma-delimited list (without spaces).

// Available values:

// current
// minutely
// hourly
// daily
// alerts