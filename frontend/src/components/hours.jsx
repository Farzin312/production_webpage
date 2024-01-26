// In your Hours.js file
import React from 'react';

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
        <div>
            <h2>Hours of Operation</h2>
            <ul>
                {hours.map((dayInfo, index) => (
                    <li 
                        key={index} 
                        style={{ 
                            backgroundColor: dayInfo.day === currentDay ? 'rgba(128, 128, 128, 0.5)' : 'transparent' 
                        }}
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


