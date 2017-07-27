// @flow
import React from 'react';
import ReactQueryParams from 'react-query-params';
import WeatherButton from './WeatherButton';
import WeatherList from './WeatherList';
import NoWeatherData from './NoWeatherData';
import abbrState from './helpers/abbrState';

export default class InputArea extends ReactQueryParams {
  constructor(props: Object) {
    super(props);
    this.state = {
      weather: [],
      city: '',
      state: '',
    };
  }

  state: {
    weather: Array<Object>,
    city: string,
    state: string,
  }

  componentDidMount = (): void => {
    const { city, state } = this.queryParams;
    const success = (pos: Object) => {
      this.getCoordData(pos.coords.latitude, pos.coords.longitude);
    };
    const failure = () => {
      this.setState({ city: 'Denver' });
      this.setState({ state: 'CO' });
    };
    if (city && state) {
      const promise = new Promise((resolve) => {
        resolve(this.setState({ city }));
      });
      promise.then(() => {
        if (state.length === 2) {
          this.setState({ state: state.toUpperCase() });
        } else {
          this.setState({ state: abbrState(state, 'abbr') });
        }
      })
      .then(() => {
        this.getWeatherData();
      })
      .catch((err) => { throw new Error(err); });
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
          this.setState({ city: data.location.city });
          this.setState({ state: data.location.state });
        }
      }
    };
  };

  getWeatherData = (): void => {
    const hitAPI = new XMLHttpRequest();
    const city = this.state.city.toUpperCase();
    const _state = this.state.state;
    if (!city || !_state) {
      alert('Error: you must enter a valid city and state.');
      return;
    }
    const url = `https://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/${_state}/${city}.json`;
    hitAPI.open('GET', url, true);
    hitAPI.send();
    hitAPI.onreadystatechange = () => {
      if (hitAPI.readyState === XMLHttpRequest.DONE) {
        if (hitAPI.status === 200) {
          const data = JSON.parse(hitAPI.responseText);
          if (data && data.forecast && typeof data.forecast !== 'undefined') {
            this.setState({ weather: data.forecast.txt_forecast.forecastday });
          } else {
            alert('Oops, bad data. Please check your city and state and try again.');
          }
        }
      }
    };
  };

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
        <fieldset>
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
              value={this.state.state}
            >
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
        <WeatherButton id="get-weather-button" text="Get Weather" handleClick={this.getWeatherData} />
        {this.state.weather.length ? <div className="weather-list-container">
          <WeatherList data={this.state.weather} city={this.state.city} />
        </div> : <NoWeatherData />}
      </div>
    );
  }

}
