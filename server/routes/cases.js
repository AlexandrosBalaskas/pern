const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/cases", async (req, res) => {
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
      `SELECT * FROM cases ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM cases ${filters} `);
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/cases/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM cases WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/cases/:id", async (req, res) => {
  const id = req.params.id;
  const {
    status,
    priority,
    caseOrigin,
    caseOwner,
    contactName,
    accountName,
    subject,
    description,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE cases SET status = $1 , priority = $2, caseOrigin = $3, caseOwner = $4, contactName = $5, accountName = $6, subject = $7, description = $8 WHERE id = ${id} returning *`,
      [
        status,
        priority,
        caseOrigin,
        caseOwner,
        contactName,
        accountName,
        subject,
        description,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/cases/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM cases WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/cases", async (req, res) => {
  const {
    status,
    priority,
    caseOrigin,
    caseOwner,
    contactName,
    accountName,
    subject,
    description,
  } = req.body;
  console.log(req.body, "boy");
  try {
    await pool.query(
      "INSERT INTO cases ( status,priority,caseOrigin,caseOwner,contactName,accountName,subject,description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        status,
        priority,
        caseOrigin,
        caseOwner,
        contactName,
        accountName,
        subject,
        description,
      ]
    );
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
