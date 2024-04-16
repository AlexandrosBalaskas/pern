require("dotenv").config();
const express = require("express");
const { response } = require("express");

const pool = require("./db");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/api/months", (req, res) => {
  const months = ["Jan", "Feb", "Mar"];
  return res.end("months");
});

app.get("/api/schools", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM restu");
    res.status(200).send({ childern: data.rows });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/api/add", async (req, res) => {
  console.log(req.body);
  const { name, location } = req.body;
  try {
    await pool.query("INSERT INTO restu (name, address) VALUES ($1, $2)", [
      name,
      location,
    ]);
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/api/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE schools (id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
