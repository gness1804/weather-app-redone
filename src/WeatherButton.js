import React from 'react';

const WeatherButton = ({ ...props }) => {
  return (
    <button className="WeatherButton" id={props.id} onClick={props.handleClick}>
      <span>{props.text}</span>
    </button>
  );
};

export default WeatherButton;
