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


function displayTemperature(response) {
    
   
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

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
}



let apiKey = "6655e6104636a644c9bc754d824a695d";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);