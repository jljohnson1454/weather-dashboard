// create elements that tie to the cities
var searchBtnEl = document.querySelector(".buttonClick");
var searchInputEl = document.querySelector(".inputValue");
var currentCity = document.querySelector("#selectedcity");
var currentTempEl = document.querySelector("#temp");
var currentWindEl = document.querySelector("#wind");
var currentHumidityEl = document.querySelector("#humidity");
var currentuvIndexEl = document.querySelector("#uvindex");

//var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=74e85ca14c0f3844a2a77b651d3c4451";

// API URL: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=
// API Key: "74e85ca14c0f3844a2a77b651d3c4451"
// Add unit=imperial for measurement conversion
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// Fetch API

searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=74e85ca14c0f3844a2a77b651d3c4451")
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert("Wrong city name!"))
});

    
    // .then(response => response.json())
    // .then(data => console.log(data))

    // .catch(err => alert("Wrong city name!"))


//var searchCity = function() {
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API ke

//var currCity = function() {




// var forecast = function() {



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

