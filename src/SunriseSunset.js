// @flow
import React from 'react';

const SunriseSunset = ({ ...props }: Object) => {
  const hideSunriseSunset = (): void => {
    props.hideSunriseSunset();
  };
  return (
    <div>
      <p>Sunrise is at {props.sunriseHour}:{props.sunriseMinute}.</p>
      <p>Sunset is at {props.sunsetHour}:{props.sunsetMinute}.</p>
      <button onClick={hideSunriseSunset} className="hide-sunrise-sunset-button">
        <img src="cancel-circle.png" alt="Hide sunrise sunset view." />
      </button>
    </div>
  );
};

export default SunriseSunset;
