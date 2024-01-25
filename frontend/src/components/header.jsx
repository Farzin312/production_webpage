import React, { useState, useEffect } from 'react';

const Header = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const easternTimeZone = 'America/New_york';
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

    const boxStyle = {
        backgroundColor: 'white',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '5px',
        color: 'black',
        width: '100%',
        height: '60px'
    };

    const dateTimeStyle = {
        marginRight: '20px',
        textAlign: 'right'
    }

    return (
        <div style={boxStyle}>
            <h1>South Link</h1>
            <div style={dateTimeStyle}>
            <p>{currentDateTime}</p>
            </div>
        </div>
    );
};

export default Header;
