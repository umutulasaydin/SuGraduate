

// InfoBar.js
import React, { useState } from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Infobar.css';
import Requirements from './Requirements';
import TabMain from './TabMain';

const Infobar = () => {

 
    const [showDoubleMajorDropdown, setShowDoubleMajorDropdown] = useState(false);
    const [showMinorDropdown, setShowMinorDropdown] = useState(false);
  
    const toggleDoubleMajorDropdown = () => {
      setShowDoubleMajorDropdown(!showDoubleMajorDropdown);
    };
  
    const toggleMinorDropdown = () => {
      setShowMinorDropdown(!showMinorDropdown);
    };

  return (
    <div className="info-bar">
      <div className="dropdown">
        <label htmlFor="major">Major:</label>
        <select id="major">
          {/* Options for major */}
          <option value="computer-science">Computer Science</option>
          <option value="engineering">Engineering</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="entry-year">Entry Year:</label>
        <select id="entry-year">
          {/* Options for entry year */}
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="dropdown">
        <button className="add-button" onClick={toggleDoubleMajorDropdown}>
          +
        </button>
        {showDoubleMajorDropdown && (
          <div className="dropdown-content">
            {/* Dropdown content for Double Major */}
            <p>Double Major options</p>
          </div>
        )}
      </div> 
      <div className="dropdown">
        <button className="add-button" onClick={toggleMinorDropdown}>
          +
        </button>
        {showMinorDropdown && (
          <div className="dropdown-content">
            {/* Dropdown content for Minor */} 
            <p>Minor options</p>
          </div>
        )}
        </div>
       

        <Link to="/tabmain" style={linkStyle}>
          <button style={buttonStyle}>Submit</button>
        </Link>
        
      
    </div>
  );
};

export default Infobar;

const linkStyle = {
  textDecoration: 'none', // Remove default underline
};

const buttonStyle = {
  backgroundColor: '#4CAF50', // Green background color
  color: 'white', // White text color
  padding: '10px 20px', // Padding for better appearance
  border: 'none', // Remove border
  borderRadius: '5px', // Add rounded corners
  cursor: 'pointer', // Add pointer cursor on hover
};