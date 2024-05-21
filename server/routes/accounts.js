const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/accountsCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM accounts`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.id, label: acc.accountname };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/account_typeCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM account_type`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.id, label: acc.type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/accounts", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
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
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM accounts WHERE id = ${id}`);
    const account = results.rows[0];
    res.status(200).send(account);
  } catch (err) {
    console.log(err);
  }
});

router.put("/api/accounts/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = req.params.id;
  const {
    accountname,
    website,
    type,
    description,
    parentaccount,
    accountowner,
    phone,
    billingstreet,
    billingpostalcode,
    billingcity,
    billingcountry,
    billingstate,
    shippingstreet,
    shippingpostalcode,
    shippingcity,
    shippingcountry,
    shippingstate,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE accounts SET accountName = $1 , website = $2, type = $3, description = $4, parentAccount = $5, accountOwner = $6, phone = $7, billingStreet = $8, billingPostalCode = $9, billingCity = $10, billingCountry = $11, billingState = $12, shippingStreet = $13, shippingPostalCode = $14, shippingCity = $15, shippingCountry = $16, shippingState = $17 WHERE id = ${id} returning *`,
      [
        accountname,
        website,
        type,
        description,
        parentaccount,
        accountowner,
        phone,
        billingstreet,
        billingpostalcode,
        billingcity,
        billingcountry,
        billingstate,
        shippingstreet,
        shippingpostalcode,
        shippingcity,
        shippingcountry,
        shippingstate,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/api/accounts/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM accounts WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/accounts", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const {
    accountname,
    website,
    type,
    description,
    parentaccount,
    accountowner,
    phone,
    billingstreet,
    billingpostalcode,
    billingcity,
    billingcountry,
    billingstate,
    shippingstreet,
    shippingpostalcode,
    shippingcity,
    shippingcountry,
    shippingstate,
  } = req.body;
  console.log(req.body, "boy");
  try {
    const results = await pool.query(
      "INSERT INTO accounts (accountName, website, type, description, parentAccount, accountOwner, phone, billingStreet, billingPostalCode, billingCity, billingCountry, billingState, shippingStreet, shippingPostalCode, shippingCity, shippingCountry, shippingState) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *",
      [
        accountname,
        website,
        type,
        description,
        parentaccount,
        accountowner,
        phone,
        billingstreet,
        billingpostalcode,
        billingcity,
        billingcountry,
        billingstate,
        shippingstreet,
        shippingpostalcode,
        shippingcity,
        shippingcountry,
        shippingstate,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
