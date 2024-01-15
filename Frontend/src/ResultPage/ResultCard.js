import { DataScroller } from 'primereact/datascroller';

function ResultCard(props) {
    console.log(props.result);
    const itemTemplate = (item) => {

        return (
          <div className="flex flex-wrap p-2 align-items-center gap-3 border-1 border-round">
            <div className="flex-1 flex flex-column gap-2">
              <span className="font-bold">{item.course_Name}</span>
              <div className="flex align-items-center gap-2">
                <span>{item.faculty}</span>
              </div>
            </div>
            {(props.result.area !== "Basic Science" && props.result.area !== "Engineering") && <span className="font-bold text-900">{item.sU_Credit} SU Credit</span>}
            <span className="font-bold text-900">{item.aktS_Credit} AKTS Credit</span>
          </div>
        );
      };


    return (
        <div>
            <table border={1} className="w-full text-center">
                <tr>
                    <th></th>
                    <th>Min Course</th>
                    <th>SU Credit</th>
                    <th>AKTS Credit</th>
                </tr>
                <tr className="">
                    <td className="font-bold">Taken</td>
                    <td>{props.result.taken_Course}</td>
                    <td>{props.result.taken_SU_Credit}</td>
                    <td>{props.result.taken_AKTS_Credit}</td>
                </tr>
                <tr>
                    <td className="font-bold">Required</td>
                    <td>{props.result.min_Course}</td>
                    <td>{props.result.sU_Credit}</td>
                    <td>{props.result.aktS_Credit}</td>
                </tr>
            </table>
            <div className="card">
            {
              props.result.area !== "Total" &&
              <div>
              {props.result.takenCourses.length !== 0 && <DataScroller value={props.result.takenCourses} itemTemplate={itemTemplate} header="Taken Courses" rows={20} inline scrollHeight="500px"/>}
              {props.result.suggestedCourses.length !== 0 &&  <DataScroller value={props.result.suggestedCourses} itemTemplate={itemTemplate} rows={props.result.suggestedCourses.length} header="Suggested Courses" inline scrollHeight="500px"/>}
             </div> 
            }
            
        </div>
        </div>

    );
};

export default ResultCard;