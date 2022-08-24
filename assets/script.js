//Variable declarations
var apiKey = "afd3be8e24e844a682d13ba28363015a";
var searchBtn = $("#citySearchBtn");
var cityInput = $("#enter-city");
var searchCity = "Denver";
var cityHistory = $("#cityHistory");

//Current weather variables
var cityName = $("#cityName");
var todayDate = $("#todayDate");
var todayTemp = $("#todayTemp");
var todayWind = $("#todayWind");
var todayHumidity = $("#todayHumidity");
var todayUV = $("#todayUV");
var uV;
var todayIcon;
var todayIconImage = $("#todayIconPng");

//Forecast variables
var date1 = $("#date1");
var temp1 = $("#temperature1");
var wind1 = $("#wind1");
var humidity1 = $("#humidity1");
var day1Icon;
var day1IconImage = $("#icon1");

var date2 = $("#date2");
var temp2 = $("#temperature2");
var wind2 = $("#wind2");
var humidity2 = $("#humidity2");
var day2Icon;
var day2IconImage = $("#icon2");

var date3 = $("#date3");
var temp3 = $("#temperature3");
var wind3 = $("#wind3");
var humidity3 = $("#humidity3");
var day3Icon;
var day3IconImage = $("#icon3");

var date4 = $("#date4");
var temp4 = $("#temperature4");
var wind4 = $("#wind4");
var humidity4 = $("#humidity4");
var day4Icon;
var day4IconImage = $("#icon4");

var date5 = $("#date5");
var temp5 = $("#temperature5");
var wind5 = $("#wind5");
var humidity5 = $("#humidity5");
var day5Icon;
var day5IconImage = $("#icon5");

//Function to get current weather
function getWeather() {
  var requestUrl =
    "https://api.weatherbit.io/v2.0/current?&city=" +
    searchCity +
    "&units=imperial&key=" +
    apiKey;
  // console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      cityName.text(data.data[0].city_name);
      todayDate.text(data.data[0].datetime);
      todayIcon = data.data[0].weather.icon;
      todayIconImage.attr(
        "src",
        `https://www.weatherbit.io/static/img/icons/${todayIcon}.png`
      );
      todayTemp.text("Temperature: " + data.data[0].temp + " ºF");
      todayWind.text("Wind: " + data.data[0].wind_spd + " MPH");
      todayHumidity.text("Humidity: " + data.data[0].rh + " %");
      todayUV.text("UV Index: " + data.data[0].uv);
      uV = data.data[0].uv;
      if (uV > 6) {
        todayUV.addClass("severe");
      } else if (uV > 3 && uV < 5.99) {
        todayUV.addClass("moderate");
      } else {
        todayUV.addClass("favorable");
      }
    });

  var forecastUrl =
    "https://api.weatherbit.io/v2.0/forecast/daily&days=[5]?city=" +
    searchCity +
    "&units=imperial&key=" +
    apiKey;
  // console.log(forecastUrl);
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      date1.text("Date: " + data.data[1].datetime);
      day1Icon = data.data[1].weather.icon;
      day1IconImage.attr(
        "src",
        `https://www.weatherbit.io/static/img/icons/${day1Icon}.png`
      );
      temp1.text("Temp: " + data.data[1].temp + " ºF");
      wind1.text("Wind: " + data.data[1].wind_spd + " MPH");
      humidity1.text("Humidity: " + data.data[1].rh + " %");

      date2.text("Date: " + data.data[2].datetime);
      day2Icon = data.data[2].weather.icon;
      day2IconImage.attr(
        "src",
        `https://www.weatherbit.io/static/img/icons/${day2Icon}.png`
      );
      temp2.text("Temp: " + data.data[2].temp + " ºF");
      wind2.text("Wind: " + data.data[2].wind_spd + " MPH");
      humidity2.text("Humidity: " + data.data[2].rh + " %");

      date3.text("Date: " + data.data[3].datetime);
      day3Icon = data.data[3].weather.icon;
      day3IconImage.attr(
        "src",
        `https://www.weatherbit.io/static/img/icons/${day3Icon}.png`
      );
      temp3.text("Temp: " + data.data[3].temp + " ºF");
      wind3.text("Wind: " + data.data[3].wind_spd + " MPH");
      humidity3.text("Humidity: " + data.data[3].rh + " %");

      date4.text("Date: " + data.data[4].datetime);
      day4Icon = data.data[4].weather.icon;
      day4IconImage.attr(
        "src",
        `https://www.weatherbit.io/static/img/icons/${day4Icon}.png`
      );
      temp4.text("Temp: " + data.data[4].temp + " ºF");
      wind4.text("Wind: " + data.data[4].wind_spd + " MPH");
      humidity4.text("Humidity: " + data.data[4].rh + " %");

      date5.text("Date: " + data.data[5].datetime);
      day5Icon = data.data[5].weather.icon;
      day5IconImage.attr(
        "src",
        `https://www.weatherbit.io/static/img/icons/${day5Icon}.png`
      );
      temp5.text("Temp: " + data.data[5].temp + " ºF");
      wind5.text("Wind: " + data.data[5].wind_spd + " MPH");
      humidity5.text("Humidity: " + data.data[5].rh + " %");
    });
}

function citySearch(event) {
  if (!searchCity) {
    alert("Please enter valid city.");
    return;
  } else {
    getWeather();
  }
}

var savedCities = [];
if (localStorage.getItem("savedCities")) {
  handleSavedCities();
  // console.log("Saved cities:" + savedCities);
} else {
  savedCities = [];
}

function handleSavedCities() {
  savedCities = JSON.parse(localStorage.getItem("savedCities"));
  // console.log(currentSavedCities);
  cityHistory.empty();
  savedCities.forEach((city) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(city));
    cityHistory.append(li);
  });
}

//Add event handler for save input
searchBtn.on("click", function (event) {
  // console.log(cityInput.val());
  searchCity = cityInput.val();
  savedCities.push(searchCity);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
  // console.log(savedCities);
  citySearch(event);
  handleSavedCities();
});

getWeather();
