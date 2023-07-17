import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSecretCodeChange = (event) => {
    setSecretCode(event.target.value);
  };

  const handleLoginSubmit = () => {
    if (username === 'user' && password === 'password') {
      handleLogin(true);
      navigate('/apptest');
      handleLogin(true); // User login
    } else  if (username === 'admin' && password === 'password'&& secretCode ==='1234') {
      handleLogin(true);
      navigate('/dashboard');
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div className="form-group">
        <label>Login as:</label>
        <select value={username === 'admin' ? 'admin' : 'user'} onChange={handleUsernameChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {username === 'admin' && (
        <div className="form-group">
          <label>Secret Code:</label>
          <input type="password" value={secretCode} onChange={handleSecretCodeChange} />
        </div>
      )}
      <button onClick={handleLoginSubmit}>Login</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Login;
