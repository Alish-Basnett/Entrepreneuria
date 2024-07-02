import React, { useState, useContext, useRef, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import entreLogo from "../../assets/images/entre-logo-black.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [guestLogin, setGuestLogin] = useState(false);
  const formRef = useRef(null);
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

  const handleGuestLogin = () => {
    setUsername("Guest");
    setPassword("guest");
    setGuestLogin(true); // Set guest login flag to true
  };

  useEffect(() => {
    if (guestLogin && username === "Guest" && password === "guest") {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      setGuestLogin(false); // Reset guest login flag after submitting
    }
  }, [guestLogin, username, password]);

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
            alt="Login illustration"
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
              Login Entrepreneuria
            </Typography>
          </div>
        </div>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        ref={formRef}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: "#be023c" }}
        >
          Login
        </Button>
        <Link to="/forgotPassword" className="forgot-password">
          Forgot Password?
        </Link>

        <div>
          {" "}
          <Button
            onClick={handleGuestLogin}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            style={{ backgroundColor: "#16233b" }}
          >
            Login as Guest
          </Button>
          <div className="flex">
            <span>Haven't registered yet?</span> &nbsp;
            <Link to="/signup" className="signup">
              Register Here.
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default LoginForm;
