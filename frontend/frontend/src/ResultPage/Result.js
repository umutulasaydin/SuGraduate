import { useLocation } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import { Majors, EntryYear } from "../Shared/consts";
import ResultCard from "./ResultCard";
import { Accordion, AccordionTab } from "primereact/accordion";

function Result() {
    const location = useLocation();
    const data = location.state;

    function HeaderTemplate(info) {
        return(
            <div className="flex justify-content-between">
                <span>{info.area}</span>
                {info.success ? 
                <i className="pi pi-check" style={{ color: 'green' }}></i> :
                <i className="pi pi-times" style={{ color: 'red' }}></i>
                }
            </div>
        );
    }

    function Areas(program) {
        return program.map((result, index) => {return <AccordionTab header={HeaderTemplate(result)} key={index}>
            <ResultCard result={result}></ResultCard>
        </AccordionTab>})
    }

    function Programs() {
        return data.results.map((program, index) => {return <TabPanel header={Majors.find(x=> x.code === program.program).name} key={index}>
            <Accordion>
                {Areas(program.creditResults)}
            </Accordion>
        </TabPanel>})
    }

    return (
        <div className="bg-cyan-700 h-full w-full">
            {data.results.length === 0 ? <div className="flex justify-content-center h-10rem align-items-center">
                There is no information containing these conditions. Please contact us.
            </div> :
                <div className="bg-cyan-700 h-full w-full">
                    <div className="h-3rem flex justify-content-center align-items-center bg-white">
                        Entry Year: {EntryYear.find(x => x.code === data.entryYear).name}
                    </div>
                    <TabView>
                        {Programs()}
                    </TabView>
                </div>
            }
        </div>
    );

};

export default Result;