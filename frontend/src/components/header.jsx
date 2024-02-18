import React, { useState, useEffect } from 'react';
import './styling/header.css'; 

const Header = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const easternTimeZone = 'America/New_York';
        const updateDateTime = () => {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('en-US', { 
                timeStyle: 'medium', 
                timeZone: easternTimeZone 
            }).format(now);
            const dateString = new Intl.DateTimeFormat('en-US', { 
                dateStyle: 'full', 
                timeZone: easternTimeZone 
            }).format(now);
            setCurrentDateTime(`${dateString}, ${timeString}`);
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hdr-header">
            <h1>South Link</h1>
            <div className="hdr-date-time">
                <p>{currentDateTime}</p>
            </div>
        </div>
    );
};

export default Header;
