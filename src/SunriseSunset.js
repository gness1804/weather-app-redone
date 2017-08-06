// @flow
import React from 'react';

const SunriseSunset = ({ ...props }: Object) => {
  return (
    <div>
      <p>Sunrise is at {props.sunriseHour}:{props.sunriseMinute}.</p>
      <p>Sunset is at {props.sunsetHour}:{props.sunsetMinute}.</p>
    </div>
  );
};

export default SunriseSunset;
