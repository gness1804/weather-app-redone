import React from 'react';

const WeatherCard = ({ ...props }: Object) => {
  const { time, icon, forecast, precipitation } = props;
  return (
    <div className="weather-card">
      <h2 className="weather-card-title">Time Period: {time}</h2>
      <img className="weather-card-img" src={icon} alt="Icon representing the weather for the day." />
      <p className="weather-card-text">Forecast: {forecast}</p>
      <p className="weather-card-text">Chance of Precipitation: {precipitation} percent.</p>
    </div>
  );
};

export default WeatherCard;
