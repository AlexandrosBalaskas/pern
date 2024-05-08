const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/quickTexts", async (req, res) => {
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
      `SELECT * FROM quickTexts ${filters} ${order} LIMIT ${
        pageSize || 10
      } OFFSET (${pageSize || 10} * ($1))`,
      [current_page]
    );
    const count = await pool.query(
      `SELECT COUNT(*) FROM quickTexts ${filters} `
    );
    res.status(200).send({ data: data.rows, count: count.rows[0].count });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/quickTexts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(
      `SELECT * FROM quickTexts WHERE id = ${id}`
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/quickTexts/:id", async (req, res) => {
  const id = req.params.id;
  const { quickTextName, relatedTo, field, message, category } = req.body;
  try {
    const results = await pool.query(
      `UPDATE quickTexts SET quickTextName = $1 , relatedTo = $2, field = $3, message = $4, category = $5 WHERE id = ${id} returning *`,
      [quickTextName, relatedTo, field, message, category]
    );
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.delete("/api/quickTexts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM quickTexts WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/quickTexts", async (req, res) => {
  const { quickTextName, relatedTo, field, message, category } = req.body;
  console.log(req.body, "boy");
  try {
    await pool.query(
      "INSERT INTO quickTexts (quickTextName, relatedTo, field, message, category ) VALUES ($1, $2, $3, $4, $5)",
      [quickTextName, relatedTo, field, message, category]
    );
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
