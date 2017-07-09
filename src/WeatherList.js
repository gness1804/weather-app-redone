// @flow
import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = ({ ...props }: Object) => {
  /* eslint-disable camelcase */
  const showWeatherData = (data: Object) => {
    const { title, icon_url, fcttext, pop } = data;
    return (<div>
      <WeatherCard
        time={title}
        icon={icon_url}
        forecast={fcttext}
        precipitation={pop}
      />
    </div>);
  };
  /* eslint-enable camelcase */

  return (
    <ul>
      <li>{props.data.map(showWeatherData)}</li>
    </ul>
  );
};

export default WeatherList;
