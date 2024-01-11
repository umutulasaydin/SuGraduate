

// InfoBar.js
import React, { useState } from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Infobar.css';
import Requirements from './Requirements';
import TabMain from './TabMain';
import YearContainer from './YearContainer';

// Create an instance of YearContainer
//const yearContainerInstance = YearContainer();

// Access createSemesterStructure
 

const Infobar = () => {

    const re = [];
    //const semesterStructure = YearContainer().createSemesterStructure();
    const [showDoubleMajorDropdown, setShowDoubleMajorDropdown] = useState(false);
    const [showMinorDropdown, setShowMinorDropdown] = useState(false);

    const Major = {"Computer Science": "BSCS","Economy": "BAECON", "Electrical Engineering": "BSEE", "Industrial Engineering": "BSMS", "Management": "BAMAN", "Materials Science and Nano Engineering":"BSMAT" ,"Mechatronics Engineering": "BSME","Molecular Biology, Genetics and Bioengineering": "BSBIO", "Political Science and International Relations": "BAPSIR", "Psychology": "BAPSY","Visual Arts and Visual Communications Desing": "BAVACD"};
    const [selectedMajor, setSelectedMajor] = useState([]);
    const EntryYear = {"2017 Fall": "201701", "2017 Spring": "201702", "2018 Fall": "201801", "2018 Spring": "201802", "2019 Fall": "201901", "2019 Spring": "201902", "2020 Fall": "202001", "2020 Spring": "202002", "2021 Fall": "202101", "2021 Spring": "202102","2022 Fall": "202201","2022 Spring": "202202", "2023 Fall": "2012301","2023 Spring": "202302"};
    const [selectedYear, setSelectedYear] = useState([])

  


    const toggleDoubleMajorDropdown = () => {
      setShowDoubleMajorDropdown(!showDoubleMajorDropdown);
    };
  
    const toggleMinorDropdown = () => {
      setShowMinorDropdown(!showMinorDropdown);
    };

    const MajorSelection = (event) => {
      const selectMajor = event.target.value;
      setSelectedMajor(selectMajor);
      console.log("Major:", selectedMajor );  
    };

    const EntryYearSelection = (event) => {
    const entry = event.target.value;
      setSelectedYear(entry);
      console.log("Entry Year:", selectedYear); 
    };

    const CreateRequestStructure = () => {
      let finalRequestStructure  = [];
      
      finalRequestStructure["EntryYear"] = selectedYear;
      finalRequestStructure["Major"] = selectedMajor;
      finalRequestStructure["Courses"] = re;
      //console.log("reqStructure: ", semesterStructure)
      console.log("final: ",finalRequestStructure);
      return finalRequestStructure;


    };

  return (
    <div className="info-bar">
      <div className="dropdown">
        <label htmlFor="entry-year" style={{ color: 'white' , fontWeight: 'bold'}}>EntryYear:</label>

        <select onChange={(event) => EntryYearSelection(event)} className="custom-dropdown">
              {Object.keys(EntryYear).map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
              
        </select>

      </div>
      <div className="dropdown">
        <label htmlFor="major" style={{ color: 'white' , fontWeight: 'bold'}} >Major:</label>
        <select onChange={(event) => MajorSelection(event)} className="custom-dropdown">
              {Object.keys(Major).map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
        </select>
      </div>
      <div className="dropdown" style={{ color: 'white' , fontWeight: 'bold'}}> Double Major:   
      {showDoubleMajorDropdown ? (
        // Render only when the dropdown button is shown
        <select onChange={(event) => MajorSelection(event)} className="custom-dropdown">
          {Object.keys(Major).map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      ) : (
        // Render only when the dropdown button is NOT shown
        <>
          
          <button className={`add-button ${showDoubleMajorDropdown ? 'active' : ''}`} onClick={toggleDoubleMajorDropdown}>
            +
          </button>
        </>
      )}
      </div> 
      <div className="dropdown" style={{ color: 'white' , fontWeight: 'bold'}}> Minor
      {showMinorDropdown ? (
        // Render only when the dropdown button is shown
        
        <select onChange={(event) => MajorSelection(event)} className="custom-dropdown">
          {Object.keys(Major).map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      ) : (
        // Render only when the dropdown button is NOT shown
        <>
          
          <button className={`add-button ${showMinorDropdown ? 'active' : ''}`} onClick={toggleMinorDropdown}>
            +
          </button>
        </>
      )}
       
        </div>
       

        <Link to="/tabmain" style={linkStyle}>
          <button onClick={CreateRequestStructure} style={buttonStyle}>Submit</button>
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