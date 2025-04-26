import React, { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from "./components/ForgotPassword";


const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
    </div>
  );
};

function App() {

  const {showLogin, showForgotPassword} = useContext(AppContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate delay for splash screen, or do actual data fetching
    const timer = setTimeout(() => setLoading(false), 1500); // or when everything is loaded
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullScreenLoader />;


  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer 
      position="bottom-right"
      />
      <Navbar />
      {showLogin && <Login />}
      {showForgotPassword && <ForgotPassword />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
