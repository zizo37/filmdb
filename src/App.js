import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import Auth from './Auth';
import Home from './Home';
import './App.css';
import SignInSide from './SignInSide';
import SignUp from './SignUp';

function App() {
  return (
    <>       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </>
  );
}

export default App;
