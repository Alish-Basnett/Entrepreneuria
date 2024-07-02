const express = require("express");
const router = express.Router();
const sql = require("mssql");

module.exports = (poolPromise) => {
  router.post("/setupCompany", async (req, res) => {
    try {
      const pool = await poolPromise;
      const { companyName, industry, userID } = req.body;

      if (!companyName || !industry || !userID) {
        return res.status(400).json({
          message: "Company Name, Industry, and User ID are required",
        });
      }

      const query = `
        UPDATE Users 
        SET CompanyName = @CompanyName,
            Industry = @Industry
        WHERE UserID = @UserID
      `;
      const result = await pool
        .request()
        .input("CompanyName", sql.NVarChar, companyName)
        .input("Industry", sql.NVarChar, industry)
        .input("UserID", sql.Int, userID)
        .query(query);

      if (result.rowsAffected[0] === 0) {
        return res
          .status(500)
          .json({ message: "Failed to update company details" });
      }

      res.status(200).json({ message: "Company setup successful" });
    } catch (err) {
      console.error("SQL error", err);
      res.status(500).send("Server error");
    }
  });

  return router;
};
