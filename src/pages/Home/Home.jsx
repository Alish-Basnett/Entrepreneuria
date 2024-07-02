import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar"; // Adjust the import path if necessary
import PricesAdvert from "../../components/PricesAdvert/PricesAdvert";
import CompanySetupPage from "../CompanySetupPage/CompanySetup";

const HomePage = () => {
  const [isCompanySetupOpen, setIsCompanySetupOpen] = useState(false);
  const [refreshNavbar, setRefreshNavbar] = useState(false);

  const handleOpenCompanySetup = () => {
    setIsCompanySetupOpen(true);
  };

  const handleCloseCompanySetup = () => {
    setIsCompanySetupOpen(false);
    setRefreshNavbar(!refreshNavbar); // Trigger refresh
  };

  return (
    <div>
      <Navbar
        onCompanyNameClick={handleOpenCompanySetup}
        refresh={refreshNavbar}
      />
      <PricesAdvert />
      <h2>Home</h2>
      <CompanySetupPage
        open={isCompanySetupOpen}
        onClose={handleCloseCompanySetup}
      />
    </div>
  );
};

export default HomePage;
