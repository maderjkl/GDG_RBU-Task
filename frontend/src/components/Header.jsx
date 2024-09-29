// Header.js
import React from 'react';
import './Header.css';
import Dropdown from './Dropdown';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-section">
      
        <span className="site-name">MovieMania</span>
      </div>
      <Dropdown />
    </header>
  );
};

export default Header;
