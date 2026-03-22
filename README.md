# Full-Stack Weather App

A full-stack weather application with:

- **Backend**: Node.js + Express API that securely calls OpenWeather.
- **Frontend**: HTML/CSS/JavaScript UI that fetches weather from the backend.

## Features

- Search weather by city
- Use browser geolocation
- Server-side API key handling (not exposed in frontend JS)
- Health check endpoint

## Tech Stack

- Node.js
- Express
- Vanilla JavaScript
- OpenWeather API

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Add your OpenWeather API key to `.env`:

```env
OPENWEATHER_API_KEY=your_key_here
PORT=3000
```

4. Start the app:

```bash
npm start
```

5. Open:

- http://localhost:3000
- Health check: http://localhost:3000/api/health

## API

### `GET /api/weather`

Query options:

- `?city=London`
- `?lat=12.97&lon=77.59`

### `GET /api/health`

Returns server health status.
