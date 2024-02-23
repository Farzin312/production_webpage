import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secretQuestion, setSecretQuestion] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const secretQuestions = [
        "What was your first pet's name?",
        "What was the make of your first car?",
        "What was your childhood nickname?",
        "Write anything you want"
    ];

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password, secret_answer: secretAnswer }),
            });

            if (response.ok) {
                navigate('/admin');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed');
            }
        } catch (error) {
            setError('Network error');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Register</h1>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleRegister} style={styles.form}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    style={styles.input}
                />
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Username" 
                    style={styles.input}
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                    style={styles.input}
                />
                <select 
                    value={secretQuestion} 
                    onChange={e => setSecretQuestion(e.target.value)} 
                    style={styles.input}
                >
                    <option value="">Select a Secret Question</option>
                    {secretQuestions.map((question, index) => (
                        <option key={index} value={question}>{question}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    value={secretAnswer} 
                    onChange={e => setSecretAnswer(e.target.value)} 
                    placeholder="Secret Answer" 
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Register</button>
            </form>
            <div style={styles.linkContainer}>
                <p>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
            </div>
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
    error: {
        color: 'red',
    },
    linkContainer: {
        marginTop: '10px',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        padding: '8px 10px',
        border: '1px solid #007bff',
        borderRadius: '5px',
        display: 'inline-block', 
        fontSize: '1rem',
        transition: 'background-color 0.2s, color 0.2s',

        '&:hover': {
            backgroundColor: '#007bff',
            color: 'white',
        }
    },

};

export default Register;
