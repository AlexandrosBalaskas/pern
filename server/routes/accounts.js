const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/accounts", async (req, res) => {
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
      `SELECT * FROM accounts ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM accounts ${filters} `);
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/accounts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM accounts WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/accounts/:id", async (req, res) => {
  const id = req.params.id;
  const {
    accountName,
    website,
    type,
    description,
    parentAccount,
    accountOwner,
    phone,
    billingStreet,
    billingPostalCode,
    billingCity,
    billingCountry,
    billingState,
    shippingStreet,
    shippingPostalCode,
    shippingCity,
    shippingCountry,
    shippingState,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE accounts SET accountName = $1 , website = $2, type = $3, description = $4, parentAccount = $5, accountOwner = $6, phone = $7, billingStreet = $8, billingPostalCode = $9, billingCity = $10, billingCountry = $11, billingState = $12, shippingStreet = $13, shippingPostalCode = $14, shippingCity = $15, shippingCountry = $16, shippingState = $17 WHERE id = ${id} returning *`,
      [
        accountName,
        website,
        type,
        description,
        parentAccount,
        accountOwner,
        phone,
        billingStreet,
        billingPostalCode,
        billingCity,
        billingCountry,
        billingState,
        shippingStreet,
        shippingPostalCode,
        shippingCity,
        shippingCountry,
        shippingState,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/accounts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM accounts WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/accounts", async (req, res) => {
  const {
    accountName,
    website,
    type,
    description,
    parentAccount,
    accountOwner,
    phone,
    billingStreet,
    billingPostalCode,
    billingCity,
    billingCountry,
    billingState,
    shippingStreet,
    shippingPostalCode,
    shippingCity,
    shippingCountry,
    shippingState,
  } = req.body;
  console.log(req.body, "boy");
  try {
    await pool.query(
      "INSERT INTO accounts (accountName, website, type, description, parentAccount, accountOwner, phone, billingStreet, billingPostalCode, billingCity, billingCountry, billingState, shippingStreet, shippingPostalCode, shippingCity, shippingCountry, shippingState) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
      [
        accountName,
        website,
        type,
        description,
        parentAccount,
        accountOwner,
        phone,
        billingStreet,
        billingPostalCode,
        billingCity,
        billingCountry,
        billingState,
        shippingStreet,
        shippingPostalCode,
        shippingCity,
        shippingCountry,
        shippingState,
      ]
    );
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
