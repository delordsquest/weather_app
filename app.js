// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=apparent_temperature,weather_code
// https://wormhole.app/mvJrB#8o2GrbZB9jT0WK8Byfo7FA
// https://open-meteo.com/

const cloud = "./assets/cloud.svg";
const cloudRain = "./assets/cloud-rain.svg";
const cloudLightning = "./assets/cloud-lightning.svg";
const cloudSnow = "./assets/cloud-snow.svg";
const cloudDrizzle = "./assets/cloud-drizzle.svg";
const wind = "./assets/wind.svg";
const sun = "./assets/sun.svg";

// const weatherImageElem = document.getElementById("weather-image");
// weatherImageElem.src = sun;

// Create each weather
const cloudy = {
  image: cloud,
  summary: "Cloudy",
};
const rain = {
  image: cloudRain,
  summary: "Raining",
};
const thunderStorm = {
  image: cloudLightning,
  summary: "ThunderStorm",
};
const drizzle = {
  image: cloudDrizzle,
  summary: "Drizzling",
};
const snowy = {
  image: wind,
  summary: "Snowing",
};
const windy = {
  image: wind,
  summary: "Cloudy",
};
const sunny = {
  image: sun,
  summary: "Sunny",
};

// https://api.open-meteo.com/v1/forecast?latitude=8.1337&longitude=4.2401&current=apparent_temperature,weather_code&daily=weather_code&timezone=Africa%2FCairo

// Get location

navigator.geolocation.getCurrentPosition(getLocation); // Geolocation API

async function getLocation(location) {
  console.log(location.coords);

  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  console.log(latitude, longitude);

  await fetchCurrentWeather(latitude, longitude);
}

async function fetchCurrentWeather(latitude, longitude) {
  let response =
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=apparent_temperature,weather_code&daily=weather_code&timezone=Africa%2FCairo
`);
  let weatherData = await response.json();
  console.log(weatherData.current);
  console.log(weatherData.daily.weatherCode);

  let weatherCode = weatherData.current.weather_code;
  let apparentTemp = weatherData.current.apparent_temperature;
  let weatherDailyCode = weatherData.daily.weather_code;
  let apparentDailyTemp = weatherData.daily.apparent_temperature;

  console.log("Weather code:", weatherCode);
  console.log("Weather temp:", apparentTemp);
  console.log("Weather daily code:", weatherDailyCode);
  //console.log("Weather daily temp:", apparentDailyTemp);

  updateWeather(weatherCode, apparentTemp, weatherDailyCode, apparentDailyTemp);
}

function updateWeather(weatherCode, apparentTemp) {
  const maxTemp = document.getElementById("max-temp");
  const minTemp = document.getElementById("min-temp");

  maxTemp.innerText = apparentTemp;
  minTemp.innerText = apparentTemp;

  let currentWeather = determineWeather(weatherCode);

  let weatherImageElem = document.getElementById("weather-image");
  weatherImageElem.src = currentWeather.image;
  weatherImageElem.alt = currentWeather.summary;

  let weatherSummaryElem = document.getElementById("weather-summary");
  weatherSummaryElem.innerText = currentWeather.summary;
}

function determineWeather(weatherCode) {
  const clearCodes = [0];
  const cloudyCodes = [1, 2, 3, 11, 19];
  const windyCodes = [45, 48];
  const rainyCodes = [60, 61, 62, 63, 64, 65, 80, 81, 82];
  const drizzleCodes = [50, 51, 52, 53, 54, 55];
  const snowyCodes = [56, 57, 58, 59, 66, 67, 68, 69, 83, 84, 85, 86];
  const thunderStormCodes = [95, 96, 97, 98];

  if (clearCodes.includes(weatherCode)) {
    return sunny;
  } else if (cloudyCodes.includes(weatherCode)) {
    return cloudy;
  } else if (windyCodes.includes(weatherCode)) {
    return windy;
  } else if (rainyCodes.includes(weatherCode)) {
    return rain;
  } else if (drizzleCodes.includes(weatherCode)) {
    return drizzle;
  } else if (snowyCodes.includes(weatherCode)) {
    return snowy;
  } else if (thunderStormCodes.includes(weatherCode)) {
    return thunderStorm;
  } else {
    return sunny;
  }
}
