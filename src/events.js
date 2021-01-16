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

export default EventHandler;
