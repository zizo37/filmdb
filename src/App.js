import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import SignIn from "./SignInSide";
import SignUp from "./SignUpSide";
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdatePassword";
import User from "./User";
import Watchlist from "./Watchlist";
import Movie from "./Movie";
import SearchResults from "./SearchResults";
import UserUpdatePassword from "./components/UserPasswordUpdate";
import UserDeleteAccount from "./components/UserDeleteAccount";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/user" element={<User />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/update-Password" element={<UserUpdatePassword />} />
        <Route path="/delete-account" element={<UserDeleteAccount />} />
      </Routes>
    </>
  );
}

export default App;
