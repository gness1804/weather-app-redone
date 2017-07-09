import React, { Component } from 'react';
import WeatherButton from './WeatherButton';
import WeatherList from './WeatherList';

export default class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      location: 'Denver',
      usState: 'CO',
    };
  }

  getWeatherData = () => {
    const hitAPI = new XMLHttpRequest();
    const city = this.state.location.toUpperCase();
    const _state = this.state.usState;
    const url = `https://api.wunderground.com/api/47fe8304fc0c9639/forecast/q/${_state}/${city}.json`;
    hitAPI.open('GET', url, true);
    hitAPI.send();
    hitAPI.onreadystatechange = () => {
      if (hitAPI.readyState === XMLHttpRequest.DONE) {
        if (hitAPI.status === 200) {
          const data = JSON.parse(hitAPI.responseText);
          this.setState({ weather: data.forecast.txt_forecast.forecastday });
        }
      }
    };
  };

  handleInputChange = (e) => {
    if (e.keyCode === 13) {
      this.getWeatherData();
      return;
    }
    this.setState({ location: e.target.value });
  }

  handleInputChangeState = (e) => {
    this.setState({ usState: e.target.value });
  }

  render() {
    return (
      <div>
        <fieldset>
          <label htmlFor="current-location-input" className="fieldset-left-item">Your City:
            <input
              id="current-location-input"
              type="text"
              placeholder="City"
              list="current-loc-list"
              onChange={this.handleInputChange}
              value={this.state.location}
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
          </label>
          <label htmlFor="us-state-input" className="fieldset-right-item">Your State:
            <input
              id="us-state-input"
              type="text"
              placeholder="State"
              list="us-state-list"
              onChange={this.handleInputChangeState}
              value={this.state.usState}
              onKeyDown={this.enterFunctionality}
            />
            <datalist id="us-state-list">
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
            </datalist>
          </label>
        </fieldset>
        <WeatherButton id="get-weather-button" text="Get Weather" handleClick={this.getWeatherData} />
        <WeatherList data={this.state.weather} city={this.state.location} />
      </div>
    );
  }

}
