var inputEl = document.querySelector('input');
var form = document.querySelector("form");
var apiLat;
var apiLon;
var count = 0;

//Prevents Default of page refreshing on submit//
form.addEventListener("click", function(event) {
    event.preventDefault()
});
// Grabs all city elements and gets city name from local storage//
function displayCities() {

    for (var i = 0; i < 8; i++) {
        var city = document.getElementById("city-" + i);
        city.textContent = localStorage.getItem("city-" + i);
        city.style.color = "black";
        city.style.backgroundColor = "lightgrey";

    };
}
//uses the input value to pass in city name on search//
function searchBtn() {
    inputValue = inputEl.value;
    console.log(count);

    var item = localStorage.setItem("city-" + count, inputValue);
    count = count + 1;
    console.log(count);

    displayCities(); //calls displaycities function//

    var weatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&limit=1&appid=b691141e61134e390bbe0f3d737ad24e"; //passes inputvalue for city name//
    var data = getlatlon(weatherUrl); //gets the lat and lon from weatherurl//
};

//gets the lat and lon from response//
function getlatlon(apiUrl) {
    var weatherData = fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                var firstResponse = response.json();
                firstResponse.then(
                        (data) => {
                            getWeather(data);
                            return data;
                        })
                    .catch(err => console.log(err))
            }
        });

};

//passes lat and lon data and gets all the weather data for the city//
function getWeather(lonlatdata) {
    apiLat = Number(lonlatdata[0].lat);
    apiLon = Number(lonlatdata[0].lon);
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + apiLat + "&lon=" + apiLon + "&units=imperial&appid=b691141e61134e390bbe0f3d737ad24e";
    var weatherData = fetch(weatherApi)
        .then(function(response) {
            if (response.ok) {
                var firstResponse = response.json();
                firstResponse.then(
                        (data) => {
                            showWeather(data);
                            fiveday(apiLat, apiLon);
                        })
                    .catch(err => console.log(err))
            }
        });
};
// gets all data from five day forecast 5 days in advanced for each city by passing in lat and lon//
function fiveday(apiLat, apiLon) {
    var fivedayapi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + apiLat + "&lon=" + apiLon + "&appid=b691141e61134e390bbe0f3d737ad24e";
    var weatherData = fetch(fivedayapi)
        .then(function(response) {
            if (response.ok) {
                var firstResponse = response.json();
                firstResponse.then(
                        (data) => {
                            fivedayforecast(data);
                            console.log(data);
                        })
                    .catch(err => console.log(err))
            }
        });

};
// five day forecast data//
function fivedayforecast(data) {
    // var length = data.list.length;
    for (var i = 0; i < 5; i++) {
        var temperature = document.getElementById("temp-" + i);
        var wind = document.getElementById("wind-" + i);
        var humidity = document.getElementById("hum-" + i);
        var date = document.getElementById("date-" + i);
        temperature.textContent = data.list[i].main.temp + " F";
        wind.textContent = data.list[i].wind.speed + " MPH";
        humidity.textContent = data.list[i].main.humidity + " %";
        date.textContent = data.list[i].dt_txt;

    };
};
//displays icons and data to elements on the page//
function showWeather(data) {

    var tempr = document.getElementById("temp");
    var winds = document.getElementById("wind");
    var humid = document.getElementById("humidity");
    var cityy = document.getElementById("city");
    console.log(data);
    if (data.weather[0].main === "Clouds") {
        var iconn = document.getElementById("icon-3");
        iconn.style.visibility = "visible";
    } else if (data.weather[0].main === "Clear") {
        var iconnn = document.getElementById("icon-1");
        iconnn.style.visibility = "visible";
    } else if (data.weather[0].main === "Snow") {
        var iconnnn = document.getElementById("icon-4");
        iconnnn.style.visibility = "visible";

    } else {
        data.weather[0].main === "Rain";
        var iconnn = document.getElementById("icon-2");
        iconnn.style.visibility = "visible";
    }




    tempr.textContent = data.main.temp + " F";
    winds.textContent = data.wind.speed + " MPH";
    humid.textContent = data.main.humidity + " %";
    cityy.textContent = inputValue;

    console.log(data.main.temp);



};