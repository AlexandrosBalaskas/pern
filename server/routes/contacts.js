const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/salutationCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM salutation`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.salutation_id, label: acc.salutation_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/contactsCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM contacts`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.id, label: acc.firstname };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/contacts", async (req, res) => {
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
      `SELECT * FROM contacts ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM contacts ${filters} `);
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/contacts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM contacts WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/contacts/:id", async (req, res) => {
  const id = req.params.id;
  const {
    salutation,
    firstname,
    lastname,
    accountname,
    title,
    reportsto,
    description,
    contactowner,
    phone,
    email,
    mailingstreet,
    postalcode,
    mailingcity,
    mailingcountry,
    mailingstate,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE contacts SET salutation = $1 , firstName = $2, lastName = $3, accountName = $4, title = $5, reportsTo = $6, description = $7, contactOwner = $8, phone = $9, email = $10, mailingStreet = $11, postalCode = $12, mailingCity = $13, mailingCountry = $14, mailingState = $15 WHERE id = ${id} returning *`,
      [
        salutation,
        firstname,
        lastname,
        accountname,
        title,
        reportsto,
        description,
        contactowner,
        phone,
        email,
        mailingstreet,
        postalcode,
        mailingcity,
        mailingcountry,
        mailingstate,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/contacts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM contacts WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/contacts", async (req, res) => {
  const {
    salutation,
    firstname,
    lastname,
    accountname,
    title,
    reportsto,
    description,
    contactowner,
    phone,
    email,
    mailingstreet,
    postalcode,
    mailingcity,
    mailingcountry,
    mailingstate,
  } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO contacts (salutation, firstName, lastName, accountName, title, reportsTo , description, contactOwner, phone, email , mailingStreet, postalCode, mailingCity, mailingCountry, mailingState) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
      [
        salutation,
        firstname,
        lastname,
        accountname,
        title,
        reportsto,
        description,
        contactowner,
        phone,
        email,
        mailingstreet,
        postalcode,
        mailingcity,
        mailingcountry,
        mailingstate,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
