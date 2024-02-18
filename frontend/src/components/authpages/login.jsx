import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../ownerportal/authcontext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin'); 
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <div style={styles.linksContainer}>
                <Link to="/register" style={styles.link}>Register</Link>
                <Link to="/reset_request" style={styles.link}>Forgot Password?</Link>
                <Link to="/" style={styles.link}>Back to Home</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        margin: '10px 0',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '20px',
    },
    linksContainer: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        margin: '10px 0', 
        fontSize: '1rem', 
    },
};

export default Login;
