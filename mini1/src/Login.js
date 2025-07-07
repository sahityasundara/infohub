import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/posts', { state: { username } });
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="page-center">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-text">
            Don't have an account?{' '}
            <Link to="/registration" className="register-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
