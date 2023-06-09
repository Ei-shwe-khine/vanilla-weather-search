function formatDate(timestamp) {
    
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];

    //calculate the date
    return `${day} ${hours} : ${minutes}`;
}
function formatDay(timestamp) {
    
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];

}

function displayForecast(response) {

    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            
        
            forecastHTML = forecastHTML +
                `
      <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
      
      </div>
    
      <img
        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt="" 
        width="42"
        />
        <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
        </div>

`;
        }
    });

    
    forecastHTML =forecastHTML+ `</div>`;
    forecastElement.innerHTML = forecastHTML;

}
function searchLocation(position) {
let apiKey = "6655e6104636a644c9bc754d824a695d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

function getForecast(coordinates) {
    console.log(coordinates);

    let apiKey = "6655e6104636a644c9bc754d824a695d";

    //let apiKey = "6655e6104636a644c9bc754d824a695d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //  console.log(apiUrl);
    
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    
   
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

   // let precipitation = document.querySelector("#precipitation");
   // precipitation.innerHTML = response.data.main.precipitation;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML =Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
    iconElement.setAttribute("alt", response.data.weather[0].description);

    
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    getForecast(response.data.coord);
    console.log(response.data.main.temp);
}

function search(city) {

let apiKey = "6655e6104636a644c9bc754d824a695d";

    
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);


}
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}




let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);




search("Thailand");
displayForecast();
