// CourseDropdown.js
import React from 'react';

const CourseDropdown = () => {
  // Sample course options
  const courseOptions = ['Course A', 'Course B', 'Course C', 'Course D'];

  return (
    <select>
      {courseOptions.map((course, index) => (
        <option key={index} value={course}>
          {course}
        </option>
      ))}
    </select>
  );
};

export default CourseDropdown;
