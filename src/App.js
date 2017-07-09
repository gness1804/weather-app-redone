// @flow
import React, { Component } from 'react';
import Header from './Header';
import InputArea from './InputArea';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <InputArea />
      </div>
    );
  }
}

export default App;
