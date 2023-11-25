// YearContainer.js
// all the courses diye bir array açıp her update fonksiyonun içine bu listeye course u ekle özelliği getirmek lazım
// sonra ders seçtikten sonra printout kısmında o dersin prerequisitelerinin o course listesinde olup olmadığını kontrol etsin
// eğer yoksa kırmızı renk varsa düz
import React, {useEffect, useState} from 'react';

import styled from 'styled-components';


let courseOptions = [];
fetch('without_recit.txt')
  .then(response => response.text())
  .then(data => {

    courseOptions = data.split("\n")
    
  })
  .catch(error => console.error('Error fetching the file:', error));



const YearContainer = () => {

  
  const [courses_201, setCourses_201] = useState([]);
  const [courses_301, setCourses_301] = useState([]);
  const [courses_401, setCourses_401] = useState([]);
  const [courses_302, setCourses_302] = useState([]);
  const [courses_402, setCourses_402] = useState([]);
  const [courses_101,setCourses_101] = useState(["NS101", "SPS101", "HIST191", "IF100", "MATH101", "TLL101"]);
  const [courses_102, setCourses_102] = useState(["NS102", "SPS102", "HIST192", "AL102", "MATH102", "TLL102"]);
  const [courses_202, setCourses_202] = useState(["CS204", "CS210", "MATH201", "HUM202", "ECON201"]);

  const handleDeleteCourse = (index, courses, setCourses) => {
    console.log(`${selectedCourses} first:`, courses);
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
    console.log(`${selectedCourses} updated:`, courses);
  };
  const handleDeleteCourse201 = (index) => {
    console.log(courses_201);
    const updatedCourses_201 = [...courses_201];
    updatedCourses_201.splice(index, 1); // Remove the course at the specified index
    setCourses_201(updatedCourses_201);
    console.log("update",courses_201);
  };

    const [jsonData, setJsonData] = useState(null); 

    const [selectedCourses, setSelectedCourses] = useState([]);
  
    const handleCourseChange = (event, selectedCourses, setSelectedCourses) => {
      const selectedCourse = event.target.value;
      
      setSelectedCourses([...selectedCourses, selectedCourse]);
      console.log(`${selectedCourses} updated:`, selectedCourses);
    };
  
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
        <h3>Freshman</h3>
        <table>
          <thead> 
          <tr>
            <td>
            <select onChange={(event) => handleCourseChange(event, courses_101, setCourses_101)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={(event) => handleCourseChange(event, courses_102, setCourses_102)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
          </tr>
          </thead> 
        <tbody>{Array.from({ length: 7 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_101, setCourses_101)}>{courses_101[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_102, setCourses_102)}>{courses_102[rowIndex]}</td>
              </tr>
            ))} 
        </tbody>
      </table>
          </Table>
          
          <Table>
          <h3>Sophomore</h3>
        <table>
          <thead> 
          <tr>
            <td>
            <select onChange={(event) => handleCourseChange(event, courses_201, setCourses_201)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={(event) => handleCourseChange(event, courses_202, setCourses_202)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
          </tr>
          </thead> 
        <tbody>
          {Array.from({ length: 7 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td onClick={() => handleDeleteCourse201(rowIndex)}>{courses_201[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_202, setCourses_202)}>{courses_202[rowIndex]}</td>
              </tr>
            ))} 
        </tbody>
      </table>
          </Table>
        </TableContainer>
          <TableContainer>
            <Table>
              <h3 style={{ textAlign: 'center' }} >Summer School</h3>
            </Table>
            <Table>
              <h3 style={{ textAlign: 'center' }} >Summer School</h3>
            </Table>
          </TableContainer>

        <TableContainer>
        <Table>
          <h3>Junior</h3>
        <table>
          <thead> 
          <tr>
            <td>
            <select onChange={(event) => handleCourseChange(event, courses_301, setCourses_301)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={(event) => handleCourseChange(event, courses_302, setCourses_302)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
          </tr>
          </thead> 
        <tbody>{Array.from({ length: 7 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_301, setCourses_301)}>{courses_301[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_302, setCourses_302)}>{courses_302[rowIndex]}</td>
              </tr>
            ))} 
        </tbody>
      </table>
          </Table>

          <Table>
          <h3>Senior</h3>
        <table>
          <thead> 
          <tr>
            <td>
            <select onChange={(event) => handleCourseChange(event, courses_401, setCourses_401)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={(event) => handleCourseChange(event, courses_402, setCourses_402)}>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
          </tr>
          </thead> 
        <tbody>{Array.from({ length: 7 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_401, setCourses_401)}>{courses_401[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_402, setCourses_402)}>{courses_402[rowIndex]}</td>
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