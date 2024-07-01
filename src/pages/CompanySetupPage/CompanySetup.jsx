import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const industries = [
  { value: "agriculture", label: "Agriculture" },
  { value: "technology", label: "Technology" },
  { value: "food", label: "Food & Beverage" },
  { value: "retail", label: "Retail" },
  { value: "education", label: "Education" },
];

const CompanySetupPage = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can collect form data and process it as needed
    onClose(); // Close the dialog after form submission
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
            label="Company Name"
            type="text"
            fullWidth
            required
          />
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            style={{ marginTop: "1rem" }}
            required
          />
          <TextField
            id="startingIndustry"
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
