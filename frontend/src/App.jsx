import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Aboutus from "./pages/Aboutus";
import Signuppage from "./pages/SignupPage";

const App = () => {
  // Track if Aboutus is in view

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signuppage />} />
      </Routes>
    </>
  );
};

export default App;
