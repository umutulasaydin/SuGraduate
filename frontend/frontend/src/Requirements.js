import React, { useEffect, useState } from 'react';
import './styles.css';


const Requirements = () => {

const [data, setData]=useState([]);
const [prog, setProgram] = useState([]);
const getData=()=>{
  fetch('data.json',
  {
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }).then(function(response){
    console.log(response)
    return response.json();
  }).then(function(myJson){
    console.log(myJson);
    setData(myJson.programs)
    const programNames = myJson.programs.map(program => program['program name']);
    setProgram(programNames);
  });
}
useEffect(()=>{
  getData()
},[])


return(
    <div>
            {data && data.length > 0 &&
              data.map((program, index) => (
          <div key={index}>
            {program.satisfaction ? (
              <p style={{ color: 'green' }}>Course requirements are met.</p>
            ) : (
              <p style={{ color: 'red' }}>Course requirements are not met.</p>
            )}
            <div className="requirements-container">
            <p>SU Credit Required: {program['credit_requirement']['SU_credit']['required']}</p>
            <p>SU Credit Completed: {program['credit_requirement']['SU_credit']['completed']}</p>
              
            <table>
            <thead>
              <tr>
         
                
                {program['university_courses']['satisfaction'] ? (
              <th style={{ color: 'green' }}>University Courses: {program['university_courses']['requirement']['SU credit']['completed']} / 
               {program['university_courses']['requirement']['SU credit']['required']}</th>
            ) : (
              <th style={{ color: 'red' }}>University Courses: {program['university_courses']['requirement']['SU credit']['completed']} /
                {program['university_courses']['requirement']['SU credit']['required']}</th>
            )}
              </tr>
            </thead>
            <tbody>
            <tr>
            {program['university_courses']['courses'].map((course, courseIndex) => (
              <div key={courseIndex}>
                <p>Course Name: {course['course code']} SU Credit: {course['SU credit']}</p>
                
              </div>
            ))}
              </tr>
            </tbody>
            <thead>
              <tr>
              {program['free electives']['satisfaction'] ? (
              <th style={{ color: 'green' }}>Free Electives: {program['free electives']['requirement']['SU credit']['completed']} / 
               {program['free electives']['requirement']['SU credit']['required']}</th>
            ) : (
              <th style={{ color: 'red' }}>Free Electives: {program['free electives']['requirement']['SU credit']['completed']} /
                {program['free electives']['requirement']['SU credit']['required']}</th>
            )}
        
              </tr>
            </thead>
            <tbody>
            <tr>
            {program['free electives']['courses'].map((course, courseIndex) => (
              <div key={courseIndex}>
                <p>Course Name: {course['course code']} SU Credit: {course['SU credit']}</p>
                
              </div>
            ))}
              </tr>
            </tbody>

            <thead>
              <tr>
                {program['area']['satisfaction'] ? (
              <th style={{ color: 'green' }}>Area Requirements: {program['area']['requirement']['SU credit']['completed']} / 
               {program['area']['requirement']['SU credit']['required']}</th>
            ) : (
              <th style={{ color: 'red' }}>Area Requirements: {program['area']['requirement']['SU credit']['completed']} /
                {program['area']['requirement']['SU credit']['required']}</th>
            )}
              </tr>
            </thead>
            <tbody>
            <tr>
            {program['area']['courses'].map((course, courseIndex) => (
              <div key={courseIndex}>
                <p>Course Name: {course['course code']} SU Credit: {course['SU credit']}</p>
                
              </div>
            ))}
              </tr>
            </tbody>

          </table>

          </div>
          </div>
        ))}
    </div>
);

};
export default Requirements;