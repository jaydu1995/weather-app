// import getWeatherData from './api';
import Weather from "./types";
import DOMHandler from "./dom";
import EventHandler from "./events";

// stopped here make weather a global object inside class/module

const App = () => {
  let weather;
  let dom;
  let isFahrenheit = true;
  let events;

  async function getWeatherObject(weatherData) {
    weather = Weather(
      weatherData["name"],
      weatherData["sys"]["country"],
      weatherData["wind"]["speed"],
      weatherData["main"]["temp"],
      // temperatureC: Math.round(( weatherData["main"]["temp"] - 32 ) / 1.8000),
      weatherData["main"]["humidity"],
      weatherData["main"]["feels_like"],
      weatherData["weather"][0]["main"],
      weatherData["weather"][0]["icon"],
      weatherData["weather"][0]["id"],
      weatherData["weather"][0]["icon"][2] === "d"
    );
    return weather;
  }

  async function getWeatherData(city = "Miami") {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=44fa4677d06f6c3ead606767129be260&units=imperial`,
      { mode: "cors" }
    );

    return await response.json();
  }

  function start() {
    dom = DOMHandler();
    events = EventHandler(this);
    getWeatherData()
      .then((data) => getWeatherObject(data))
      .then((weather) => dom.displayInfo(weather));
  }

  function update(city = "Miami") {
    getWeatherData(city).then((data) => {
      if (data.cod === 200) {
        dom.hideError();
        getWeatherObject(data).then((weather) => {
          if (this.isFahrenheit) {
            dom.displayInfo(weather);
          } else {
            convertToCelsius();
            dom.displayInfo(weather);
            updateTemperatureC();
          }
        });
      } else {
        dom.displayError();
      }
    });
  }

  function updateTemperatureC() {
    dom.displayTemperatureC(weather);
  }

  function updateTemperatureF() {
    dom.displayTemperatureF(weather);
  }

  function convertToCelsius() {
    weather.temperature = Math.round((weather.temperature - 32) / 1.8);
    weather.feelslike = Math.round((weather.feelslike - 32) / 1.8);
  }

  function convertToFarenheit() {
    weather.temperature = Math.round(weather.temperature * 1.8 + 32.0);
    weather.feelslike = Math.round(weather.feelslike * 1.8 + 32.0);
  }

  function changeToCelsius() {
    this.isFahrenheit = false;
    convertToCelsius();
    updateTemperatureC();
    dom.updateToggle();
  }

  function changeToFahrenheit() {
    this.isFahrenheit = true;
    convertToFarenheit();
    updateTemperatureF();
    dom.updateToggle();
  }

  return {
    start,
    changeToFahrenheit,
    changeToCelsius,
    update,
    isFahrenheit,
  };
};

export default App;
