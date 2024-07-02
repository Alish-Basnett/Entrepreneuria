import React from "react";
import { Typography } from "@mui/material";
import LoginForm from "../../components/Auth/LoginForm";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "./Login.css";
import PricesAdvert from "../../components/PricesAdvert/PricesAdvert";

const LoginPage = () => {
  return (
    <>
      <PricesAdvert />
      <div className="login-container">
        <div className="login-box">
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          <div className="loginform-container">
            <LoginForm />
            <Link to="/signup">
              {" "}
              {/* Use Link component to navigate to /signup route */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
