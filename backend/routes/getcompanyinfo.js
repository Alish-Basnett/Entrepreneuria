const express = require("express");
const router = express.Router();
const sql = require("mssql");

module.exports = (poolPromise) => {
  router.get("/getCompanyInfo", async (req, res) => {
    try {
      const pool = await poolPromise;
      const { userID } = req.query;

      if (!userID) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Fetch the company name from the database
      const query = `
        SELECT CompanyName 
        FROM Users 
        WHERE UserID = @UserID
      `;
      const result = await pool
        .request()
        .input("UserID", sql.Int, userID)
        .query(query);

      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const companyName = result.recordset[0].CompanyName;
      res.status(200).json({ companyName });
    } catch (err) {
      console.error("SQL error", err);
      res.status(500).send("Server error");
    }
  });

  return router;
};
