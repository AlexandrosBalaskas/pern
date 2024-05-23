const Router = require("express");

const router = Router();
const pool = require("../db");

router.get("/api/priorityCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM priority`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.priority_id, label: acc.priority_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/case_statusCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM case_status`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.status_id, label: acc.status_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/case_originCL", async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM case_origin`);
    const result = (data.rows || []).map((acc) => {
      return { code: acc.origin_id, label: acc.origin_type };
    });
    res.status(200).send({ items: result });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/api/casesByPriority", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         priority, 
         COUNT(*) as count 
       FROM cases 
       WHERE priority IN ('1', '2', '3') 
       GROUP BY priority`
    );

    const counts = {
      Low: 0,
      Medium: 0,
      High: 0,
    };

    result.rows.forEach((row) => {
      if (row.priority === "1") {
        counts.Low = row.count;
      } else if (row.priority === "2") {
        counts.Medium = row.count;
      } else if (row.priority === "3") {
        counts.High = row.count;
      }
    });
    res.status(200).send(counts);
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/cases", async (req, res) => {
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
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(`SELECT * FROM cases WHERE id = ${id}`);
    res.status(200).send(results.rows[0]);
  } catch {
    console.log(err);
  }
});

router.put("/api/cases/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  const {
    status,
    priority,
    caseorigin,
    caseowner,
    contactname,
    accountname,
    subject,
    description,
  } = req.body;
  try {
    const results = await pool.query(
      `UPDATE cases SET status = $1 , priority = $2, caseOrigin = $3, caseOwner = $4, contactName = $5, accountName = $6, subject = $7, description = $8 WHERE id = ${id} returning *`,
      [
        status,
        priority,
        caseorigin,
        caseowner,
        contactname,
        accountname,
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
  await new Promise((resolve) => setTimeout(resolve, 300));
  const id = req.params.id;
  try {
    const results = await pool.query(`DELETE FROM cases WHERE id = ${id}`);
    res.status(204).json({ status: "success" });
  } catch {
    console.log(err);
  }
});

router.post("/api/cases", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const {
    status,
    priority,
    caseorigin,
    caseowner,
    contactname,
    accountname,
    subject,
    description,
  } = req.body;
  console.log(req.body, "boy");
  try {
    const results = await pool.query(
      "INSERT INTO cases ( status,priority,caseOrigin,caseOwner,contactName,accountName,subject,description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [
        status,
        priority,
        caseorigin,
        caseowner,
        contactname,
        accountname,
        subject,
        description,
      ]
    );
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err, "err");
    res.sendStatus(500);
  }
});

module.exports = router;
