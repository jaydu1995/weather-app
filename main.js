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
    feelsLike.innerHTML = "Feels like: " + Math.round(weather.feelslike) + "&#176F";

    checkDayOrNight(weather);
  }

  function displayTemperatureF(weather) {
    temperature.innerHTML = weather.temperature + "&#176F";
    feelsLike.innerHTML = "Feels like: " + weather.feelslike + "&#176F";
  }

  function displayTemperatureC(weather) {
    temperature.innerHTML = weather.temperature + "&#176C";
    feelsLike.innerHTML = "Feels like: " + weather.feelslike + "&#176C";
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
    app.update(input.value)
  })

  toggleBtn.addEventListener('click', () => {
    if (app.isFahrenheit) {
      app.changeToCelsius();
    } else {
      app.changeToFahrenheit();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQzhCO0FBQ0M7QUFDSzs7QUFFcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsK0NBQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELEtBQUs7QUFDaEUsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLDZDQUFVO0FBQ3BCLGFBQWEsZ0RBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsR0FBRyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMzR25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQSw2REFBNkQsYUFBYTtBQUMxRSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDL0YxQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQ3BCSjs7QUFFeEIsWUFBWSw2Q0FBRztBQUNmOzs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTs7Ozs7OztVQ2xEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBnZXRXZWF0aGVyRGF0YSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgV2VhdGhlciBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IERPTUhhbmRsZXIgZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gXCIuL2V2ZW50c1wiO1xuXG4vLyBzdG9wcGVkIGhlcmUgbWFrZSB3ZWF0aGVyIGEgZ2xvYmFsIG9iamVjdCBpbnNpZGUgY2xhc3MvbW9kdWxlXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgbGV0IHdlYXRoZXI7XG4gIGxldCBkb207XG4gIGxldCBpc0ZhaHJlbmhlaXQgPSB0cnVlO1xuICBsZXQgZXZlbnRzO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJPYmplY3Qod2VhdGhlckRhdGEpIHtcbiAgICB3ZWF0aGVyID0gV2VhdGhlcihcbiAgICAgIHdlYXRoZXJEYXRhW1wibmFtZVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wic3lzXCJdW1wiY291bnRyeVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wid2luZFwiXVtcInNwZWVkXCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJtYWluXCJdW1widGVtcFwiXSxcbiAgICAgIC8vIHRlbXBlcmF0dXJlQzogTWF0aC5yb3VuZCgoIHdlYXRoZXJEYXRhW1wibWFpblwiXVtcInRlbXBcIl0gLSAzMiApIC8gMS44MDAwKSxcbiAgICAgIHdlYXRoZXJEYXRhW1wibWFpblwiXVtcImh1bWlkaXR5XCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJtYWluXCJdW1wiZmVlbHNfbGlrZVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wid2VhdGhlclwiXVswXVtcIm1haW5cIl0sXG4gICAgICB3ZWF0aGVyRGF0YVtcIndlYXRoZXJcIl1bMF1bXCJpY29uXCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJ3ZWF0aGVyXCJdWzBdW1wiaWRcIl0sXG4gICAgICB3ZWF0aGVyRGF0YVtcIndlYXRoZXJcIl1bMF1bXCJpY29uXCJdWzJdID09PSBcImRcIlxuICAgICk7XG4gICAgcmV0dXJuIHdlYXRoZXI7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShjaXR5ID0gXCJNaWFtaVwiKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mQVBQSUQ9NDRmYTQ2NzdkMDZmNmMzZWFkNjA2NzY3MTI5YmUyNjAmdW5pdHM9aW1wZXJpYWxgLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcblxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICBkb20gPSBET01IYW5kbGVyKCk7XG4gICAgZXZlbnRzID0gRXZlbnRIYW5kbGVyKHRoaXMpO1xuICAgIGdldFdlYXRoZXJEYXRhKClcbiAgICAgIC50aGVuKChkYXRhKSA9PiBnZXRXZWF0aGVyT2JqZWN0KGRhdGEpKVxuICAgICAgLnRoZW4oKHdlYXRoZXIpID0+IGRvbS5kaXNwbGF5SW5mbyh3ZWF0aGVyKSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoY2l0eSA9IFwiTWlhbWlcIikge1xuICAgIGdldFdlYXRoZXJEYXRhKGNpdHkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmIChkYXRhLmNvZCA9PT0gMjAwKSB7XG4gICAgICAgIGRvbS5oaWRlRXJyb3IoKTtcbiAgICAgICAgZ2V0V2VhdGhlck9iamVjdChkYXRhKS50aGVuKCh3ZWF0aGVyKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNGYWhyZW5oZWl0KSB7XG4gICAgICAgICAgICBkb20uZGlzcGxheUluZm8od2VhdGhlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnZlcnRUb0NlbHNpdXMoKTtcbiAgICAgICAgICAgIGRvbS5kaXNwbGF5SW5mbyh3ZWF0aGVyKTtcbiAgICAgICAgICAgIHVwZGF0ZVRlbXBlcmF0dXJlQygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb20uZGlzcGxheUVycm9yKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUZW1wZXJhdHVyZUMoKSB7XG4gICAgZG9tLmRpc3BsYXlUZW1wZXJhdHVyZUMod2VhdGhlcik7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUZW1wZXJhdHVyZUYoKSB7XG4gICAgZG9tLmRpc3BsYXlUZW1wZXJhdHVyZUYod2VhdGhlcik7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VG9DZWxzaXVzKCkge1xuICAgIHdlYXRoZXIudGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKCh3ZWF0aGVyLnRlbXBlcmF0dXJlIC0gMzIpIC8gMS44KTtcbiAgICB3ZWF0aGVyLmZlZWxzbGlrZSA9IE1hdGgucm91bmQoKHdlYXRoZXIuZmVlbHNsaWtlIC0gMzIpIC8gMS44KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUb0ZhcmVuaGVpdCgpIHtcbiAgICB3ZWF0aGVyLnRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZCh3ZWF0aGVyLnRlbXBlcmF0dXJlICogMS44ICsgMzIuMCk7XG4gICAgd2VhdGhlci5mZWVsc2xpa2UgPSBNYXRoLnJvdW5kKHdlYXRoZXIuZmVlbHNsaWtlICogMS44ICsgMzIuMCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VUb0NlbHNpdXMoKSB7XG4gICAgdGhpcy5pc0ZhaHJlbmhlaXQgPSBmYWxzZTtcbiAgICBjb252ZXJ0VG9DZWxzaXVzKCk7XG4gICAgdXBkYXRlVGVtcGVyYXR1cmVDKCk7XG4gICAgZG9tLnVwZGF0ZVRvZ2dsZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlVG9GYWhyZW5oZWl0KCkge1xuICAgIHRoaXMuaXNGYWhyZW5oZWl0ID0gdHJ1ZTtcbiAgICBjb252ZXJ0VG9GYXJlbmhlaXQoKTtcbiAgICB1cGRhdGVUZW1wZXJhdHVyZUYoKTtcbiAgICBkb20udXBkYXRlVG9nZ2xlKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGNoYW5nZVRvRmFocmVuaGVpdCxcbiAgICBjaGFuZ2VUb0NlbHNpdXMsXG4gICAgdXBkYXRlLFxuICAgIGlzRmFocmVuaGVpdCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiIsImNvbnN0IERPTUhhbmRsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdFwiKTtcbiAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGVcIik7XG4gIGNvbnN0IGNpdHlOYW1lSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XG4gIGNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aVwiKTtcbiAgY29uc3Qgd2VhdGhlckhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlclwiKTtcbiAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBlcmF0dXJlXCIpO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWxzLWxpa2VcIik7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcbiAgY29uc3QgZXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yXCIpO1xuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xuXG4gIGZ1bmN0aW9uIGRpc3BsYXlJbmZvKHdlYXRoZXIpIHtcbiAgICBjaXR5TmFtZUhlYWRlci5pbm5lckhUTUwgPSB3ZWF0aGVyLmNpdHkgKyBcIiwgXCIgKyB3ZWF0aGVyLmNvdW50cnk7XG4gICAgd2VhdGhlckhlYWRlci5pbm5lckhUTUwgPSB3ZWF0aGVyLndlYXRoZXJNYWluO1xuICAgIGh1bWlkaXR5LmlubmVySFRNTCA9IFwiSHVtaWRpdHk6IFwiICsgd2VhdGhlci5odW1pZGl0eSArIFwiJiMzNztcIjtcbiAgICB3aW5kLmlubmVySFRNTCA9IFwiV2luZDogXCIgKyBNYXRoLnJvdW5kKHdlYXRoZXIud2luZFNwZWVkKSArIFwiIG1waFwiO1xuICAgIC8vIHdlYXRoZXJJY29uLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3dlYXRoZXIuaWNvbn1AMngucG5nYFxuICAgIHdlYXRoZXJJY29uLmNsYXNzTGlzdC5hZGQoYHdpLW93bS0ke3dlYXRoZXIuaWR9YCk7XG4gICAgdGVtcGVyYXR1cmUudmFsdWUgPSB3ZWF0aGVyLnRlbXBlcmF0dXJlO1xuICAgIGZlZWxzTGlrZS52YWx1ZSA9IHdlYXRoZXIuZmVlbHNsaWtlO1xuXG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCh3ZWF0aGVyLnRlbXBlcmF0dXJlKSArIFwiJiMxNzZGXCI7XG4gICAgZmVlbHNMaWtlLmlubmVySFRNTCA9IFwiRmVlbHMgbGlrZTogXCIgKyBNYXRoLnJvdW5kKHdlYXRoZXIuZmVlbHNsaWtlKSArIFwiJiMxNzZGXCI7XG5cbiAgICBjaGVja0RheU9yTmlnaHQod2VhdGhlcik7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5VGVtcGVyYXR1cmVGKHdlYXRoZXIpIHtcbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSB3ZWF0aGVyLnRlbXBlcmF0dXJlICsgXCImIzE3NkZcIjtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gXCJGZWVscyBsaWtlOiBcIiArIHdlYXRoZXIuZmVlbHNsaWtlICsgXCImIzE3NkZcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlUZW1wZXJhdHVyZUMod2VhdGhlcikge1xuICAgIHRlbXBlcmF0dXJlLmlubmVySFRNTCA9IHdlYXRoZXIudGVtcGVyYXR1cmUgKyBcIiYjMTc2Q1wiO1xuICAgIGZlZWxzTGlrZS5pbm5lckhUTUwgPSBcIkZlZWxzIGxpa2U6IFwiICsgd2VhdGhlci5mZWVsc2xpa2UgKyBcIiYjMTc2Q1wiO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheUVycm9yKCkge1xuICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGFrZVwiKTtcbiAgICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZXJyb3IuY2xhc3NMaXN0LmFkZChcInNoYWtlXCIpO1xuICAgIH0pLFxuICAgICAgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRGF5T3JOaWdodCh3ZWF0aGVyKSB7XG4gICAgaWYgKHdlYXRoZXIuaWNvblsyXSA9PT0gXCJuXCIpIHtcbiAgICAgIGRpc3BsYXlOaWdodCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5RGF5KCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRpc3BsYXlOaWdodCgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRzbGF0ZWdyYXlcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKS5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBzdWJtaXRCdG4uc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgc3VibWl0QnRuLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG4gICAgc3VibWl0QnRuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgdG9nZ2xlQnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIHRvZ2dsZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibGFja1wiO1xuICAgIHRvZ2dsZUJ0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheURheSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJcIikuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgc3VibWl0QnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIHN1Ym1pdEJ0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBvcmFuZ2VcIjtcbiAgICBzdWJtaXRCdG4uc3R5bGUuYmFja2dyb3VuZCA9IFwib3JhbmdlXCI7XG4gICAgdG9nZ2xlQnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIHRvZ2dsZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJvcmFuZ2VcIjtcbiAgICB0b2dnbGVCdG4uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgb3JhbmdlXCI7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVUb2dnbGUoKSB7XG4gICAgdG9nZ2xlQnRuLmlubmVySFRNTCA9IHRvZ2dsZUJ0bi5pbm5lckhUTUwgPT09IFwiwrBGXCIgPyBcIsKwQ1wiIDogXCLCsEZcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVFcnJvcigpIHtcbiAgICBlcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRpc3BsYXlJbmZvLFxuICAgIGRpc3BsYXlFcnJvcixcbiAgICB1cGRhdGVUb2dnbGUsXG4gICAgZGlzcGxheVRlbXBlcmF0dXJlQyxcbiAgICBkaXNwbGF5VGVtcGVyYXR1cmVGLFxuICAgIGhpZGVFcnJvcixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERPTUhhbmRsZXI7XG4iLCJjb25zdCBFdmVudEhhbmRsZXIgPSBhcHAgPT4ge1xuXG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdFwiKTtcbiAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGVcIik7XG5cbiAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGFwcC51cGRhdGUoaW5wdXQudmFsdWUpXG4gIH0pXG5cbiAgdG9nZ2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChhcHAuaXNGYWhyZW5oZWl0KSB7XG4gICAgICBhcHAuY2hhbmdlVG9DZWxzaXVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcC5jaGFuZ2VUb0ZhaHJlbmhlaXQoKTtcbiAgICB9XG4gIH0pXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRIYW5kbGVyO1xuIiwiaW1wb3J0IEFwcCBmcm9tICcuL2FwcCc7XG5cbmNvbnN0IGFwcCA9IEFwcCgpO1xuYXBwLnN0YXJ0KCk7XG4iLCJjb25zdCBXZWF0aGVyID0gKFxuICBjaXR5LCBjb3VudHJ5LFxuICB3aW5kU3BlZWQsXG4gIHRlbXBlcmF0dXJlLFxuICBodW1pZGl0eSxcbiAgZmVlbHNsaWtlLFxuICB3ZWF0aGVyTWFpbixcbiAgaWNvbixcbiAgaWQsXG4gIGRheSxcbikgPT4ge1xuICByZXR1cm4ge1xuICBjaXR5LFxuICBjb3VudHJ5LFxuICB3aW5kU3BlZWQsXG4gIHRlbXBlcmF0dXJlLFxuICBodW1pZGl0eSxcbiAgZmVlbHNsaWtlLFxuICB3ZWF0aGVyTWFpbixcbiAgaWNvbixcbiAgaWQsXG4gIGRheSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWF0aGVyO1xuXG4vLyBleHBvcnQgZGVmYXVsdCBjbGFzcyBXZWF0aGVyIHtcbi8vICAgY29uc3RydWN0b3IoXG4vLyAgIGNpdHksIGNvdW50cnksXG4vLyAgIHdpbmRTcGVlZCxcbi8vICAgdGVtcGVyYXR1cmUsXG4vLyAgIGh1bWlkaXR5LFxuLy8gICBmZWVsc2xpa2UsXG4vLyAgIHdlYXRoZXJNYWluLFxuLy8gICBpY29uLFxuLy8gICBpZCxcbi8vICAgZGF5LFxuLy8gKSB7XG4vLyAgIHRoaXMuY2l0eSA9IGNpdHk7XG4vLyAgIHRoaXMuY291bnRyeSA9IGNvdW50cnk7XG4vLyAgIHRoaXMud2luZFNwZWVkID0gd2luZFNwZWVkO1xuLy8gICB0aGlzLnRlbXBlcmF0dXJlID0gdGVtcGVyYXR1cmU7XG4vLyAgIHRoaXMuaHVtaWRpdHkgPSBodW1pZGl0eTtcbi8vICAgdGhpcy5mZWVsc2xpa2UgPSBmZWVsc2xpa2U7XG4vLyAgIHRoaXMud2VhdGhlck1haW4gPSB3ZWF0aGVyTWFpbjtcbi8vICAgdGhpcy5pY29uID0gaWNvbjtcbi8vICAgdGhpcy5pZCA9IGlkO1xuLy8gICB0aGlzLmRheSA9IGRheTtcbi8vIH0gXG4vLyB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=