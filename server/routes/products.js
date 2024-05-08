const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/products", async (req, res) => {
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
      `SELECT * FROM products ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(`SELECT COUNT(*) FROM products ${filters} `);
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const {
    productName,
    productFamily,
    productCode,
    active,
    productDescription,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE products SET productName = $1 , productFamily = $2, productCode = $3, active = $4, productDescription = $5 WHERE id = ${id} returning *`,
      [productName, productFamily, productCode, active, productDescription]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM products WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/products", async (req, res) => {
  const {
    productName,
    productFamily,
    productCode,
    active,
    productDescription,
  } = req.body;
  console.log(req.body, "boy");
  try {
    await pool.query(
      "INSERT INTO products (productName, productFamily, productCode, active, productDescription) VALUES ($1, $2, $3, $4, $5)",
      [productName, productFamily, productCode, active, productDescription]
    );
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
