
import './App.css';
import {Routes, Route, NavLink} from 'react-router-dom';
import Header from './Header';
import Infobar from './Infobar';
import YearContainer from './YearContainer';
import TabMain from './TabMain';

function Main() {
  return (
    <div >
   
      <Header/>
    
      <YearContainer/>
      
    </div>
    
  );
}

export default Main;

