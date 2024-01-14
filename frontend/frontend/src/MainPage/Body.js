import "primereact/resources/themes/lara-light-cyan/theme.css";
import React, { useState, useEffect, useRef } from "react";

import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import "/node_modules/primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import { useNavigate } from "react-router-dom";
import PickListItem from "./PickListItem";
import InfoBox from "../Shared/InfoBox";
import { Majors, EntryYear } from "../Shared/consts";
function Body() {
  const navigate = useNavigate();
  //notifications
  const toasts = useRef(null);
  //Courses
  const semesterList = [
    {
      name: "Freshman",
      semester: [
        {
          name: "Fall",
          courses: useState([])
        },
        {
          name: "Spring",
          courses: useState([])
        },
        {
          name: "Summer",
          courses: useState([])
        }
      ]
    },
    {
      name: "Sophomore",
      semester: [
        {
          name: "Fall",
          courses: useState([])
        },
        {
          name: "Spring",
          courses: useState([])
        },
        {
          name: "Summer",
          courses: useState([])
        }
      ]
    },
    {
      name: "Junior",
      semester: [
        {
          name: "Fall",
          courses: useState([])
        },
        {
          name: "Spring",
          courses: useState([])
        },
        {
          name: "Summer",
          courses: useState([])
        }
      ]
    },
    {
      name: "Senior",
      semester: [
        {
          name: "Fall",
          courses: useState([])
        },
        {
          name: "Spring",
          courses: useState([])
        },
        {
          name: "Summer",
          courses: useState([])
        }
      ]
    },
    {
      name: "Expert",
      semester: []
    }
  ]
  const [courses, setCourses] = useState([]);
  //Get data
  useEffect(() => {

    const getData = async () => {
      try {
        const response = await fetch("https://localhost:5001/Courses")
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
        else {
          throw new Error("Response is not ok");
        }
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);


  //Year semester tables
  const Years = () => {

    return semesterList.map(item => {
      return (<AccordionTab header={item.name} key={item.name}>
        <Accordion>
          {Semesters(item.semester, item.name)}
        </Accordion>
      </AccordionTab>
      );
    })
  }

  const Semesters = (item, yearName) => {
    return item.map(value => {
      return (<AccordionTab header={value.name} key={value.name} >
        <PickListItem courses={courses} selectedCourses={value.courses[0]} setCourseList={setCourses} setTargetList={value.courses[1]} semesterList={semesterList} yearName={yearName} semesterName={value.name} />
      </AccordionTab>)
    })
  }


  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectDoubleMajor, setSelectedDoubleMajor] = useState(null)
  const [isDoubleMajor, setDoubleMajor] = useState(false)
  function DoubleMajorExist() {
    if (isDoubleMajor) {
      return (
        <div className="flex justify-content-between">
          <Dropdown value={selectDoubleMajor} onChange={(e) => setSelectedDoubleMajor(e.value)} options={Majors} optionLabel="name"
            placeholder="Select a Double Major" showClear className="w-10" />
          <Button icon="pi pi-times" onClick={() => setDoubleMajor(false)} size="small" className="w-2" />
        </div>
      );
    }
    else {
      return (
        <Button label="Add Double Major" icon="pi pi-plus" onClick={() => setDoubleMajor(true)} />)
    }
  }
 
  const [selectedYear, setSelectedYear] = useState(null)

  //Submit
  function Submit() {
    if (selectedMajor == null) {
      toasts.current.show({ severity: 'error', summary: 'Error', detail: 'You need to choose Major', life: 3000 });
    }
    else if (selectedYear == null) {
      toasts.current.show({ severity: 'error', summary: 'Error', detail: 'You need to choose Entry Year', life: 3000 });
    }
    else {
      var allLessons = []
      for (let i = 0; i < semesterList.length; i++) {
        for (let j = 0; j < semesterList[i].semester.length; j++) {
          var courses = semesterList[i].semester[j].courses[0]
          allLessons = allLessons.concat(courses.map(course => course.course_code));
        }
      }
      const postData = async () => {
        const url = 'https://localhost:5001/Control';
        var body = {
          "Courses": allLessons,
          "EntryYear": selectedYear.code,
          "Programs": [selectedMajor.code]
        };

        if (selectDoubleMajor !== null) {
          body["Programs"].push(selectDoubleMajor.code);
        }
        try {
          const response = await fetch(url, {
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            method: 'POST',
            body: JSON.stringify(body),
          });

          if (response.ok) {
            const data = await response.json();
            navigate("/result", { state: data });
          } else {
            console.error('Post request failed');

          }
        } catch (error) {
          console.error('An error occurred:', error);

        }
      };
      postData();
    }

  }



  return (
    <div className="bg-cyan-700 h-full">
      <Toast ref={toasts} />
      <div className="bg-cyan-700">
        <div className="p-5 flex justify-content-between">
          <Dropdown value={selectedMajor} onChange={(e) => setSelectedMajor(e.value)} options={Majors} optionLabel="name"
            placeholder="Select a Major" showClear className="w-3" />

          <div className="w-4 flex justify-content-center ">
            {DoubleMajorExist()}
          </div>


          <Dropdown value={selectedYear} onChange={(e) => setSelectedYear(e.value)} options={EntryYear} optionLabel="name"
            placeholder="Select an Entry Year" showClear className="w-3" />
        </div>

      </div>

      <div>
        <Accordion >
          {Years()}
        </Accordion>
      </div>
      <div className="flex justify-content-between bg-cyan-700 w-full px-3">
        <InfoBox className="" />
        <Button onClick={(Submit)} label="Submit" className="my-4 h-3rem" />


      </div>
    </div>

  );
}

export default Body;