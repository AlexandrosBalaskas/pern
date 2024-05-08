const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/leads", async (req, res) => {
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
      `SELECT * FROM leads ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM leads ${filters} `);
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/leads/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM leads WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/leads/:id", async (req, res) => {
  const id = req.params.id;
  const {
    salutation,
    firstName,
    lastName,
    company,
    title,
    website,
    description,
    leadStatus,
    leadOwner,
    phone,
    email,
    street,
    postalCode,
    city,
    country,
    state,
    employeesNumber,
    annualRevenue,
    leadSource,
    industry,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE leads SET salutation = $1 , firstName = $2, lastName = $3, company = $4, title = $5, website = $6, description = $7, leadStatus = $8, leadOwner = $9, phone = $10, email = $11, street = $12, postalCode = $13, city = $14, country = $15, state = $16, employeesNumber = $17, annualRevenue = $18, leadSource = $19, industry = $20 WHERE id = ${id} returning *`,
      [
        salutation,
        firstName,
        lastName,
        company,
        title,
        website,
        description,
        leadStatus,
        leadOwner,
        phone,
        email,
        street,
        postalCode,
        city,
        country,
        state,
        employeesNumber,
        annualRevenue,
        leadSource,
        industry,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/leads/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM leads WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/leads", async (req, res) => {
  const {
    salutation,
    firstName,
    lastName,
    company,
    title,
    website,
    description,
    leadStatus,
    leadOwner,
    phone,
    email,
    street,
    postalCode,
    city,
    country,
    state,
    employeesNumber,
    annualRevenue,
    leadSource,
    industry,
  } = req.body;
  console.log(req.body, "boy");
  try {
    await pool.query(
      "INSERT INTO leads (salutation,firstName,lastName,company,title,website,description,leadStatus,leadOwner,phone,email,street,postalCode,city,country,state,employeesNumber,annualRevenue,leadSource,industry) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)",
      [
        salutation,
        firstName,
        lastName,
        company,
        title,
        website,
        description,
        leadStatus,
        leadOwner,
        phone,
        email,
        street,
        postalCode,
        city,
        country,
        state,
        employeesNumber,
        annualRevenue,
        leadSource,
        industry,
      ]
    );
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
