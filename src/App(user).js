import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Apptest from './Apptest'; // Import the Apptest component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const handleLogin = (isUserLoggedIn) => {
    setIsLoggedIn(true);
    setIsUser(isUserLoggedIn);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/apptest"
          element={isLoggedIn && isUser ? <Apptest /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
