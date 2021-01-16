export async function getWeatherData(city = "Miami") {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=44fa4677d06f6c3ead606767129be260&units=imperial`,
    { mode: "cors" }
  );

  return await response.json();
}
