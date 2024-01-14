import { PickList } from "primereact/picklist";
import { Messages } from "primereact/messages";
import { useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
function PickListItem(props) {
  const msgs = useRef(null);
  var warnings = []
  var total_credit = 0;
  var allLessons = []
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 400px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 400px)' })
  
  function checkRequirement(courseInfo, courseList) {
    if (courseInfo.condition.general.length !== 0) {
      var credit = 0;
      for (let i = 0; i < courseList.length; i++) {
        credit += courseList[i].credit;
      }
      if (courseInfo.condition.general[0] > credit) {
        var message = "Your credit is not enough for " + courseInfo.course_code + ". Required credit: " + courseInfo.condition.general[0];
        warnings.push({ severity: "warn", summary: "Warning", detail: message, sticky: true, closable: false })
      }
    }
    for (let i = 0; i < courseInfo.condition.prerequisite.length; i++) {
      if (typeof courseInfo.condition.prerequisite[i] === 'string' && courseList.some(course => course.course_code === courseInfo.condition.prerequisite[i]) === false)
      {
        message = "To take " + courseInfo.course_code + " you need to take this course: " + courseInfo.condition.prerequisite[i];
        warnings.push({ severity: "warn", summary: "Warning", detail: message, sticky: true, closable: false })
      }
      else if (Array.isArray(courseInfo.condition.prerequisite[i]) && courseInfo.condition.prerequisite[i].some(elem => courseList.some(course => course.course_code === elem)) === false )
      {
        
        message = "To take " + courseInfo.course_code + " you need to take at least one of these courses: " + courseInfo.condition.prerequisite[i];
        warnings.push({ severity: "warn", summary: "Warning", detail: message, sticky: true, closable: false })
      }
      
    }
  }


  const onChange = (event) => {
    total_credit = 0;
    warnings = []
    msgs.current.clear();
    allLessons = [];
    for (let i = 0; i < event.target.length; i++) {
      total_credit += event.target[i].credit;
    }
    if (total_credit > 20) {
      warnings.push({ severity: "warn", summary: "Warning", detail: "The total credit exceeds 20 credit.", sticky: true, closable: false });
    }
    props.setCourseList(event.source);
    props.setTargetList(event.target);
    for (let i = 0; i < props.semesterList.length; i++) {
      for (let j = 0; j < props.semesterList[i].semester.length; j++) {
        if (props.semesterList[i].name === props.yearName && props.semesterList[i].semester[j].name === props.semesterName) {
          break;
        }
        allLessons = allLessons.concat(props.semesterList[i].semester[j].courses[0])

      }

      if (props.semesterList[i].name === props.yearName) {
        break;
      }
    }

    for (let i = 0; i < event.target.length; i++) {
      checkRequirement(event.target[i], allLessons);
    }

    msgs.current.show(warnings);
  };

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3 border-1 border-round">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold text-xs">{item.course_name}</span>
          <div className="flex align-items-center gap-2">
            <span className="text-xs">{item.course_code}</span>
          </div>
        </div>
        {isDesktopOrLaptop && <span className="font-bold text-xs">{item.credit} Credit</span>}
        {isTabletOrMobile && <div className="font-bold text-xs">{item.credit} Credit</div>}
      </div>
    );
  };

  function initalize()
  {
    total_credit = 0;
    warnings = []
    msgs.current.clear();
    allLessons = [];
    for (let i = 0; i < props.selectedCourses.length; i++) {
      total_credit += props.selectedCourses[i].credit;
    }
    if (total_credit > 20) {
      warnings.push({ severity: "warn", summary: "Warning", detail: "The total credit exceeds 20 credit.", sticky: true, closable: false });
    }
    for (let i = 0; i < props.semesterList.length; i++) {
      for (let j = 0; j < props.semesterList[i].semester.length; j++) {
        if (props.semesterList[i].name === props.yearName && props.semesterList[i].semester[j].name === props.semesterName) {
          break;
        }
        allLessons = allLessons.concat(props.semesterList[i].semester[j].courses[0])

      }
      if (props.semesterList[i].name === props.yearName) {
        break;
      }
    }
    for (let i = 0; i < props.selectedCourses.length; i++) {
      checkRequirement(props.selectedCourses[i], allLessons);
    }
    msgs.current.show(warnings);
  }
  useEffect(() => {
    initalize();
  })
  return (
    <div className="card">
      <Messages ref={msgs} />

      <PickList source={props.courses} target={props.selectedCourses} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
        sourceHeader="Courses" targetHeader="Selected courses" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} filter
        sourceFilterPlaceholder="Search by course code" targetFilterPlaceholder="Search by course code" filterBy="course_code"
        dataKey="course_code" showSourceControls={false} showTargetControls={false} metaKeySelection={false} />
    </div>
  );
}


export default PickListItem;