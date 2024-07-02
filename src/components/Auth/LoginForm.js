import React, { useState, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserID } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        { username, password }
      );
      const userID = response.data.userID;
      console.log(response.data);
      // Store userID in local storage
      localStorage.setItem("userID", userID);
      // Update context
      setUserID(userID);
      // Handle successful login (e.g., redirect to home page)
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (e.g., show error message)
      alert("Invalid username or password");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <Link to="/signup">
        <Button fullWidth variant="outlined" sx={{ mt: 1, mb: 2 }}>
          Signup
        </Button>
      </Link>
    </Box>
  );
};

export default LoginForm;
