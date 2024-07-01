import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import HomePage from "./pages/Home/Home";
import CompanySetupPage from "./pages/CompanySetupPage/CompanySetup";
import Footer from "./components/Layout/Footer";
import "./App.css";
import ShareMarket from "./pages/ShareMarket/ShareMarket";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/company-setup" element={<CompanySetupPage />} />
          <Route path="/share" element={<ShareMarket />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
