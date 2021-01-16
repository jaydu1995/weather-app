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

export default EventHandler;
