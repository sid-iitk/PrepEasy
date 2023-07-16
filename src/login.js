import React, { useState } from 'react';
import './login.css';
import Question from './myComponents/Question';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError]= useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here

    // If login is successful, set loggedIn to true
    const users = [
        {username: 'admin' , password:'admin'},
        {username: 'test' , password:'test'},
    ]
    const matchusers = users.find(
        (user)=>user.username===username && user.password===password
    );
    if(matchusers)
    {
        setLoggedIn(true);
    }
    else
    {
        setLoginError(true);
    }
  };

  if (loggedIn) {
    if (username === 'admin') {
      return (
        <div>
          <Question display={1} isAdmin={true}  />
        </div>
      );
    } 
    else {
      return (
        <div>
            <Question display={1}  isAdmin={false}/>
        </div>
      );
    }
  }
  return (
    <div className="login-page">  
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {loginError && <p>Invalid credentials</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      
    </div>
  );
};

export default LoginPage;
