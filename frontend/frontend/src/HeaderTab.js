import React, { useState } from 'react';

const HeaderTab = ({ tabs, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabClick = (index) => {
      setActiveTab(index);
      onTabChange(index);
    };

    return (
        <div>
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(index)}
              style={{ cursor: 'pointer', marginRight: '10px', fontWeight: index === activeTab ? 'bold' : 'normal' }}
            >
              {tab}
            </div>
          ))}
        </div>
      );
    };
    
    export default HeaderTab;