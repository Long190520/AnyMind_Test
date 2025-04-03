import React from "react";

function WeatherCard({ weather }) {
  return (
    <div className="card weather-card">
      <h2>Weather</h2>
      <div className="card-content">
        <h3>{weather.city}</h3>
        <p className="temperature">{weather.temperature}°C</p>
        <p className="condition">{weather.condition}</p>
      </div>
    </div>
  );
}

export default WeatherCard;
