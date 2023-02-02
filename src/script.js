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
let minutes = now.getMinutes();
let today = document.querySelector("#time");
today.innerHTML = `${day} , ${hour} : ${minutes}`;

function search(city) {
  let key = "be3787b39239779c9856215f2383d86b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showResult);
}
function showResult(response) {
  console.log(response);
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);
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

let form = document.querySelector("#search-weather");
form.addEventListener("submit", findMe);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentLocation);
search("Tehran");


