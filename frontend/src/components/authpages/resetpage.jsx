import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams(); 

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/reset_password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setError('');
            } else {
                setError(data.error || 'Failed to reset password');
                setMessage('');
            }
        } catch (error) {
            setError('Network error');
            setMessage('');
        }
    };

    // Styling
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        margin: '20px auto',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        backgroundColor: '#ffffff',
        maxWidth: '400px'
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '80%',
    };

    const buttonStyle = {
        padding: '10px 15px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    };

    return (
        <div style={formStyle}>
            <h1>Reset Your Password</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleResetPassword}>
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    placeholder="New Password" 
                    style={inputStyle}
                />
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm New Password" 
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
