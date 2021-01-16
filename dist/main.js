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
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=44fa4677d06f6c3ead606767129be260&units=imperial`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy90eXBlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQzhCO0FBQ0M7QUFDSzs7QUFFcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsK0NBQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELEtBQUs7QUFDL0QsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLDZDQUFVO0FBQ3BCLGFBQWEsZ0RBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxHQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3pHbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBLDZEQUE2RCxhQUFhO0FBQzFFLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvRjFCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQ3RCSjs7QUFFeEIsWUFBWSw2Q0FBRztBQUNmOzs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTs7Ozs7OztVQ2xEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBnZXRXZWF0aGVyRGF0YSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgV2VhdGhlciBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IERPTUhhbmRsZXIgZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gXCIuL2V2ZW50c1wiO1xuXG4vLyBzdG9wcGVkIGhlcmUgbWFrZSB3ZWF0aGVyIGEgZ2xvYmFsIG9iamVjdCBpbnNpZGUgY2xhc3MvbW9kdWxlXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgbGV0IHdlYXRoZXI7XG4gIGxldCBkb207XG4gIGxldCBpc0ZhaHJlbmhlaXQgPSB0cnVlO1xuICBsZXQgZXZlbnRzO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJPYmplY3Qod2VhdGhlckRhdGEpIHtcbiAgICB3ZWF0aGVyID0gV2VhdGhlcihcbiAgICAgIHdlYXRoZXJEYXRhW1wibmFtZVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wic3lzXCJdW1wiY291bnRyeVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wid2luZFwiXVtcInNwZWVkXCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJtYWluXCJdW1widGVtcFwiXSxcbiAgICAgIC8vIHRlbXBlcmF0dXJlQzogTWF0aC5yb3VuZCgoIHdlYXRoZXJEYXRhW1wibWFpblwiXVtcInRlbXBcIl0gLSAzMiApIC8gMS44MDAwKSxcbiAgICAgIHdlYXRoZXJEYXRhW1wibWFpblwiXVtcImh1bWlkaXR5XCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJtYWluXCJdW1wiZmVlbHNfbGlrZVwiXSxcbiAgICAgIHdlYXRoZXJEYXRhW1wid2VhdGhlclwiXVswXVtcIm1haW5cIl0sXG4gICAgICB3ZWF0aGVyRGF0YVtcIndlYXRoZXJcIl1bMF1bXCJpY29uXCJdLFxuICAgICAgd2VhdGhlckRhdGFbXCJ3ZWF0aGVyXCJdWzBdW1wiaWRcIl0sXG4gICAgICB3ZWF0aGVyRGF0YVtcIndlYXRoZXJcIl1bMF1bXCJpY29uXCJdWzJdID09PSBcImRcIlxuICAgICk7XG4gICAgcmV0dXJuIHdlYXRoZXI7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShjaXR5ID0gXCJNaWFtaVwiKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZBUFBJRD00NGZhNDY3N2QwNmY2YzNlYWQ2MDY3NjcxMjliZTI2MCZ1bml0cz1pbXBlcmlhbGAsXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGRvbSA9IERPTUhhbmRsZXIoKTtcbiAgICBldmVudHMgPSBFdmVudEhhbmRsZXIodGhpcyk7XG4gICAgZ2V0V2VhdGhlckRhdGEoKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGdldFdlYXRoZXJPYmplY3QoZGF0YSkpXG4gICAgICAudGhlbigod2VhdGhlcikgPT4gZG9tLmRpc3BsYXlJbmZvKHdlYXRoZXIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShjaXR5ID0gXCJNaWFtaVwiKSB7XG4gICAgZ2V0V2VhdGhlckRhdGEoY2l0eSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgaWYgKGRhdGEuY29kID09PSAyMDApIHtcbiAgICAgICAgZG9tLmhpZGVFcnJvcigpO1xuICAgICAgICBnZXRXZWF0aGVyT2JqZWN0KGRhdGEpLnRoZW4oKHdlYXRoZXIpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc0ZhaHJlbmhlaXQpIHtcbiAgICAgICAgICAgIGRvbS5kaXNwbGF5SW5mbyh3ZWF0aGVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udmVydFRvQ2Vsc2l1cygpO1xuICAgICAgICAgICAgZG9tLmRpc3BsYXlJbmZvKHdlYXRoZXIpO1xuICAgICAgICAgICAgdXBkYXRlVGVtcGVyYXR1cmVDKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbS5kaXNwbGF5RXJyb3IoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRlbXBlcmF0dXJlQygpIHtcbiAgICBkb20uZGlzcGxheVRlbXBlcmF0dXJlQyh3ZWF0aGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRlbXBlcmF0dXJlRigpIHtcbiAgICBkb20uZGlzcGxheVRlbXBlcmF0dXJlRih3ZWF0aGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUb0NlbHNpdXMoKSB7XG4gICAgd2VhdGhlci50ZW1wZXJhdHVyZSA9IE1hdGgucm91bmQoKHdlYXRoZXIudGVtcGVyYXR1cmUgLSAzMikgLyAxLjgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFRvRmFyZW5oZWl0KCkge1xuICAgIHdlYXRoZXIudGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKHdlYXRoZXIudGVtcGVyYXR1cmUgKiAxLjggKyAzMi4wKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZVRvQ2Vsc2l1cygpIHtcbiAgICB0aGlzLmlzRmFocmVuaGVpdCA9IGZhbHNlO1xuICAgIGNvbnZlcnRUb0NlbHNpdXMoKTtcbiAgICB1cGRhdGVUZW1wZXJhdHVyZUMoKTtcbiAgICBkb20udXBkYXRlVG9nZ2xlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VUb0ZhaHJlbmhlaXQoKSB7XG4gICAgdGhpcy5pc0ZhaHJlbmhlaXQgPSB0cnVlO1xuICAgIGNvbnZlcnRUb0ZhcmVuaGVpdCgpO1xuICAgIHVwZGF0ZVRlbXBlcmF0dXJlRigpO1xuICAgIGRvbS51cGRhdGVUb2dnbGUoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhcnQsXG4gICAgY2hhbmdlVG9GYWhyZW5oZWl0LFxuICAgIGNoYW5nZVRvQ2Vsc2l1cyxcbiAgICB1cGRhdGUsXG4gICAgaXNGYWhyZW5oZWl0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIiwiY29uc3QgRE9NSGFuZGxlciA9ICgpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0XCIpO1xuICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZVwiKTtcbiAgY29uc3QgY2l0eU5hbWVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKTtcbiAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpXCIpO1xuICBjb25zdCB3ZWF0aGVySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyXCIpO1xuICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGVyYXR1cmVcIik7XG4gIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbHMtbGlrZVwiKTtcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5XCIpO1xuICBjb25zdCBlcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3JcIik7XG4gIGNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRcIik7XG5cbiAgZnVuY3Rpb24gZGlzcGxheUluZm8od2VhdGhlcikge1xuICAgIGNpdHlOYW1lSGVhZGVyLmlubmVySFRNTCA9IHdlYXRoZXIuY2l0eSArIFwiLCBcIiArIHdlYXRoZXIuY291bnRyeTtcbiAgICB3ZWF0aGVySGVhZGVyLmlubmVySFRNTCA9IHdlYXRoZXIud2VhdGhlck1haW47XG4gICAgaHVtaWRpdHkuaW5uZXJIVE1MID0gXCJIdW1pZGl0eTogXCIgKyB3ZWF0aGVyLmh1bWlkaXR5ICsgXCImIzM3O1wiO1xuICAgIHdpbmQuaW5uZXJIVE1MID0gXCJXaW5kOiBcIiArIE1hdGgucm91bmQod2VhdGhlci53aW5kU3BlZWQpICsgXCIgbXBoXCI7XG4gICAgLy8gd2VhdGhlckljb24uc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7d2VhdGhlci5pY29ufUAyeC5wbmdgXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChgd2ktb3dtLSR7d2VhdGhlci5pZH1gKTtcbiAgICB0ZW1wZXJhdHVyZS52YWx1ZSA9IHdlYXRoZXIudGVtcGVyYXR1cmU7XG4gICAgZmVlbHNMaWtlLnZhbHVlID0gd2VhdGhlci5mZWVsc2xpa2U7XG5cbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKHdlYXRoZXIudGVtcGVyYXR1cmUpICsgXCImIzE3NkZcIjtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gTWF0aC5yb3VuZCh3ZWF0aGVyLnRlbXBlcmF0dXJlKSArIFwiJiMxNzZGXCI7XG5cbiAgICBjaGVja0RheU9yTmlnaHQod2VhdGhlcik7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5VGVtcGVyYXR1cmVGKHdlYXRoZXIpIHtcbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSB3ZWF0aGVyLnRlbXBlcmF0dXJlICsgXCImIzE3NkZcIjtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gd2VhdGhlci50ZW1wZXJhdHVyZSArIFwiJiMxNzZGXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5VGVtcGVyYXR1cmVDKHdlYXRoZXIpIHtcbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSB3ZWF0aGVyLnRlbXBlcmF0dXJlICsgXCImIzE3NkNcIjtcbiAgICBmZWVsc0xpa2UuaW5uZXJIVE1MID0gd2VhdGhlci50ZW1wZXJhdHVyZSArIFwiJiMxNzZDXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5RXJyb3IoKSB7XG4gICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcInNoYWtlXCIpO1xuICAgIGVycm9yLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlcnJvci5jbGFzc0xpc3QuYWRkKFwic2hha2VcIik7XG4gICAgfSksXG4gICAgICAwO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tEYXlPck5pZ2h0KHdlYXRoZXIpIHtcbiAgICBpZiAod2VhdGhlci5pY29uWzJdID09PSBcIm5cIikge1xuICAgICAgZGlzcGxheU5pZ2h0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXlEYXkoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZGlzcGxheU5pZ2h0KCkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodHNsYXRlZ3JheVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgIHN1Ym1pdEJ0bi5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICBzdWJtaXRCdG4uc3R5bGUuYmFja2dyb3VuZCA9IFwiYmxhY2tcIjtcbiAgICBzdWJtaXRCdG4uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgYmxhY2tcIjtcbiAgICB0b2dnbGVCdG4uc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgdG9nZ2xlQnRuLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG4gICAgdG9nZ2xlQnRuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5RGF5KCkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGJsdWVcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKS5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgICBzdWJtaXRCdG4uc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgc3VibWl0QnRuLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIG9yYW5nZVwiO1xuICAgIHN1Ym1pdEJ0bi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJvcmFuZ2VcIjtcbiAgICB0b2dnbGVCdG4uc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgdG9nZ2xlQnRuLnN0eWxlLmJhY2tncm91bmQgPSBcIm9yYW5nZVwiO1xuICAgIHRvZ2dsZUJ0bi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBvcmFuZ2VcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRvZ2dsZSgpIHtcbiAgICB0b2dnbGVCdG4uaW5uZXJIVE1MID0gdG9nZ2xlQnRuLmlubmVySFRNTCA9PT0gXCLCsEZcIiA/IFwiwrBDXCIgOiBcIsKwRlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZUVycm9yKCkge1xuICAgIGVycm9yLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGxheUluZm8sXG4gICAgZGlzcGxheUVycm9yLFxuICAgIHVwZGF0ZVRvZ2dsZSxcbiAgICBkaXNwbGF5VGVtcGVyYXR1cmVDLFxuICAgIGRpc3BsYXlUZW1wZXJhdHVyZUYsXG4gICAgaGlkZUVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRE9NSGFuZGxlcjtcbiIsImNvbnN0IEV2ZW50SGFuZGxlciA9IGFwcCA9PiB7XG5cbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0XCIpO1xuICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZVwiKTtcblxuICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYXBwLmlzRmFocmVuaGVpdCk7XG4gICAgYXBwLnVwZGF0ZShpbnB1dC52YWx1ZSlcbiAgfSlcblxuICB0b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKGFwcC5pc0ZhaHJlbmhlaXQpIHtcbiAgICAgIGFwcC5jaGFuZ2VUb0NlbHNpdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwLmNoYW5nZVRvRmFocmVuaGVpdCgpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhhcHAuaXNGYWhyZW5oZWl0KVxuICB9KVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50SGFuZGxlcjtcbiIsImltcG9ydCBBcHAgZnJvbSAnLi9hcHAnO1xuXG5jb25zdCBhcHAgPSBBcHAoKTtcbmFwcC5zdGFydCgpO1xuIiwiY29uc3QgV2VhdGhlciA9IChcbiAgY2l0eSwgY291bnRyeSxcbiAgd2luZFNwZWVkLFxuICB0ZW1wZXJhdHVyZSxcbiAgaHVtaWRpdHksXG4gIGZlZWxzbGlrZSxcbiAgd2VhdGhlck1haW4sXG4gIGljb24sXG4gIGlkLFxuICBkYXksXG4pID0+IHtcbiAgcmV0dXJuIHtcbiAgY2l0eSxcbiAgY291bnRyeSxcbiAgd2luZFNwZWVkLFxuICB0ZW1wZXJhdHVyZSxcbiAgaHVtaWRpdHksXG4gIGZlZWxzbGlrZSxcbiAgd2VhdGhlck1haW4sXG4gIGljb24sXG4gIGlkLFxuICBkYXksXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2VhdGhlcjtcblxuLy8gZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VhdGhlciB7XG4vLyAgIGNvbnN0cnVjdG9yKFxuLy8gICBjaXR5LCBjb3VudHJ5LFxuLy8gICB3aW5kU3BlZWQsXG4vLyAgIHRlbXBlcmF0dXJlLFxuLy8gICBodW1pZGl0eSxcbi8vICAgZmVlbHNsaWtlLFxuLy8gICB3ZWF0aGVyTWFpbixcbi8vICAgaWNvbixcbi8vICAgaWQsXG4vLyAgIGRheSxcbi8vICkge1xuLy8gICB0aGlzLmNpdHkgPSBjaXR5O1xuLy8gICB0aGlzLmNvdW50cnkgPSBjb3VudHJ5O1xuLy8gICB0aGlzLndpbmRTcGVlZCA9IHdpbmRTcGVlZDtcbi8vICAgdGhpcy50ZW1wZXJhdHVyZSA9IHRlbXBlcmF0dXJlO1xuLy8gICB0aGlzLmh1bWlkaXR5ID0gaHVtaWRpdHk7XG4vLyAgIHRoaXMuZmVlbHNsaWtlID0gZmVlbHNsaWtlO1xuLy8gICB0aGlzLndlYXRoZXJNYWluID0gd2VhdGhlck1haW47XG4vLyAgIHRoaXMuaWNvbiA9IGljb247XG4vLyAgIHRoaXMuaWQgPSBpZDtcbi8vICAgdGhpcy5kYXkgPSBkYXk7XG4vLyB9IFxuLy8gfVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9