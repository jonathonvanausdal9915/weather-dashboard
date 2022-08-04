var inputEl = document.querySelector('input');
var form = document.querySelector("form");
var apiLat;
var apiLon;
form.addEventListener("click", function(event) {
    event.preventDefault()

});

function searchBtn() {
    inputValue = inputEl.value;
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
https: //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}//
    function getWeather(lonlatdata) {
        apiLat = Number(lonlatdata[0].lat);
        apiLon = Number(lonlatdata[0].lon);
        var weatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + apiLat + "&lon=" + apiLon + "&appid=b691141e61134e390bbe0f3d737ad24e";
        var weatherData = fetch(weatherApi)
            .then(function(response) {
                if (response.ok) {
                    var firstResponse = response.json();
                    firstResponse.then(
                            (data) => {
                                console.log(data);
                            })
                        .catch(err => console.log(err))
                }
            });

    };

function showWeather() {

}