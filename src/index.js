function capitalizeFirstLetter(string) {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let day = document.querySelectorAll("#day1 ,#day2 ,#day3 ,#day4 ");
  day[0].innerHTML = formatDay(response.data.daily[1].dt);
  day[1].innerHTML = formatDay(response.data.daily[2].dt);
  day[2].innerHTML = formatDay(response.data.daily[3].dt);
  day[3].innerHTML = formatDay(response.data.daily[4].dt);
  let temp = document.querySelectorAll("#temp1, #temp2, #temp3, #temp4");
  temp[0].innerHTML = `${Math.round(
    response.data.daily[1].temp.max
  )}° ${Math.round(response.data.daily[1].temp.min)}°`;
  temp[1].innerHTML = `${Math.round(
    response.data.daily[2].temp.max
  )}° ${Math.round(response.data.daily[2].temp.min)}°`;
  temp[2].innerHTML = `${Math.round(
    response.data.daily[3].temp.max
  )}° ${Math.round(response.data.daily[3].temp.min)}°`;
  temp[3].innerHTML = `${Math.round(
    response.data.daily[4].temp.max
  )}° ${Math.round(response.data.daily[4].temp.min)}°`;
  let img = document.querySelectorAll("#img1, #img2, #img3, #img4");
  img[0].setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`
  );
  img[1].setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`
  );
  img[2].setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`
  );
  img[3].setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`
  );
}

function getForecast(coordinates) {
  console.log(coordinates);
  let keyApi = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${keyApi}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weather(response) {
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
  weatherDesc.innerHTML = capitalizeFirstLetter(
    response.data.weather[0].description
  );

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
  console.log(response);

  getForecast(response.data.coord);
}

function show(event) {
  event.preventDefault();
  let button = document.querySelector(".search");
  let location = document.querySelector(".location");
  let value = capitalizeFirstLetter(button.value.toLowerCase());

  if (value.length === 0) {
    alert(`Hey ╰(*°▽°*)╯! Enter the city 😉`);
  }
  location.innerHTML = `${value}`;

  let keyApi = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${keyApi}`;
  axios.get(apiUrl).then((response) => {
    weather(response);
  });
}

let search = document.querySelector(".searching-form");
search.addEventListener("submit", show);

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