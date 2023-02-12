let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let today = document.querySelector("#time");
today.innerHTML = `${day} , ${hour} : ${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<strong >
              <li>
                ${day} <img src="http://openweathermap.org/img/wn/13n.png" alt="" width="150">
                <br />
                <span class="forecast-max">18°</span> 
                <span class="forecast-min">12°</span>
              </li>
              </strong>`;
  });
   
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function search(city) {
  let key = "be3787b39239779c9856215f2383d86b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showResult);
}
function showResult(response) {
  console.log(response);
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function findMe(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  search(city);
}
function searchLocation(position) {
  let key = "be3787b39239779c9856215f2383d86b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showResult);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureFahrenheit = document.querySelector("#temperature");
  temperatureFahrenheit.innerHTML = fahrenheitTemperature;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function changeCelsiuse(event) {
  event.preventDefault();
  let temperatureFahrenheit = document.querySelector("#temperature");
  temperatureFahrenheit.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;
let form = document.querySelector("#search-weather");
form.addEventListener("submit", findMe);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentLocation);
search("Tehran");
displayForecast();

let fahrenheitLink = document.querySelector("#fahreniheit");
fahrenheitLink.addEventListener("click", changeFahrenheit);

let celsiusLink = document.querySelector("#celciuse");
celsiusLink.addEventListener("click", changeCelsiuse);
