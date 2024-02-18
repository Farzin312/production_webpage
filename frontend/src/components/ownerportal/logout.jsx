import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ownerportal/authcontext'; 

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const hoverStyles = {
        ...styles.button, 
        backgroundColor: isHovered ? 'black' : '#f0f0f0',
        color: isHovered ? 'white' : '#333', 
    };

    return (
        <button
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={hoverStyles}>
        Logout
    </button>
    );
};

const styles = {
    button: {
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '25px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontWeight: 'bold',
        letterSpacing: '0.5px'
    },
};

export default LogoutButton;

