// create elements that tie to the cities
var searchBtnEl = document.querySelector(".buttonClick");
var searchInputEl = document.querySelector(".inputValue");
var currentCityEl = document.querySelector("#selectedcity");
var currentTempEl = document.querySelector("#temp");
var currentWindEl = document.querySelector("#wind");
var currentHumidityEl = document.querySelector("#humidity");
var currentuvIndexEl = document.querySelector(".uvSpan");
var cityContainerEl = document.querySelector("#city-container");
//ar cityHistoryEl = document.querySelector("#city-search-term")

//var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=74e85ca14c0f3844a2a77b651d3c4451";

// OneCall API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// API URL: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=
// API Key: "74e85ca14c0f3844a2a77b651d3c4451"
// Add unit=imperial for measurement conversion
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// Fetch API


//  Click event to start fetching API information
searchBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    $("#wicon").show();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&units=imperial&appid=74e85ca14c0f3844a2a77b651d3c4451")
    .then(response => response.json())
    .then((data) => {
    currCity(data)    
    displaySearch(data, searchInputEl)})
});

// Show search history
var displaySearch = function(data, searchInputEl){
    console.log(data);

    var receivedData = JSON.stringify(data);

    //cityContainerEl.textContent = "";
    //cityHistoryEl.textContent = searchInputEl.value.charAt(0).toUpperCase() + searchInputEl.value.slice(1);

    localStorage.setItem(searchInputEl.value, receivedData);

    var historyButton = document.createElement('button');
    historyButton.type = 'button';
    historyButton.innerHTML = searchInputEl.value.charAt(0).toUpperCase() + searchInputEl.value.slice(1);
    historyButton.className = 'btn btn-info btn-styled';
  //  var newButton = historyButton.charAt(0).toUpperCase() + historyButton.slice(1);

    var container = document.getElementById('city-container');
    container.appendChild(historyButton);

}


// Shows weather conditions for current city and date
var currCity = function(data) {
    
    console.log(data);
    currentCityEl.innerHTML = data['name'] + "<br>" + moment().format('L');
    currentTempEl.innerHTML = "Temp: " + Math.round(data['main'].temp) + "\u00B0 F";
    currentWindEl.innerHTML = "Wind: " + Math.round(data['wind'].speed) + " mph";
    currentHumidityEl.innerHTML = "Humidity: " + data['main'].humidity;

    var wicon = data['weather'][0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + wicon + ".png";
    $('#wicon').attr('src', iconurl);

    getUV(data);
    }

// Grabs the UV information from the OneCall API
var getUV = function(data) {

    var coordinates = "lat=" + (data.coord.lat) + "&lon=" + (data.coord.lon);
    console.log(coordinates);

    fetch("https://api.openweathermap.org/data/2.5/onecall?" + coordinates + "&appid=74e85ca14c0f3844a2a77b651d3c4451")
    .then(response => response.json())
    .then(uvData => showUV(uvData));
}

// Displays the UV Index with color coding for mild to severe conditions
var showUV = function(uvData) {
    console.log(uvData);

    currentuvIndexEl.textContent = "UV Index: " + uvData.current.uvi;

    if(uvData.current.uvi <= 2){
        $('#uvindex').css('color','white');
        $('#uvindex').css('background-color','green');

    } else if (uvData.current.uvi > 2 && uvData.current.uvi < 7) {
        $('#uvindex').css('color', 'white');
        $('#uvindex').css('background-color', 'orange');
    } else if(uvData.current.uvi >= 7){
        $('#uvindex').css('color', 'white');
        $('#uvindex').css('background-color', 'red');
    }

    forecast(uvData);
}

// Five Day Forecast
var forecast = function() {

        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputEl.value + "&units=imperial&appid=74e85ca14c0f3844a2a77b651d3c4451")
        .then(response => response.json())
        .then(data => obj = data)
        .then((obj) => {
        
            for(var i = 0; i < 5; i++){
            var randomIcon = obj.list[(i+1) * 8 -1];
            var randomWeather = randomIcon.weather[0];
            var foreIcon = randomWeather.icon;
            
            var iconurl = "http://openweathermap.org/img/w/" + foreIcon + ".png";
            
            $('.foreIcon' +  i).attr('src', iconurl);

            forecastDateEl = document.querySelector(".foreDate" + i);
            forecastTempEl = document.querySelector(".foreTemp" + i);
            forecastWindEl = document.querySelector(".foreWind" + i);
            forecastHumidity = document.querySelector(".foreHum" + i);

            var foreDate = (obj.list[(i+1) * 8 - 1].dt_txt.slice(0,-8));

            console.log(obj);
            forecastDateEl.innerHTML = moment(foreDate).format('l');
            forecastTempEl.innerHTML = "Temp: " + Math.round(obj.list[(i+1) * 8 -1].main.temp) + "\u00B0 F";
            forecastWindEl.innerHTML = "Wind: " + Math.round(obj.list[(i+1) * 8 - 1].wind.speed) + "mph";
            forecastHumidity.innerHTML = "Humidity: " + (obj.list[(i+1) * 8 - 1].main.humidity);   

            $(".foreIcon" + i).show();    
        }    
    })
}



