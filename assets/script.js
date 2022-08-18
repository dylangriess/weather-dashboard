console.log("hello, world");

//Variable declarations
var city = "";
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "7a60b2b5e936df3cfb517bc0083e0a8a";
var endPoint = "http://api.openweathermap.org/geo/1.0/direct?";
var searchBtn = $("#citySearch");
var enterCity = $("#enterCity");
var cityHistoryUl = $("#cityHistory");
var savedCities = [];

//Function to get current weather
function fetchWeather() {
  requestUrl + city + "&appid=" + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//Function to get weather forecast
function fetchForecast() {
  forecastUrl + city + "&appid=" + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//Add event handler for save input
searchBtn.on("click", function (event) {
  event.preventDefault();
  if (enterCity.val() !== null) {
    cityHistory();
    console.log(enterCity);
  }
});

function cityHistory() {
  city = enterCity.val();
  savedCities.push(cityHistoryUl);
}
