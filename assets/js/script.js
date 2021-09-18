// create elements that tie to the cities
var searchBtnEl = document.querySelector(".buttonClick");
var searchInputEl = document.querySelector(".inputValue");
var currentCityEl = document.querySelector("#selectedcity");
var currentTempEl = document.querySelector("#temp");
var currentWindEl = document.querySelector("#wind");
var currentHumidityEl = document.querySelector("#humidity");
var currentuvIndexEl = document.querySelector(".uvSpan");



//var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=74e85ca14c0f3844a2a77b651d3c4451";

// OneCall API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


// API URL: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=
// API Key: "74e85ca14c0f3844a2a77b651d3c4451"
// Add unit=imperial for measurement conversion
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// Fetch API

searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&units=imperial&appid=74e85ca14c0f3844a2a77b651d3c4451")
    .then(response => response.json())
    .then(data => currCity(data));

});

    
    // .then(response => response.json())
    // .then(data => console.log(data))

    // .catch(err => alert("Wrong city name!"))

var currCity = function(data) {

    

    console.log(data);
    currentCityEl.innerHTML = data['name'];
    currentTempEl.innerHTML = "Temp: " + Math.round(data['main'].temp) + "\u00B0 F";
    currentWindEl.innerHTML = "Wind: " + Math.round(data['wind'].speed) + " mph";
    currentHumidityEl.innerHTML = "Humidity: " + data['main'].humidity;
    //currentuvIndexEl.innerHTML = "UV Index: " + data['main'].

    var icon = data['weather'][0].icon;
    console.log(icon)
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#wicon').attr('src', iconurl);

    
    getUV(data);
    forecast(data);

    }

var getUV = function(data) {

    var coordinates = "lat=" + (data.coord.lat) + "&lon=" + (data.coord.lon);
    console.log(coordinates);

    fetch("https://api.openweathermap.org/data/2.5/onecall?" + coordinates + "&appid=74e85ca14c0f3844a2a77b651d3c4451")
    .then(response => response.json())
    .then(uvData => showUV(uvData));
    

}

var showUV = function(uvData) {
    console.log(uvData);

    currentuvIndexEl.textContent = "UV Index: " + uvData.current.uvi;

    if(uvData.current.uvi <= 2){
        $('#uvindex').css('background-color', 'green');
    } else if (uvData.current.uvi > 2 && uvData.current.uvi < 7) {
        $('#uvindex').css('background-color', 'orange');
    } else if(uvData.current.uvi >= 7){
        $('#uvindex').css('background-color', 'red');
    }

    forecast(uvData);
}


    


var forecast = function(uvData) {

var forecastDateEl = document.querySelector("#foreDate");
var forecastTempEl = document.querySelector("#foreTemp");
var forecastWindEl = document.querySelector("#foreWind");
var forecastHumidity = document.querySelector("#foreHum");

console.log(uvData);



        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputEl.value + "&appid=74e85ca14c0f3844a2a77b651d3c4451")
        .then(response => response.json())
        .then(data => obj = data)
        .then(() => console.log(obj))
        

    
        
        forecastDateEl.innerHTML = foreData.list[1].dt_txt
        // forecastTempEl.innerHTML = "Temp: " + Math.round(data['main'].temp);
        // forecastWindEl.innerHTML = "Wind: " + Math.round(data['wind'].speed);
        // forecastHumidity.innerHTML = "Humidity: " + data['main'].humidity;
        


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

