import React from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  return (
    <header>
      <div data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profile icon" />
      </div>
      <div data-testid="page-title">
        <p>Title</p>
      </div>
      <div data-testid="search-top-btn">
        <img src={ searchIcon } alt="profile icon" />
      </div>
    </header>
  );
}

export default Header;
