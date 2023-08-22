// SemesterTable.js
import React from 'react';
import CourseDropdown from './CourseDropdown';

const SemesterTable = ({ semester }) => {
  return (
    <div className="semester-table">
      <h3>{semester}</h3>
      <table>
        <tbody>
          <tr>
            <td><CourseDropdown /></td>
            <td><CourseDropdown /></td>
            {/* ... Add more table cells for courses */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SemesterTable;
