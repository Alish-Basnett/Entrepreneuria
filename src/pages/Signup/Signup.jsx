import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../components/Auth/SignupForm";
import "./Signup.css";
import PricesAdvert from "../../components/PricesAdvert/PricesAdvert";

const SignupPage = () => {
  return (
    <>
      <PricesAdvert />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Let's Register You</h2>
          <div className="signupform-container">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
