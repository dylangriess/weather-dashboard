console.log("hello, world");

//Variable declarations
var apiKey = "afd3be8e24e844a682d13ba28363015a";
var searchBtn = $("#citySearchBtn");
var cityInput = "Denver";
var cityHistoryUl = $("#cityHistory");
var savedCities = [];

//Current weather variables
var cityName = $("#cityName");
var todayDate = $("#todayDate");
var todayTemp = $("#todayTemp");
var todayWind = $("#todayWind");
var todayHumidity = $("#todayHumidity");
var todayUV = $("#todayUV");

//Forecast variables
var date1 = $("#date1");
var temp1 = $("#temperature1");
var wind1 = $("#wind1");
var humidity1 = $("#humidity1");

var date2 = $("#date2");
var temp2 = $("#temperature2");
var wind2 = $("#wind2");
var humidity2 = $("#humidity2");

var date3 = $("#date3");
var temp3 = $("#temperature3");
var wind3 = $("#wind3");
var humidity3 = $("#humidity3");

var date4 = $("#date4");
var temp4 = $("#temperature4");
var wind4 = $("#wind4");
var humidity4 = $("#humidity4");

var date5 = $("#date5");
var temp5 = $("#temperature5");
var wind5 = $("#wind5");
var humidity5 = $("#humidity5");

//Function to get current weather
function getWeather() {
  var requestUrl =
    "https://api.weatherbit.io/v2.0/current?&city=" +
    cityInput +
    "&units=imperial&key=" +
    apiKey;
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityName.text(data.data[0].city_name);
      todayDate.text(data.data[0].datetime);
      todayTemp.text("Temperature: " + data.data[0].temp + " ºF");
      todayWind.text("Wind: " + data.data[0].wind_spd + " MPH");
      todayHumidity.text("Humidity: " + data.data[0].rh + " %");
      todayUV.text("UV Index: " + data.data[0].uv);
      getUV();
    });

  //TODO: add background to UV: favorable, moderate, severe
  function getUV() {
    var todayUV = $("#todayUV");
    if (todayUV.val() > moderate) {
      todayUV.style = "color: red";
    } else if (todayUV.val() > favorable) {
      todayUV.style = "color: yellow";
    } else {
      todayUV.style = "color: green";
    }
  }
  var forecastUrl =
    "https://api.weatherbit.io/v2.0/forecast/daily&days=[5]?city=" +
    cityInput +
    "&units=imperial&key=" +
    apiKey;
  console.log(forecastUrl);
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      date1.text("Date: " + data.data[0].datetime);
      temp1.text("Temp: " + data.data[0].temp + " ºF");
      wind1.text("Wind: " + data.data[0].wind_spd + " MPH");
      humidity1.text("Humidity: " + data.data[0].rh + " %");

      date2.text("Date: " + data.data[1].datetime);
      temp2.text("Temp: " + data.data[1].temp + " ºF");
      wind2.text("Wind: " + data.data[1].wind_spd + " MPH");
      humidity2.text("Humidity: " + data.data[1].rh + " %");

      date3.text("Date: " + data.data[2].datetime);
      temp3.text("Temp: " + data.data[2].temp + " ºF");
      wind3.text("Wind: " + data.data[2].wind_spd + " MPH");
      humidity3.text("Humidity: " + data.data[2].rh + " %");

      date4.text("Date: " + data.data[3].datetime);
      temp4.text("Temp: " + data.data[3].temp + " ºF");
      wind4.text("Wind: " + data.data[3].wind_spd + " MPH");
      humidity4.text("Humidity: " + data.data[3].rh + " %");

      date5.text("Date: " + data.data[4].datetime);
      temp5.text("Temp: " + data.data[4].temp + " ºF");
      wind5.text("Wind: " + data.data[4].wind_spd + " MPH");
      humidity5.text("Humidity: " + data.data[4].rh + " %");
    });
}

function citySearch(event) {
  var cityInput = "Denver";
  if (!cityInput) {
    return;
  }
  getWeather();
}

//Add event handler for save input
searchBtn.on("click", function () {
  console.log(cityInput);
  citySearch();
});
