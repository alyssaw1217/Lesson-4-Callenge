let today = new Date();

let todaysDateTime = document.querySelector("span#dateTime");

let currentDay = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = days[currentDay];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = months[today.getMonth()];
let currentDate = today.getDate();

let currentHour = today.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = today.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

todaysDateTime.innerHTML = `${weekDay}, ${currentMonth} ${currentDate} ${currentHour}:${currentMinute} <br>`;

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", city);

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location-input");

  let location = document.querySelector("h1");
  location.innerHTML = `<strong>${cityInput.value}</strong>`;
}
navigator.geolocation.getCurrentPosition(showWeather);

function showWeather(position) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let location = document.querySelector("#location-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentTemp);
}

function currentTemp(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureResult = document.querySelector("#currentDegree");
  temperatureResult.innerHTML = `<strong>${temperature}°</strong>`;
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", showWeather);

function showCityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#currentDegree");
  cityTemp.innerHTML = `<strong>${temperature}°</strong>`;
  let city = document.querySelector("h1");
  city.innerHTML = `<strong>${response.data.name}<strong>`;
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCityTemp);
}

let button = document.querySelector("#currentCity");
button.addEventListener("click", currentLocation);
