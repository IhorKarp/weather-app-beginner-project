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

function show(event) {
  event.preventDefault();

  let button = document.querySelector(".search");
  let location = document.querySelector(".location");
  let value = capitalizeFirstLetter(button.value.toLowerCase());
  location.innerHTML = `${value}`;
  let keyApi = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${keyApi}`;
  axios.get(apiUrl).then((response) => {
    console.log(response.data);
    let weatherTemp = document.querySelector(".weather-temp");
    weatherTemp.innerHTML = Math.round(response.data.main.temp);
    let weatherDesc = document.querySelector(".weather-desc");
    let description = `response.data.weather[0].description)`;
    weatherDesc.innerHTML = Math.round(description);
  });
}

let search = document.querySelector(".searching-form");
search.addEventListener("submit", show);

/*
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};
*/

/*
let cityName = prompt("Enter a city???");
cityName = cityName.toLowerCase();
if (weather[cityName] !== undefined) {
  let celsiusTemperature = Math.round(weather[cityName].temp);
  let farenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let humidity = weather[cityName].humidity;
  alert(
    `It is currently ${celsiusTemperature}°C (${farenheitTemperature}°F) in ${capitalizeFirstLetter(
      cityName
    )} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityName}`
  );
}

function conversionToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".weather-temp");
  temp.innerHTML = 66;
}
function conversionToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".weather-temp");
  temp.innerHTML = 19;
}

let celciusButton = document.querySelector("#h31");
celciusButton.addEventListener("click", conversionToCelsius);
let fahrenheitButton = document.querySelector("#h32");
fahrenheitButton.addEventListener("click", conversionToFahrenheit);

*/
