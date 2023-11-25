// SemesterTable.js
import React, { useState, useEffect } from 'react';
import CourseDropdown from './CourseDropdown';

let courseOptions = [];
fetch('without_recit.txt')
  .then(response => response.text())
  .then(data => {

    courseOptions = data.split("\n")
    
  })
  .catch(error => console.error('Error fetching the file:', error));


const courses_201 = [];


const SemesterTable = ({ semester }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  
  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    courses_201.push(selectedCourse);
    setSelectedCourses([...selectedCourses, selectedCourse]);
    // You might want to use setState or some other state management solution in a real React app
    console.log("Courses_201:", courses_201);
  };
  return ( 
    <div className="semester-table"> 
      <h3>{semester}</h3>
      <table>
        <tbody>
          <tr>
            <td>
            <select onChange={handleCourseChange}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={handleCourseChange}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select></td>
            {/* ... Add more table cells for courses */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export {SemesterTable, courses_201} ;

