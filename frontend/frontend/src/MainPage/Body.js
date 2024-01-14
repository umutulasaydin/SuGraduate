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
import { useMediaQuery } from 'react-responsive';
function Body() {
  //Responsive
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 720px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 720px)' })
  
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
      semester: [
        {
          name: "Semester 1",
          courses: useState([])
        },
        {
          name: "Semester 2",
          courses: useState([])
        },
        {
          name: "Semester 3",
          courses: useState([])
        },
        {
          name: "Semester 4",
          courses: useState([])
        },
        {
          name: "Semester 5",
          courses: useState([])
        },
        {
          name: "Semester 6",
          courses: useState([])
        }

      ]
    }
  ];
  const [courses, setCourses] = useState([]);

  //Get data
  useEffect(() => {

    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5001/Courses")
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
        const url = 'http://localhost:5001/Control';
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
      <div className={"bg-cyan-700"}>
        <div className={"p-5 flex " + (isDesktopOrLaptop && "justify-content-between ") + (isTabletOrMobile && " flex-column align-items-center gap-3")}>
          <Dropdown value={selectedMajor} onChange={(e) => setSelectedMajor(e.value)} options={Majors} optionLabel="name"
            placeholder="Select a Major" showClear className={(isDesktopOrLaptop && "w-3 ") + (isTabletOrMobile && " w-full")} />
          <div className={"flex justify-content-center "+ (isDesktopOrLaptop && " w-4 ") + (isTabletOrMobile && " w-full")}>
          <Dropdown value={selectDoubleMajor} onChange={(e) => setSelectedDoubleMajor(e.value)} options={Majors} optionLabel="name"
            placeholder="Select a Double Major" showClear className={(isDesktopOrLaptop && "w-10 ") + (isTabletOrMobile && " w-full")} />
          </div>
          <Dropdown value={selectedYear} onChange={(e) => setSelectedYear(e.value)} options={EntryYear} optionLabel="name"
            placeholder="Select an Entry Year" showClear className={(isDesktopOrLaptop && "w-3 ") + (isTabletOrMobile && " w-full")}/>
        </div>

      </div>

      <div>
        <Accordion >
          {Years()}
        </Accordion>
      </div>
      <div className={"flex bg-cyan-700 w-full px-3" + (isDesktopOrLaptop && " justify-content-between my-3 ") + (isTabletOrMobile && " flex-column align-items-center gap-3 w-full")}>
        {isDesktopOrLaptop && <InfoBox />}
        <Button onClick={(Submit)} label="Submit" className={(isDesktopOrLaptop && " h-3rem my-3 ") + (isTabletOrMobile && " w-full m-5")} />


      </div>
    </div>

  );
}

export default Body;