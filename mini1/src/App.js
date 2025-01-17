import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import PostPage from './PostPage';
import Logout from './Logout';
import Welcome from './Welcome'

const App = () => {
  return (
    <Router>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <Routes>
        <Route path="/" element={<Welcome />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<PostPage/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

