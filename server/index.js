require("dotenv").config();
const express = require("express");
const { response } = require("express");
const contactsRouter = require("./routes/contacts");
const accountsRouter = require("./routes/accounts");
const leadsRouter = require("./routes/leads");
const oportunitiesRouter = require("./routes/oportunities");
const productsRouter = require("./routes/products");
const quickTextsRouter = require("./routes/quickTexts");
const priceBooksRouter = require("./routes/priceBooks");
const casesRouter = require("./routes/cases");

const pool = require("./db.js");

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(contactsRouter);
app.use(accountsRouter);
app.use(leadsRouter);
app.use(oportunitiesRouter);
app.use(productsRouter);
app.use(quickTextsRouter);
app.use(priceBooksRouter);
app.use(casesRouter);

app.get("/api/schools", async (req, res) => {
  const { current_page, pageSize } = req.query;
  const filters = (Object.keys(JSON.parse(req.query?.filters)) || [])
    .map((key, index) => {
      let par = index === 0 ? "WHERE" : "AND";
      return `${par} ${key} = '${JSON.parse(req.query.filters)[key]}'`;
    })
    .join(" ");
  const order = req.query?.sort
    ? `ORDER BY ${req.query?.sort?.split(":")?.join(" ")}`
    : "";
  try {
    const data = await pool.query(
      `SELECT * FROM schoolss ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM schoolss ${filters} `);
    res.status(200).send({ schools: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/api/schools/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM schoolss WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

app.put("/api/schools/:id", async (req, res) => {
  const id = req.params.id;
  const { address, name, surname, schoolname } = req.body;
  try {
    const results = await pool.query(
      `UPDATE schoolss SET name = $1 , surname = $2, address = $3, schoolname = $4 WHERE id = ${id} returning *`,
      [name, surname, address, schoolname]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

app.delete("/api/schools/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM schoolss WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

app.post("/api/schools", async (req, res) => {
  const { name, address, surname, schoolname } = req.body;
  try {
    await pool.query(
      "INSERT INTO schoolss (name, address, surname, schoolname) VALUES ($1, $2, $3, $4)",
      [name, address, surname, schoolname]
    );
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err, "errrr");
    res.sendStatus(500);
  }
});

app.get("/api/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE cases (id SERIAL PRIMARY KEY, status VARCHAR(50), priority VARCHAR(500), caseOrigin VARCHAR(50), caseOwner VARCHAR(50), contactName VARCHAR(50), accountName VARCHAR(50), subject VARCHAR(50), description VARCHAR(500))"
    );
  } catch (err) {
    console.log(err, "RRRRRRRRR");
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
