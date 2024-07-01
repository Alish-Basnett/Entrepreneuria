const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcrypt");

module.exports = (poolPromise) => {
  router.post("/register", async (req, res) => {
    try {
      console.log("Request body:", req.body); // Add this line
      const pool = await poolPromise;
      const { username, password } = req.body;
      const companyName = "N/A";
      const industry = "N/A";
      const registrationDate = new Date().toISOString();

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and Password are required" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed Password:", hashedPassword);

      // Insert user into database
      const query = `
        INSERT INTO Users (Username, Password, CompanyName, Industry, RegistrationDate)
        VALUES (@Username, @Password, @CompanyName, @Industry, @RegistrationDate)
      `;

      const result = await pool
        .request()
        .input("Username", sql.NVarChar, username)
        .input("Password", sql.NVarChar, hashedPassword) // Use the hashed password
        .input("CompanyName", sql.NVarChar, companyName)
        .input("Industry", sql.NVarChar, industry)
        .input("RegistrationDate", sql.DateTime, registrationDate)
        .query(query);

      if (result.rowsAffected[0] === 1) {
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(500).json({ message: "Failed to register user" });
      }
    } catch (err) {
      console.error("SQL error", err);
      res.status(500).send("Server error");
    }
  });

  return router;
};
