// index.js
const express = require("express");
const sql = require("mssql");
const { config } = require("./dbconfig");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware for JSON parsing
app.use(express.json());
app.use(cors());

// Create connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed -", err);
  });

// Import and use user routes
const register = require("./routes/register");
const login = require("./routes/login");
app.use("/api/users", register(poolPromise));
app.use("/api/users", login(poolPromise));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
