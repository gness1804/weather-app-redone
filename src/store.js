// @flow
import { observable } from 'mobx';

const store = observable({
  weather: [],
  city: '',
  usState: '',
});

export default store;
