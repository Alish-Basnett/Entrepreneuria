import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1">© 2024 Entrepreneuria</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
