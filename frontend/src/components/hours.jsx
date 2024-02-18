import React from 'react';
import './styling/hours.css'; 

const Hours = () => {
    const hours = [
        { day: 'Monday', open: '6 AM', close: '12 AM' },
        { day: 'Tuesday', open: '6 AM', close: '12 AM' },
        { day: 'Wednesday', open: '6 AM', close: '12 AM' },
        { day: 'Thursday', open: '6 AM', close: '12 PM' },
        { day: 'Friday', open: '6 AM', close: '12 AM' },
        { day: 'Saturday', open: '6 AM', close: '12 AM' },
        { day: 'Sunday', open: '7 AM', close: '11 AM' }
    ];

    const currentDay = getCurrentDay();

    return (
        <div className="hrs-container">
            <h2>Hours of Operation</h2>
            <ul className="hrs-list">
                {hours.map((dayInfo, index) => (
                    <li 
                        key={index} 
                        className={dayInfo.day === currentDay ? 'hrs-current-day' : ''}
                    >
                        {dayInfo.day}: {dayInfo.open}–{dayInfo.close}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    return days[currentDate.getDay()];
};

export default Hours;
