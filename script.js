const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const currentLocationBtn = document.getElementById("current-location-btn");
const statusEl = document.getElementById("status");
const weatherCard = document.getElementById("weather-card");

const locationNameEl = document.getElementById("location-name");
const weatherMainEl = document.getElementById("weather-main");
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl = document.getElementById("feels-like");
const iconEl = document.getElementById("icon");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const updatedAtEl = document.getElementById("updated-at");

function setStatus(message = "") {
  statusEl.textContent = message;
}

function renderWeather(data) {
  const weather = data.weather?.[0] || {};

  locationNameEl.textContent = `${data.name}, ${data.sys?.country || ""}`;
  weatherMainEl.textContent = weather.description || "-";
  temperatureEl.textContent = `${Math.round(data.main?.temp)}°C`;
  feelsLikeEl.textContent = `Feels like ${Math.round(data.main?.feels_like)}°C`;
  humidityEl.textContent = `${data.main?.humidity}%`;
  windEl.textContent = `${data.wind?.speed} m/s`;
  pressureEl.textContent = `${data.main?.pressure} hPa`;
  visibilityEl.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

  iconEl.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  iconEl.alt = weather.main || "Weather icon";

  const now = new Date();
  updatedAtEl.textContent = `Updated at ${now.toLocaleTimeString()}`;

  weatherCard.classList.remove("hidden");
}

async function fetchWeather(query) {
  setStatus("Loading weather...");

  try {
    const response = await fetch(`/api/weather?${new URLSearchParams(query)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch weather");
    }

    setStatus("");
    renderWeather(data);
  } catch (error) {
    setStatus(error.message || "Something went wrong");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (!city) {
    return setStatus("Please enter a city name");
  }

  fetchWeather({ city });
});

currentLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return setStatus("Geolocation is not supported by your browser");
  }

  setStatus("Getting your location...");

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      fetchWeather({ lat: coords.latitude, lon: coords.longitude });
    },
    () => {
      setStatus("Unable to access your location");
    },
  );
});

fetchWeather({ city: "New York" });
