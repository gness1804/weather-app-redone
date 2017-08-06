// @flow
import React from 'react';

const SunriseSunset = ({ ...props }: Object) => {
  const hideSunriseSunset = (): void => {
    props.hideSunriseSunset();
  };
  return (
    <div className="sunrise-sunset-container box">
      <p>Sunrise is at <span className="time">{props.sunriseHour}:{props.sunriseMinute}</span>.</p>
      <p>Sunset is at <span className="time">{props.sunsetHour}:{props.sunsetMinute}</span>.</p>
      <button onClick={hideSunriseSunset} className="hide-sunrise-sunset-button">
        <img src="cancel-circle.png" alt="Hide sunrise sunset view." />
      </button>
    </div>
  );
};

export default SunriseSunset;
