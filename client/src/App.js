import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route,  Navigate, Link, useLocation } from 'react-router-dom';
import SkoonPage from './SkoonPage';
import SignupPage from './SignupPage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import './App.css';

// LoggedInNav Component
// const LoggedInNav = ({ onLogout }) => {
//     const location = useLocation();
//     return (
//         <nav className="navbar">
//             <div className="logo">
//                 <img src="/logo.png" alt="Skoonify" />
//                 <span>Skoonify</span>
//             </div>
//             <div className="nav-right">
//                 <Link to="/" className="nav-home">Home</Link>
//                 {location.pathname !== '/about' && (
//                     <Link to="/about" className="logout-button" style={{ marginRight: '15px' }}>About</Link>
//                 )}
//                 <button onClick={onLogout} className="logout-button">Logout</button>
//             </div>
//         </nav>
//     );
// };

// Inside client/src/App.js...

const LoggedInNav = ({ onLogout }) => {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/logo.png" alt="Skoonify" />
                <span>Skoonify</span>
            </div>
            <div className="nav-right">
                {/* NEW: Only show the 'Home' link if we are NOT on the home page */}
                {location.pathname !== '/' && (
                    <Link to="/" className="nav-home">Home</Link>
                )}

                {/* The 'About' link logic is still the same */}
                {location.pathname !== '/about' && (
                    <Link to="/about" className="logout-button" style={{ marginRight: '15px' }}>About</Link>
                )}
                
                <button onClick={onLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
};
// LoggedOutNav Component
const LoggedOutNav = () => {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/logo.png" alt="Skoonify" />
                <span>Skoonify</span>
            </div>
            <div className="nav-right">
                {location.pathname !== '/about' && (
                    <Link to="/about" className="logout-button" style={{ marginRight: '15px' }}>About</Link>
                )}
                {location.pathname === '/login' ? (
                    <Link to="/signup" className="logout-button">Signup</Link>
                ) : (
                    <Link to="/login" className="logout-button">Login</Link>
                )}
            </div>
        </nav>
    );
};

// Main App Component
function App() {
    // Initialize state by checking for a token in local storage
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    // This effect hook can be used for more complex token validation in the future if needed
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from storage
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            {isLoggedIn ? <LoggedInNav onLogout={handleLogout} /> : <LoggedOutNav />}
            
            <Routes>
                {/* If logged in, show SkoonPage, otherwise redirect to login */}
                <Route path="/" element={isLoggedIn ? <SkoonPage /> : <Navigate to="/login" />} />
                
                {/* If logged in and trying to go to login, redirect to home */}
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />

                <Route path="/signup" element={<SignupPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;