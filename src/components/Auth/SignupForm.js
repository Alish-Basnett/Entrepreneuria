import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import entreLogo from "../../assets/images/entre-logo-black.png";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const userData = {
      username,
      password,
      companyName: "N/A",
      industry: "N/A",
      registrationDate: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // Redirect to login page or show success message
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (show error message to the user)
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="30vh">
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          p: 3,
          color: "black",
          height: "100%",
          marginTop: "10px",
        }}
      >
        <div
          className="flex"
          style={{ justifyContent: "space-between", flexDirection: "column" }}
        >
          <img
            src={entreLogo} // replace with your image source
            alt="Signup illustration"
            style={{
              width: "70%",
              maxWidth: "200px",
              marginTop: "20px",
              marginBottom: "20px",
              marginRight: "10px",
            }}
          />
          <div>
            <Typography variant="h4" gutterBottom>
              Signup for Entrepreneuria
            </Typography>
          </div>
        </div>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 3,
          paddingBottom: 0,
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: "#be023c" }}
          className="signup-button"
        >
          Signup
        </Button>
        <Link to="/login" className="back-to-login">
          Already have an account? Login here.
        </Link>
      </Box>
    </Box>
  );
};

export default SignupForm;
