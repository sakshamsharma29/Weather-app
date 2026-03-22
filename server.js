const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Weather API server is running" });
});

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!OPENWEATHER_API_KEY) {
    return res.status(500).json({
      error: "Missing OPENWEATHER_API_KEY in environment variables",
    });
  }

  if (!city && (!lat || !lon)) {
    return res.status(400).json({
      error: "Please provide either ?city=CityName or ?lat=..&lon=..",
    });
  }

  let endpoint;

  if (city) {
    endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city,
    )}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  } else {
    endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(
      lat,
    )}&lon=${encodeURIComponent(
      lon,
    )}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Weather API request failed",
      });
    }

    return res.json(data);
  } catch {
    return res.status(500).json({
      error: "Unable to fetch weather at the moment",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
