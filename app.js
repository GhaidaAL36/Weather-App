const apiKey = "8983998cd9fce60c71a2f472e2cbe032";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-section input");
const searchBtn = document.querySelector(".search-section button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather-section");
const errorMessage = document.querySelector(".error-message");

async function checkWeather(cityName) {
  try {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    errorMessage.textContent = "";

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".weather-temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

    const weatherStat = data.weather[0].main;

    if (weatherStat === "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (weatherStat === "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (weatherStat === "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (weatherStat === "Mist") {
      weatherIcon.src = "img/mist.png";
    } else if (weatherStat === "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (weatherStat === "Snow") {
      weatherIcon.src = "img/snow.png";
    }
  } catch (error) {
    errorMessage.textContent = "City was not found. Please try again.";
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchInput.value);
  }
});

checkWeather("Riyadh");
