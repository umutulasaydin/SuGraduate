import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button'
import logo from '../assets/GradAppLogo.png'
import { useState } from 'react';
import DialogBox from './DialogBox';


function Header(props) {
  const [visible, setVisible] = useState(false);
  return (
    <div className='text-color text-left px-4 flex w-full h-6rem justify-content-start align-items-center' style={{ backgroundColor: "#06b6d4" }}>
      <div className=' flex w-full h-6rem justify-content-start align-items-center'>
        <Avatar image={logo} size="xlarge" className='mx-2' shape="circle" />

        <h1 className='m-0 text-4xl'>suGraduate</h1>
      </div>
      <Button icon="pi pi-envelope" label='Contact Us' onClick={() => setVisible(true)} size="small" className="w-2" rounded outlined pt={{
        label: { className: 'text-white' },
        icon: { className: 'text-white' },
        root: { className: 'bg-cyan-700' }
      }} />
      <Tooltip target={".info"} position={"left"} className='text-sm' content={"This site is made to check graduation requirements. It may not work completely correctly.\nYou can fill out the form for your questions, errors and suggestions. For more:\nUmut Ulaş Aydın (umutulas@sabanciuniv.edu)\nBurcu Durmuş (burcudurmus@sabanciuniv.edu)"} />
      <i className="pi pi-info-circle info flex align-items-end px-6" ></i>
      <DialogBox visible={visible} setVisible={setVisible}/>
    </div>
  );
}

export default Header;