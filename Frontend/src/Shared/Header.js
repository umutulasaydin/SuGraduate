import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button'
import logo from '../assets/GradAppLogo.png'
import { useState } from 'react';
import DialogBox from './DialogBox';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'


function Header(props) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 720px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 720px)' })
  return (
    <div className='text-color text-left px-4 flex w-full h-6rem justify-content-start align-items-center' style={{ backgroundColor: "#06b6d4" }}>
      <div className=' flex w-full h-6rem  align-items-center'>
        <Avatar image={logo} size="xlarge" className='mx-2' shape="circle" onClick={() => { navigate("/"); }} />

        {isDesktopOrLaptop && <h1 className='m-0 text-4xl cursor-pointer' onClick={() => { navigate("/"); }}>SuGraduate</h1>}
      </div>
      <div className='flex align-items-end'>
        {isDesktopOrLaptop && <Button icon="pi pi-envelope" label='Contact Us' onClick={() => setVisible(true)} size="small" className="" rounded outlined pt={{
          label: { className: 'text-white' },
          icon: { className: 'text-white' },
          root: { className: 'bg-cyan-700' }
        }} />}
        {isTabletOrMobile && <Button icon="pi pi-envelope" onClick={() => setVisible(true)} size="small" className="" rounded outlined pt={{
          icon: { className: 'text-white' },
          root: { className: 'bg-cyan-700' }
        }} />}
      </div>

      <Tooltip target={".info"} position={(isDesktopOrLaptop && "left") || (isTabletOrMobile && "bottom")} className='text-sm' content={"This site is made to check graduation requirements. It may not work completely correctly.\nFor more:\nUmut Ulaş Aydın (umutulas@sabanciuniv.edu)\nBurcu Durmuş (burcudurmus@sabanciuniv.edu)"} />
      {isDesktopOrLaptop && <i className="pi pi-info-circle info flex align-items-end px-6" ></i>}
      {isTabletOrMobile && <i className="pi pi-info-circle info flex align-items-end px-2" ></i>}
      <DialogBox visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default Header;