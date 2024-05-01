import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import SignIn from './Signin';
import SignUp from './Signup';

function App() {
  return (
    <>       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </>
  );
}

export default App;
