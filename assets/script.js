
var apiKey = "8492c90f0c6c83c65898f20d685f7431";
var today = dayjs();

var searchedCities = [];
// global variables to be reassigned within first search
var latitude;
var longitude;

var cityList = document.getElementById('cityList');
var city = document.getElementById('searchField');
var searchBtn = document.getElementById('searchBtn');

// Today's weather card elements
var dailyIcon = document.getElementById('dailyIcon');
var dailyTemp = document.getElementById('dailyTemp');
var dailyWind = document.getElementById('dailyWind');
var dailyHumidity = document.getElementById('dailyHumidity');
var cityNameDate = document.getElementById('cityNameDate');

// Elements for the Day.js dates for the five day forecast
var dayOne = document.getElementById('dayOne');
var dayTwo = document.getElementById('dayTwo');
var dayThree = document.getElementById('dayThree');
var dayFour = document.getElementById('dayFour');
var dayFive = document.getElementById('dayFive');

// Elements for the interior of the five day forecast cards
var dayOneTemp = document.getElementById("dayOneTemp");
var dayOneWind = document.getElementById("dayOneWind");
var dayOneHumidity = document.getElementById("dayOneHumidity");

var dayTwoTemp = document.getElementById("dayTwoTemp");
var dayTwoWind = document.getElementById("dayTwoWind");
var dayTwoHumidity = document.getElementById("dayTwoHumidity");

var dayThreeTemp = document.getElementById("dayThreeTemp");
var dayThreeWind = document.getElementById("dayThreeWind");
var dayThreeHumidity = document.getElementById("dayThreeHumidity");

var dayFourTemp = document.getElementById("dayFourTemp");
var dayFourWind = document.getElementById("dayFourWind");
var dayFourHumidity = document.getElementById("dayFourHumidity");

var dayFiveTemp = document.getElementById("dayFiveTemp");
var dayFiveWind = document.getElementById("dayFiveWind");
var dayFiveHumidity = document.getElementById("dayFiveHumidity");

function appendCitySearches () {
    cityList.innerText = "";
    for (var i = 0; i < searchedCities.length; i++) {
        var cities = searchedCities[i];
        var li = document.createElement("li");
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = cities;
        button. // YOU          WERE                 HERE  !!!!!!!!!!!!!!!!!!!!
          //set attribute or something? to add the id using the current value of "i" (or its place in the array)
        button.addEventListener("click", function(){ 
            city = cities;
            console.log(city);
            // city will be defined as the most recent search- need logic to navigate the array based on the button clicked. BUT FIRST, have to dynamically create a class for all buttons, then
        });

        li.appendChild(button);
        cityList.appendChild(li);

        console.log(searchedCities[i]);
        console.log(li);
        console.log(typeof li);

        ;
    }
};

// Takes user's input, pull data for today's forecast, add it to HTML
function dailyWeatherSearch() {
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.value.trim() + "&units=imperial&appid=" + apiKey;
    fetch(cityURL)
        .then(function (response) {
        return response.json();
        })
        .then(function(data) {
        cityNameDate.innerText = city.value + "  " + today.format('dddd, MMMM D, YYYY');

            // Need to find the correct link to render this image! 
            // dailyIcon.src = "https://openweathermap.org/img/w" + data.weather[0].icon + ".png";

        dailyTemp.innerText = "Temp: " + data.main.temp + " F";
        dailyWind.innerText = "Wind: " + data.wind.speed + " MPH";
        dailyHumidity.innerText = "Humidity: " + data.main.humidity + " %";

        latitude = data.coord.lat;
        longitude = data.coord.lon;
        
        // Call five day weather search function from within this function in order to pass lat & lon variables
        fiveDayWeatherSearch (latitude, longitude);
        setCitySearches(city);
        getCitySearches();
        });
};

function fiveDayWeatherSearch(){
    // Take the lat/long from the first fetch and use that to pull the 5-day forecast
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily,alerts&&units=imperial&appid=" + apiKey;
    fetch(fiveDayURL)
        .then(function (response) {
        return response.json();
        })
        .then(function(data) {

        dayOne.innerText = today.format('dddd, MMMM D, YYYY');
        dayTwo.innerText = today.add(1, 'day').format('dddd, MMMM D, YYYY');
        dayThree.innerText = today.add(2, 'day').format('dddd, MMMM D, YYYY');
        dayFour.innerText = today.add(3, 'day').format('dddd, MMMM D, YYYY');
        dayFive.innerText = today.add(4, 'day').format('dddd, MMMM D, YYYY');

        // Five day cards still lack icon
        dayOneTemp.innerText = "Temp: " + data.list[7].main.temp + " F";
        dayOneWind.innerText = "Wind: " + data.list[7].wind.speed + " MPH";
        dayOneHumidity.innerText = "Humidity: " + data.list[7].main.humidity + " %";

        dayTwoTemp.innerText = "Temp: " + data.list[15].main.temp + " F";
        dayTwoWind.innerText = "Wind: " + data.list[15].wind.speed + " MPH";
        dayTwoHumidity.innerText = "Humidity: " + data.list[15].main.humidity + " %";

        dayThreeTemp.innerText = "Temp: " + data.list[23].main.temp + " F";
        dayThreeWind.innerText = "Wind: " + data.list[23].wind.speed + " MPH";
        dayThreeHumidity.innerText = "Humidity: " + data.list[23].main.humidity + " %";

        dayFourTemp.innerText = "Temp: " + data.list[31].main.temp + " F";
        dayFourWind.innerText = "Wind: " + data.list[31].wind.speed + " MPH";
        dayFourHumidity.innerText = "Humidity: " + data.list[31].main.humidity + " %";

        dayFiveTemp.innerText = "Temp: " + data.list[39].main.temp + " F";
        dayFiveWind.innerText = "Wind: " + data.list[39].wind.speed + " MPH";
        dayFiveHumidity.innerText = "Humidity: " + data.list[39].main.humidity + " %";
        });
};

function setCitySearches () {
    searchedCities.push(city.value.trim());
    localStorage.setItem("City", (JSON.stringify(searchedCities)));
    console.log(searchedCities);
    console.log(typeof searchedCities);
}

function getCitySearches () {
    var storedCities = JSON.parse(localStorage.getItem("City"))
    console.log(storedCities);
    console.log(typeof storedCities);
    storedCities = searchedCities;
    console.log("getCitySearches is running");
    appendCitySearches();
    }

searchBtn.addEventListener('click', dailyWeatherSearch);