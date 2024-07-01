import React, { useState } from "react";
import Navbar from "../../components/Layout/Navbar"; // Adjust the import path if necessary
import PricesAdvert from "../../components/PricesAdvert/PricesAdvert";
import CompanySetupPage from "../CompanySetupPage/CompanySetup";

const HomePage = () => {
  const [isCompanySetupOpen, setIsCompanySetupOpen] = useState(false);

  const handleOpenCompanySetup = () => {
    setIsCompanySetupOpen(true);
  };

  const handleCloseCompanySetup = () => {
    setIsCompanySetupOpen(false);
  };

  return (
    <div>
      <Navbar onCompanyNameClick={handleOpenCompanySetup} />
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
