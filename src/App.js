import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import './App.css';

function App() {
  return (
    <>
      <h1>FILMDB</h1>
       
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
