const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/priceBooks", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
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
      `SELECT * FROM priceBooks ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(
      `SELECT COUNT(*) FROM priceBooks ${filters} `
    );
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/priceBooks/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(
      `SELECT * FROM priceBooks WHERE id = ${id}`
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/priceBooks/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  const { pricebookname, description, active, isstandard } = req.body;
  try {
    const results = await pool.query(
      `UPDATE priceBooks SET priceBookName = $1 , description = $2, active = $3, isStandard = $4 WHERE id = ${id} returning *`,
      [pricebookname, description, active, isstandard]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/priceBooks/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM priceBooks WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/priceBooks", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const { pricebookname, description, active, isstandard } = req.body;
  console.log(req.body, "boy");
  try {
    const results = await pool.query(
      "INSERT INTO priceBooks (priceBookName, description, active, isStandard ) VALUES ($1, $2, $3, $4) returning *",
      [pricebookname, description, active, isstandard]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
