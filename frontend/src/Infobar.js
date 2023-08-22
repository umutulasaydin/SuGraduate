// InfoBar.js
import React, { useState } from 'react';
import './Infobar.css';

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
    </div>
  );
};

export default Infobar;
