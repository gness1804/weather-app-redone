import React from 'react';

const WeatherCard = ({ ...props }) => {
  return (
    <div className="weather-card">
      <h2 className="weather-card-title">Time Period: {props.time}</h2>
      <img className="weather-card-img" src={props.icon} alt="Icon representing the weather for the day." />
      <p className="weather-card-text">Forecast: {props.forecast}</p>
      <p className="weather-card-text">Chance of Precipitation: {props.precipitation} percent.</p>
    </div>
  );
};

export default WeatherCard;
