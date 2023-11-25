// CourseDropdown.js
import React from 'react';
import txtData from './without_recit.txt';

let courseOptions = [];
fetch('without_recit.txt')
  .then(response => response.text())
  .then(data => {
    // Process the data here
    
    courseOptions = data.split("\n")
    
  })
  .catch(error => console.error('Error fetching the file:', error));

const CourseDropdown = () => {
  // Sample course options


  return (
    <select>
   
    </select>
  );
};

export default CourseDropdown;
