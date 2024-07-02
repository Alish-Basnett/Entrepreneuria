import React, { useContext, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

const industries = [
  { value: "agriculture", label: "Agriculture" },
  { value: "technology", label: "Technology" },
  { value: "food", label: "Food & Beverage" },
  { value: "retail", label: "Retail" },
  { value: "education", label: "Education" },
];

const CompanySetupPage = ({ open, onClose }) => {
  const { userID } = useContext(UserContext);

  useEffect(() => {
    if (!userID) {
      console.warn("User ID is not available.");
    }
  }, [userID]);

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const companyName = e.target.companyName.value;
    const industry = e.target.startingIndustry.value;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/setupCompany",
        {
          companyName,
          industry,
          userID,
        }
      );
      console.log(response.data);
      onClose(); // Close the dialog after form submission
    } catch (error) {
      console.error("Error during company setup:", error);
      if (error.response) {
        alert(`Failed to set up company: ${error.response.data.message}`);
      } else {
        alert("Failed to set up company");
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Up Your Company</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="companyName"
            name="companyName"
            label="Company Name"
            type="text"
            fullWidth
            required
          />
          <TextField
            id="startingIndustry"
            name="startingIndustry"
            select
            label="Starting Industry"
            fullWidth
            required
            defaultValue=""
            style={{ marginTop: "1rem" }}
          >
            {industries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {userID && <p>User ID: {userID}</p>}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanySetupPage;
