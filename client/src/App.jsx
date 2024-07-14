import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={Home} />} />
        <Route path="/user-management" element={<PrivateRoute component={UserManagement} />} />
        <Route path="/role-management" element={<PrivateRoute component={RoleManagement} />} />
      </Routes>
    </Router>
  );
};

export default App;
