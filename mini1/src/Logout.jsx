import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user authentication tokens or data
    // For example, if using localStorage:
    localStorage.removeItem('authToken');

    // Navigate to the login page
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;