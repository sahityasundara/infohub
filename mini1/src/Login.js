import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/posts', { state: { username:username } });
     // navigate('/posts');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div  className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            className="login-input"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            className="login-input"
          />
        </div>
        <button type="submit" style={{ padding: '10px', width: '100%' }} className="login-button">
          Login
        </button>
        <p className="login-text">Don't have an account? <Link to="/registration" className="register-link">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;

