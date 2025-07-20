import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.css';

function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success && data.token) {
                // THIS IS THE MOST IMPORTANT LINE
                localStorage.setItem('token', data.token);

                // Then we update the app state and navigate
                onLoginSuccess();
                navigate('/');
            } else {
                alert(data.message || 'Login failed!');
            }
        } catch (error) {
            alert('Failed to connect to the server.');
        }
    };

    return (
        <>
            <Helmet>
                <body className="auth-page-body" />
            </Helmet>
            <div className="main-content">
                <div className="login-box">
                    <h2>Login to Skoonify</h2>
                    <form onSubmit={handleLogin}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                    <div className="nav-links" style={{ marginTop: '20px' }}>
                        Don't have an account? <Link to="/signup">Create one</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;