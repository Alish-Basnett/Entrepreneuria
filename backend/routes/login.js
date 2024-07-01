const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcrypt");

module.exports = (poolPromise) => {
  router.post("/login", async (req, res) => {
    try {
      const pool = await poolPromise;
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and Password are required" });
      }

      // Fetch the user from the database
      const query = `
        SELECT * FROM Users WHERE Username = @Username
      `;
      const result = await pool
        .request()
        .input("Username", sql.NVarChar, username)
        .query(query);

      if (result.recordset.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = result.recordset[0];
      const isMatch = await bcrypt.compare(password, user.Password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      console.error("SQL error", err);
      res.status(500).send("Server error");
    }
  });

  return router;
};
