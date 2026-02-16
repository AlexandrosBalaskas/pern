const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/product_familiesCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM product_families`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.family_id, label: acc.family_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/productsByFamily", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
      productFamily, 
         COUNT(*) as count 
       FROM products 
       WHERE productFamily IN ('1', '2', '3', '4', '5') 
       GROUP BY productFamily`,
    );
    const counts = {
      Electronics: 0,
      Apparel: 0,
      Automobiles: 0,
      Furniture: 0,
      "Home Appliances": 0,
    };

    result.rows.forEach((row) => {
      if (row.productfamily == "1") {
        counts.Electronics = row.count;
      } else if (row.productfamily == "2") {
        counts.Apparel = row.count;
      } else if (row.productfamily == "3") {
        counts.Automobiles = row.count;
      } else if (row.productfamily == "4") {
        counts.Furniture = row.count;
      } else if (row.productfamily == "5") {
        counts["Home Appliances"] = row.count;
      }
    });
    res.status(200).send(counts);
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/products", async (req, res) => {
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
      `SELECT * FROM products ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page],
    );
    const count = await pool.query(`SELECT COUNT(*) FROM products ${filters} `);
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/products/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/products/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  const {
    productname,
    productfamily,
    productcode,
    active,
    productdescription,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE products SET productName = $1 , productFamily = $2, productCode = $3, active = $4, productDescription = $5 WHERE id = ${id} returning *`,
      [productname, productfamily, productcode, active, productdescription],
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/products/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM products WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/products", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const {
    productname,
    productfamily,
    productcode,
    active,
    productdescription,
  } = req.body;
  console.log(req.body, "boy");
  try {
    const results = await pool.query(
      "INSERT INTO products (productName, productFamily, productCode, active, productDescription) VALUES ($1, $2, $3, $4, $5) returning *",
      [productname, productfamily, productcode, active, productdescription],
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
