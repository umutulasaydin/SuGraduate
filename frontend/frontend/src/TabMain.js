import React, { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import './styles.css';

import { TabView, TabPanel } from 'primereact/tabview';
import Header from './Header';
import Requirements from './Requirements';

export default function TabMain (){
    const [activeIndex, setActiveIndex] = useState(3);
    const items = ['Tab 1', 'Tab 2', 'Tab 3'];
    const [data, setData]=useState([]);
    const [prog, setProgram] = useState([]);
    const [satis, setSatis] = useState([]);
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
        const programsat = myJson.programs.map(program => program['satisfaction']);
        setProgram(programNames);
        setSatis(programsat);
        console.log("satisfac", programsat[0]);
      });
    }
    useEffect(()=>{
      getData()
    },[])

  return (

    <div >
        <Header/>
        <TabView className='flex-container'>
            {satis ? (
              <TabPanel header={prog} className="tab-container green-tab">
                <Requirements />
              </TabPanel>
            ) : (
              <TabPanel header={prog} className="tab-container red-tab">
                <Requirements />
              </TabPanel>
            )}
               
                <TabPanel header="Economy" className="tab-container">
                    <p className="m-0">
                       boss
                    </p>
                </TabPanel>
            </TabView>
      
      </div>

  );
};

