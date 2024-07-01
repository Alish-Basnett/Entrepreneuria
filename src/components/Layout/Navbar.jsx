import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Layout.css";
import Gems from "../../assets/images/Gems.png";
import Add from "../../assets/images/add.png";
import GemsShop from "../../pages/GemsShop/GemsShop"; // Adjust the import path if necessary

const Navbar = ({ onCompanyNameClick }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isGemsShopOpen, setIsGemsShopOpen] = useState(false);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenGemsShop = () => {
    setIsGemsShopOpen(true);
  };

  const handleCloseGemsShop = () => {
    setIsGemsShopOpen(false);
  };

  // Replace with actual company name and profile picture from user context or state
  const companyName = "Your Company";
  const profilePicture = ""; // Replace with profile picture URL or Avatar component

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <Toolbar>
          <Link to="/home">
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/company-setup">
            <Button color="inherit">Market</Button>
          </Link>
          <Link to="/share">
            <Button color="inherit">EPSE</Button>
          </Link>
          <Link to="/signup">
            <Button color="inherit">Signup</Button>
          </Link>

          {/* Profile Picture and Dropdown */}
          <div style={{ marginLeft: "auto" }}>
            <div className="flex">
              <div className="balance rounded">$1000</div>
              <div
                className="gems flex pointer rounded"
                onClick={handleOpenGemsShop}
              >
                <div>
                  <img src={Gems} alt="Gems" width={"24px"} height={"24px"} />
                </div>
                <div>0</div>
                <div className="plus">
                  <img src={Add} alt="add" width={"16px"} height={"16px"} />
                </div>
              </div>
              <IconButton onClick={handleMenuClick} color="inherit">
                <Avatar alt="Profile Picture" src={profilePicture} />
              </IconButton>
            </div>

            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
            >
              <MenuItem onClick={onCompanyNameClick}>{companyName}</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Link to={"/login"}>Logout</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <GemsShop open={isGemsShopOpen} onClose={handleCloseGemsShop} />
    </>
  );
};

export default Navbar;
