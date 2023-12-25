// YearContainer.js
// all the courses diye bir array açıp her update fonksiyonun içine bu listeye course u ekle özelliği getirmek lazım
// sonra ders seçtikten sonra printout kısmında o dersin prerequisitelerinin o course listesinde olup olmadığını kontrol etsin
// eğer yoksa kırmızı renk varsa düz
import React, {useEffect, useState} from 'react';

import { Galleria } from 'primereact/galleria';
        
import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';
import './styles.css';


let reqStructure = [];
const YearContainer = () => {

  
  const [courses_201, setCourses_201] = useState([]);
  const [courses_301, setCourses_301] = useState([]);
  const [courses_401, setCourses_401] = useState([]);
  const [courses_302, setCourses_302] = useState([]);
  const [courses_402, setCourses_402] = useState([]);
  const [courses_101,setCourses_101] = useState(["NS 101", "SPS 101", "HIST 191", "IF 100", "MATH 101", "TLL 101"]);
  const [courses_102, setCourses_102] = useState(["NS 102", "SPS 102", "HIST 192", "AL 102", "MATH 102", "TLL 102"]);
  const [courses_202, setCourses_202] = useState(["CS 204", "CS 210", "MATH 201", "HUM 202", "ECON 201"]);

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

   
    const [allCourses, getCourses]= useState([]); 
    //const [allSemesters, setAllSemesters] = useState([]); 
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [semesterStructure, setSemesterStructure] = useState({});

    const createSemesterStructure = () => {
      const structure = {};
      setSemesterStructure(structure);
      semesterStructure["101"] = [];
      semesterStructure["102"] = [];
      semesterStructure["202"] = [];
      semesterStructure["201"] = [];
      semesterStructure["301"] = [];
      semesterStructure["302"] = [];
      semesterStructure["401"] = [];
      semesterStructure["402"] = [];

      courses_101.forEach((courseCode) => {
        semesterStructure["101"] = [...semesterStructure["101"], allCourses[courseCode]];
      });
      courses_102.forEach((courseCode) => {
        semesterStructure["102"] = [...semesterStructure["102"], allCourses[courseCode]];
      });
      courses_201.forEach((courseCode) => {
        semesterStructure["201"] = [...semesterStructure["201"], allCourses[courseCode]];
      });
      courses_202.forEach((courseCode) => {
        semesterStructure["202"] = [...semesterStructure["202"], allCourses[courseCode]];
      });
      courses_301.forEach((courseCode) => {
        semesterStructure["301"] = [...semesterStructure["301"], allCourses[courseCode]];
      });
      courses_302.forEach((courseCode) => {
        semesterStructure["302"] = [...semesterStructure["302"], allCourses[courseCode]];
      });
      courses_401.forEach((courseCode) => {
        semesterStructure["401"] = [...semesterStructure["401"], allCourses[courseCode]];
      });
      courses_402.forEach((courseCode) => {
        semesterStructure["402"] = [...semesterStructure["402"], allCourses[courseCode]];
      });

      
      //llSemesters(semesterStructure);

      const unvalid = []
      
      //102
      unvalid.push(checkPrerequisites("102",["101"],semesterStructure));
      //201
      unvalid.push(checkPrerequisites("201",["101","102"],semesterStructure));

      //202
      unvalid.push(checkPrerequisites("202",["101","102","201"],semesterStructure));
    
      //301
      unvalid.push(checkPrerequisites("301",["101","102","201","202"],semesterStructure));
      
      //302
      unvalid.push(checkPrerequisites("302",["101","102","201","202","301"],semesterStructure));
  
      //401
      unvalid.push(checkPrerequisites("401",["101","102","201","202","301","302"],semesterStructure));
   
      //402
      unvalid.push(checkPrerequisites("402",["101","102","201","202","301","302", "401"],semesterStructure));

      console.log("invalid courses", unvalid);
      console.log("Semester Structure created:", semesterStructure);
      reqStructure = (requestStructure());
      console.log("Request Structure: ", reqStructure);
      return semesterStructure;
    };
  
    const requestStructure = () =>{
      let requestS = []
      for (const semestername of Object.keys(semesterStructure)){
        
        for (const semester of semesterStructure[semestername]){
          
          requestS.push(semester.course_code)
        }
      }
      return requestS;
    }
    

    const courseAdder = (event, selectedCourses, setSelectedCourses, semesterName) => {
      const selectedCourse = event.target.value;
      console.log(selectedCourse);
      
      setSelectedCourses([...selectedCourses, selectedCourse]);
      console.log(`${selectedCourses} updated:`, selectedCourses);
     
    };
    let unvalidCourses = [];

    const checkOneSemester = (semesterStructure, previousSemester,pre)=>{
      let v = false;
      for (const course_s101 of semesterStructure[previousSemester] ){  
        if (pre === course_s101.course_code){
          console.log(course_s101.course_code)
          v = true;
        }
    }
    return v;
    };

    const checkPrerequisites = (currentSemester, previousSemesters, semesterStructure ) => {
      let unvalidCourses = [];
      for (const course of semesterStructure[currentSemester]) {
        const cond = course.condition; // IE 302
        let len = 0; // 2 tane prereq
        let valid = false;
        for (const pre of cond.prerequisite){ //for every preReq Math203 ve list
          let onecourse = false;
          let tr = false;
          for (const preSemester of previousSemesters ){ // 101 102 ve 201 i için kontrol ediyo
            console.log(pre.length, pre);
            if (pre.length < 6){ // listeyse buraya giriyo
              let sayi = 0
              for(const elem of preSemester){
                if ( checkOneSemester(semesterStructure, preSemester, elem) === true){ // bi tane dersi bulduysa ++
                  sayi++;
                }
              }
              if (sayi >0 ){ // or condition olduğu için 1 tane ders bile olsa conditionu sağlıyor
                len++;
              }
            }else{ // tek ders buraya geliyo 203 
              console.log("for the course: ", course.course_code, pre)
              onecourse = checkOneSemester(semesterStructure, preSemester, pre) // bulduysa karşılığını ++ 
              if (onecourse){
                len = len +1;
                break;
              }
            }
        
            console.log( preSemester, valid, tr)
          }
         
        }
        if (len < (cond.prerequisite).length){
          console.log((cond.prerequisite).length, len);
          unvalidCourses.push(course.course_code);
        }
      }
      return unvalidCourses;
    };

    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5001/Courses', {
            method: 'GET',
            headers: {
             'Accept': ' text/plain',
             'content-type': ' text/plain; charset=utf-8 ',
             'Access-Control-Allow-Origin': 'http://localhost:3000',

            }, 
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          
          getCourses(data.Courses);
          console.log(allCourses);
        } catch (error) {
          console.error('Error fetching data:', error);
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
            <select onChange={(event) => courseAdder(event, courses_101, setCourses_101, "101")}>
              {Object.keys(allCourses).map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            
            </td>
            <td> <select onChange={(event) => courseAdder(event, courses_102, setCourses_102, "102")}>
              {Object.keys(allCourses).map((course, index) => (
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
                <td onClick={() => handleDeleteCourse(rowIndex, courses_101, setCourses_101)}className="hover-effect">{courses_101[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_102, setCourses_102)} className="hover-effect">{courses_102[rowIndex]}</td>
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
            <select onChange={(event) => courseAdder(event, courses_201, setCourses_201, "201")}>
              {Object.keys(allCourses).map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={(event) => courseAdder(event, courses_202, setCourses_202, "202")}>
              {Object.keys(allCourses).map((course, index) => (
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
                <td onClick={() => handleDeleteCourse201(rowIndex)} className="hover-effect">{courses_201[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_202, setCourses_202)} className="hover-effect">{courses_202[rowIndex]}</td>
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
              <h3 style={{ textAlign: 'center' }} onClick={() => createSemesterStructure()}>Summer School
              
              </h3>
            </Table>
          </TableContainer>

        <TableContainer>
        <Table>
          <h3>Junior</h3>
        <table>
          <thead> 
          <tr>
            <td>
            <select onChange={(event) => courseAdder(event, courses_301, setCourses_301, "301")}>
              {Object.keys(allCourses).map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={(event) => courseAdder(event, courses_302, setCourses_302, "302")}>
              {Object.keys(allCourses).map((course, index) => (
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
                <td onClick={() => handleDeleteCourse(rowIndex, courses_301, setCourses_301)} className="hover-effect">{courses_301[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_302, setCourses_302)} className="hover-effect">{courses_302[rowIndex]}</td>
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
            <select onChange={(event) => courseAdder(event, courses_401, setCourses_401, "401")}>
              {Object.keys(allCourses).map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            </td>
            <td> <select onChange={(event) => courseAdder(event, courses_402, setCourses_402, "402")}>
              {Object.keys(allCourses).map((course, index) => (
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
                <td onClick={() => handleDeleteCourse(rowIndex, courses_401, setCourses_401)} className="hover-effect">{courses_401[rowIndex]}</td>
                <td onClick={() => handleDeleteCourse(rowIndex, courses_402, setCourses_402)} className="hover-effect">{courses_402[rowIndex]}</td>
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