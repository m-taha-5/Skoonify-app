import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import Helmet
import './App.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Signup successful! You can now log in.');
        navigate('/login');
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      alert('Error: Could not connect to the server.');
    }
  };

  return (
    <>
      <Helmet>
        <body className="auth-page-body" />
      </Helmet>
      
      <div className="main-content">
        <div className="login-box">
          <h2>Create Your Skoonify Account</h2>
          <form onSubmit={handleSignup}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;