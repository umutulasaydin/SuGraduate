
import React from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';

function InfoBox() {
    const items = [
        {
            label: "Umut's Github",
            icon: 'pi pi-github',
            command: () => {
                window.location.href = 'https://github.com/umutulasaydin';
            }
        },
        {
            label: "Burcu's Github",
            icon: 'pi pi-github',
            command: () => {
                window.location.href = 'https://github.com/durcuburcu';
            }
        }
    ];

    return (
        <div className="card ">
            <div className='relative h-5rem'>
                <Tooltip target=".speeddial .p-speeddial-action" position='left' />
                <SpeedDial model={items} direction="right" style={{ left: 0, bottom: 0 }} showIcon="pi pi-bars" hideIcon="pi pi-times" buttonClassName="p-button-outlined" className='speeddial' />
            </div>
        </div>
    )
}

export default InfoBox;
        