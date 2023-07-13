
var apiKey = "8492c90f0c6c83c65898f20d685f7431";
var city = document.getElementById('searchField');
var searchBtn = document.getElementById('searchBtn');

function getLatLong() {
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.value.trim() + "&appid=" + apiKey;
    fetch(cityURL)
        .then(function (response) {
        return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data.coord.lat);
            var latitude = data.coord.lat;
            console.log(data.coord.lon);
            var longitude = data.coord.lon;

            // I know I need to get the above data 

            singleDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily,alerts&appid=" + apiKey;
            fetch(singleDayURL)
                .then(function (response) {
                return response.json();
                })
                .then(function(data) {
                console.log(data);
                });
        
            // weatherToday();
            // pull this data out and put it in the card! 
        }); 
        
};


// function weatherToday() {
//     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city.value.trim() + "&appid=" + apiKey;
// };

searchBtn.addEventListener('click', getLatLong);



// fetch function to get API
// we'll need to get the cities first for lat and long

// LOOKS LIKE THIS? 

// function getApi(requestUrl) {
//     fetch(requestUrl)
//       .then(function (response) {
//         console.log(response);
//         if (response.status === 200) {
//           responseText.textContent = response.status;
//         }
//         return response.json();
//     });
//   } 


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
