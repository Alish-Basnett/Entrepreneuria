import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./GemsShop.css";
import Gem from "../../assets/images/Gems.png";

const gemPackages = [
  { id: 1, name: "Small Pack", gems: 10, price: "$0.99" },
  { id: 2, name: "Medium Pack", gems: 50, price: "$4.99" },
  { id: 3, name: "Large Pack", gems: 100, price: "$9.99" },
  { id: 4, name: "Mega Pack", gems: 500, price: "$49.99" },
];

const GemsShop = ({ open, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePurchase = (gemPackage) => {
    setSelectedPackage(gemPackage);
  };

  const handleConfirmPurchase = () => {
    // Add purchase logic here
    setSelectedPackage(null);
    onClose();
  };

  const handleCancelPurchase = () => {
    setSelectedPackage(null);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="flex">
        <img src={Gem} alt="Gem" height={"30px"} width={"30px"} />
        <span> &nbsp; Gems Shop &nbsp; </span>
        <img src={Gem} alt="Gem" height={"30px"} width={"30px"} />
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {gemPackages.map((gemPackage) => (
            <Grid item xs={12} sm={6} md={3} key={gemPackage.id}>
              <Card className="gem-card">
                <CardContent>
                  <Typography variant="h6">{gemPackage.name}</Typography>
                  <Typography variant="body2">
                    {gemPackage.gems} Gems
                  </Typography>
                  <Typography variant="body2">{gemPackage.price}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePurchase(gemPackage)}
                    style={{ marginTop: "10px" }}
                  >
                    Buy
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>

      {selectedPackage && (
        <Dialog open={true} onClose={handleCancelPurchase}>
          <DialogTitle>
            Confirm Purchase
            <IconButton
              aria-label="close"
              onClick={handleCancelPurchase}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to purchase the {selectedPackage.name} for{" "}
              {selectedPackage.price}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelPurchase} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmPurchase} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};

export default GemsShop;
