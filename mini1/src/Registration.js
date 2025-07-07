import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await axios.post('http://localhost:5000/register', {
        username,
        password
      });

      setSuccessMsg(res.data.message || 'Registration successful!');
      setUsername('');
      setPassword('');

      // Optional: auto-redirect to login after short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message); // e.g. "User already exists"
      } else {
        setErrorMsg('Something went wrong. Please try again later.');
      }
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="page-center">
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <p className="register-text">
          Already have an account?{' '}
          <Link to="/login" className="register-link">Sign in</Link>
        </p>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default Registration;
