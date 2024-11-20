//server.js

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db1",
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE username = ? AND password = ?";

  db.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database query error." });
    }

    if (result.length > 0) {
      return res.json({ message: "Login successful" });
    } else {
      return res.json({ message: "Invalid credentials" });
    }
  });
});

app.listen(8081, () => {
  console.log("listening...");
});
