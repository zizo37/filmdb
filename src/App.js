import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import "./App.css";
import Content from "./Content";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </>
  );
}

export default App;
