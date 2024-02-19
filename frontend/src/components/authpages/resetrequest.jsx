import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('');
    const [secretAnswer, setSecretAnswer] = useState(''); 
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleReset = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(process.env.REACT_APP_RESET_REQUEST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, secret_answer: secretAnswer }), 
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setError('');
            } else {
                setError(data.error || 'Failed to send reset link');
                setMessage('');
            }
        } catch (error) {
            setError('Network error');
            setMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Reset Password</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleReset} style={styles.form}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    style={styles.input}
                />
                <input 
                    type="text" 
                    value={secretAnswer} 
                    onChange={e => setSecretAnswer(e.target.value)} 
                    placeholder="Secret Answer" 
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Send Reset Link</button>
            </form>
            <Link to="/" style={styles.backToHomeLink}>Back to Homepage</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
    },
    title: {
        marginBottom: '20px',
    },
    form: {
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    backToHomeLink: {
        marginTop: '20px',
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '1rem',
    },
};

export default ResetPasswordRequest;


