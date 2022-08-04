var inputEl = document.querySelector('input');
var form = document.querySelector("form");
var apiLat;
var apiLon;
var count = 0;


form.addEventListener("click", function(event) {
    event.preventDefault()
});

function displayCities() {

    for (var i = 0; i < 8; i++) {
        var city = document.getElementById("city-" + i);
        city.textContent = localStorage.getItem("city-" + i);
        city.style.color = "black";
        city.style.backgroundColor = "lightgrey";

    };
}

function searchBtn() {
    inputValue = inputEl.value;
    console.log(count);

    var item = localStorage.setItem("city-" + count, inputValue);
    count = count + 1;
    console.log(count);

    displayCities();

    var weatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&limit=1&appid=b691141e61134e390bbe0f3d737ad24e";
    var data = getlatlon(weatherUrl);
};


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

// https: //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}//
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

function showWeather(data) {
    var tempr = document.getElementById("temp");
    var winds = document.getElementById("wind");
    var humid = document.getElementById("humidity");
    var cityy = document.getElementById("city");

    tempr.textContent = data.main.temp + " F";
    winds.textContent = data.wind.speed + " MPH";
    humid.textContent = data.main.humidity + " %";
    cityy.textContent = inputValue;

    console.log(data.main.temp);



};