import Question from './myComponents/Question';
import './App.css';
import Alert from './myComponents/Alert';
import React, { useState } from 'react';

function App() 
{
  const [alert, setAlert]=useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <Alert alert={alert}/>
      <div>
        <Question showAlert={showAlert} display={1}/>
      </div>

    </>

  );
}

export default App;



