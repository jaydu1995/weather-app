/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "./src/events.js");
// import getWeatherData from './api';




// stopped here make weather a global object inside class/module

const App = () => {
  let weather;
  let dom;
  let isFahrenheit = true;
  let events;

  async function getWeatherObject(weatherData) {
    weather = (0,_types__WEBPACK_IMPORTED_MODULE_0__.default)(
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
    dom = (0,_dom__WEBPACK_IMPORTED_MODULE_1__.default)();
    events = (0,_events__WEBPACK_IMPORTED_MODULE_2__.default)(this);
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
  }

  function convertToFarenheit() {
    weather.temperature = Math.round(weather.temperature * 1.8 + 32.0);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMHandler);


/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const EventHandler = app => {

  const input = document.querySelector("input");
  const submitBtn = document.querySelector(".submit");
  const toggleBtn = document.querySelector(".toggle");

  submitBtn.addEventListener('click', () => {
    console.log(app.isFahrenheit);
    app.update(input.value)
  })

  toggleBtn.addEventListener('click', () => {
    if (app.isFahrenheit) {
      app.changeToCelsius();
    } else {
      app.changeToFahrenheit();
    }
    console.log(app.isFahrenheit)
  })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventHandler);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


const app = (0,_app__WEBPACK_IMPORTED_MODULE_0__.default)();
app.start();


/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const Weather = (
  city, country,
  windSpeed,
  temperature,
  humidity,
  feelslike,
  weatherMain,
  icon,
  id,
  day,
) => {
  return {
  city,
  country,
  windSpeed,
  temperature,
  humidity,
  feelslike,
  weatherMain,
  icon,
  id,
  day,
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Weather);

// export default class Weather {
//   constructor(
//   city, country,
//   windSpeed,
//   temperature,
//   humidity,
//   feelslike,
//   weatherMain,
//   icon,
//   id,
//   day,
// ) {
//   this.city = city;
//   this.country = country;
//   this.windSpeed = windSpeed;
//   this.temperature = temperature;
//   this.humidity = humidity;
//   this.feelslike = feelslike;
//   this.weatherMain = weatherMain;
//   this.icon = icon;
//   this.id = id;
//   this.day = day;
// } 
// }


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQzhCO0FBQ0M7QUFDSzs7QUFFcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsK0NBQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELEtBQUs7QUFDaEUsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLDZDQUFVO0FBQ3BCLGFBQWEsZ0RBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxHQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3pHbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBLDZEQUE2RCxhQUFhO0FBQzFFLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvRjFCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQ3RCSjs7QUFFeEIsWUFBWSw2Q0FBRztBQUNmOzs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTs7Ozs7OztVQ2xEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBnZXRXZWF0aGVyRGF0YSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgV2VhdGhlciBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IERPTUhhbmRsZXIgZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gXCIuL2V2ZW50c1wiO1xuXG4vLyBzdG9wcGVkIGhlcmUgbWFrZSB3ZWF0aGVyIGEgZ2xvYmFsIG9iamVjdCBpbnNpZGUgY2xhc3MvbW9kdWxlXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgbGV0IHdlYXRoZXI7XG4gIGxldCBkb207XG4gIGxldCBpc0ZhaHJlbmhlaXQgPSB0cnVlO1xuICBsZXQgZXZlbnRzO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJPYmplY3Qod2VhdGhlckRhdGEpIHtcbiAgICB3ZWF0aGVyID0gV2VhdGhlcihcbiAgICAgIHdlYXRoZXJEYXRhW1wibmFtZVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wic3lzXCJdW1wiY291bnRyeVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wid2luZFwiXVtcInNwZWVkXCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJtYWluXCJdW1widGVtcFwiXSxcbiAgICAgIC8vIHRlbXBlcmF0dXJlQzogTWF0aC5yb3VuZCgoIHdlYXRoZXJEYXRhW1wibWFpblwiXVtcInRlbXBcIl0gLSAzMiApIC8gMS44MDAwKSxcbiAgICAgIHdlYXRoZXJEYXRhW1wibWFpblwiXVtcImh1bWlkaXR5XCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJtYWluXCJdW1wiZmVlbHNfbGlrZVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wid2VhdGhlclwiXVswXVtcIm1haW5cIl0sXG4gICAgICB3ZWF0aGVyRGF0YVtcIndlYXRoZXJcIl1bMF1bXCJpY29uXCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJ3ZWF0aGVyXCJdWzBdW1wiaWRcIl0sXG4gICAgICB3ZWF0aGVyRGF0YVtcIndlYXRoZXJcIl1bMF1bXCJpY29uXCJdWzJdID09PSBcImRcIlxuICAgICk7XG4gICAgcmV0dXJuIHdlYXRoZXI7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShjaXR5ID0gXCJNaWFtaVwiKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mQVBQSUQ9NDRmYTQ2NzdkMDZmNmMzZWFkNjA2NzY3MTI5YmUyNjAmdW5pdHM9aW1wZXJpYWxgLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcblxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICBkb20gPSBET01IYW5kbGVyKCk7XG4gICAgZXZlbnRzID0gRXZlbnRIYW5kbGVyKHRoaXMpO1xuICAgIGdldFdlYXRoZXJEYXRhKClcbiAgICAgIC50aGVuKChkYXRhKSA9PiBnZXRXZWF0aGVyT2JqZWN0KGRhdGEpKVxuICAgICAgLnRoZW4oKHdlYXRoZXIpID0+IGRvbS5kaXNwbGF5SW5mbyh3ZWF0aGVyKSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoY2l0eSA9IFwiTWlhbWlcIikge1xuICAgIGdldFdlYXRoZXJEYXRhKGNpdHkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmIChkYXRhLmNvZCA9PT0gMjAwKSB7XG4gICAgICAgIGRvbS5oaWRlRXJyb3IoKTtcbiAgICAgICAgZ2V0V2VhdGhlck9iamVjdChkYXRhKS50aGVuKCh3ZWF0aGVyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNGYWhyZW5oZWl0KSB7XG4gICAgICAgICAgICBkb20uZGlzcGxheUluZm8od2VhdGhlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnZlcnRUb0NlbHNpdXMoKTtcbiAgICAgICAgICAgIGRvbS5kaXNwbGF5SW5mbyh3ZWF0aGVyKTtcbiAgICAgICAgICAgIHVwZGF0ZVRlbXBlcmF0dXJlQygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb20uZGlzcGxheUVycm9yKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUZW1wZXJhdHVyZUMoKSB7XG4gICAgZG9tLmRpc3BsYXlUZW1wZXJhdHVyZUMod2VhdGhlcik7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUZW1wZXJhdHVyZUYoKSB7XG4gICAgZG9tLmRpc3BsYXlUZW1wZXJhdHVyZUYod2VhdGhlcik7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VG9DZWxzaXVzKCkge1xuICAgIHdlYXRoZXIudGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKCh3ZWF0aGVyLnRlbXBlcmF0dXJlIC0gMzIpIC8gMS44KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUb0ZhcmVuaGVpdCgpIHtcbiAgICB3ZWF0aGVyLnRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZCh3ZWF0aGVyLnRlbXBlcmF0dXJlICogMS44ICsgMzIuMCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VUb0NlbHNpdXMoKSB7XG4gICAgdGhpcy5pc0ZhaHJlbmhlaXQgPSBmYWxzZTtcbiAgICBjb252ZXJ0VG9DZWxzaXVzKCk7XG4gICAgdXBkYXRlVGVtcGVyYXR1cmVDKCk7XG4gICAgZG9tLnVwZGF0ZVRvZ2dsZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlVG9GYWhyZW5oZWl0KCkge1xuICAgIHRoaXMuaXNGYWhyZW5oZWl0ID0gdHJ1ZTtcbiAgICBjb252ZXJ0VG9GYXJlbmhlaXQoKTtcbiAgICB1cGRhdGVUZW1wZXJhdHVyZUYoKTtcbiAgICBkb20udXBkYXRlVG9nZ2xlKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGNoYW5nZVRvRmFocmVuaGVpdCxcbiAgICBjaGFuZ2VUb0NlbHNpdXMsXG4gICAgdXBkYXRlLFxuICAgIGlzRmFocmVuaGVpdCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiIsImNvbnN0IERPTUhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdFwiKTtcbiAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGVcIik7XG4gIGNvbnN0IGNpdHlOYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XG4gIGNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aVwiKTtcbiAgY29uc3Qgd2VhdGhlckhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlclwiKTtcbiAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBlcmF0dXJlXCIpO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWxzLWxpa2VcIik7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcbiAgY29uc3QgZXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yXCIpO1xuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xuXG4gIGZ1bmN0aW9uIGRpc3BsYXlJbmZvKHdlYXRoZXIpIHtcbiAgICBjaXR5TmFtZUhlYWRlci5pbm5lckhUTUwgPSB3ZWF0aGVyLmNpdHkgKyBcIiwgXCIgKyB3ZWF0aGVyLmNvdW50cnk7XG4gICAgd2VhdGhlckhlYWRlci5pbm5lckhUTUwgPSB3ZWF0aGVyLndlYXRoZXJNYWluO1xuICAgIGh1bWlkaXR5LmlubmVySFRNTCA9IFwiSHVtaWRpdHk6IFwiICsgd2VhdGhlci5odW1pZGl0eSArIFwiJiMzNztcIjtcbiAgICB3aW5kLmlubmVySFRNTCA9IFwiV2luZDogXCIgKyBNYXRoLnJvdW5kKHdlYXRoZXIud2luZFNwZWVkKSArIFwiIG1waFwiO1xuICAgIC8vIHdlYXRoZXJJY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3dlYXRoZXIuaWNvbn1AMngucG5nYFxuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoYHdpLW93bS0ke3dlYXRoZXIuaWR9YCk7XG4gICAgdGVtcGVyYXR1cmUudmFsdWUgPSB3ZWF0aGVyLnRlbXBlcmF0dXJlO1xuICAgIGZlZWxzTGlrZS52YWx1ZSA9IHdlYXRoZXIuZmVlbHNsaWtlO1xuXG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCh3ZWF0aGVyLnRlbXBlcmF0dXJlKSArIFwiJiMxNzZGXCI7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IE1hdGgucm91bmQod2VhdGhlci50ZW1wZXJhdHVyZSkgKyBcIiYjMTc2RlwiO1xuXG4gICAgY2hlY2tEYXlPck5pZ2h0KHdlYXRoZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheVRlbXBlcmF0dXJlRih3ZWF0aGVyKSB7XG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gd2VhdGhlci50ZW1wZXJhdHVyZSArIFwiJiMxNzZGXCI7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IHdlYXRoZXIudGVtcGVyYXR1cmUgKyBcIiYjMTc2RlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheVRlbXBlcmF0dXJlQyh3ZWF0aGVyKSB7XG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gd2VhdGhlci50ZW1wZXJhdHVyZSArIFwiJiMxNzZDXCI7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IHdlYXRoZXIudGVtcGVyYXR1cmUgKyBcIiYjMTc2Q1wiO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheUVycm9yKCkge1xuICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGFrZVwiKTtcbiAgICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZXJyb3IuY2xhc3NMaXN0LmFkZChcInNoYWtlXCIpO1xuICAgIH0pLFxuICAgICAgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRGF5T3JOaWdodCh3ZWF0aGVyKSB7XG4gICAgaWYgKHdlYXRoZXIuaWNvblsyXSA9PT0gXCJuXCIpIHtcbiAgICAgIGRpc3BsYXlOaWdodCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5RGF5KCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRpc3BsYXlOaWdodCgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRzbGF0ZWdyYXlcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKS5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBzdWJtaXRCdG4uc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgc3VibWl0QnRuLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG4gICAgc3VibWl0QnRuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgdG9nZ2xlQnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIHRvZ2dsZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibGFja1wiO1xuICAgIHRvZ2dsZUJ0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheURheSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJcIikuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgc3VibWl0QnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIHN1Ym1pdEJ0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBvcmFuZ2VcIjtcbiAgICBzdWJtaXRCdG4uc3R5bGUuYmFja2dyb3VuZCA9IFwib3JhbmdlXCI7XG4gICAgdG9nZ2xlQnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIHRvZ2dsZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJvcmFuZ2VcIjtcbiAgICB0b2dnbGVCdG4uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgb3JhbmdlXCI7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUb2dnbGUoKSB7XG4gICAgdG9nZ2xlQnRuLmlubmVySFRNTCA9IHRvZ2dsZUJ0bi5pbm5lckhUTUwgPT09IFwiwrBGXCIgPyBcIsKwQ1wiIDogXCLCsEZcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVFcnJvcigpIHtcbiAgICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRpc3BsYXlJbmZvLFxuICAgIGRpc3BsYXlFcnJvcixcbiAgICB1cGRhdGVUb2dnbGUsXG4gICAgZGlzcGxheVRlbXBlcmF0dXJlQyxcbiAgICBkaXNwbGF5VGVtcGVyYXR1cmVGLFxuICAgIGhpZGVFcnJvcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTUhhbmRsZXI7XG4iLCJjb25zdCBFdmVudEhhbmRsZXIgPSBhcHAgPT4ge1xuXG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdFwiKTtcbiAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGVcIik7XG5cbiAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGFwcC5pc0ZhaHJlbmhlaXQpO1xuICAgIGFwcC51cGRhdGUoaW5wdXQudmFsdWUpXG4gIH0pXG5cbiAgdG9nZ2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChhcHAuaXNGYWhyZW5oZWl0KSB7XG4gICAgICBhcHAuY2hhbmdlVG9DZWxzaXVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5jaGFuZ2VUb0ZhaHJlbmhlaXQoKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYXBwLmlzRmFocmVuaGVpdClcbiAgfSlcblxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEhhbmRsZXI7XG4iLCJpbXBvcnQgQXBwIGZyb20gJy4vYXBwJztcblxuY29uc3QgYXBwID0gQXBwKCk7XG5hcHAuc3RhcnQoKTtcbiIsImNvbnN0IFdlYXRoZXIgPSAoXG4gIGNpdHksIGNvdW50cnksXG4gIHdpbmRTcGVlZCxcbiAgdGVtcGVyYXR1cmUsXG4gIGh1bWlkaXR5LFxuICBmZWVsc2xpa2UsXG4gIHdlYXRoZXJNYWluLFxuICBpY29uLFxuICBpZCxcbiAgZGF5LFxuKSA9PiB7XG4gIHJldHVybiB7XG4gIGNpdHksXG4gIGNvdW50cnksXG4gIHdpbmRTcGVlZCxcbiAgdGVtcGVyYXR1cmUsXG4gIGh1bWlkaXR5LFxuICBmZWVsc2xpa2UsXG4gIHdlYXRoZXJNYWluLFxuICBpY29uLFxuICBpZCxcbiAgZGF5LFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYXRoZXI7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXRoZXIge1xuLy8gICBjb25zdHJ1Y3Rvcihcbi8vICAgY2l0eSwgY291bnRyeSxcbi8vICAgd2luZFNwZWVkLFxuLy8gICB0ZW1wZXJhdHVyZSxcbi8vICAgaHVtaWRpdHksXG4vLyAgIGZlZWxzbGlrZSxcbi8vICAgd2VhdGhlck1haW4sXG4vLyAgIGljb24sXG4vLyAgIGlkLFxuLy8gICBkYXksXG4vLyApIHtcbi8vICAgdGhpcy5jaXR5ID0gY2l0eTtcbi8vICAgdGhpcy5jb3VudHJ5ID0gY291bnRyeTtcbi8vICAgdGhpcy53aW5kU3BlZWQgPSB3aW5kU3BlZWQ7XG4vLyAgIHRoaXMudGVtcGVyYXR1cmUgPSB0ZW1wZXJhdHVyZTtcbi8vICAgdGhpcy5odW1pZGl0eSA9IGh1bWlkaXR5O1xuLy8gICB0aGlzLmZlZWxzbGlrZSA9IGZlZWxzbGlrZTtcbi8vICAgdGhpcy53ZWF0aGVyTWFpbiA9IHdlYXRoZXJNYWluO1xuLy8gICB0aGlzLmljb24gPSBpY29uO1xuLy8gICB0aGlzLmlkID0gaWQ7XG4vLyAgIHRoaXMuZGF5ID0gZGF5O1xuLy8gfSBcbi8vIH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==