import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to Info Hub</h1>
        <p>Your gateway to sharing and discovering information.</p>
      </header>
      <main className="welcome-main">
        <div className="welcome-buttons">
          <Link to="/registration" className="welcome-button register-button">Register</Link>
          <Link to="/login" className="welcome-button login-button">Login</Link>
        </div>
      </main>
      <footer className="welcome-footer">
        <p>&copy; 2024 Info Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Welcome;