import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Account/Navbar";
import Signup from "./components/Account/Signup";
import Login from "./components/Account/Login";
import PasswordResetRequest from "./components/Account/PasswordResetRequest";
import PasswordReset from "./components/Account/PasswordReset";
import OurStore from "./components/Products/OurStore";
import Product from "./components/Products/HomePage";
import SingleProduct from "./components/Products/SingleProduct";
import Profile from "./components/Profile/Profile";
import Layout from "./components/Common/Layout";

function App() {
  const AppContent = () => {
    const location = useLocation();

    // List of paths where the Navbar should be hidden
    const hideNavbarPaths = [
      /^\/login$/,
      /^\/signup$/,
      /^\/resetPassword$/,
      /^\/resetPassword\/.+$/, // Regex to match /resetPassword/:token
      /^\/$/ // Root path
    ];

    // Check if the current path matches any of the hideNavbarPaths
    const hideNavbar = hideNavbarPaths.some(path => path.test(location.pathname));

    return (
      <div className="App">
        {!hideNavbar && <Navbar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetPassword" element={<PasswordResetRequest />} />
            <Route path="/resetPassword/:token" element={<PasswordReset />} />
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Product />} />
              <Route path="/browse" element={<OurStore />} />
              <Route path="/product" element={<SingleProduct />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
