// @flow
import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = ({ ...props }: Object) => {
  /* eslint-disable camelcase */
  const showWeatherData = (data: Object) => {
    const { title, icon_url, fcttext, pop } = data;
    return (<div key={Math.random() * 1000}>
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
    <div>
      {props.data.map(showWeatherData)}
    </div>
  );
};

export default WeatherList;
