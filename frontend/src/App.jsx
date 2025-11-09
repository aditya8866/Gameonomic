import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Aboutus from "./pages/Aboutus";
import Signuppage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import DealsPage from "./pages/DealsPage";  
import DealDetails from "./pages/DealDetailsPage";

// inside <Routes>



const App = () => {
  // Track if Aboutus is in view

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/deal/:dealID" element={<DealDetails />} />
        
      </Routes>
    </>
  );
};

export default App;
