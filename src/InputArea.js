// @flow
import React from 'react';
import ReactQueryParams from 'react-query-params';
import * as Cookies from 'js-cookie';
import WeatherButton from './WeatherButton';
import WeatherList from './WeatherList';
import NoWeatherData from './NoWeatherData';
import SunriseSunset from './SunriseSunset';
import abbrState from './helpers/abbrState';
import capitalize from './helpers/capitalize';

export default class InputArea extends ReactQueryParams {
  constructor(props: Object) {
    super(props);
    this.state = {
      weather: [],
      city: '',
      state: '',
      sunriseHour: '',
      sunriseMinute: '',
      sunsetHour: '',
      sunsetMinute: '',
      showSunriseSunset: false,
    };
  }

  state: {
    weather: Array<Object>,
    city: string,
    state: string,
    sunriseHour: string,
    sunriseMinute: string,
    sunsetHour: string,
    sunsetMinute: string,
    showSunriseSunset: boolean,
  }

  componentDidMount = async (): void => {
    const { city, state } = this.queryParams;
    const success = (pos: Object) => {
      this.getCoordData(pos.coords.latitude, pos.coords.longitude);
    };
    const failure = () => {
      this.setState({ city: '' });
      this.setState({ state: 'Choose a State' });
    };
    if (city && state) {
      await this.setState({ city: capitalize(city) });
      Cookies.set('city', capitalize(city), { expires: 7 });
      if (state.length === 2) {
        this.setState({ state: state.toUpperCase() });
        Cookies.set('state', state.toUpperCase(), { expires: 7 });
      } else {
        this.setState({ state: abbrState(state, 'abbr') });
        Cookies.set('state', abbrState(state, 'abbr'), { expires: 7 });
      }
      try {
        await this.getWeatherData();
      } catch (error) {
        throw new Error(error);
      }
      return;
    }
    if (Cookies.get('city') && Cookies.get('state')) {
      this.setState({ city: Cookies.get('city') });
      this.setState({ state: Cookies.get('state') });
      return;
    }
    navigator.geolocation.getCurrentPosition(success, failure);
  }

  getCoordData = (lat: string, lng: string): void => {
    const hitAPI = new XMLHttpRequest();
    const url = `https://api.wunderground.com/api/47fe8304fc0c9639/geolookup/q/${lat},${lng}.json`;
    hitAPI.open('GET', url, true);
    hitAPI.send();
    hitAPI.onreadystatechange = () => {
      if (hitAPI.readyState === XMLHttpRequest.DONE) {
        if (hitAPI.status === 200) {
          const data = JSON.parse(hitAPI.responseText);
          this.setState({ city: capitalize(data.location.city) });
          this.setState({ state: data.location.state });
          Cookies.set('city', capitalize(data.location.city), { expires: 7 });
          Cookies.set('state', data.location.state, { expires: 7 });
        }
      }
    };
  };

  getWeatherData = (): void => {
    const hitAPI = new XMLHttpRequest();
    const city = capitalize(this.state.city);
    const _state = this.state.state;
    if (!city || !_state) {
      alert('Error: you must enter a valid city and state.');
      return;
    }
    this.setState({ showSunriseSunset: false });
    const url = `https://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/${_state}/${city}.json`;
    hitAPI.open('GET', url, true);
    hitAPI.send();
    hitAPI.onreadystatechange = () => {
      if (hitAPI.readyState === XMLHttpRequest.DONE) {
        if (hitAPI.status === 200) {
          const data = JSON.parse(hitAPI.responseText);
          if (data && data.forecast && typeof data.forecast !== 'undefined') {
            this.setState({ weather: data.forecast.txt_forecast.forecastday });
            const cookieCity = Cookies.get('city');
            const cookieState = Cookies.get('state');
            if (this.state.city !== cookieCity) {
              Cookies.set('city', this.state.city, { expires: 7 });
            }
            if (this.state.state !== cookieState) {
              Cookies.set('state', this.state.state, { expires: 7 });
            }
          } else {
            alert('Oops, bad data. Please check your city and state and try again.');
          }
        }
      }
    };
  };

  getSunriseSunset = (): void => {
    const hitAPI = new XMLHttpRequest();
    const city = capitalize(this.state.city);
    const _state = this.state.state;
    if (!city || !_state) {
      alert('Error: you must enter a valid city and state.');
      this.setState({ showSunriseSunset: false });
      return;
    }
    const url = `https://api.wunderground.com/api/47fe8304fc0c9639/astronomy/q/${_state}/${city}.json`;
    hitAPI.open('GET', url, true);
    hitAPI.send();
    hitAPI.onreadystatechange = () => {
      if (hitAPI.readyState === XMLHttpRequest.DONE) {
        if (hitAPI.status === 200) {
          const data = JSON.parse(hitAPI.responseText);
          if (data && data.sun_phase && typeof data.sun_phase !== 'undefined') {
            this.setState({ sunriseHour: data.sun_phase.sunrise.hour });
            this.setState({ sunriseMinute: data.sun_phase.sunrise.minute });
            this.setState({ sunsetHour: data.sun_phase.sunset.hour });
            this.setState({ sunsetMinute: data.sun_phase.sunset.minute });
            this.setState({ showSunriseSunset: true });
            this.setState({ weather: [] });
          } else {
            alert('Oops, bad data. Please check your city and state and try again.');
          }
        }
      }
    };
  };

  hideSunriseSunset = (): void => {
    this.setState({ showSunriseSunset: false });
  }

  clearCity = (): void => {
    this.setState({ city: '' });
  }

  handleInputChange = (e: Object): void => {
    if (e.keyCode === 13) {
      this.getWeatherData();
      return;
    }
    this.setState({ city: e.target.value });
  }

  handleInputChangeState = (e: Object): void => {
    this.setState({ state: e.target.value });
  }

  render() {
    return (
      <div>
        <fieldset className="box">
          <label htmlFor="current-location-input" className="fieldset-left-item"><span>Your City:</span>
            <input
              id="current-location-input"
              type="text"
              placeholder="City"
              list="current-loc-list"
              onChange={this.handleInputChange}
              value={this.state.city}
            />
            <datalist id="current-loc-list">
              <option value="Atlanta">Atlanta</option>
              <option value="Boston">Boston</option>
              <option value="Chicago">Chicago</option>
              <option value="Denver">Denver</option>
              <option value="Detroit">Detroit</option>
              <option value="Houston">Houston</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="New Orleans">New Orleans</option>
              <option value="San Francisco">San Francisco</option>
              <option value="St Louis">St Louis</option>
            </datalist>
            <button onClick={this.clearCity} className="unstyled-button clear-city-icon">
              <img src="cancel-circle.png" alt="Clear city field." />
            </button>
          </label>
          <label htmlFor="us-state-input" className="fieldset-right-item"><span>Your State:</span>
            <select
              id="us-state-list"
              onChange={this.handleInputChangeState}
              value={this.state.state || 'default'}
            >
              <option value="default">Choose a State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </label>
        </fieldset>
        {this.state.showSunriseSunset && this.state.sunriseHour && this.state.sunriseMinute && this.state.sunsetHour && this.state.sunsetMinute ? <SunriseSunset {...this.state} hideSunriseSunset={this.hideSunriseSunset} /> : ''}
        <button id="get-sunrise-sunset-button" onClick={this.getSunriseSunset}>Get Sunrise/Sunset</button>
        <WeatherButton id="get-weather-button" text="Get Weather" handleClick={this.getWeatherData} />
        {this.state.weather.length ? <div className="weather-list-container box">
          <WeatherList data={this.state.weather} city={this.state.city} />
        </div> : <NoWeatherData />}
      </div>
    );
  }

}
