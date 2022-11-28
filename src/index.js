function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let h2 = document.querySelector(".date-dayname");
let newDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[newDate.getDay()];
let hours = newDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = newDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day}  ${hours}:${minutes}`;

let date = document.querySelector(".date-day");
let dayNumber = newDate.getDate();
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `Octomber`,
  `November`,
  `December`
];
let month = months[newDate.getMonth()];
let year = newDate.getFullYear();
date.innerHTML = `${dayNumber} ${month} ${year}`;

function weather (response) {
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
    let country = document.querySelector("#country");
    country.innerHTML = ", " + response.data.sys.country;

    let weatherTemp = document.querySelector(".weather-temp");
    weatherTemp.innerHTML = Math.round(response.data.main.temp);

    let weatherDesc = document.querySelector(".weather-desc");
    weatherDesc.innerHTML = response.data.weather[0].main;

    let tempFeelsLike = document.querySelector("#temp-feels-like");
    let feels = Math.round(response.data.main.feels_like);
    tempFeelsLike.innerHTML = feels + " °C";

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity + " %";

    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed) + "  km/h";

    function conversionToFahrenheit(event) {
      event.preventDefault();
      let temp = document.querySelector(".weather-temp");
      temp.innerHTML = Math.round(response.data.main.temp * (9 / 5) + 32);
    }
    function conversionToCelsius(event) {
      event.preventDefault();
      let temp = document.querySelector(".weather-temp");
      temp.innerHTML = Math.round(response.data.main.temp);
    }

    let celciusButton = document.querySelector("#h31");
    celciusButton.addEventListener("click", conversionToCelsius);
    let fahrenheitButton = document.querySelector("#h32");
    fahrenheitButton.addEventListener("click", conversionToFahrenheit);
  }

function show(event) {
  event.preventDefault();

  let button = document.querySelector(".search");
  let location = document.querySelector(".location");
  let value = capitalizeFirstLetter(button.value.toLowerCase());
  location.innerHTML = `${value}`;
  let keyApi = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${keyApi}`;
  axios.get(apiUrl).then((response) => {
           weather(response);
  });
}

let button = document.querySelector(".search");
   let value = capitalizeFirstLetter(button.value.toLowerCase());
function searchForCity(value) {
  let location = document.querySelector(".location");
  location.innerHTML = `${value}`;
  let keyApi = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${keyApi}`;
  axios.get(apiUrl).then((response) => {
    weather(response);
  });
}

let search = document.querySelector(".searching-form");
search.addEventListener("submit", show);

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let keyApi = "1ee4264117b73d2263eecd562f31ef5c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`;
    axios.get(apiUrl).then((response) => {
      let location = document.querySelector(".location");
      location.innerHTML = response.data.name;
      weather(response);
    });
  });
}

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", showLocation);

searchForCity("London");
