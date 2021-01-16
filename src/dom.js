const DOMHandler = () => {
  const input = document.querySelector("input");
  const submitBtn = document.querySelector(".submit");
  const toggleBtn = document.querySelector(".toggle");
  const cityNameHeader = document.querySelector(".city-name");
  const weatherIcon = document.querySelector(".wi");
  const weatherHeader = document.querySelector(".weather");
  const temperature = document.querySelector(".temperature");
  const feelsLike = document.querySelector(".feels-like");
  const humidity = document.querySelector(".humidity");
  const error = document.querySelector(".error");
  const wind = document.querySelector(".wind");

  function displayInfo(weather) {
    cityNameHeader.innerHTML = weather.city + ", " + weather.country;
    weatherHeader.innerHTML = weather.weatherMain;
    humidity.innerHTML = "Humidity: " + weather.humidity + "&#37;";
    wind.innerHTML = "Wind: " + Math.round(weather.windSpeed) + " mph";
    // weatherIcon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
    weatherIcon.classList.add(`wi-owm-${weather.id}`);
    temperature.value = weather.temperature;
    feelsLike.value = weather.feelslike;

    temperature.innerHTML = Math.round(weather.temperature) + "&#176F";
    feelsLike.innerHTML = Math.round(weather.temperature) + "&#176F";

    checkDayOrNight(weather);
  }

  function displayTemperatureF(weather) {
    temperature.innerHTML = weather.temperature + "&#176F";
    feelsLike.innerHTML = weather.temperature + "&#176F";
  }

  function displayTemperatureC(weather) {
    temperature.innerHTML = weather.temperature + "&#176C";
    feelsLike.innerHTML = weather.temperature + "&#176C";
  }

  function displayError() {
    error.classList.remove("shake");
    error.style.display = "block";
    setTimeout(() => {
      error.classList.add("shake");
    }),
      0;
  }

  function checkDayOrNight(weather) {
    if (weather.icon[2] === "n") {
      displayNight();
    } else {
      displayDay();
    }
  }
  function displayNight() {
    document.body.style.backgroundColor = "lightslategray";
    document.querySelector(".container").style.color = "white";
    submitBtn.style.color = "white";
    submitBtn.style.background = "black";
    submitBtn.style.border = "1px solid black";
    toggleBtn.style.color = "white";
    toggleBtn.style.background = "black";
    toggleBtn.style.border = "1px solid black";
  }

  function displayDay() {
    document.body.style.backgroundColor = "lightblue";
    document.querySelector(".container").style.color = "black";
    submitBtn.style.color = "white";
    submitBtn.style.border = "1px solid orange";
    submitBtn.style.background = "orange";
    toggleBtn.style.color = "white";
    toggleBtn.style.background = "orange";
    toggleBtn.style.border = "1px solid orange";
  }

  function updateToggle() {
    toggleBtn.innerHTML = toggleBtn.innerHTML === "°F" ? "°C" : "°F";
  }

  function hideError() {
    error.style.display = "none";
  }

  return {
    displayInfo,
    displayError,
    updateToggle,
    displayTemperatureC,
    displayTemperatureF,
    hideError,
  };
};

export default DOMHandler;
