// Dropdown.js
import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="login-section">
      <button className="login-btn" onClick={toggleDropdown}>
      
        <span className="login-name">Login</span>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="/user/login" className="dropdown-item">User</a>
          <a href="/admin/login" className="dropdown-item">Admin</a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
