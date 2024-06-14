// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // or your preferred styling CSS

import LoginForm from "./Components/LoginForm";
import Layout from "./Components/Layout";
import Public from "./Components/Public";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with auth state logic

  useEffect(() => {
    // Check for existing authentication on app load (optional)
    const storedToken = localStorage.getItem("authToken"); // Replace with storage mechanism
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Store authentication token if successful (optional)
  };

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>  {/* Use Routes instead of Switch for nested routes */}
        <Route path="/" element={<Public />} />  {/* Always render Layout */}
        <Route path="admin" element={isLoggedIn ? <Layout /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="admin/dashboard" element={isLoggedIn ? <Layout /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="admin/employees" element={isLoggedIn ? <Layout /> : <LoginForm onLogin={handleLogin} />} />
        {/* </Route> */}
        {/* Add other routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
