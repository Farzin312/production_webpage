import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1>Page Not Found</h1>
            <p>The page you are looking for doesn't exist or another error occurred.</p>
            <Link to="/" style={styles.link}>Go back to Home</Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px'
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        marginTop: '20px',
        fontSize: '1rem',
    }
};

export default NotFound;
