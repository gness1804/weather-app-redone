// @flow
import { observable } from 'mobx';

const store = observable({
  weather: [],
  city: 'Denver',
  state: 'CO',

  setWeather(data: Array<Object>): void {
    if (Array.isArray(data)) {
      this.weather = data;
    }
  },

  setCity(val: string): void {
    this.city = val;
  },

  clearCity(): void {
    this.city = '';
  },

  set_State(val: string): void {
    this.state = val;
  },
});

export default store;
