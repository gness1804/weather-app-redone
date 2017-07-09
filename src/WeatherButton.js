import React from 'react';

const WeatherButton = ({ ...props }: Object) => {
  const { id, handleClick, text } = props;
  return (
    <button className="WeatherButton" id={id} onClick={handleClick}>
      <span>{text}</span>
    </button>
  );
};

export default WeatherButton;
