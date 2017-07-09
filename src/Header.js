// @flow
import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Welcome to -Weathrly-</h1>
      <h3>Your World<br />Your Weather</h3>
      <a className="wu-logo-link-wrapper" href="https://www.wunderground.com/" target="_blank" rel="noopener noreferrer">
        <figure className="wu-logo-container">
          <img src="images/wu-logo.jpg" alt="Weather Underground logo." />
          <figcaption className="wu-logo-caption-text">Data courtesy of Weather Underground.</figcaption>
        </figure>
      </a>
    </header>
  );
};

export default Header;
