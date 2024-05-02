import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import SignIn from './SignInSide';
import SignUp from './SignUpSide';
import User from './User';
import Watchlist from './Watchlist';
import Movie from './MoviePage';


function App() {
  return (
    <>       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>

    </>
  );
}

export default App;
