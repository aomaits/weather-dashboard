
var apiKey = "8492c90f0c6c83c65898f20d685f7431";
var today = dayjs();

var city = document.getElementById('searchField');
var searchBtn = document.getElementById('searchBtn');
var dailyIcon = document.getElementById('dailyIcon');
var dailyTemp = document.getElementById('dailyTemp');
var dailyWind = document.getElementById('dailyWind');
var dailyHumidity = document.getElementById('dailyHumidity');
var cityNameDate = document.getElementById('cityNameDate');

function getLatLong() {
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.value.trim() + "&units=imperial&appid=" + apiKey;
    fetch(cityURL)
        .then(function (response) {
        return response.json();
        })
        .then(function(data) {
            console.log(data);
            cityNameDate.innerText = city.value + " " + today.format('dddd, MMMM D YYYY');

            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            // Need to find the correct link to render this image! 
            dailyIcon.src = "https://openweathermap.org/img/w" + data.weather[0].icon + ".png";
            dailyTemp.innerText = "Temp: " + data.main.temp + " F";
            dailyWind.innerText = "Wind: " + data.wind.speed + " MPH";
            dailyHumidity.innerText = "Humidity: " + data.main.humidity + " %";

            // Then append the below as the five day (I think data.weather[0].icon is the day's icon id)
            
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily,alerts&&units=imperial&appid=" + apiKey;
            fetch(fiveDayURL)
                .then(function (response) {
                return response.json();
                })
                .then(function(data) {
                console.log(data);
                // How to add the date up here? dayjs to add on one day per card...?
                console.log("Temp: " + data.list[7].main.temp)
                // each card- date, icon, temp, wind, humidity, 
                });
                
                

        }); 
        
};


// function weatherToday() {
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.value.trim() + "&appid=" + apiKey;
// };

searchBtn.addEventListener('click', getLatLong);



// fetch function to get API
// we'll need to get the cities first for lat and long

// LOOKS LIKE THIS? 

// click event listener search bar
// function to save user search to local storage
// function to render it to the page
// conditional function statement for day.js to render weather by date/time accurately on the page
// an API pull for 5/10 cities per page?
// need to pull the city details, pull out the long and lat
//  need to attach latitude/longitude 

// day.js to render weather by date/time accuracy on the page
// api link for each city

// 




// Use the 5 Day Weather Forecast to retrieve weather data for cities. The base URL should look like the following: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

// Hint: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// You will use localStorage to store any persistent data. For more information on how to work with the OpenWeather API, refer to the Full-Stack Blog on how to use API keys.


// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
