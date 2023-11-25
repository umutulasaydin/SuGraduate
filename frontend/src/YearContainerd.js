// YearContainer.js
import React, {useEffect, useState} from 'react';

import styled from 'styled-components';
import { SemesterTable, courses_201 } from './SemesterTable';


const YearContainer = () => {

  

  const [courses_101,setCourses_101] = useState(["NS101", "SPS101", "HIST191", "IF100", "MATH101", "TLL101"]);
const courses_102 = ["NS102", "SPS102", "HIST192", "AL102", "MATH102", "TLL102"];
const courses_202 = ["CS204", "CS210", "MATH201", "HUM202", "ECON201"];

  const handleDeleteCourse = (index) => {
    const updatedCourses_101 = [...courses_101];
    updatedCourses_101.splice(index, 1); // Remove the course at the specified index
    setCourses_101(updatedCourses_101);
  };
    const [jsonData, setJsonData] = useState(null); 

  
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await fetch('/Users/burcudurmus/Desktop/SuGraduate/frontend/src/deneme.json'); // Replace with the actual path
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

    return (
      <div className="year-container">
      <Container>
        <TableContainer>
          <Table>
            <SemesterTable semester="Freshman" />
            <table>
            <thead>
              <tr>
                <th>Spring</th>
                <th>Fall</th>
              </tr>
            </thead>
            <tbody>
            {Array.from({ length: 7 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{courses_101[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex)}>{courses_101[rowIndex]}</td>
            
              </tr>
            ))} 
             
            </tbody> 
          </table> 
          </Table>
          <Table> 
            <SemesterTable semester="Sophomore" />
            <table>
            <thead>
              <tr>
                <th>Spring</th> 
                <th>Fall</th>
              </tr>
            </thead>
            <tbody>
            {Array.from({ length: 7 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{courses_201[rowIndex]} </td>
                <td>{courses_202[rowIndex]}</td>
              </tr>
            ))}
            </tbody>
            <thead>
              <tr>
                <th>Spring</th> 
              </tr>
            </thead>
            <tbody>
            {Array.from({ length: 7 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{courses_202[rowIndex]}</td>
              </tr>
            ))}
            </tbody>
          </table>
           
          </Table>
        </TableContainer>
      </Container>
      </div>
    );
  };
  

export default YearContainer;



const Container = styled.div`
  background-color:  #cf7fdf;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* Add padding for spacing */
`
const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px; /* Add margin for spacing between tables */
`
const Table = styled.div`
  background-color: #f5cffc;
  border: 1px solid #ccc;
  padding: 10px;
  width: 48%;
  margin-top: 10px; /* Add margin for spacing between tables */
`